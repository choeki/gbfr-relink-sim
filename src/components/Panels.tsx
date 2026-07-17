import { useState } from 'react';
import type { Build, Dataset, Trait, TraitGrant } from '../types';
import { TraitIcon } from '../icons';
import { TraitPicker } from './Picker';
import { isWrightstoneTraitAllowed } from '../rules';
import { localizedName, useI18n } from '../i18n';

export function GrantRow({ grant, traitById, traits, onChange, onRemove }: {
  grant: TraitGrant;
  traitById: Map<string, Trait>;
  traits: Trait[];
  onChange: (g: TraitGrant) => void;
  onRemove: () => void;
}) {
  const { locale, t: translate } = useI18n();
  const [picking, setPicking] = useState(false);
  const t = grant.traitId ? traitById.get(grant.traitId) ?? null : null;
  const isReplaceable = !grant.traitLocked;
  return (
    <div className={`grant-row ${isReplaceable ? 'grant-row-replaceable' : 'grant-row-fixed'}`}>
      {grant.slotLabel && <span className={'grant-slot slot-' + grant.slotLabel.toLowerCase()}>{grant.slotLabel}</span>}
      <button className="sec-pick" disabled={grant.traitLocked} onClick={() => { if (!grant.traitLocked) setPicking(true); }}>
        {t ? <><TraitIcon trait={t} size={22} /><span className="grant-trait-name">{localizedName(locale, t.name, t.nameZh)}</span></> : <span className="dim grant-trait-name">{translate('selectTrait')}</span>}
        <span className="grant-mode">{isReplaceable ? (locale === 'zh' ? '可替换' : 'Editable') : (locale === 'zh' ? '固定' : 'Fixed')}</span>
      </button>
      <label className="lv small">
        Lv
        <input
          type="number" min={1} max={t?.maxLevel ?? 50} value={grant.level} disabled={grant.levelLocked}
          onChange={e => onChange({ ...grant, level: Math.max(1, Number(e.target.value) || 1) })}
        />
      </label>
      {grant.removable !== false && <button className="btn-ghost" onClick={onRemove}>✕</button>}
      {picking && !grant.traitLocked && (
        <TraitPicker
          traits={traits}
          onClose={() => setPicking(false)}
          onPick={nt => { onChange({ ...grant, traitId: nt.id }); setPicking(false); }}
        />
      )}
    </div>
  );
}

export function WeaponPanel({ build, data, traitById, onChange }: {
  build: Build;
  data: Dataset;
  traitById: Map<string, Trait>;
  onChange: (b: Build) => void;
}) {
  const { locale, t } = useI18n();
  const w = build.weapon;
  const set = (patch: Partial<Build['weapon']>) => onChange({ ...build, weapon: { ...w, ...patch } });
  const charWeapons = build.characterId
    ? data.weapons.filter(x => x.characterId === build.characterId)
    : [];
  const currentDef = w.defId ? data.weapons.find(x => x.id === w.defId) ?? null : null;
  return (
    <div className="panel">
      <div className="panel-title">{t('weapon')}</div>
      {!build.characterId ? (
        <div className="empty-hint">{t('chooseCharacterFirst')}</div>
      ) : (
        <>
          <select
            className="text-input full" value={w.defId ?? ''}
            onChange={e => {
              const defId = e.target.value || null;
              const def = data.weapons.find(x => x.id === defId);
              if (def) {
                set({
                  defId,
                  name: def.seriesZh || def.series || '',
                  grants: def.grants.map(g => ({
                    ...g,
                    allowedTraitIds: g.allowedTraitIds ? [...g.allowedTraitIds] : undefined,
                  })),
                });
              } else {
                set({ defId: null, name: '', grants: [] });
              }
            }}
          >
            <option value="">{t('unequipped')}</option>
            {charWeapons.map(x => (
              <option key={x.id} value={x.id}>{locale === 'zh' ? (x.seriesZh || x.series) : (x.series || x.seriesZh)}</option>
            ))}
          </select>
          {currentDef && (
            <div className="weapon-detail">
              <div className="weapon-stats-row">
                <span className="ws-label">{locale === 'zh' ? (currentDef.seriesZh || currentDef.series) : (currentDef.series || currentDef.seriesZh)}</span>
                <span>HP <b>{currentDef.hp || '—'}</b></span>
                <span>ATK <b>{currentDef.atk || '—'}</b></span>
              </div>
            </div>
          )}
          {(w.defId || w.grants.length > 0) && (
            <>
              <div className="panel-hint">{t('fixedWeaponTraits')}</div>
              {w.grants.map((g, i) => (
                <GrantRow
                  key={i} grant={g} traitById={traitById}
                  traits={g.allowedTraitIds ? data.traits.filter(t => g.allowedTraitIds?.includes(t.id)) : data.traits}
                  onChange={ng => set({ grants: w.grants.map((x, j) => (j === i ? ng : x)) })}
                  onRemove={() => set({ grants: w.grants.filter((_, j) => j !== i) })}
                />
              ))}
              {!currentDef?.grants.some(g => g.slotLabel) && (
                <button className="btn" onClick={() => set({ grants: [...w.grants, { traitId: null, level: 10 }] })}>+ 添加词条</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export function WrightstonePanel({ build, data, traitById, onChange }: {
  build: Build;
  data: Dataset;
  traitById: Map<string, Trait>;
  onChange: (b: Build) => void;
}) {
  const { locale, t } = useI18n();
  const ws = build.wrightstone;
  const set = (patch: Partial<Build['wrightstone']>) => onChange({ ...build, wrightstone: { ...ws, ...patch } });
  return (
    <div className="panel">
      <div className="panel-title">{t('wrightstone')}</div>
      <select
        className="text-input" value={ws.defId ?? ''}
        onChange={e => {
          const defId = e.target.value || null;
          const def = data.wrightstones.find(x => x.id === defId);
          if (def) {
            const traits = [...ws.traits];
            traits[0] = { traitId: def.defaultTraitId, level: traits[0]?.level ?? 20 };
            set({ defId, traits });
          } else {
            set({ defId });
          }
        }}
      >
        <option value="">{t('unequipped')}</option>
        {data.wrightstones.map(x => (
          <option key={x.id} value={x.id}>{localizedName(locale, x.name, x.nameZh)}</option>
        ))}
      </select>
      {ws.defId && (
        <>
          <div className="panel-hint">{t('wrightstoneHint')}</div>
          {ws.traits.map((g, i) => (
            <GrantRow
              key={i} grant={g} traitById={traitById}
              traits={data.traits.filter(t => isWrightstoneTraitAllowed(t, i))}
              onChange={ng => set({ traits: ws.traits.map((x, j) => (j === i ? ng : x)) })}
              onRemove={() => set({ traits: ws.traits.map((x, j) => (j === i ? { traitId: null, level: x.level } : x)) })}
            />
          ))}
        </>
      )}
    </div>
  );
}
