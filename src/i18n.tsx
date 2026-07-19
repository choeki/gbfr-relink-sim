import { createContext, useContext, useMemo, useState } from 'react';

export type Locale = 'zh' | 'en';

const messages = {
  zh: {
    appTitle: 'GBF Relink 配装模拟器', autoSave: '本地自动保存', save: '保存配装', load: '切换配装…',
    export: '导出图片', clear: '清空', clearConfirm: '清空当前配装？', character: '角色', selectCharacter: '选择角色',
    chooseCharacter: '点击选择角色…', weapon: '武器', chooseCharacterFirst: '先选择角色，再选择武器', unequipped: '— 未装备 —',
    fixedWeaponTraits: '武器固定词条（计入右侧技能等级）', wrightstone: '祝福石', wrightstoneHint: '3 个词条栏位，默认等级为 20 / 15 / 10',
    traits: '因子', traitSlot: '因子槽', secondary: '副词条', selectSecondary: '选择副词条…', selectTrait: '选择词条…',
    selectSigil: '选择因子', selectSummon: '选择召唤石', summon: '召唤石', summonHint: '每队最多 4 颗；每颗可配置 1 个词条与 1 项附加属性（0～9级）。',
    searchSummon: '搜索召唤石…', noSummon: '没有匹配的召唤石', chooseAttribute: '— 选择附加属性 —', remove: '移除',
    skillSummary: '技能等级一览', summonBonus: '召唤石加成', noSkills: '装备因子后，这里会显示各技能的合计等级',
    all: '全部', basic: '基础', attack: '攻击', defense: '防御', support: '辅助', special: '特殊', role: '角色', plus: '+因子',
    searchName: '搜索名称（中/英）…', noMatch: '没有匹配结果', maxLevel: '上限', wikiFooter: '数据来源：GBF Relink Wiki · 感谢社区资料整理与校对',
    chinese: '中文', english: 'English', cost: '消耗', skillDetail: '技能详情', description: '技能说明', levelEffects: '逐级效果', sources: '等级来源', total: '合计',
    viewBuild: '因子配装', viewMastery: '专精', mastery: '专精技能', totalActivations: '总激活数',
    chooseCharacterFirstMastery: '先在“因子配装”页选择角色，再配置专精',
    masteryHint: '每列对应一种专精类型（✦ 数量与游戏内一致）。勾选节点计入对应阶级的总激活数（1/2/3 阶各 10 点、EX 20 点，共 50 点）；达到所需数量后，对应的专精类型强化会自动激活。中文文本已依据游戏内截图校正。',
  },
  en: {
    appTitle: 'GBF Relink Build Simulator', autoSave: 'Saved locally', save: 'Save Build', load: 'Switch Build…',
    export: 'Export Image', clear: 'Clear', clearConfirm: 'Clear the current build?', character: 'Character', selectCharacter: 'Select Character',
    chooseCharacter: 'Choose a character…', weapon: 'Weapon', chooseCharacterFirst: 'Choose a character first', unequipped: '— Unequipped —',
    fixedWeaponTraits: 'Fixed weapon traits (included in skill totals)', wrightstone: 'Wrightstone', wrightstoneHint: '3 trait slots; default levels are 20 / 15 / 10',
    traits: 'Sigils', traitSlot: 'Sigil Slot', secondary: 'Secondary', selectSecondary: 'Choose secondary…', selectTrait: 'Choose trait…',
    selectSigil: 'Select Sigil', selectSummon: 'Select Summon', summon: 'Summons', summonHint: 'Up to 4 summons; each has 1 trait and 1 bonus stat (level 0–9).',
    searchSummon: 'Search summons…', noSummon: 'No matching summons', chooseAttribute: '— Choose bonus stat —', remove: 'Remove',
    skillSummary: 'Skill Levels', summonBonus: 'Summon Bonuses', noSkills: 'Equip sigils to see combined skill levels here',
    all: 'All', basic: 'Basic', attack: 'Attack', defense: 'Defense', support: 'Support', special: 'Special', role: 'Character', plus: '+ Sigils',
    searchName: 'Search name (CN/EN)…', noMatch: 'No matching results', maxLevel: 'Max', wikiFooter: 'Data source: GBF Relink Wiki · Thanks to the community for compiling and verifying the data',
    chinese: '中文', english: 'English', cost: 'Cost', skillDetail: 'Skill Details', description: 'Description', levelEffects: 'Level Effects', sources: 'Sources', total: 'Total',
    viewBuild: 'Build', viewMastery: 'Mastery', mastery: 'Master Traits', totalActivations: 'Activated',
    chooseCharacterFirstMastery: 'Choose a character on the Build page first',
    masteryHint: 'Each column is one Master Trait style (✦ marks match the in-game icons). Activated nodes count toward each rank tier (10 for Ranks 1/2/3, 20 for EX, 50 total); reaching the required count activates the Rank Perk. Data from RPG Site.',
  },
} as const;

type MessageKey = keyof typeof messages.zh;
type I18nValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: MessageKey) => string };
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => localStorage.getItem('gbfr-sim.locale') === 'en' ? 'en' : 'zh');
  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale: next => { localStorage.setItem('gbfr-sim.locale', next); document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'; setLocaleState(next); },
    t: key => messages[locale][key],
  }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}

export function localizedName(locale: Locale, english: string | undefined, chinese: string | undefined) {
  return locale === 'zh' ? (chinese || english || '') : (english || chinese || '');
}
