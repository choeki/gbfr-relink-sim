import { useEffect, useMemo, useState } from 'react';
import './App.css';
import type { Build } from './types';
import { emptyBuild, emptySummon, SIGIL_SLOTS, SUMMON_SLOTS } from './types';
import { loadBuilds, loadCurrent, loadCustom, mergeDataset, saveBuilds, saveCurrent } from './store';
import { SigilSlot } from './components/SigilSlot';
import { WeaponPanel, WrightstonePanel } from './components/Panels';
import { SummonPanel } from './components/SummonPanel';
import { CharacterPanel } from './components/CharacterPanel';
import { computeSkills, computeSummonBonuses, SkillSummary } from './components/SkillSummary';
import { adaptBuildToCharacter } from './characterAdaptation';
import { isSummonTraitAllowed, isWrightstoneTraitAllowed, summonTraitLevel, WRIGHTSTONE_PRIMARY_TRAIT_SET } from './rules';
import { useI18n } from './i18n';
import { exportBuildImage } from './exportBuildImage';

function normalizeBuild(b: Build): Build {
  const base = emptyBuild();
  const sigils = [...(b.sigils ?? [])].slice(0, SIGIL_SLOTS);
  while (sigils.length < SIGIL_SLOTS) sigils.push({ sigilId: null, level: 15, secondaryTraitId: null, secondaryLevel: null });
  const summons = [...(b.summons ?? [])].slice(0, SUMMON_SLOTS).map(s => {
    const legacy = (s as unknown as { subs?: { paramId: string | null; level: number }[] }).subs;
    const sub = s.sub ?? legacy?.find(x => x?.paramId) ?? { paramId: null, level: 9 };
    const trait = s.trait ?? { traitId: null, level: 1 };
    return {
      defId: s.defId ?? null,
      trait: { traitId: trait.traitId ?? null, level: trait.level ?? 1 },
      sub: { paramId: sub.paramId ?? null, level: sub.level ?? 9 },
    };
  });
  while (summons.length < SUMMON_SLOTS) summons.push(emptySummon());
  const wrightstone = { ...base.wrightstone, ...b.wrightstone };
  if (wrightstone.traits.map(t => t.level).join(',') === '10,7,5') {
    const levels = [20, 15, 10];
    wrightstone.traits = wrightstone.traits.map((trait, index) => ({ ...trait, level: levels[index] }));
  }
  return { ...base, ...b, sigils, summons, weapon: { ...base.weapon, ...b.weapon }, wrightstone };
}

export default function App() {
  const { locale, setLocale, t } = useI18n();
  const [custom] = useState(loadCustom);
  const [build, setBuild] = useState<Build>(() => normalizeBuild(loadCurrent() ?? emptyBuild()));
  const [builds, setBuilds] = useState(loadBuilds);
  const [exporting, setExporting] = useState(false);
  const data = useMemo(() => mergeDataset(custom), [custom]);
  const traitById = useMemo(() => new Map(data.traits.map(trait => [trait.id, trait])), [data]);
  const sigilById = useMemo(() => new Map(data.sigils.map(sigil => [sigil.id, sigil])), [data]);

  useEffect(() => { saveBuilds(builds); }, [builds]);
  useEffect(() => { saveCurrent(build); }, [build]);
  useEffect(() => {
    setBuild(current => {
      let next = current.characterId ? adaptBuildToCharacter(current, current.characterId, data) : current;
      if (next.wrightstone.defId && !WRIGHTSTONE_PRIMARY_TRAIT_SET.has(next.wrightstone.traits[0]?.traitId ?? '')) {
        const def = data.wrightstones.find(candidate => candidate.id === next.wrightstone.defId);
        if (def) {
          const traits = [...next.wrightstone.traits];
          traits[0] = {
            traitId: def.defaultTraitId,
            level: traits[0]?.level ?? 20,
            traitLocked: true,
            removable: false,
          };
          next = { ...next, wrightstone: { ...next.wrightstone, traits } };
        }
      }
      if (next.wrightstone.defId) {
        const traits = next.wrightstone.traits.map((grant, index) => {
          const normalizedGrant = index === 0 && (!grant.traitLocked || grant.removable !== false)
            ? { ...grant, traitLocked: true, removable: false }
            : grant;
          const trait = grant.traitId ? data.traits.find(candidate => candidate.id === grant.traitId) : null;
          return !trait || isWrightstoneTraitAllowed(trait, index)
            ? normalizedGrant
            : { ...normalizedGrant, traitId: null };
        });
        if (traits.some((grant, index) => grant !== next.wrightstone.traits[index])) {
          next = { ...next, wrightstone: { ...next.wrightstone, traits } };
        }
      }
      const summons = next.summons.map(summon => {
        if (!summon.trait.traitId) return summon;
        const trait = data.traits.find(candidate => candidate.id === summon.trait.traitId);
        if (!trait || !isSummonTraitAllowed(trait)) return { ...summon, trait: { ...summon.trait, traitId: null } };
        const level = summonTraitLevel(trait, summon.trait.level);
        return level === summon.trait.level ? summon : { ...summon, trait: { ...summon.trait, level } };
      });
      if (summons.some((summon, index) => summon !== next.summons[index])) {
        next = { ...next, summons };
      }
      return next;
    });
  }, [data]);

  useEffect(() => { document.title = t('appTitle'); }, [t]);

  const skillRows = useMemo(() => computeSkills(build, data, traitById, sigilById), [build, data, traitById, sigilById]);
  const bonusRows = useMemo(() => computeSummonBonuses(build, data), [build, data]);
  const usedSlots = build.sigils.filter(sigil => sigil.sigilId).length;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <img className="brand-icon" src={`${import.meta.env.BASE_URL}icon.png`} alt="" />
          <span className="brand-copy">
            <span className="brand-title">{t('appTitle')}</span>
            <span className="brand-sub">{t('autoSave')}</span>
          </span>
        </div>
        <div className="build-tools">
          <input className="text-input build-name" value={build.name} onChange={event => setBuild({ ...build, name: event.target.value })} />
          <button className="btn primary" onClick={() => {
            const name = build.name.trim() || (locale === 'zh' ? '未命名配装' : 'Untitled Build');
            setBuilds({ ...builds, [name]: { ...build, name } });
          }}>{t('save')}</button>
          <select className="text-input" value="" onChange={event => {
            const saved = builds[event.target.value];
            if (saved) setBuild(normalizeBuild(saved));
          }}>
            <option value="">{t('load')}</option>
            {Object.keys(builds).map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <button className="btn" disabled={exporting} onClick={async () => {
            setExporting(true);
            try {
              await exportBuildImage({ build, data, traitById, sigilById, skills: skillRows, bonuses: bonusRows, locale });
            } finally {
              setExporting(false);
            }
          }}>{exporting ? (locale === 'zh' ? '生成中…' : 'Rendering…') : t('export')}</button>
          <button className="btn danger" onClick={() => { if (confirm(t('clearConfirm'))) setBuild(emptyBuild()); }}>{t('clear')}</button>
          <div className="seg locale-switch" aria-label="Language">
            <button className={locale === 'zh' ? 'seg-on' : ''} onClick={() => setLocale('zh')}>{t('chinese')}</button>
            <button className={locale === 'en' ? 'seg-on' : ''} onClick={() => setLocale('en')}>{t('english')}</button>
          </div>
        </div>
      </header>

      <main className="layout">
        <div className="col-left">
          <CharacterPanel build={build} data={data} onChange={setBuild} />
          <WeaponPanel build={build} data={data} traitById={traitById} onChange={setBuild} />
          <WrightstonePanel build={build} data={data} traitById={traitById} onChange={setBuild} />
        </div>
        <div className="col-mid">
          <div className="panel">
            <div className="panel-title">{t('traits')} <span className="dim">({usedSlots}/{SIGIL_SLOTS})</span></div>
            <div className="sigil-grid">
              {build.sigils.map((equip, index) => (
                <SigilSlot
                  key={index} index={index} equip={equip} data={data} traitById={traitById} sigilById={sigilById}
                  characterName={build.characterId ? data.characters.find(character => character.id === build.characterId)?.name ?? null : null}
                  onChange={next => setBuild({ ...build, sigils: build.sigils.map((item, itemIndex) => itemIndex === index ? next : item) })}
                />
              ))}
            </div>
          </div>
          <SummonPanel build={build} data={data} traitById={traitById} onChange={setBuild} />
        </div>
        <div className="col-right"><SkillSummary rows={skillRows} bonuses={bonusRows} /></div>
      </main>

      <footer className="foot">{t('wikiFooter')}</footer>
    </div>
  );
}
