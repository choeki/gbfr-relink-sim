import { useEffect, useMemo, useState } from 'react';
import type { Build, Dataset, SummonDef, SummonEquip, Trait } from '../types';
import { SUMMON_SLOTS, emptySummon } from '../types';
import { TraitIcon } from '../icons';
import { localizedName, useI18n } from '../i18n';
import { TraitPicker } from './Picker';
import { isSummonSubParamAllowed, isSummonTraitAllowed, SUMMON_ALWAYS_MAX_TRAIT_IDS, summonTraitLevel } from '../rules';

function SummonPicker({ summons, onPick, onClose }: {
  summons: SummonDef[];
  onPick: (summon: SummonDef) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const { t } = useI18n();
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return summons;
    return summons.filter(s => `${s.name} ${s.baseName} ${s.typeName}`.toLocaleLowerCase().includes(needle));
  }, [query, summons]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal summon-picker-modal" onClick={event => event.stopPropagation()}>
        <div className="modal-head">
          <span>{t('selectSummon')}</span>
          <button className="btn-ghost" onClick={onClose}>×</button>
        </div>
        <input className="search" autoFocus placeholder={t('searchSummon')} value={query} onChange={event => setQuery(event.target.value)} />
        <div className="summon-picker-grid">
          {filtered.map(summon => (
            <button key={summon.id} className="picker-item summon-picker-item" onClick={() => onPick(summon)}>
              <div className="pi-text">
                <div className="pi-name">{summon.baseName} <span className={'rarity r-' + summon.rarity}>{summon.rarity}</span></div>
                <div className="pi-sub">{summon.typeName} · {t('cost')} {summon.cost}</div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && <div className="empty-hint">{t('noSummon')}</div>}
        </div>
      </div>
    </div>
  );
}

function SummonSlot({ index, equip, data, traitById, onChange }: {
  index: number;
  equip: SummonEquip;
  data: Dataset;
  traitById: Map<string, Trait>;
  onChange: (equip: SummonEquip) => void;
}) {
  const [pickingSummon, setPickingSummon] = useState(false);
  const [pickingTrait, setPickingTrait] = useState(false);
  const { locale, t } = useI18n();
  const def = equip.defId ? data.summons.find(s => s.id === equip.defId) ?? null : null;
  const param = equip.sub.paramId ? data.subParams.find(x => x.id === equip.sub.paramId) ?? null : null;
  const trait = equip.trait.traitId ? traitById.get(equip.trait.traitId) ?? null : null;
  const allowedSubParams = data.subParams.filter(item => isSummonSubParamAllowed(item, def?.baseName));

  const changeSummon = (summon: SummonDef) => {
    const keepTrait = trait && isSummonTraitAllowed(trait, summon.baseName);
    const keepParam = param && isSummonSubParamAllowed(param, summon.baseName);
    onChange({
      ...equip,
      defId: summon.id,
      trait: keepTrait ? equip.trait : { traitId: null, level: 1 },
      sub: keepParam ? equip.sub : { paramId: null, level: equip.sub.level },
    });
    setPickingSummon(false);
  };

  if (!def) {
    return (
      <div className="summon-slot empty">
        <button className="slot-add" onClick={() => setPickingSummon(true)}>+ {t('summon')} {index + 1}</button>
        {pickingSummon && (
          <SummonPicker
            summons={data.summons}
            onPick={changeSummon}
            onClose={() => setPickingSummon(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="summon-slot">
      <div className="slot-main">
        <button className="summon-title-button" onClick={() => setPickingSummon(true)}>
          <span className="slot-name">{def.baseName} <span className={'rarity r-' + def.rarity}>{def.rarity}</span></span>
          <span className="slot-sub">{def.typeName} · {t('cost')} {def.cost}</span>
        </button>
        <button className="btn-ghost" title={t('remove')} onClick={() => onChange(emptySummon())}>×</button>
      </div>

      <div className="summon-fields">
        <div className="summon-sub-row">
          <button className="sec-pick summon-main-trait" onClick={() => setPickingTrait(true)}>
            {trait
              ? <><TraitIcon trait={trait} size={22} /><span>{localizedName(locale, trait.name, trait.nameZh)}</span></>
              : <span className="dim">{t('selectTrait')}</span>}
          </button>
          {trait && SUMMON_ALWAYS_MAX_TRAIT_IDS.has(trait.id) ? (
            <span className="summon-fixed-level">Lv{trait.maxLevel} MAX</span>
          ) : trait && (
            <input
              className="cell-input summon-trait-level" type="number" min={0} max={trait.maxLevel}
              value={Math.min(equip.trait.level, trait.maxLevel)}
              onChange={event => onChange({ ...equip, trait: { ...equip.trait, level: summonTraitLevel(trait, Number(event.target.value)) } })}
            />
          )}
        </div>

        <div className="summon-sub-row">
          <select
            className="cell-input sub-select" value={equip.sub.paramId ?? ''}
            onChange={event => onChange({ ...equip, sub: { ...equip.sub, paramId: event.target.value || null } })}
          >
            <option value="">{t('chooseAttribute')}</option>
            {allowedSubParams.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          {param && (
            <>
              <select
                className="cell-input lv-select" value={Math.min(equip.sub.level, param.maxLevel)}
                onChange={event => onChange({ ...equip, sub: { ...equip.sub, level: Number(event.target.value) } })}
              >
                {param.values.map((_, level) => <option key={level} value={level}>Lv{level}</option>)}
              </select>
              <span className="sub-value">+{param.values[Math.min(equip.sub.level, param.maxLevel)]}{param.isPercent ? '%' : ''}</span>
            </>
          )}
        </div>
      </div>

      {pickingSummon && (
        <SummonPicker
          summons={data.summons}
          onPick={changeSummon}
          onClose={() => setPickingSummon(false)}
        />
      )}
      {pickingTrait && (
        <TraitPicker
          title={t('selectTrait')}
          traits={data.traits.filter(candidate => isSummonTraitAllowed(candidate, def.baseName))}
          onPick={picked => {
            onChange({ ...equip, trait: { traitId: picked.id, level: summonTraitLevel(picked, Math.max(1, equip.trait.level)) } });
            setPickingTrait(false);
          }}
          onClose={() => setPickingTrait(false)}
        />
      )}
    </div>
  );
}

export function SummonPanel({ build, data, traitById, onChange }: {
  build: Build;
  data: Dataset;
  traitById: Map<string, Trait>;
  onChange: (build: Build) => void;
}) {
  const { t } = useI18n();
  const used = build.summons.filter(s => s.defId).length;
  return (
    <div className="panel summon-panel">
      <div className="panel-title">{t('summon')} <span className="dim">({used}/{SUMMON_SLOTS})</span></div>
      <div className="panel-hint">{t('summonHint')}</div>
      <div className="summon-grid">
        {build.summons.map((equip, index) => (
          <SummonSlot
            key={index} index={index} equip={equip} data={data} traitById={traitById}
            onChange={next => onChange({ ...build, summons: build.summons.map((item, itemIndex) => itemIndex === index ? next : item) })}
          />
        ))}
      </div>
    </div>
  );
}
