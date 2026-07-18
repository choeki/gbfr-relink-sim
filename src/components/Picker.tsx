import { useEffect, useMemo, useRef, useState } from 'react';
import type { SigilDef, Trait } from '../types';
import { TraitIcon } from '../icons';
import { localizedName, useI18n } from '../i18n';

function useEsc(onClose: () => void) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEsc(onClose);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span>{title}</span>
          <button className="btn-ghost" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Opening a picker should not summon the virtual keyboard on phones/tablets.
    // Keep the convenient desktop autofocus for precise pointer devices.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      ref.current?.focus();
    }
  }, []);
  return (
    <input ref={ref} className="search" placeholder={t('searchName')} value={value} onChange={e => onChange(e.target.value)} />
  );
}

const SIGIL_CATS = ['all', 'basic', 'attack', 'defense', 'support', 'special', 'role', 'plus'] as const;
const CAT_ORDER: Record<string, number> = { basic: 0, attack: 1, defense: 2, support: 3, special: 4, character: 5 };

const TRAIT_CATS = ['all', 'basic', 'attack', 'defense', 'support', 'special', 'role'] as const;

function traitCategory(t: Trait): string {
  if (t.iconFile?.startsWith('chars/')) return 'character';
  return t.category ?? 'special';
}

/** 因子分类: 按主词条图标系列(白基础/红攻击/蓝防御/绿辅助/紫特殊), 专属=角色 */
function sigilCategory(s: SigilDef, traitById: Map<string, Trait>): string {
  const t = traitById.get(s.primaryTraitId);
  if (s.category === 'character_sigil' || t?.iconFile?.startsWith('chars/')) return 'character';
  return t?.category ?? 'special';
}

export function SigilPicker({ sigils, traitById, characterName, onPick, onClose }: {
  sigils: SigilDef[];
  traitById: Map<string, Trait>;
  /** 已选角色英文名; 有值时隐藏其他角色的专属因子 */
  characterName?: string | null;
  onPick: (s: SigilDef) => void;
  onClose: () => void;
}) {
  const { locale, t } = useI18n();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');
  const list = useMemo(() => {
    const qq = q.trim().toLowerCase();
    const filtered = sigils.filter(s => {
      const t = traitById.get(s.primaryTraitId);
      // 选定角色后, 其他角色的专属因子不显示 (专属词条图标为 chars/<角色>_Avatar.png)
      // 勇士系列为主角专属, 古兰/姬塔通用
      if (characterName) {
        const m = t?.iconFile?.match(/^chars\/(.+?)_Avatar\.png$/);
        if (m) {
          const owner = m[1];
          const ok = owner === characterName || (owner === 'Gran' && (characterName === 'Gran' || characterName === 'Djeeta'));
          if (!ok) return false;
        }
      }
      const sc = sigilCategory(s, traitById);
      if (cat === 'plus' && !s.isPlus) return false;
      if (cat !== 'all' && cat !== 'plus' && sc !== cat) return false;
      if (!qq) return true;
      return (s.name + ' ' + (s.nameZh ?? '') + ' ' + (t?.name ?? '') + ' ' + (t?.nameZh ?? '')).toLowerCase().includes(qq);
    });
    // 同类别归组排序: 基础→攻击→防御→辅助→特殊→角色
    return filtered
      .map((s, i) => ({ s, i, rank: CAT_ORDER[sigilCategory(s, traitById)] ?? 9 }))
      .sort((a, b) => a.rank - b.rank || a.i - b.i)
      .map(x => x.s);
  }, [sigils, q, cat, traitById, characterName]);
  return (
    <Modal title={t('selectSigil')} onClose={onClose}>
      <div className="picker-tools">
        <SearchInput value={q} onChange={setQ} />
        <div className="seg seg-wrap">
          {SIGIL_CATS.map(key => {
            const category = key === 'role' ? 'character' : key;
            return (
            <button key={key} className={cat === category ? 'seg-on' : ''} onClick={() => setCat(category)}>{t(key)}</button>
            );
          })}
        </div>
      </div>
      <div className="picker-list">
        {list.map(s => {
          const t = traitById.get(s.primaryTraitId) ?? null;
          return (
            <button key={s.id} className="picker-item" onClick={() => onPick(s)}>
              <TraitIcon trait={t} size={30} />
              <div className="pi-text">
                <div className="pi-name">{localizedName(locale, s.name, s.nameZh || t?.nameZh)}</div>
                <div className="pi-sub">{locale === 'zh' ? s.name : (s.nameZh || t?.nameZh)}</div>
              </div>
            </button>
          );
        })}
        {list.length === 0 && <div className="empty-hint">{t('noMatch')}</div>}
      </div>
    </Modal>
  );
}

export function TraitPicker({ traits, title, onPick, onClose }: {
  traits: Trait[];
  title?: string;
  onPick: (t: Trait) => void;
  onClose: () => void;
}) {
  const { locale, t } = useI18n();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');
  const list = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return traits
      .map((t, i) => ({ t, i, rank: CAT_ORDER[traitCategory(t)] ?? 9 }))
      .filter(({ t }) => (cat === 'all' || traitCategory(t) === cat)
        && (!qq || (t.name + ' ' + t.nameZh).toLowerCase().includes(qq)))
      .sort((a, b) => a.rank - b.rank || a.i - b.i)
      .map(({ t }) => t);
  }, [traits, q, cat]);
  return (
    <Modal title={title ?? t('selectTrait')} onClose={onClose}>
      <div className="picker-tools">
        <SearchInput value={q} onChange={setQ} />
        <div className="seg seg-wrap">
          {TRAIT_CATS.map(key => {
            const category = key === 'role' ? 'character' : key;
            return <button key={key} className={cat === category ? 'seg-on' : ''} onClick={() => setCat(category)}>{t(key)}</button>;
          })}
        </div>
      </div>
      <div className="picker-list">
        {list.map(trait => (
          <button key={trait.id} className="picker-item" onClick={() => onPick(trait)}>
            <TraitIcon trait={trait} size={30} />
            <div className="pi-text">
              <div className="pi-name">{localizedName(locale, trait.name, trait.nameZh)}</div>
              <div className="pi-sub">{locale === 'zh' ? trait.name : trait.nameZh} · {t('maxLevel')} Lv{trait.maxLevel}</div>
            </div>
          </button>
        ))}
        {list.length === 0 && <div className="empty-hint">{t('noMatch')}</div>}
      </div>
    </Modal>
  );
}
