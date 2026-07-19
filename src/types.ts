export interface Trait {
  id: string;
  hash: string;
  name: string;
  nameZh: string;
  maxLevel: number;
  canPrimary: boolean;
  canSecondary: boolean;
  /** 词条类别: basic | attack | defense | support | special */
  category?: string;
  /** 自定义图标 (dataURL) */
  icon?: string;
  /** 内置图标文件名 (public/icons/) */
  iconFile?: string;
  /** 技能效果说明(可编辑) */
  desc?: string;
  /** 从 Lv1 开始按索引排列的逐级效果说明 */
  levelEffects?: string[];
  /** 逐级数据来源 */
  levelDataSource?: string;
  /** 仅允许作为武器固有/武器自定义词条 */
  weaponOnly?: boolean;
}

export interface SigilDef {
  id: string;
  hash: string;
  name: string;
  nameZh?: string;
  category: string; // 'normal' | 'character_sigil' | ...
  isPlus: boolean;
  supportsSecondary: boolean;
  allowedLevels: number[];
  defaultLevel: number;
  maxLevel: number;
  primaryTraitId: string;
  /** secondaryPools 索引, -1 表示无 */
  secondaryPool: number;
  /** 默认副词条(觉醒因子=第二条专属, Alpha/Beta/Gamma+=伤害上限) */
  defaultSecondaryTraitId?: string;
}

export interface WrightstoneDef {
  id: string;
  hash: string;
  name: string;
  nameZh: string;
  defaultTraitId: string;
}

export interface WeaponDef {
  id: string;
  name: string;
  nameZh?: string;
  nameEn?: string;
  characterId?: string;
  series?: string;
  seriesZh?: string;
  hp?: number;
  atk?: number;
  /** wiki 效果描述(满级数值) */
  effect?: string;
  grants: TraitGrant[];
  note?: string;
}

export interface CharacterDef {
  id: string;
  name: string;
  nameZh: string;
  portrait: string | null;
}

export interface SummonDef {
  id: string;
  name: string;
  baseName: string;
  rarity: string;
  typeName: string;
  cost: number;
}

export interface SubParamDef {
  id: string;
  name: string;
  maxLevel: number;
  isPercent: boolean;
  values: number[];
}

export interface Dataset {
  meta: { source: string; note: string };
  traits: Trait[];
  sigils: SigilDef[];
  wrightstones: WrightstoneDef[];
  weapons: WeaponDef[];
  characters: CharacterDef[];
  summons: SummonDef[];
  subParams: SubParamDef[];
  secondaryPools: string[][];
}

/** 数据自定义覆盖层 */
export interface DataCustom {
  traitOverrides: Record<string, Partial<Trait>>;
  sigilOverrides: Record<string, Partial<SigilDef>>;
  weaponOverrides: Record<string, Partial<WeaponDef>>;
  customTraits: Trait[];
  customSigils: SigilDef[];
  customWrightstones: WrightstoneDef[];
  customWeapons: WeaponDef[];
}

export interface SigilEquip {
  sigilId: string | null;
  level: number;
  secondaryTraitId: string | null;
  secondaryLevel: number | null; // null = 跟随因子等级
}

export interface TraitGrant {
  traitId: string | null;
  level: number;
  /** 武器技能栏位标签: I / II / III / IV / EX */
  slotLabel?: string;
  /** 该栏位允许替换成的词条；缺省表示使用完整武器词条池 */
  allowedTraitIds?: string[];
  /** 固定词条栏位不可更换 */
  traitLocked?: boolean;
  /** 固定技能等级不可修改 */
  levelLocked?: boolean;
  /** false 表示固定栏位不可删除 */
  removable?: boolean;
}

export interface SummonEquip {
  defId: string | null;
  /** One main trait stored by the summon. */
  trait: { traitId: string | null; level: number };
  /** 技能(副参数),等级 0-9;被动主因子暂不计算 */
  sub: { paramId: string | null; level: number };
}

export interface Build {
  name: string;
  characterId: string | null;
  weapon: { defId: string | null; name: string; grants: TraitGrant[] };
  wrightstone: { defId: string | null; traits: TraitGrant[] };
  sigils: SigilEquip[];
  summons: SummonEquip[];
  /** 专精技能选择: key 为 `${styleType}:${rank}`(如 Insight:1 / Crux:EX), 值为该池中已激活节点的索引 */
  masterTraits?: Record<string, number[]>;
}

export const SUMMON_SLOTS = 4;

export function emptySummon(): SummonEquip {
  return { defId: null, trait: { traitId: null, level: 1 }, sub: { paramId: null, level: 9 } };
}

export const SIGIL_SLOTS = 12;

export function emptyBuild(): Build {
  return {
    name: '新配装',
    characterId: null,
    weapon: { defId: null, name: '', grants: [] },
    wrightstone: { defId: null, traits: [{ traitId: null, level: 20, traitLocked: true, removable: false }, { traitId: null, level: 15 }, { traitId: null, level: 10 }] },
    sigils: Array.from({ length: SIGIL_SLOTS }, () => ({ sigilId: null, level: 15, secondaryTraitId: null, secondaryLevel: null })),
    summons: Array.from({ length: SUMMON_SLOTS }, emptySummon),
    masterTraits: {},
  };
}

export function emptyCustom(): DataCustom {
  return {
    traitOverrides: {}, sigilOverrides: {}, weaponOverrides: {},
    customTraits: [], customSigils: [], customWrightstones: [], customWeapons: [],
  };
}
