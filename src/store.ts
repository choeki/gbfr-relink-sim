import seedRaw from './data/seed.json';
import traitLevelsRaw from './data/trait-levels.json';
import weaponTemplatesRaw from './data/weapon-templates.json';
import type { Build, DataCustom, Dataset, SigilDef, Trait, TraitGrant, WeaponDef } from './types';
import { emptyCustom } from './types';

const seed = seedRaw as unknown as Dataset;
const traitLevels = traitLevelsRaw.traits as Record<string, { effects: string[] }>;
const weaponTemplates = weaponTemplatesRaw as Record<string, { nameZh: string; order: number; grants: TraitGrant[] }>;

const ALL_WEAPON_TYPES = ['Defender', 'Stinger', 'Executioner', 'Stunner', 'Ascension Weapon', 'Terminus Weapon'];
const LIMITED_WEAPON_TYPES = ['Defender', 'Stinger', 'Ascension Weapon', 'Terminus Weapon'];
const LIMITED_WEAPON_CHARACTERS = new Set([
  'CHAR_SEOFON', 'CHAR_TWEYEN', 'CHAR_SANDALPHON', 'CHAR_FRAUX',
  'CHAR_FEDIEL', 'CHAR_GALLANZA', 'CHAR_MAGLIELLE',
]);

function cloneGrants(grants: TraitGrant[]): TraitGrant[] {
  return grants.map(grant => ({
    ...grant,
    allowedTraitIds: grant.allowedTraitIds ? [...grant.allowedTraitIds] : undefined,
  }));
}

function mergeWeapons(custom: DataCustom): WeaponDef[] {
  const supplied = seed.weapons
    .map(weapon => ({ ...weapon, ...custom.weaponOverrides[weapon.id] }))
    .concat(custom.customWeapons);

  return seed.characters.flatMap(character => {
    const expectedTypes = LIMITED_WEAPON_CHARACTERS.has(character.id)
      ? LIMITED_WEAPON_TYPES
      : ALL_WEAPON_TYPES;

    return expectedTypes.map(series => {
      const existing = supplied.find(weapon => weapon.characterId === character.id && weapon.series === series);
      const template = weaponTemplates[series];
      return {
        ...(existing ?? {}),
        id: existing?.id ?? `W_TEMPLATE_${character.id}_${series.replaceAll(' ', '_').toUpperCase()}`,
        name: template.nameZh,
        nameZh: template.nameZh,
        characterId: character.id,
        series,
        seriesZh: template.nameZh,
        effect: undefined,
        grants: cloneGrants(template.grants),
        note: '按武器类型共用栏位与词条模板',
      } satisfies WeaponDef;
    });
  });
}

function addMissingCharacterSigils(sigils: SigilDef[], traits: Trait[]): SigilDef[] {
  const coveredTraits = new Set(sigils.flatMap(sigil => [sigil.primaryTraitId, sigil.defaultSecondaryTraitId].filter(Boolean)));
  const generated = traits
    .filter(trait => trait.iconFile?.startsWith('chars/') && !coveredTraits.has(trait.id))
    .map(trait => ({
      id: `AUTO_CHARACTER_SIGIL_${trait.id}`,
      hash: '',
      name: `${trait.name}+`,
      nameZh: `${trait.nameZh || trait.name}+`,
      category: 'character_sigil',
      isPlus: true,
      supportsSecondary: true,
      allowedLevels: [15],
      defaultLevel: 15,
      maxLevel: 15,
      primaryTraitId: trait.id,
      secondaryPool: 1,
    } satisfies SigilDef));
  return sigils.concat(generated);
}

const LS_CUSTOM = 'gbfr-sim.custom';
const LS_BUILDS = 'gbfr-sim.builds';
const LS_CURRENT = 'gbfr-sim.current';

export function loadCustom(): DataCustom {
  try {
    const raw = localStorage.getItem(LS_CUSTOM);
    if (raw) return { ...emptyCustom(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return emptyCustom();
}

export function saveCustom(c: DataCustom) {
  localStorage.setItem(LS_CUSTOM, JSON.stringify(c));
}

/** seed + 自定义覆盖 合并出最终数据集 */
export function mergeDataset(custom: DataCustom): Dataset {
  const traits: Trait[] = seed.traits
    .map(t => {
      const levelData = traitLevels[t.name];
      return {
        ...t,
        ...custom.traitOverrides[t.id],
        // Wiki 已收录完整逐级表时，以 Wiki 为准；本地补录只用于 Wiki 缺失的词条。
        ...(levelData ? { levelEffects: levelData.effects, levelDataSource: traitLevelsRaw.source } : {}),
      };
    })
    .concat(custom.customTraits);
  const mergedSigils: SigilDef[] = seed.sigils
    .map(s => ({ ...s, ...custom.sigilOverrides[s.id] }))
    .concat(custom.customSigils);
  const sigils = addMissingCharacterSigils(mergedSigils, traits);
  const wrightstones = seed.wrightstones.concat(custom.customWrightstones);
  const weapons = mergeWeapons(custom);
  return {
    meta: seed.meta, traits, sigils, wrightstones, weapons,
    characters: seed.characters,
    summons: seed.summons, subParams: seed.subParams,
    secondaryPools: seed.secondaryPools,
  };
}

export function loadBuilds(): Record<string, Build> {
  try {
    const raw = localStorage.getItem(LS_BUILDS);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

export function saveBuilds(b: Record<string, Build>) {
  localStorage.setItem(LS_BUILDS, JSON.stringify(b));
}

export function loadCurrent(): Build | null {
  try {
    const raw = localStorage.getItem(LS_CURRENT);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function saveCurrent(b: Build) {
  localStorage.setItem(LS_CURRENT, JSON.stringify(b));
}

export function downloadJson(obj: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function pickJsonFile(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) return reject(new Error('未选择文件'));
      const r = new FileReader();
      r.onload = () => {
        try { resolve(JSON.parse(String(r.result))); } catch (e) { reject(e); }
      };
      r.onerror = () => reject(r.error);
      r.readAsText(f);
    };
    input.click();
  });
}
