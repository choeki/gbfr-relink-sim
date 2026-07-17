const DESCRIPTION_TRANSLATIONS: Record<string, string> = {
  'Boosts attack power.': '提升攻击力。',
  'Boosts base health.': '提升基础生命值。',
  'Boosts the power of charged attacks.': '提升蓄力攻击的威力。',
  "Gradually boosts damage of each successive hit. Effect resets if the next hit isn't made in time.": '连续命中时逐步提升造成的伤害；若未能及时打出下一击，效果会重置。',
  'Boosts the power of combo finishers.': '提升连击收招的威力。',
  'Boosts the power of ranged attacks.': '提升远程攻击的威力。',
  'Boosts damage dealt by critical hits.': '提升暴击造成的伤害。',
  'Boosts critical hit rate.': '提升暴击率。',
  'Boosts stun power.': '提升昏厥值。',
  'Raises the damage limit of attacks.': '提升各种攻击的伤害上限。',
  'Boosts attack based on how low your health is.': '生命值越低，攻击力提升越多。',
  'Boosts attack power and damage cap, but every hit taken inflicts you with Dizzy.': '提升攻击力和伤害上限，但每次受到攻击时都会陷入昏迷。',
  'Deal more damage to foes inflicted with status ailments.': '对处于弱化状态的敌人造成更多伤害。',
  'Boosts attack power the less skills are assigned.': '装备的角色技能越少，攻击力提升越多。',
  "Boosts your attack power, but healing from allies won't restore your health.": '提升攻击力，但无法受到队友的治疗效果。',
  'Boosts link attacks, Skybound Arts, and chain bursts. Also boosts the amount of link level gained.': '提升连锁攻击、奥义与奥义连锁的伤害，并提升连锁等级获取量。',
  'Boosts the critical hit rate of charged attacks.': '提升蓄力攻击的暴击率。',
  'Charged attacks charge faster.\nBoosts attack power.': '缩短蓄力攻击的蓄力时间，并提升攻击力。',
  'Boosts the power of damage skills.': '提升伤害类技能的威力。',
  'Boosts attack based on how high your health is.': '生命值越高，攻击力提升越多。',
  'Reduces maximum base health in exchange for a boost to attack.': '降低基础生命值上限，以换取攻击力提升。',
};

export function translateTraitDescription(description: string): string {
  const normalized = description.replace(/<br\s*\/?>/gi, '\n').trim();
  return DESCRIPTION_TRANSLATIONS[normalized] ?? normalized;
}

export function translateLevelEffect(effect: string): string {
  return effect
    .replace(/Stun Power/gi, '昏厥')
    .replace(/\[Attack\] \/ \[Unique Attack\] DMG cap/gi, '[普通攻击] / [特殊攻击] 伤害上限')
    .replace(/Skill DMG cap/gi, '技能伤害上限')
    .replace(/SBA DMG cap/gi, '奥义伤害上限')
    .replace(/Link lvl gain/gi, '连锁等级获取量')
    .replace(/Chain burst DMG/gi, '奥义连锁伤害')
    .replace(/Link attack DMG/gi, '连锁攻击伤害')
    .replace(/SBA DMG/gi, '奥义伤害')
    .replace(/Critical hit rate/gi, '暴击率')
    .replace(/Charge time/gi, '蓄力时间')
    .replace(/Boosts ATK by a max of/gi, '攻击力最多提高')
    .replace(/Boosts ATK by at least/gi, '攻击力至少提高')
    .replace(/Boost ATK by a max of/gi, '攻击力最多提高')
    .replace(/Boosts DMG dealt by a max of/gi, '造成伤害最多提高')
    .replace(/DMG dealt/gi, '造成伤害')
    .replace(/DMG cap/gi, '伤害上限')
    .replace(/Max HP/gi, '最大生命值')
    .replace(/ATK/gi, '攻击力')
    .replace(/HP/gi, '生命值')
    .replace(/Healing from allies has no effect/gi, '无法受到队友的治疗效果')
    .replace(/when 3 skills assigned/gi, '（装备 3 个角色技能时）')
    .replace(/when 2 skills assigned/gi, '（装备 2 个角色技能时）')
    .replace(/when 1 skill assigned/gi, '（装备 1 个角色技能时）')
    .replace(/when 0 skills assigned/gi, '（未装备角色技能时）')
    .replace(/\(At 100% 生命值\)/gi, '（生命值为 100% 时）')
    .replace(/\(At 25% 生命值\)/gi, '（生命值为 25% 时）');
}
