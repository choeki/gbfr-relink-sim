import { useEffect, useRef, useState } from 'react';
import type { Build, Dataset, SigilDef, Trait } from '../types';
import { TraitIcon } from '../icons';
import { translateLevelEffect, translateTraitDescription } from '../effectTranslations';
import { localizedName, useI18n } from '../i18n';

export interface SkillSource {
  label: string;
  level: number;
}

export interface SkillRow {
  trait: Trait;
  total: number;
  effective: number;
  overflow: number;
  maxed: boolean;
  sources: SkillSource[];
}

const CATEGORY_SORT_ORDER: Record<string, number> = {
  basic: 3,
  attack: 4,
  defense: 5,
  support: 6,
  special: 7,
};

function skillSortOrder(trait: Trait): number {
  // Weapon-exclusive effects (Transcendent, Catastrophe, Sigil Booster, etc.)
  // should always lead the summary, followed by character and Celestial traits.
  if (trait.weaponOnly) return 0;
  if (trait.iconFile?.startsWith('chars/')) return 1;
  if (trait.name.startsWith('Celestial ') || trait.nameZh?.startsWith('天星')) return 2;
  return CATEGORY_SORT_ORDER[trait.category ?? 'special'] ?? 8;
}

export function computeSkills(build: Build, data: Dataset, traitById: Map<string, Trait>, sigilById: Map<string, SigilDef>): SkillRow[] {
  const totals = new Map<string, { total: number; sources: SkillSource[] }>();
  const sigilBoosterLevel = build.weapon.grants
    .filter(grant => grant.traitId === 'SKILL_113_00')
    .reduce((sum, grant) => sum + grant.level, 0);
  const add = (traitId: string | null | undefined, lv: number, label: string) => {
    if (!traitId || lv <= 0) return;
    const cur = totals.get(traitId) ?? { total: 0, sources: [] };
    cur.total += lv;
    cur.sources.push({ label, level: lv });
    totals.set(traitId, cur);
  };
  build.sigils.forEach((eq, i) => {
    if (!eq.sigilId) return;
    const s = sigilById.get(eq.sigilId);
    if (!s) return;
    const sName = s.nameZh || s.name;
    add(s.primaryTraitId, eq.level, `因子槽 ${i + 1} · ${sName}`);
    add(s.primaryTraitId, sigilBoosterLevel, `武器 · 因子强化（因子槽 ${i + 1}）`);
    if (s.supportsSecondary && eq.secondaryTraitId) {
      add(eq.secondaryTraitId, eq.secondaryLevel ?? eq.level, `因子槽 ${i + 1} · ${sName}(副词条)`);
      add(eq.secondaryTraitId, sigilBoosterLevel, `武器 · 因子强化（因子槽 ${i + 1} 副词条）`);
    }
  });
  if (build.wrightstone.defId) {
    const wsName = data.wrightstones.find(x => x.id === build.wrightstone.defId);
    for (const g of build.wrightstone.traits) add(g.traitId, g.level, `祝福石 · ${wsName?.nameZh || wsName?.name || ''}`);
  }
  for (const g of build.weapon.grants) add(g.traitId, g.level, `武器 · ${build.weapon.name || '武器'}`);
  build.summons.forEach((summon, index) => {
    if (!summon.defId) return;
    const def = data.summons.find(candidate => candidate.id === summon.defId);
    add(summon.trait.traitId, summon.trait.level, `召唤石 ${index + 1} · ${def?.baseName ?? ''}`);
  });

  const rows: SkillRow[] = [];
  for (const [traitId, { total, sources }] of totals) {
    const trait = traitById.get(traitId);
    if (!trait) continue;
    const effective = Math.min(total, trait.maxLevel);
    rows.push({ trait, total, effective, overflow: Math.max(0, total - trait.maxLevel), maxed: total >= trait.maxLevel, sources });
  }
  rows.sort((a, b) =>
    skillSortOrder(a.trait) - skillSortOrder(b.trait)
    || b.effective - a.effective
    || a.trait.id.localeCompare(b.trait.id)
  );
  return rows;
}

export interface BonusRow {
  name: string;
  isPercent: boolean;
  total: number;
  sources: SkillSource[];
}

/** 召唤石装备加成汇总(数值直接相加) */
export function computeSummonBonuses(build: Build, data: Dataset): BonusRow[] {
  const map = new Map<string, BonusRow>();
  for (const s of build.summons) {
    if (!s.defId || !s.sub.paramId) continue;
    const def = data.summons.find(x => x.id === s.defId);
    const p = data.subParams.find(x => x.id === s.sub.paramId);
    if (!p) continue;
    const lv = Math.min(s.sub.level, p.maxLevel);
    const val = p.values[lv] ?? 0;
    const row = map.get(p.id) ?? { name: p.name, isPercent: p.isPercent, total: 0, sources: [] };
    row.total = Math.round((row.total + val) * 100) / 100;
    row.sources.push({ label: `${def?.baseName ?? '召唤石'} Lv${lv}`, level: val });
    map.set(p.id, row);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

function TraitDetailModal({ row, onClose, onSaveDesc, onSaveLevelEffects }: {
  row: SkillRow;
  onClose: () => void;
  onSaveDesc: (traitId: string, desc: string) => void;
  onSaveLevelEffects: (traitId: string, effects: string[]) => void;
}) {
  const editable = false;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(translateTraitDescription(row.trait.desc ?? ''));
  const [editingLevels, setEditingLevels] = useState(false);
  const [levelText, setLevelText] = useState((row.trait.levelEffects ?? []).map(translateLevelEffect).join('\n---\n'));
  const currentLevelRef = useRef<HTMLDivElement>(null);
  const effects = row.trait.levelEffects?.slice(0, row.trait.maxLevel) ?? [];
  const baseDesc = translateTraitDescription((row.trait.desc ?? '').split(/\nLv\d+:/)[0].trim());
  const knownEndpoints = [...(row.trait.desc ?? '').matchAll(/(?:^|\n)Lv(\d+):([^\n]+)/g)]
    .map(match => ({ level: Number(match[1]), effect: translateLevelEffect(match[2].trim().replace(/\s*\/\s*/g, '\n')) }));
  const hasWikiLevelData = effects.length > 0
    && row.trait.levelDataSource !== '本地补录'
    && !row.trait.levelDataSource?.startsWith('游戏截图');
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  useEffect(() => {
    const current = currentLevelRef.current;
    const list = current?.parentElement;
    if (!editingLevels && current && list) {
      list.scrollTop = current.offsetTop - list.clientHeight / 2 + current.clientHeight / 2;
    }
  }, [editingLevels]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal detail" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span>技能详情</span>
          <button className="btn-ghost" onClick={onClose}>✕</button>
        </div>
        <div className="detail-body">
          <div className="detail-top">
            <TraitIcon trait={row.trait} size={52} />
            <div>
              <div className="detail-name">
                {row.trait.nameZh || row.trait.name}
                {row.maxed && <span className="max-badge">MAX</span>}
              </div>
              <div className="detail-sub">{row.trait.name} · {row.trait.id}</div>
              <div className="detail-lv">
                Lv <b>{row.effective}</b> / {row.trait.maxLevel}
                {row.overflow > 0 && <span className="overflow-badge"> 溢出 +{row.overflow}</span>}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-label">
              技能说明
              {editable && !editing && !hasWikiLevelData && <button className="btn-ghost edit-link" onClick={() => setEditing(true)}>编辑</button>}
            </div>
            {editing ? (
              <>
                <textarea
                  className="desc-edit" rows={4} value={text} autoFocus
                  placeholder="填写该技能的效果说明,例如:提升攻击力(Lv上升效果提高)"
                  onChange={e => setText(e.target.value)}
                />
                <div className="detail-actions">
                  <button className="btn primary" onClick={() => { onSaveDesc(row.trait.id, text); setEditing(false); }}>保存</button>
                  <button className="btn" onClick={() => { setText(translateTraitDescription(row.trait.desc ?? '')); setEditing(false); }}>取消</button>
                </div>
              </>
            ) : (
              <div className={'detail-desc' + (baseDesc ? '' : ' dim')}>
                {baseDesc || '暂无效果说明 — 点击右上“编辑”填写，会保存到本地数据。'}
              </div>
            )}
          </div>

          <div className="detail-section level-section">
            <div className="detail-label">
              <span>
                逐级效果
                <span className={'level-source ' + (row.trait.levelDataSource === '本地补录' ? 'local' : '')}>
                  {effects.length
                    ? (row.trait.levelDataSource?.startsWith('游戏截图')
                      ? row.trait.levelDataSource
                      : row.trait.levelDataSource === '本地补录' ? '本地补录' : 'GBF Relink Wiki')
                    : knownEndpoints.length ? '游戏截图 · 部分数据' : '暂无数据'}
                </span>
              </span>
              {editable && !editingLevels && !hasWikiLevelData && <button className="btn-ghost edit-link" onClick={() => setEditingLevels(true)}>{effects.length ? '编辑数据' : '补充数据'}</button>}
            </div>
            {editingLevels ? (
              <>
                <div className="level-edit-hint">从 Lv1 开始填写；每个等级一段，等级之间用单独一行 <b>---</b> 分隔。</div>
                <textarea
                  className="desc-edit level-editor" rows={12} value={levelText} autoFocus
                  placeholder={'HP +200\n---\nHP +400\n---\nHP +600'}
                  onChange={e => setLevelText(e.target.value)}
                />
                <div className="detail-actions">
                  <button
                    className="btn primary"
                    onClick={() => {
                      const parsed = levelText.split(/\n\s*---\s*\n/).map(x => x.trim()).filter(Boolean).slice(0, row.trait.maxLevel);
                      onSaveLevelEffects(row.trait.id, parsed);
                      setEditingLevels(false);
                    }}
                  >保存逐级数据</button>
                  <button className="btn" onClick={() => { setLevelText(effects.join('\n---\n')); setEditingLevels(false); }}>取消</button>
                </div>
              </>
            ) : effects.length ? (
              <div className="level-effect-list">
                {effects.map((effect, index) => {
                  const level = index + 1;
                  const current = level === row.effective;
                  const nearby = Math.abs(level - row.effective) <= 2;
                  return (
                    <div
                      key={level} ref={current ? currentLevelRef : undefined}
                      className={'level-effect-row' + (current ? ' current' : nearby ? ' nearby' : '')}
                    >
                      <span className="level-number">Slv {level}</span>
                      <span className={'level-effect-text' + (effect ? '' : ' dim')}>
                        {effect ? translateLevelEffect(effect) : '暂无可靠数据'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : knownEndpoints.length ? (
              <div className="level-effect-list endpoint-only">
                {knownEndpoints.map(({ level, effect }) => (
                  <div key={level} className={'level-effect-row' + (level === row.effective ? ' current' : '')}>
                    <span className="level-number">Slv {level}</span>
                    <span className="level-effect-text">{effect}</span>
                  </div>
                ))}
                <div className="level-edit-hint">目前只有上述等级的可靠数据，其余等级等待补充。</div>
              </div>
            ) : (
              <div className="level-empty">
                Wiki 尚未收录这个词条的完整逐级数据。可以点击“补充数据”录入，内容会保存在本地自定义数据中。
              </div>
            )}
          </div>

          <div className="detail-section">
            <div className="detail-label">等级来源</div>
            {row.sources.map((s, i) => (
              <div key={i} className="source-row">
                <span>{s.label}</span>
                <b>+{s.level}</b>
              </div>
            ))}
            <div className="source-row total">
              <span>合计{row.overflow > 0 ? `(上限 ${row.trait.maxLevel})` : ''}</span>
              <b>{row.total}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillSummary({ rows, bonuses, onSaveDesc, onSaveLevelEffects }: {
  rows: SkillRow[];
  bonuses: BonusRow[];
  onSaveDesc?: (traitId: string, desc: string) => void;
  onSaveLevelEffects?: (traitId: string, effects: string[]) => void;
}) {
  const { locale, t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const openRow = rows.find(r => r.trait.id === openId) ?? null;
  return (
    <div className="panel summary">
      <div className="panel-title">{t('skillSummary')} <span className="dim">({rows.length})</span></div>
      {rows.length === 0 && <div className="empty-hint">{t('noSkills')}</div>}
      {rows.map(r => (
        <button
          key={r.trait.id}
          className={'skill-row' + (r.maxed ? ' maxed' : '') + (r.overflow >= 10 ? ' severe-overflow' : '')}
          onClick={() => setOpenId(r.trait.id)}
        >
          {r.overflow >= 10 && (
            <span
              className="overflow-warning"
              title={locale === 'zh' ? `技能等级超出上限 ${r.overflow} 级` : `${r.overflow} levels over the cap`}
              aria-label={locale === 'zh' ? `技能等级超出上限 ${r.overflow} 级` : `${r.overflow} levels over the cap`}
            >!
            </span>
          )}
          <TraitIcon trait={r.trait} size={32} />
          <div className="sk-text">
            <div className="sk-name">
              {localizedName(locale, r.trait.name, r.trait.nameZh)}
              {r.maxed && <span className="max-badge">MAX</span>}
              {r.overflow > 0 && <span className="overflow-badge">+{r.overflow}</span>}
            </div>
            <div className="sk-bar">
              <div className="sk-bar-fill" style={{ width: `${(r.effective / r.trait.maxLevel) * 100}%` }} />
            </div>
          </div>
          <div className="sk-lv">
            Lv <b>{r.effective}</b><span className="dim">/{r.trait.maxLevel}</span>
          </div>
        </button>
      ))}
      {bonuses.length > 0 && (
        <>
          <div className="panel-title bonus-title">{t('summonBonus')} <span className="dim">({bonuses.length})</span></div>
          {bonuses.map(b => (
            <div key={b.name} className="bonus-row" title={b.sources.map(s => `${s.label}: +${s.level}${b.isPercent ? '%' : ''}`).join('\n')}>
              <span className="bonus-name">{b.name}</span>
              <b className="bonus-val">+{b.total}{b.isPercent ? '%' : ''}</b>
            </div>
          ))}
        </>
      )}
      {openRow && (
        <TraitDetailModal
          row={openRow} onClose={() => setOpenId(null)}
          onSaveDesc={onSaveDesc ?? (() => {})} onSaveLevelEffects={onSaveLevelEffects ?? (() => {})}
        />
      )}
    </div>
  );
}
