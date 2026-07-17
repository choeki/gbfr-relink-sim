export const WRIGHTSTONE_PRIMARY_TRAIT_IDS = [
  'SKILL_000_00', // 攻击力
  'SKILL_001_00', // 体力
  'SKILL_003_00', // 暴击率
  'SKILL_004_00', // 昏厥
] as const;

export const WRIGHTSTONE_PRIMARY_TRAIT_SET = new Set<string>(WRIGHTSTONE_PRIMARY_TRAIT_IDS);

// These special traits do not occur on wrightstones even when they are present
// in the global trait catalog.
export const WRIGHTSTONE_FORBIDDEN_TRAIT_IDS = new Set<string>([
  'SKILL_044_00', // Stout Heart
  'SKILL_100_00', // Supplements
  'SKILL_103_00', // Natural Defenses
  'SKILL_112_00', // Window of Opportunity
  'SKILL_133_00', // Fortifying Vigor
  'SKILL_134_00', // Instilling Vigor
  'SKILL_135_00', // Gilding Vigor
  'SKILL_140_00', // Crabby Resonance
  'SKILL_141_00', // Crabvestment Returns
  'SKILL_142_00', // Seven Net
  'SKILL_146_00', // War Elemental
  'SKILL_156_00', // Potent Greens
  'SKILL_159_00', // Flight over Fight
  'SKILL_160_00', // Alpha
  'SKILL_161_00', // Beta
  'SKILL_162_00', // Gamma
  'SKILL_164_00', // Crabmariation
  'SKILL_167_00', // Auto Potion
  'SKILL_233_00', // Berserker Echo
  'SKILL_234_00', // Spartan Echo
  'WIKI_IMMORTAL_SHELL',
  'WIKI_SUMO_FORCE',
  'GAME_DARK_AMITY',
]);

export function isWrightstoneTraitAllowed(trait: {
  id: string;
  canSecondary: boolean;
  weaponOnly?: boolean;
  iconFile?: string;
}, slotIndex: number): boolean {
  if (slotIndex === 0) return WRIGHTSTONE_PRIMARY_TRAIT_SET.has(trait.id);
  return trait.canSecondary
    && !trait.weaponOnly
    && !trait.iconFile?.startsWith('chars/')
    && !WRIGHTSTONE_FORBIDDEN_TRAIT_IDS.has(trait.id);
}

// Summons use their own trait pool. This is intentionally different from
// sigil-secondary and wrightstone legality: several special traits are valid
// here (Stout Heart, War Elemental, Berserker and Spartan).
export const SUMMON_FORBIDDEN_TRAIT_IDS = new Set<string>([
  'SKILL_100_00', // Supplements
  'SKILL_103_00', // Natural Defenses
  'SKILL_112_00', // Window of Opportunity
  'SKILL_140_00', // Crabby Resonance
  'SKILL_142_00', // Seven Net
  'SKILL_156_00', // Potent Greens
  'SKILL_159_00', // Flight over Fight
  'SKILL_160_00', // Alpha
  'SKILL_161_00', // Beta
  'SKILL_162_00', // Gamma
  'SKILL_164_00', // Crabmiration
  'SKILL_167_00', // Auto Potion
  'WIKI_IMMORTAL_SHELL',
  'WIKI_SUMO_FORCE',
  'GAME_DARK_AMITY',
]);

export function isSummonTraitAllowed(trait: {
  id: string;
  canPrimary: boolean;
  weaponOnly?: boolean;
  iconFile?: string;
}): boolean {
  return trait.canPrimary
    && !trait.weaponOnly
    && !trait.iconFile?.startsWith('chars/')
    && !SUMMON_FORBIDDEN_TRAIT_IDS.has(trait.id);
}

export const SUMMON_ALWAYS_MAX_TRAIT_IDS = new Set<string>([
  'SKILL_044_00', // Stout Heart
  'SKILL_141_00', // Crabvestment Returns
  'SKILL_146_00', // War Elemental
  'SKILL_233_00', // Berserker
  'SKILL_234_00', // Spartan
]);

export function summonTraitLevel(trait: { id: string; maxLevel: number }, requestedLevel: number): number {
  return SUMMON_ALWAYS_MAX_TRAIT_IDS.has(trait.id)
    ? trait.maxLevel
    : Math.max(0, Math.min(trait.maxLevel, requestedLevel));
}
