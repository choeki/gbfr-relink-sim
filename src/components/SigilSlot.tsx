import { useState } from 'react';
import type { Dataset, SigilDef, SigilEquip, Trait } from '../types';
import { TraitIcon } from '../icons';
import { SigilPicker, TraitPicker } from './Picker';
import { localizedName, useI18n } from '../i18n';

export function SigilSlot({ index, equip, data, traitById, sigilById, characterName, onChange }: {
  index: number;
  equip: SigilEquip;
  data: Dataset;
  traitById: Map<string, Trait>;
  sigilById: Map<string, SigilDef>;
  characterName?: string | null;
  onChange: (e: SigilEquip) => void;
}) {
  const { locale, t } = useI18n();
  const [picking, setPicking] = useState(false);
  const [pickingSecondary, setPickingSecondary] = useState(false);

  const sigil = equip.sigilId ? sigilById.get(equip.sigilId) ?? null : null;
  const primary = sigil ? traitById.get(sigil.primaryTraitId) ?? null : null;
  const secondary = equip.secondaryTraitId ? traitById.get(equip.secondaryTraitId) ?? null : null;

  const secondaryCandidates = (() => {
    if (!sigil || !sigil.supportsSecondary) return [];
    // 2026 因子合成副词条规则，详见 data-source/sigil-secondary-rules.md。
    const forbiddenSecondary = new Set([
      'SKILL_167_00', // 自动药水
      'SKILL_233_00', // 狂战士
      'SKILL_234_00', // 斯巴达
      'SKILL_146_00', // 属性克制转换
      'SKILL_159_00', // 摇曳步
      'SKILL_103_00', // 全弱化效果抗性
      'SKILL_140_00', // 钳蟹的共鸣
      'SKILL_141_00', // 钳蟹的报恩
      'SKILL_164_00', // 终极钳蟹因子（仅允许固定组合带出）
      'SKILL_160_00', // Alpha
      'SKILL_161_00', // Beta
      'SKILL_162_00', // Gamma
      'GAME_DARK_AMITY', // 漆黑之谊
      'SKILL_156_00', // 万能药
    ]);
    const selectablePrimaryTraits = new Set(data.sigils.map(s => s.primaryTraitId));
    return data.traits.filter(t => {
      // 固定副词条(觉醒因子的第二专属/永恒钳蟹因子+的终极钳蟹)始终可选
      if (sigil.defaultSecondaryTraitId && t.id === sigil.defaultSecondaryTraitId) return true;
      // 已从主因子列表移除的系统/占位词条，也不能被副词条池重新带回来。
      if (!t.canPrimary || !selectablePrimaryTraits.has(t.id) || t.weaponOnly) return false;
      if (t.iconFile?.startsWith('chars/')) return false;
      if (forbiddenSecondary.has(t.id)) return false;
      return true;
    });
  })();

  if (!sigil) {
    return (
      <div className="sigil-slot empty">
        <button className="slot-add" onClick={() => setPicking(true)}>
          <TraitIcon trait={null} size={30} />
          <span>{t('traitSlot')} {index + 1}</span>
        </button>
        {picking && (
          <SigilPicker
            sigils={data.sigils}
            traitById={traitById}
            characterName={characterName}
            onClose={() => setPicking(false)}
            onPick={s => {
              onChange({ sigilId: s.id, level: s.defaultLevel, secondaryTraitId: s.defaultSecondaryTraitId ?? null, secondaryLevel: null });
              setPicking(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="sigil-slot">
      <div className="slot-main">
        <button className="icon-btn" title="更换因子" onClick={() => setPicking(true)}>
          <TraitIcon trait={primary} size={36} />
        </button>
        <div className="slot-info">
          <div className="slot-name">{localizedName(locale, sigil.name, sigil.nameZh || primary?.nameZh)}</div>
          <div className="slot-sub">{locale === 'zh' ? sigil.name : (sigil.nameZh || primary?.nameZh)}</div>
        </div>
        <label className="lv">
          Lv
          <input
            type="number" min={1} max={sigil.maxLevel} value={equip.level}
            onChange={e => onChange({ ...equip, level: Math.max(1, Math.min(sigil.maxLevel, Number(e.target.value) || 1)) })}
          />
        </label>
        <button className="btn-ghost" title="移除" onClick={() => onChange({ sigilId: null, level: 15, secondaryTraitId: null, secondaryLevel: null })}>✕</button>
      </div>
      {sigil.supportsSecondary && (
        <div className="slot-secondary">
          <span className="sec-label">{t('secondary')}</span>
          <button className="sec-pick" onClick={() => setPickingSecondary(true)}>
            {secondary ? (
              <><TraitIcon trait={secondary} size={20} /><span>{localizedName(locale, secondary.name, secondary.nameZh)}</span></>
            ) : <span className="dim">{t('selectSecondary')}</span>}
          </button>
          {secondary && (
            <>
              <label className="lv small">
                Lv
                <input
                  type="number" min={1} max={secondary.maxLevel}
                  value={equip.secondaryLevel ?? equip.level}
                  onChange={e => onChange({ ...equip, secondaryLevel: Math.max(1, Math.min(secondary.maxLevel, Number(e.target.value) || 1)) })}
                />
              </label>
              <button className="btn-ghost" title="清除副词条" onClick={() => onChange({ ...equip, secondaryTraitId: null, secondaryLevel: null })}>✕</button>
            </>
          )}
        </div>
      )}
      {picking && (
        <SigilPicker
          sigils={data.sigils}
          traitById={traitById}
          characterName={characterName}
          onClose={() => setPicking(false)}
          onPick={s => {
            onChange({ sigilId: s.id, level: s.defaultLevel, secondaryTraitId: s.defaultSecondaryTraitId ?? null, secondaryLevel: null });
            setPicking(false);
          }}
        />
      )}
      {pickingSecondary && (
        <TraitPicker
          traits={secondaryCandidates}
          title={t('selectSecondary')}
          onClose={() => setPickingSecondary(false)}
          onPick={t => {
            onChange({ ...equip, secondaryTraitId: t.id, secondaryLevel: null });
            setPickingSecondary(false);
          }}
        />
      )}
    </div>
  );
}
