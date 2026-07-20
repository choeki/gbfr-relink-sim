import { useEffect, useMemo, useState } from 'react';
import './App.css';
import type { Build } from './types';
import { emptyBuild, emptySummon, SIGIL_SLOTS, SUMMON_SLOTS } from './types';
import { loadBuilds, loadCurrent, loadCustom, mergeDataset, saveBuilds, saveCurrent } from './store';
import { SigilSlot } from './components/SigilSlot';
import { WeaponPanel, WrightstonePanel } from './components/Panels';
import { SummonPanel } from './components/SummonPanel';
import { CharacterPanel } from './components/CharacterPanel';
import { MasteryPanel } from './components/MasteryPanel';
import { computeSkills, computeSummonBonuses, SkillSummary } from './components/SkillSummary';
import { adaptBuildToCharacter } from './characterAdaptation';
import { isSummonSubParamAllowed, isSummonTraitAllowed, isWrightstoneTraitAllowed, summonTraitLevel, WRIGHTSTONE_PRIMARY_TRAIT_SET } from './rules';
import { useI18n } from './i18n';
import { exportBuildImage } from './exportBuildImage';
import { exportMasteryImage } from './exportMasteryImage';
import { getMasterTraitStyles, MASTER_RANK_CAPS, rankActivationCount } from './masterTraits';

const LEGACY_TRAIT_IDS: Record<string, string> = {
  GAME_BLADE_DANCE: 'SKILL_158_00',
};

function canonicalTraitId(traitId: string | null): string | null {
  return traitId ? (LEGACY_TRAIT_IDS[traitId] ?? traitId) : null;
}

function normalizeBuild(b: Build): Build {
  const base = emptyBuild();
  const sigils = [...(b.sigils ?? [])].slice(0, SIGIL_SLOTS).map(sigil => ({
    ...sigil,
    secondaryTraitId: canonicalTraitId(sigil.secondaryTraitId),
  }));
  while (sigils.length < SIGIL_SLOTS) sigils.push({ sigilId: null, level: 15, secondaryTraitId: null, secondaryLevel: null });
  const summons = [...(b.summons ?? [])].slice(0, SUMMON_SLOTS).map(s => {
    const legacy = (s as unknown as { subs?: { paramId: string | null; level: number }[] }).subs;
    const sub = s.sub ?? legacy?.find(x => x?.paramId) ?? { paramId: null, level: 9 };
    const trait = s.trait ?? { traitId: null, level: 1 };
    return {
      defId: s.defId ?? null,
      trait: { traitId: canonicalTraitId(trait.traitId ?? null), level: trait.level ?? 1 },
      sub: { paramId: sub.paramId ?? null, level: sub.level ?? 9 },
    };
  });
  while (summons.length < SUMMON_SLOTS) summons.push(emptySummon());
  const wrightstone = { ...base.wrightstone, ...b.wrightstone };
  wrightstone.traits = wrightstone.traits.map(trait => ({
    ...trait,
    traitId: canonicalTraitId(trait.traitId),
  }));
  if (wrightstone.traits.map(t => t.level).join(',') === '10,7,5') {
    const levels = [20, 15, 10];
    wrightstone.traits = wrightstone.traits.map((trait, index) => ({ ...trait, level: levels[index] }));
  }
  const weapon = {
    ...base.weapon,
    ...b.weapon,
    grants: (b.weapon?.grants ?? []).map(grant => ({
      ...grant,
      traitId: canonicalTraitId(grant.traitId),
      allowedTraitIds: grant.allowedTraitIds?.map(id => canonicalTraitId(id) ?? id),
    })),
  };
  return { ...base, ...b, sigils, summons, weapon, wrightstone };
}

export default function App() {
  const { locale, setLocale, t } = useI18n();
  const [custom] = useState(loadCustom);
  const [view, setView] = useState<'build' | 'mastery'>('build');
  const [build, setBuild] = useState<Build>(() => normalizeBuild(loadCurrent() ?? emptyBuild()));
  const [builds, setBuilds] = useState(loadBuilds);
  const [selectedBuild, setSelectedBuild] = useState('');
  const [exporting, setExporting] = useState(false);
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
  const masteryStyles = getMasterTraitStyles(build.characterId);
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
        const def = data.summons.find(candidate => candidate.id === summon.defId);
        const trait = summon.trait.traitId ? data.traits.find(candidate => candidate.id === summon.trait.traitId) : null;
        const param = summon.sub.paramId ? data.subParams.find(candidate => candidate.id === summon.sub.paramId) : null;
        const traitAllowed = !trait || isSummonTraitAllowed(trait, def?.baseName);
        const paramAllowed = !param || isSummonSubParamAllowed(param, def?.baseName);
        const level = trait ? summonTraitLevel(trait, summon.trait.level) : summon.trait.level;
        if (traitAllowed && paramAllowed && level === summon.trait.level) return summon;
        return {
          ...summon,
          trait: traitAllowed ? { ...summon.trait, level } : { ...summon.trait, traitId: null },
          sub: paramAllowed ? summon.sub : { ...summon.sub, paramId: null },
        };
      });
      if (summons.some((summon, index) => summon !== next.summons[index])) {
        next = { ...next, summons };
      }
      return next;
    });
  }, [data]);

  useEffect(() => { document.title = t('appTitle'); }, [t]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 800px)');
    let lastScrollY = Math.max(window.scrollY, 0);

    const updateHeader = () => {
      if (!mobileQuery.matches) {
        setMobileHeaderHidden(false);
        lastScrollY = Math.max(window.scrollY, 0);
        return;
      }

      const scrollY = Math.max(window.scrollY, 0);
      if (scrollY <= 24) setMobileHeaderHidden(false);
      else if (scrollY > lastScrollY + 5) setMobileHeaderHidden(true);
      else if (scrollY < lastScrollY - 5) setMobileHeaderHidden(false);
      lastScrollY = scrollY;
    };

    const resetForViewport = () => updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    mobileQuery.addEventListener('change', resetForViewport);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      mobileQuery.removeEventListener('change', resetForViewport);
    };
  }, []);

  const skillRows = useMemo(() => computeSkills(build, data, traitById, sigilById), [build, data, traitById, sigilById]);
  const bonusRows = useMemo(() => computeSummonBonuses(build, data), [build, data]);
  const usedSlots = build.sigils.filter(sigil => sigil.sigilId).length;

  const renderMasteryPoints = (floating = false) => view === 'mastery' && masteryStyles ? (
    <div
      className={`header-mastery-points${floating ? ` mobile-mastery-points${mobileHeaderHidden ? ' is-visible' : ''}` : ''}`}
      aria-label={locale === 'zh' ? '专精点数剩余' : 'Mastery points remaining'}
      aria-hidden={floating ? !mobileHeaderHidden : undefined}
    >
      <span className="header-mastery-points-label">{locale === 'zh' ? '剩余' : 'Left'}</span>
      {([1, 2, 3, 'EX'] as const).map(rank => {
        const used = rankActivationCount(build.masterTraits ?? {}, masteryStyles, rank);
        const remaining = MASTER_RANK_CAPS[String(rank)] - used;
        return (
          <span key={String(rank)} className={`header-mastery-point rank-${String(rank).toLowerCase()}${remaining === 0 ? ' empty' : ''}`}>
            <i>{rank === 1 ? '●' : rank === 2 ? '◆' : rank === 3 ? '⬢' : '⬣'}</i>
            <small>{rank === 'EX' ? 'EX' : (locale === 'zh' ? `${rank}阶` : `R${rank}`)}</small>
            <b>{remaining}</b>
          </span>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="app">
      <header className={`topbar${mobileHeaderHidden ? ' mobile-hidden' : ''}`}>
        <div className="brand">
          <img className="brand-icon" src={`${import.meta.env.BASE_URL}icon.png`} alt="" />
          <span className="brand-copy">
            <span className="brand-title">{t('appTitle')}</span>
            <span className="brand-sub">{t('autoSave')}</span>
          </span>
        </div>
        <div className="seg view-switch">
          <button className={view === 'build' ? 'seg-on' : ''} onClick={() => setView('build')}>{t('viewBuild')}</button>
          <button className={view === 'mastery' ? 'seg-on' : ''} onClick={() => setView('mastery')}>{t('viewMastery')}</button>
        </div>
        {renderMasteryPoints()}
        <div className="build-tools">
          <input className="text-input build-name" value={build.name} onChange={event => setBuild({ ...build, name: event.target.value })} />
          <button className="btn primary" onClick={() => {
            const name = build.name.trim() || (locale === 'zh' ? '未命名配装' : 'Untitled Build');
            setBuilds({ ...builds, [name]: { ...build, name } });
            setSelectedBuild(name);
          }}>{t('save')}</button>
          <select className="text-input" value={selectedBuild} onChange={event => {
            const name = event.target.value;
            setSelectedBuild(name);
            const saved = builds[name];
            if (saved) setBuild(normalizeBuild(saved));
          }}>
            <option value="">{t('load')}</option>
            {Object.keys(builds).map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <button
            className="btn danger" disabled={!selectedBuild || !builds[selectedBuild]}
            title={locale === 'zh' ? '删除所选配装' : 'Delete selected build'}
            onClick={() => {
              if (!selectedBuild || !builds[selectedBuild]) return;
              const msg = locale === 'zh' ? `删除配装「${selectedBuild}」？` : `Delete build "${selectedBuild}"?`;
              if (!confirm(msg)) return;
              const next = { ...builds };
              delete next[selectedBuild];
              setBuilds(next);
              setSelectedBuild('');
            }}
          >{locale === 'zh' ? '删除' : 'Delete'}</button>
          <button className="btn" disabled={exporting} onClick={async () => {
            setExporting(true);
            try {
              if (view === 'mastery') await exportMasteryImage({ build, data, locale });
              else await exportBuildImage({ build, data, traitById, sigilById, skills: skillRows, bonuses: bonusRows, locale });
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
      {renderMasteryPoints(true)}

      {view === 'build' ? (
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
      ) : (
        <main className="layout-single">
          <MasteryPanel build={build} data={data} onChange={setBuild} />
        </main>
      )}

      <footer className="foot">{t('wikiFooter')}</footer>
    </div>
  );
}
