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

/**
 * 技能名官方中文对照(来自用户游戏内「能力」截图, 与 wiki 英文技能表按效果语义匹配)。
 * 标 ? 的为中等把握, 待截图核对: Nelah Nav/Verdrängen(齐格飞), Reginleiv(古兰)。
 */
const SKILL_NAME_TRANSLATIONS: [RegExp, string][] = [
  // 古兰/姬塔
  [/\bReginleiv\b/g, '圣迹'], [/\bDecimate\b/g, '无尽连斩'], [/\bArmor Break\b/g, '护甲破坏'],
  [/\bPhalanx\b/g, '密集方阵'], [/\bPanacea\b/g, '全体治疗'], [/\bRain of Arrows\b/g, '箭雨'],
  [/\bMiserable Mist\b/g, '惨雾'], [/\bRage\b/g, '暴怒'],
  [/\bOverdrive Surge\b/g, '过载爆发'], [/\bClarity\b/g, '全体净化'], [/\bStall\b/g, '缓沼'],
  [/\bRevive\b/g, '复苏'], [/\bVeil\b/g, '圣纱'], [/\bDispel\b/g, '驱散'],
  [/\bConduction\b/g, '渡能'], [/\bSubstitute\b/g, '挺身而出'],
  // 希耶提
  [/\bSeven-Star'?s? Brilliance\b/g, '七星剑闪'], [/\bInfinito Creare\b/g, '无尽剑阵'],
  [/\bTempesta\b/g, '狂风剑气'], [/\bIspirazione\b/g, '聚灵剑气'], [/\bBarrido\b/g, '横扫剑弧'],
  [/\bDespedazar\b/g, '破灭剑陨'], [/\bPrisi[oó]n de Armas\b/g, '缚魂剑罡'], [/\bRotura\b/g, '碎星剑斩'],
  [/\bSwordshine\b/g, '剑光'], [/\bavatars?\b/gi, '剑神'],
  // 索恩
  [/\bMerculight\b/g, '信使神光'], [/\bTwo Crown'?s? Strife\b/g, '二王之诤'], [/\bClincher\b/g, '致命一击'],
  [/\bLethal Rain\b/g, '致命箭雨'], [/\bDepravity\b/g, '堕落箭雨'], [/\bValiant Weave\b/g, '散矢疾影'],
  [/\bWheel of Death\b/g, '圆弧散射'], [/\bPeerless Eye\b/g, '弓魄无双'],
  // 卡莉奥丝特罗
  [/\bPain Train\b/g, '蛇行列车'], [/\bAlexandria\b/g, '起源之城'], [/\bMimic Doll\b/g, '拟态人偶'],
  [/\bReinforce\b/g, '固魂'], [/\bMehen\b/g, '盘蛇之阵'], [/\bPhantasmagoria\b/g, '幻术光影'],
  [/\bDisruption\b/g, '毁散'], [/\bRhizomata\b/g, '根源之术'],
  // 齐格飞
  [/\bL'Ombre d'Hier\b/g, '昨日之影'], [/\bManigance\b/g, '计谋'], [/\bMirage\b/g, '幻甲'],
  [/\bSalvator\b/g, '救世之力'], [/\bDraconic Release\b/g, '龙气外释'], [/\bUwe\b/g, '无畏之刃'],
  [/\bNelah Nav\b/g, '湮灭斩'], [/\bVerdr[aä]ngen\b/g, '蹑龙挪步'],
  // 卡塔莉娜 (非凡旅程=Frozen Blade 为排除法推断)
  [/\bEnchanted Lands\b/g, '附魔剑击'], [/\bWinter'?s? Rain\b/g, '寒冬冰雨'], [/\bFrozen Blade\b/g, '非凡旅程'],
  [/\bSacred Winds\b/g, '神圣凛风'], [/\bAzure Sword\b/g, '苍天之剑'], [/\bLight Wall\b/g, '光墙屏障'],
  [/\bEmerald Shield\b/g, '翡翠之盾'], [/\bHeal(?=\s*:)/g, '治疗'],
  // 拉卡姆
  [/\bSpitfire\b/g, '烈火射击'], [/\bBullet Hail\b/g, '枪林弹雨'], [/\bDouble Tap\b/g, '双发子弹'],
  [/\bCoffinmaker\b/g, '送葬火舌'], [/\bWild Gunsmoke\b/g, '荒野硝烟'], [/\bSlag Shot\b/g, '霰弹扫射'],
  [/\bDuration(?=\s*:)/g, '以逸待劳'], [/\bCollateral Damage\b/g, '战地余波'],
  // 伊欧 (通用词技能名仅在“技能名:”格式下替换, 避免误伤普通句子)
  [/\bMystic Vortex\b/g, '魔力漩涡'], [/\bFlowery Seven\b/g, '花耀七闪'], [/\bGravity Well\b/g, '魔洞'],
  [/\bHealing Winds\b/g, '治愈之风'], [/\bLightning(?=\s*:)/g, '雷霆'], [/\bFreeze(?=\s*:)/g, '寒冰'],
  [/\bFire(?=\s*:)/g, '火焰'], [/\bConcentration(?=\s*:)/g, '专注'],
  // 欧根
  [/\bIntercept\b/g, '战术拦截'], [/\bHealing Bullet\b/g, '治疗弹'], [/\bArmor-Piercing Round\b/g, '穿甲弹'],
  [/\bVenom Grenade\b/g, '剧毒榴弹'], [/\bSumrak\b/g, '暮光'], [/\bDetonator\b/g, '爆裂射击'],
  [/\bParalyzing Bullet\b/g, '麻痹弹'], [/\bDisruptor\b/g, '驱散射击'],
  // 萝赛塔
  [/\bSillage\b/g, '馥郁幻迹'], [/\bLost Love\b/g, '落花无情'], [/\bSpiral Rose\b/g, '螺旋玫瑰'],
  [/\bRose Tycoon\b/g, '群花之主'], [/\bMesmerize\b/g, '魅惑芳丛'], [/\bIron Maiden\b/g, '铁娘子'],
  [/\bRose Barrier\b/g, '玫瑰结界'], [/\bBouquet\b/g, '繁花似锦'],
  // 夏洛特
  [/\bSword of Lumiel\b/g, '卢米埃之剑'], [/\bShining Onslaught\b/g, '耀眼猛攻'], [/\bValiant Stance\b/g, '英勇战姿'],
  [/\bK[oö]nigsschild\b/g, '王之盾'], [/\bRising Cut\b/g, '跳跃反击'], [/\bSacred Charge\b/g, '神圣灌注'],
  [/\bHoly Ladder\b/g, '神圣阶梯'], [/\bInvincible(?=\s*:)/g, '所向披靡'],
  // 冈达苟萨（游戏截图已确认无明白天、力足舞）
  [/\bIron Shoulder\b/g, '激震铁山靠'], [/\bArhat Skybreaker\b/g, '罗汉天降击'], [/\bBranding Palm\b/g, '印可掌'],
  [/\bLion Stance\b/g, '威武雄姿'], [/\bTrue Avidya\b/g, '无明白天'], [/\bInfernal Stomp\b/g, '力足舞'],
  [/\bEternal Rage\b/g, '古今无双'], [/\bDhyana\b/g, '禅定'],
  // 菲莉
  [/\bBlaues Gespenst\b/g, '蓝灵束缚'], [/\bPendel\b/g, '幽影幻步'], [/\bPurge Spirits\b/g, '幻灵之鞭'],
  [/\bBenediction\b/g, '幻灵祝福'], [/\bSic '?Em,? Geegee!?/g, '吉吉,拖住对手!'], [/\bStrafe\b/g, '幻灵惩戒'],
  [/\bHinrichten\b/g, '强化之光'], [/\bUmlauf\b/g, '幻灵守护'],
  // 娜露梅
  [/\bSetsuna\b/g, '刹那'], [/\bKyokasuigetsu\b/g, '镜花水月'], [/\bTransient\b/g, '泡沫梦幻'],
  [/\bDance of Pink Petals\b/g, '花风·薄红舞'], [/\bDance of Blue Petals\b/g, '花风·水缥舞'],
  [/\bApex of Nothingness\b/g, '至人无己'], [/\bCrescent Moon\b/g, '纤月'], [/\bUtter Devotion\b/g, '无二无三'],
  // 兰斯洛特
  [/\bSouthern Cross\b/g, '南十字星'], [/\bBlade Impulse\b/g, '剑刃冲击'], [/\bBlauer Dolch\b/g, '苍蓝双剑'],
  [/\bLuftspiegelung\b/g, '蜃景'], [/\bKaltzwinger\b/g, '寒冰魔爪'], [/\bLawinensturm\b/g, '冰雪飞刃'],
  [/\bTurbulenz\b/g, '乱气流'], [/\bSchwertgeist\b/g, '剑魂'],
  // 巴恩
  [/\bRampart\b/g, '铜墙铁壁'], [/\bHeroic Beat\b/g, '英勇打击'], [/\bEnergy Destruction\b/g, '活力灭击'],
  [/\bDrachenstolz\b/g, '龙之荣耀'], [/\bRift Divider\b/g, '裂空连斩'], [/\bBreakthrough\b/g, '破军之力'],
  [/\bArm Destruction\b/g, '巨力重击'], [/\bSoul Eruption\b/g, '战魂觉醒'],
  // 珀西瓦尔 (全德语)
  [/\bZerreissen\b/g, '撕裂'], [/\bRoter Wirbel\b/g, '赤焰旋涡'], [/\bRoyal Authority\b/g, '王之威势'],
  [/\bFlammenmarsch\b/g, '烈焰脚步'], [/\bFeuerangriff\b/g, '烈火突袭'], [/\bX-Seele\b/g, '未知之魂'],
  [/\bTr[aä]umerei\b/g, '梦幻曲'], [/\bMacht(?=\s*:)/g, '力量'],
  // 尤达拉哈 (十起=Awakening / 刀逡巡=Trice Blade 待核对)
  [/\bSky Shatter\b/g, '惊天动地'], [/\bEmpty Mist\b/g, '空空漠漠'], [/\bHymn of the Hundreds\b/g, '百承'],
  [/\bTit for Tat\b/g, '以牙还牙'], [/\bPerpetual Rotation\b/g, '千转'], [/\bFlashing Void\b/g, '闪空'],
  [/\bTrice Blade\b/g, '刀逡巡'], [/\bAwakening(?=\s*:)/g, '十起'], [/\bTriple Shroud\b/g, '三重奥义'],
  // 塞达
  [/\bInfinite Wonders\b/g, '无尽奇观'], [/\bSpear of Arvess\b/g, '阿尔贝斯之枪'], [/\bVengeful Flames\b/g, '复仇之火'],
  [/\bWingclipper\b/g, '长枪回旋'], [/\bRain of Fury\b/g, '愤怒之雨'], [/\bSigno Drive\b/g, '符文狂潮'],
  [/\bThousand Flames\b/g, '千炎'], [/\bRealm'?s? Majesty\b/g, '威光领域'],
  // 巴萨拉卡
  [/\bBattalions of Fear\b/g, '恐怖军势'], [/\bViolent Shadows\b/g, '暴虐暗影'], [/\bGreat Scythe Grynoth\b/g, '巨镰古洛诺斯'],
  [/\bUmbral Eclipse\b/g, '暗蚀'], [/\bForgotten Tales\b/g, '遗忘传说'], [/\bNetherwrath\b/g, '地狱之怒'],
  [/\bImmortal Pain\b/g, '无畏巨躯'], [/\bDamnation\b/g, '灭顶一击'],
  // 圣德芬
  [/\bNo Way Out\b/g, '无路可逃'], [/\bEcliptica\b/g, '天光轨迹'], [/\bRevontulet\b/g, '极火虹光'],
  [/\bAlone in Heaven\b/g, '独守天穹'], [/\bBreath of Life\b/g, '天司之息'], [/\bThe Power of One\b/g, '一人之力'],
  [/\bTalviy[oö]\b/g, '凛冬暗夜'], [/\bEthereal Prison\b/g, '定法囚牢'],
  // 贝阿朵丽丝（DLC，游戏截图已校对）
  [/\bStar Chaser\b/g, '逐星'], [/\bThunderbird\b/g, '雷鸟'], [/\bEmbrasque Sword\b/g, '恩布拉斯克之剑'],
  [/\bEternity Loop\b/g, '永恒征程'], [/\bRising Nova\b/g, '新星跃升'], [/\bDevour Causality\b/g, '游影自如'],
  [/\bUnchained\b/g, '破缚残影'], [/\bEmbrasque\b/g, '恩布拉斯克'],
  // 尤斯提斯 (DLC)
  [/\bFlamek Thunder\b/g, '弗拉梅克之雷'], [/\bHeaven Comes Down\b/g, '撼地天雷'], [/\bNever Surrender\b/g, '不屈之志'],
  [/\bFast Lane\b/g, '雷光迅步'], [/\bAcidrage Howl\b/g, '怒号连击'], [/\bForever Yours\b/g, '不朽之誓'],
  [/\bSlow Kill\b/g, '缓刑'], [/\bFlamek\b/g, '弗拉梅克'],
  // 芙劳 (DLC)
  [/\bCrimson Nightmare\b/g, '猩红梦魇'], [/\bOpportunity Knocks\b/g, '转瞬之机'], [/\bDead Lands\b/g, '夺命领域'],
  [/\bSplendor\b/g, '夺目光辉'], [/\bPower Plant\b/g, '力量源泉'], [/\b(?:Flip Kick|Kick Face)\b/g, '破面踢'],
  [/\bIndominus\b/g, '暴虐之拳'], [/\bAll Fall Down\b/g, '降咒'],
  // 菲迪埃尔 (DLC)
  [/\bCalamity\b/g, '灾兆'], [/\bMiasmic Abyss\b/g, '瘴域'], [/\bPrimordial Fear\b/g, '本源恐惧'],
  [/\bSoul Breaker\b/g, '碎魂'], [/\bThe Black'?s Blessing\b/g, '黑之祝福'], [/\bCursed Funeral\b/g, '咒葬'],
  [/\bVoidskip\b/g, '逆爪'], [/\bMiasma Hands\b/g, '瘴爪'],
  // 伊德
  [/\bReginleiv Recidiv\b/g, '圣迹再临'], [/\bScourge\b/g, '天谴'], [/\bUnbound\b/g, '无缚之斩'],
  [/\bNever Enough\b/g, '永无止境'], [/\bAtonement\b/g, '赎罪'], [/\bRagnarok Form\b/g, '末日形态'],
  [/\bArcadia\b/g, '乐园之噬'], [/\bFourfold Vengeance\b/g, '神愿之力'],
  // 伽兰查（按游戏内专精节点校对）
  [/\bCyclone Skullsplitter\b/g, '风卷残云'], [/\bImpale\b/g, '穿山一刺'], [/\bMartial Spear\b/g, '武刹枪'],
  [/\bExplosive Plunge\b/g, '华枪天降'], [/\bDashing Lancer\b/g, '锋芒一线'], [/\bFall Flat\b/g, '摧山坠地'],
  [/\bFlashpoint\b/g, '狼牙斩'], [/\bDeathmatch Finale\b/g, '铁衣玉碎'], [/\bWild Showman\b/g, '武夫'],
  [/\bTip of the Spear\b/g, '横枪立马'], [/\bEye of the Storm\b/g, '风卷残云'],
  // 玛琪拉菲菈（按游戏内专精节点校对）
  [/\bNachtmusik\b/g, '暗夜离曲'], [/\bBattle Hymn\b/g, '英勇颂歌'], [/\bPaeanic Aegis\b/g, '坚毅戎歌'],
  [/\bSostenuto\b/g, '坚毅戎歌'], [/\bDivinity\b/g, '奇迹权杖'], [/\bEtude of Devotion\b/g, '挚恋即兴曲'],
  [/\bEtude\b/g, '挚恋即兴曲'], [/\bDevotion\b/g, '英勇颂歌'], [/\bBlade Dance\b/g, '魔剑之舞'],
  [/\bHammer of Thunder\b/g, '迅雷之锤'], [/\bPistol of Demons\b/g, '必杀魔铳'],
  [/\bSpear of Legends\b/g, '神威宝枪'], [/\bStave of Divinity\b/g, '奇迹权杖'],
];

export function translateSkillNames(text: string): string {
  let out = text;
  for (const [pattern, zh] of SKILL_NAME_TRANSLATIONS) out = out.replace(pattern, zh);
  return out;
}

/** 游戏截图确认后的正式术语修正。用于同时校正早期已经录入的整句译文。 */
function applyScreenshotTerminology(text: string): string {
  return text
    // 游戏内通用系统术语（专精详情截图正式写法）
    .replace(/伤害类能力/g, '攻击类能力')
    .replace(/伤害类技能/g, '攻击类能力')
    .replace(/攻击降低/g, '攻击DOWN')
    .replace(/防御降低/g, '防御DOWN')
    .replace(/灼烧/g, '灼热')
    .replace(/伤害减免/g, '减伤')
    .replace(/阿瑞斯连携攻击/g, '阿瑞斯协同攻击')
    .replace(/连携攻击/g, '协同攻击')
    .replace(/蓄力特殊攻击/g, '蓄力攻击')
    .replace(/职业等级/g, 'Class Lv')
    .replace(/力量提升(?!\+\+)/g, '力量提升++')
    .replace(/最大生命值/g, '最大HP')
    .replace(/护盾/g, '屏障')
    .replace(/防御崩溃耐性/g, '被破防所需伤害')
    .replace(/濒死槽/g, '危机槽')
    .replace(/原初爆发/g, '高阶召唤')
    .replace(/召唤石性能/g, '召唤性能')
    .replace(/攻击克制属性的敌人时[:：]\s*造成伤害/g, '对弱点属性敌人造成的伤害')
    // 齐格飞：强化效果及攻击判定正式写法
    .replace(/屠龙律动/g, '屠龙之心')
    .replace(/暗之斗志/g, '漆黑血涌')
    .replace(/\[黎明\]/g, '[拂晓]')
    .replace(/精准攻击(?!特化)/g, '完美连击')
    // 卡莉奥丝特罗：能力正式写法
    .replace(/肾上腺素爆发/g, '乘势蓄力')
    // 索恩：专精强化效果正式写法
    .replace(/贯穿辉光/g, '煌矢')
    .replace(/超视距/g, '魔眼')
    .replace(/\[必中\]/g, '[狙击]')
    .replace(/弓魔无双/g, '弓魄无双')
    .replace(/\[曙光\]/g, '[晓光一箭]')
    .replace(/\[钝点\]/g, '[封缚钝镞]')
    // 夏洛特：游戏内能力/状态正式写法
    .replace(/崇高号令/g, '崇高指令')
    .replace(/钻石斩/g, '钻石之心')
    .replace(/神圣正义/g, '神圣追击')
    // 菲莉：游戏内专精效果正式写法
    .replace(/爱之信赖/g, '托愿')
    .replace(/灵魂羁绊/g, '幽缘')
    // 冈达苟萨：游戏内角色名与核心机制正式写法
    .replace(/冈达葛萨/g, '冈达苟萨')
    .replace(/古今无双(?!流)/g, '古今无双流')
    .replace(/极拳/g, '残拳')
    // 希耶提：剑神相关效果的游戏内正式写法
    .replace(/三昧耶/g, '集谛')
    .replace(/君临/g, '剑王')
    // 圣德芬：变身与专精弱化效果的游戏内正式写法
    .replace(/十二枚羽翼/g, '极彩羽翼')
    .replace(/无尽之光/g, '无限之辉')
    .replace(/战钟/g, '审判之钟')
    // 贝阿朵丽丝：角色、状态和能力连锁的游戏内正式写法
    .replace(/贝雅特丽克丝/g, '贝阿朵丽丝')
    .replace(/咬因果/g, '啖因果')
    .replace(/游影自如/g, '啖因果')
    .replace(/自由驰骋/g, '游影自如')
    .replace(/热情燃烧/g, '烈焰之心')
    .replace(/恩布拉斯克解放/g, '恩布拉斯克之力')
    .replace(/破绽残影/g, '破缚残影')
    // 尤斯提斯：射击阶段与专精状态的游戏内正式写法
    .replace(/弗拉梅克解放/g, '弗拉梅克之力')
    .replace(/四级射击/g, '射击IV')
    // 菲迪埃尔：专精状态与蓄力派生的游戏内正式写法
    .replace(/\[恶意\]/g, '[暗灾]')
    .replace(/\[黑闪\]/g, '[永暗一闪]')
    .replace(/灾厄之兆/g, '灾兆')
    // 巴萨拉卡
    .replace(/古洛诺斯解放/g, '古洛诺斯之力')
    .replace(/黑耀/g, '冥刃')
    .replace(/饮血之刃/g, '蚀魂魔刃')
    // 伽兰查
    .replace(/加兰萨/g, '伽兰查')
    .replace(/银狼槽/g, '白狼槽')
    .replace(/武刃枪/g, '武刹枪')
    .replace(/风暴之眼/g, '风卷残云')
    // 玛琪拉菲菈
    .replace(/玛琪艾尔/g, '玛琪拉菲菈')
    .replace(/剑舞/g, '魔剑之舞')
    .replace(/帷幕槽/g, '刃重槽')
    .replace(/超凡技艺/g, '超凡艺术')
    .replace(/迅雷之锻/g, '挚恋即兴曲')
    .replace(/雷霆之锤/g, '迅雷之锤')
    .replace(/恶魔之铳/g, '必杀魔铳')
    .replace(/传说之枪/g, '神威宝枪')
    .replace(/神性之杖/g, '奇迹权杖')
    .replace(/曲音萦绕/g, '坚毅戎歌');
}

// 来自用户提供的游戏内中文专精截图；键在查询前会统一不换行空格。
const OFFICIAL_MASTERY_EFFECT_TRANSLATIONS: Record<string, string> = {
  // 巴萨拉卡：无截图时依据英文原文、能力对照与既有句式翻译
  'Vaseraga': '巴萨拉卡',
  'Hooked on Combos': '普攻连击特化',
  'Landing a charged Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) with a full Grynoth gauge grants Grynoth Unleashed.':
    '古洛诺斯槽蓄满时，蓄力特殊攻击命中会获得[古洛诺斯解放]。',
  'While in effect, it grants ATK +10% and DEF +5%.': '效果持续期间，攻击力 +10%、防御力 +5%。',
  'Boosts ATK and DMG Cap of Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) by a max of +20%, as well as Grynoth Gauge Gain from charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) by a max of +20%.':
    '普通攻击的攻击力与伤害上限最高 +20%，蓄力特殊攻击的古洛诺斯槽提升量最高 +20%。',
  "Both boosts are based on the total damage dealt by Vaseraga's charged Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) during the quest.":
    '两种提升效果均根据巴萨拉卡在本次任务中以蓄力特殊攻击造成的累计伤害计算。',
  "Grynoth Unleashed's max lvl is now 4.": '[古洛诺斯解放]的最高等级提升至 4。',
  "Whenever Vaseraga lands Combo C's charged Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) finisher, he gains a lvl of Grynoth Unleashed (its effect strength and duration are based on lvl), and if the Grynoth gauge remains full for 20 sec., it grants a max of Enhanced DMG +20%.":
    '特定连击的蓄力特殊攻击收招命中时，获得 1 级[古洛诺斯解放]，效果量与持续时间随等级提升；古洛诺斯槽维持全满 20 秒时，造成伤害最高 +20%。',
  'At lvl 4, it grants ATK +30% and DEF +10% for 45 sec.': '达到 4 级时，获得攻击力 +30%、防御力 +10%，持续 45 秒。',
  'Losing the effect resets the gauge.': '效果解除时，古洛诺斯槽重置。',
  'Grynoth Gauge Gain +10%': '古洛诺斯槽提升量 +10%',
  'Insight Rank Perk 1: Grynoth Unleashed grants an additional ATK +10%': '[古洛诺斯解放]额外使攻击力 +10%',
  'Insight Rank Perk 1: Grynoth Unleashed grants an additional DEF +3%': '[古洛诺斯解放]额外使防御力 +3%',
  'Insight Rank Perk 2: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain up to an additional ATK +10% and DMG Cap +20%':
    '普通攻击的攻击力最高额外 +10%、伤害上限最高额外 +20%',
  'Insight Rank Perk 2: Grynoth Gauge Gain +10%': '古洛诺斯槽提升量额外 +10%',
  'Insight Rank Perk 3: Shortens the time needed to gain Enhanced DMG by 5 sec.': '获得造成伤害提升所需的维持时间缩短 5 秒',

  'Large and In Charge': '蓄力攻击特化',
  'Charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain ATK +5% and DMG Cap +10%.':
    '蓄力特殊攻击的攻击力 +5%、伤害上限 +10%。',
  'Landing charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) grants Ebony Glint to Vaseraga.':
    '蓄力特殊攻击命中时，巴萨拉卡获得[黑耀]。',
  'While in effect, it shortens the charge time of charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) by 5%.':
    '效果持续期间，蓄力特殊攻击的蓄力时间缩短 5%。',
  "Ebony Glint's max lvl is now 3.": '[黑耀]的最高等级提升至 3。',
  'It now shortens the charge time of charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) by 5% per effect lvl, but failing to land a charged attack removes the effect.':
    '每级使蓄力特殊攻击的蓄力时间缩短 5%；蓄力攻击未命中时解除效果。',
  'Essence Rank Perk 2: Ebony Glint shortens charge time of charged attacks by an additional 2% per effect lvl':
    '[黑耀]每级额外使蓄力攻击的蓄力时间缩短 2%',
  'When filling the Grynoth gauge: ATK↑ grants an additional ATK +5%; DEF↑ grants an additional DEF +5%':
    '古洛诺斯槽蓄满时，[攻击提升]与[防御提升]的效果量额外 +5%',
  'Umbral Eclipse: Slow Duration +2 sec.': '黑暗日蚀赋予的[缓速]效果持续时间 +2 秒',
  'Essence Rank Perk 2: Ebony Glint Duration +10%': '[黑耀]的效果持续时间 +10%',
  'Essence Rank Perk 3: Ebony Glint also grants Supplementary DMG (3%) to Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '[黑耀]额外使特殊攻击触发造成伤害 3% 的追击效果',
  'Essence Rank Perk 3: Ebony Glint lvl 3 also grants DMG Dealt +3% to Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '[黑耀]达到 3 级时，特殊攻击的造成伤害额外 +3%',

  'Punishing Parries': '蓄力反击特化',
  'Vaseraga gains DEF +5% while charging Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '蓄力发动特殊攻击期间，巴萨拉卡的防御力 +5%',
  'Successful charged parries or link attacks grant a permanent lvl of Blood-Drinking Blade (max lvl 3).':
    '成功发动蓄力反击或连锁攻击时，永久获得 1 级[饮血之刃]（最高 3 级）。',
  'While in effect, it grants DMG Cap +50% and Skill Cooldown -3% per effect lvl to damage skills.':
    '效果持续期间，每级使攻击类能力的伤害上限 +50%、冷却时间 -3%。',
  "Blood-Drinking Blade's max lvl is now 5.": '[饮血之刃]的最高等级提升至 5。',
  'It also grants DMG Dealt +5% per effect lvl to damage skills.': '每级额外使攻击类能力的造成伤害 +5%。',
  'At lvl 5, it extends the window of time to perform a charged parry by 50%, and gaining a new lvl of Blood-Drinking Blade grants Supplementary DMG (20%).':
    '[饮血之刃]达到 5 级时，蓄力反击的判定时间延长 50%；再次获得等级时，赋予自身[追击]（20%）。',
  'Crux Rank Perk 1: Vaseraga gains an additional DEF +5% while charging Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '蓄力发动特殊攻击期间，巴萨拉卡的防御力额外 +5%',
  "Forgotten Tale's Drain now grants Shield (5% of max HP, max 25,000) instead of healing HP":
    '遗忘传说的吸血效果改为赋予相当于最大生命值 5% 的屏障（最高 25,000），不再回复生命值',
  'Crux Rank Perk 1: Vaseraga gains an additinal DEF +5% while charging Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '蓄力发动特殊攻击期间，巴萨拉卡的防御力额外 +5%',
  'Crux Rank Perk 2: Blood-Drinking Blade shortens damage skill cooldowns by an additional 2% per effect lvl':
    '[饮血之刃]每级额外使攻击类能力的冷却时间缩短 2%',
  'Crux Rank Perk 2: Blood-Drinking Blade grants an additional DMG Cap +10% per effect lvl':
    '[饮血之刃]每级额外使攻击类能力的伤害上限 +10%',
  'Crux Rank Perk 3: Blood-Drinking Blade grants an additional DMG Dealt +5% per effect lvl':
    '[饮血之刃]每级额外使攻击类能力的造成伤害 +5%',

  // 夏洛特
  'Charlotta': '夏洛特',
  'Noblest Stance': '崇高之姿强化',
  'Whenever Charlotta lands a damage skill, she gains Noble Order.': '夏洛特的攻击类能力命中时，获得[崇高号令]。',
  'While in effect, her Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain ATK +5% and DMG Cap +10%.': '效果持续期间，特殊攻击的攻击力 +5%、伤害上限 +10%。',
  "Noble Order's max lvl is now 5.": '[崇高号令]的最高等级提升至 5。',
  'While in effect, whenever Charlotta lands enough Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click), she gains a lvl.': '效果持续期间，普通攻击命中一定次数时，获得 1 级[崇高号令]。',
  'In addition, Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain DMG Dealt +0.5% per effect lvl.': '此外，每级使特殊攻击的造成伤害 +0.5%。',
  'At lvl 2 and above, Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) also gain ATK +3% and DMG Cap +10% per effect lvl.': '达到 2 级以上时，每级额外使特殊攻击的攻击力 +3%、伤害上限 +10%。',
  'Whenever she takes 50,000 or more damage in a single attack, Noble Order is removed.': '单次受到 50,000 以上伤害时，解除[崇高号令]。',
  'Noble Stance is always in its enhanced state.': '[崇高之姿]始终处于强化状态。',
  "All of Charlotta's skills gain Skill Cooldown -2%": '夏洛特的所有能力冷却时间 -2%。',
  'Insight Rank Perk 1: Noble Order Duration +10%': '[崇高号令]持续时间 +10%。',
  'Upon countering with Rising Cut: Grants Supplementary DMG (10%)': '以[跳跃反击]成功反击时，赋予自身[追击]（10%）。',
  'Insight Rank Perk 1: Noble Order grants an additional ATK +10% and DMG Cap +10%': '[崇高号令]额外使攻击力 +10%、伤害上限 +10%。',
  'Insight Rank Perk 2: Noble Order grants an additional ATK +2% and DMG Cap +5% per effect lvl': '[崇高号令]每级额外使攻击力 +2%、伤害上限 +5%。',
  'Valiant Stance: Stackable ATK↑ grants an additional ATK +5% per stack': '[英勇战姿]赋予的[攻击提升（可叠加）]每层效果量额外 +5%。',
  'Insight Rank Perk 2: Withstand 50,000 more damage before losing Noble Order.': '[崇高号令]被解除所需承受的单次伤害提高 50,000。',
  'Charge!': '正面对决',
  'Whenever Charlotta successfully blocks with a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click), she gains a permanent lvl of Diamond Cutter (max lvl 5).': '夏洛特以特殊攻击成功防御时，永久获得 1 级[钻石斩]（最高 5 级）。',
  'While in effect, her Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain ATK +5% and DMG Cap +5% per effect lvl.': '效果持续期间，每级使普通攻击的攻击力 +5%、伤害上限 +5%。',
  'Taking any damage lowers effect lvl by 1.': '受到伤害时，效果等级降低 1。',
  'No longer knocked back when blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click).': '以特殊攻击防御时，不再被击退。',
  "Diamond Cutter's max lvl is now 10.": '[钻石斩]的最高等级提升至 10。',
  'While in effect, her Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) now gain ATK +10% and DMG Cap +50% per effect lvl.': '效果持续期间，每级使普通攻击的攻击力 +10%、伤害上限 +50%。',
  'At lvl 10, whenever she gains another lvl of Diamond Cutter, she also gains Supplementary DMG (10%).': '[钻石斩]达到 10 级后，再次获得等级时，赋予自身[追击]（10%）。',
  'Upon blocking with a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click): Unique Attack Combo Finisher ATK +10%': '以特殊攻击成功防御时：特殊攻击连击收招攻击力 +10%。',
  'Upon blocking with a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click): Gain Shield (1000)': '以特殊攻击成功防御时：获得[屏障]（1000）。',
  'Essence Rank Perk 1: Diamond Cutter grants an additional ATK +2% per effect lvl to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click)': '[钻石斩]每级额外使普通攻击的攻击力 +2%。',
  'Konigsschild: DMG Cut (50%) reduces DMG taken by an additional 10%': '[王之盾]赋予的[伤害减免]（50%）额外使受到伤害 -10%。',
  'Essence Rank Perk 3: Diamond Cutter grants an additional DMG Cap +20% per effect lvl to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click)': '[钻石斩]每级额外使普通攻击的伤害上限 +20%。',
  'Extends the window of time to perform a blocking using a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) by 10%': '以特殊攻击进行防御的判定时间延长 10%。',
  'Upon blocking with a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click): Unique Attack Combo Finisher DMG Cap +40%': '以特殊攻击成功防御时：特殊攻击连击收招伤害上限 +40%。',
  'Konigsschild: DMG Cut (50%) Duration +10%': '[王之盾]赋予的[伤害减免]（50%）持续时间 +10%。',
  'Sacred Charge: Grants DMG↑ (10%) to all allies': '[神圣灌注]额外赋予所有队友[造成伤害提升]（10%）。',
  'I Am Invincible': '所向披靡特化',
  "All of Charlotta's skills gain Skill Cooldown -5%.": '夏洛特的所有能力冷却时间 -5%。',
  "While Invincible's Invincibility effect ends, Charlotta gains Divine Justice.": '[所向披靡]赋予的[无敌]结束时，夏洛特获得[神圣正义]。',
  'While in effect, it grants Supplementary DMG (30%) and lasts up to 40 sec. longer based on the damage Charlotta dealt while she was buffed by Invincibility.': '效果持续期间，赋予自身[追击]（30%）；持续时间根据[无敌]期间造成的伤害最多延长 40 秒。',
  "Whenever Charlotta lands a damage skill while buffed by Invincible's Invincibility effect, her next damage skill gains ATK +10% and extends invincibility by 1 sec. (max extension: 3 sec.).": '[所向披靡]的[无敌]期间，攻击类能力命中时，下一个攻击类能力的攻击力 +10%，且[无敌]延长 1 秒（最多延长 3 秒）。',
  "All of Charlotta's skills gain Skill Cooldown -3%": '夏洛特的所有能力冷却时间 -3%。',
  'While buffed by Invincibility: ATK +10%': '[无敌]期间，攻击力 +10%。',
  'While buffed by Invincibility: DMG Cap +30%': '[无敌]期间，伤害上限 +30%。',
  'Crux Rank Perk 2: Divine Justice grants an additional Supplementary DMG +20%': '[神圣正义]赋予的[追击]效果量额外 +20%。',
  'Attacks while Noble Stance is in its enhanced state: DMG Cap +30%': '[崇高之姿]强化期间，攻击的伤害上限 +30%。',
  'Rising Cut: Counter Stance Duration +10%': '[跳跃反击]的反击架势持续时间 +10%。',
  'Sacred Charge: Grants DMG Cap↑ (10%) to all allies': '[神圣灌注]额外赋予所有队友[伤害上限提升]（10%）。',

  // 冈达苟萨
  'Ghandagoza': '冈达葛萨',
  'Super Raging Fist': '直冲重拳',
  'Raging Fist gains ATK +20% and DMG Cap +20% but takes slightly longer to charge.': '[直冲拳]的攻击力 +20%、伤害上限 +20%，但蓄力时间略微延长。',
  'Eternal Rage always starts at lvl 2.': '[古今无双]的初始等级固定为 2。',
  'Raging Fist gains an additional ATK +50% and DMG Cap +200% but takes even longer to charge.': '[直冲拳]的攻击力额外 +50%、伤害上限额外 +200%，但蓄力时间进一步延长。',
  'At Eternal Rage lvl 10, Ghandagoza gains Ultrafist.': '[古今无双]达到 10 级时，冈达葛萨获得[极拳]。',
  'The next Raging Fist consumes Ultrafist instead of Eternal Rage.': '下一次[直冲拳]消耗[极拳]，而不消耗[古今无双]。',
  "Boosts Ghandagoza's DEF by a max of +5% based on his Eternal Rage lvl": '根据[古今无双]等级，使冈达葛萨的防御力最多 +5%。',
  'Insight Rank Perk 1: Raging Fist gains an additional ATK +10%': '[直冲拳]的攻击力额外 +10%。',
  'Insight Rank Perk 1: Raging Fist gains an additional DMG Cap +30% but takes slightly longer to charge': '[直冲拳]的伤害上限额外 +30%，但蓄力时间略微延长。',
  "While at Eternal Rage lvl 10, foe attacks won't interrupt Ghandagoza": '[古今无双]达到 10 级时，冈达葛萨不会被敌人的攻击打断。',
  'Insight Rank Perk 2: Eternal Rage now always starts at lvl 3': '[古今无双]的初始等级固定为 3。',
  'Insight Rank Perk 3: Raging Fist gains an additional ATK +10%': '[直冲拳]的攻击力额外 +10%。',
  'Insight Rank Perk 3: Raging Fist gains an additional DMG Cap +50%': '[直冲拳]的伤害上限额外 +50%。',
  'Eternal Rage: Cooldown -5%': '[古今无双]冷却时间 -5%。',
  'Infernal Stomp: Slow Duration +10%': '[力足舞]赋予的[缓速]持续时间 +10%。',
  'Roaring Lion': '威武雄姿特化',
  'While buffed by Jammed, Ghandagoza gains ATK +10% and DMG Cap +10%.': '[背水]期间，冈达葛萨的攻击力 +10%、伤害上限 +10%。',
  "The durations of Lion Stance's buffs (Hostility↑ / Stout Heart / Jammed) are extended by 10%.": '[威武雄姿]赋予的强化效果（敌对心提升／刚健／背水）持续时间 +10%。',
  'Lion Stance also grants DEF↑ (10%).': '[威武雄姿]额外赋予自身[防御提升]（10%）。',
  'Ghandagoza deals up to 50% more damage the lower his HP is.': '冈达葛萨的生命值越低，造成伤害越高，最多 +50%。',
  'At the start of a quest, 75% of his max HP is converted to Shield; green and mega potions now grant their healing value as Shield instead.': '任务开始时，将最大生命值的 75% 转化为[屏障]；绿色药水与强效药水改为赋予等同于回复量的[屏障]。',
  'Lion Stance also converts 25% of his max HP to Shield.': '[威武雄姿]额外将最大生命值的 25% 转化为[屏障]。',
  'Performing a charged parry while buffed by Lion Stance extends the duration of Jammed.': '[威武雄姿]期间成功发动蓄力反击时，延长[背水]的持续时间。',
  "At Eternal Rage lvl 10, performing a fully charged Raging Fist grants a 10% chance to reset Lion Stance's cooldown": '[古今无双]达到 10 级时，发动完全蓄力的[直冲拳]有 10% 概率重置[威武雄姿]的冷却时间。',
  'Upon reaching Eternal Rage lvl 10: 10% chance to gain DMG Cut (20%)': '[古今无双]达到 10 级时：有 10% 概率获得[伤害减免]（20%）。',
  'Essence Rank Perk 1: Ghandagoza gains an additional ATK +5% and DMG Cap +5%': '冈达葛萨的攻击力额外 +5%、伤害上限额外 +5%。',
  'Essence Rank Perk 3: Green and mega potions grant 10% more Shield': '绿色药水与强效药水赋予的[屏障]效果量 +10%。',
  'While Hostility↑ is in effect: Raging Fist Charge Time -5%': '[敌对心提升]期间，[直冲拳]蓄力时间 -5%。',
  'Jammed grants an additional ATK +50%, but Ghandagoza suffers from DEF -10%': '[背水]额外使攻击力 +50%，但冈达葛萨的防御力 -10%。',
  "Essence Rank Perk 2: Lion Stance's DEF↑ grants an additional DEF +5%": '[威武雄姿]赋予的[防御提升]效果量额外 +5%。',
  'Dhyana now grants Shield (10% of max HP) instead of healing HP': '[禅定]改为赋予相当于最大生命值 10% 的[屏障]，不再回复生命值。',
  'Raging Technique': '直冲绝技拳',
  'Landing a fully charged Raging Fst shortens skill cooldowns by a max of 3% and is based on Eternal Rage lvl.': '完全蓄力的[直冲拳]命中时，根据[古今无双]等级使能力冷却时间最多缩短 3%。',
  "Ghandagoza's damage skills gain ATK +20% and DMG Cap +50%.": '冈达葛萨的攻击类能力攻击力 +20%、伤害上限 +50%。',
  'Raging Fist charges faster but deals 10% less damage.': '[直冲拳]蓄力速度加快，但造成伤害 -10%。',
  'Landing damage skills deals Supplementary DMG (20%) and raises Eternal Rage lvl by 3.': '攻击类能力命中时触发造成伤害 20% 的追击，并使[古今无双]等级提升 3。',
  'Crux Rank Perk 1: Further shortens skill cooldowns by a max of 2%': '能力冷却时间最多额外缩短 2%。',
  'Crux Rank Perk 3: Damage skills deal an additional Supplementary DMG +20%': '攻击类能力触发的追击效果量额外 +20%。',
  'Boosts DEF by a max of +10% based on how low Eternal Rage lvl is': '[古今无双]等级越低，防御力提升越多，最多 +10%。',

  // 菲莉
  'Ferry': '菲莉',
  'Phantastic Pets': '宠物强化',
  'Pets gain ATK +10% and DMG Cap +20%.': '宠物的攻击力 +10%、伤害上限 +20%。',
  'Pet finishers deal 50% more damage.': '宠物收招的造成伤害 +50%。',
  'In exchange, skill cooldowns extend by 10%.': '作为代价，能力冷却时间延长 10%。',
  'Pets have a 30% chance to stay summoned.': '宠物有 30% 概率不会离场。',
  'Ferry and her pets deal up to 50% more damage based on how long all pets remain on the battlefield.': '根据所有宠物同时留在场上的时间，使菲莉与宠物的造成伤害最多 +50%。',
  'At max effect, Ferry gains Debuff Immunity.': '效果达到最大时，菲莉获得[弱化免疫]。',
  'While a pet is summoned: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) ATK +10%': '有宠物在场时：普通攻击的攻击力 +10%。',
  'While a pet is summoned: Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) ATK +10%': '有宠物在场时：特殊攻击的攻击力 +10%。',
  'While a pet is summoned: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) DMG Cap +30%': '有宠物在场时：普通攻击的伤害上限 +30%。',
  'While a pet is summoned: Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) DMG Cap +30%': '有宠物在场时：特殊攻击的伤害上限 +30%。',
  'Insight Rank Perk 2: Pet Finisher DMG Dealt +30% / Skill Cooldown +10%': '宠物收招的造成伤害 +30%／能力冷却时间 +10%。',
  'While a pet is summoned: DEF +3%': '有宠物在场时：防御力 +3%。',
  'While a pet is summoned: DMG Dealt +5%': '有宠物在场时：造成伤害 +5%。',
  'While no pet is summoned: Skill Cooldown -5%': '没有宠物在场时：能力冷却时间 -5%。',
  "Sic 'Em, Geegee!: Slow Duration +10%": '[吉吉，拖住对手！]赋予的[缓速]持续时间 +10%。',
  'Self-Reliant Ghost': '孤高幽灵',
  'While no pets are summoned, Ferry gains ATK +10% and DEF +5%.': '没有宠物在场时，菲莉的攻击力 +10%、防御力 +5%。',
  'Whenever a pet leaves, Ferry gains a lvl of Loving Trust (max lvl 9).': '每当宠物离场时，菲莉获得 1 级[爱之信赖]（最高 9 级）。',
  'While in effect, it grants ATK +10% per effect lvl.': '效果持续期间，每级使攻击力 +10%。',
  'In addition, pets can now leave during link time.': '此外，宠物在连锁时域中也可以离场。',
  'Pets leave 95% faster.': '宠物的离场速度加快 95%。',
  'Whenever a pet leaves, Ferry gains Supplementary DMG (50%).': '每当宠物离场时，赋予菲莉[追击]（50%）。',
  "At Loving Trust lvl 9, Ferry's launch and aerial barrage attack specs are greatly enhanced, but Loving Trust's duration becomes 12 sec.": '[爱之信赖]达到 9 级时，菲莉的挑空与空中连打性能大幅强化，但[爱之信赖]的持续时间变为 12 秒。',
  'Upon entering link time, Ferry gains Loving Trust lvl 9.': '进入连锁时域时，菲莉获得 9 级[爱之信赖]。',
  'While no pet is summoned: DMG Cap +30%': '没有宠物在场时：伤害上限 +30%。',
  'Essence Rank Perk 2: Gaining a lvl of Loving Trust also restores HP': '获得[爱之信赖]等级时，同时回复生命值。',
  'Pet DMG Cap +35%. Onslaught always dismisses pets': '宠物伤害上限 +35%；发动[猛攻]时宠物必定离场。',
  'Essence Rank Perk 2: Loving Trust also grants DEF +1% per effect lvl': '[爱之信赖]每级额外使防御力 +1%。',
  'Essence Rank Perk 2: Loving Trust also grants DMG Cap +20% per effect lvl': '[爱之信赖]每级额外使伤害上限 +20%。',
  'Whenever a pet is summoned: Gain Shield (1000)': '每当召唤宠物时，获得[屏障]（1000）。',
  'Essence Rank Perk 2: Loving Trust also grants DMG Dealt +3% per effect lvl': '[爱之信赖]每级额外使造成伤害 +3%。',
  'Essence Rank Perk 3: Supplementary DMG +20% whenever a pet leaves': '宠物离场时赋予的[追击]效果量 +20%。',
  'Spirited Support': '辅助特化',
  'Extends buff and debuff duration from skills by 10%.': '能力赋予的强化与弱化效果持续时间延长 10%。',
  'Whenever all pets are summoned, Ferry gains a lvl of Spiritbond (max lvl 3), and up to 1 random ally has a chance to gain a lvl of Spiritbond.': '所有宠物都在场时，菲莉获得 1 级[灵魂羁绊]（最高 3 级），并有概率使至多 1 名随机队友获得 1 级[灵魂羁绊]。',
  'While in effect, it grants ATK +5% per effect lvl.': '效果持续期间，每级使攻击力 +5%。',
  'Whenever all pets leave together, Ferry gains a lvl of Spiritbond, and up to 3 random allies have a chance to gain a lvl of Spiritbond.': '所有宠物同时离场时，菲莉获得 1 级[灵魂羁绊]，并有概率使至多 3 名随机队友获得 1 级[灵魂羁绊]。',
  'While in effect, it now grants ATK +5% and DMG Cap +15% per effect lvl.': '效果持续期间，每级使攻击力 +5%、伤害上限 +15%。',
  'In addition, whenever Spiritbond reaches lvl 3, it grants Shield (2000).': '此外，[灵魂羁绊]达到 3 级时，赋予[屏障]（2000）。',
  'Crux Rank Perk 2: Spiritbond also grants DMG Dealt +3% per effect lvl': '[灵魂羁绊]每级额外使造成伤害 +3%。',
  'Crux Rank Perk 3: Shield Strength +1000. Upon entering link time, the entire party gains max lvl Spiritbond': '[屏障]效果量 +1000；进入连锁时域时，全队获得最高等级的[灵魂羁绊]。',
  'Pet DMG Cap +30%': '宠物伤害上限 +30%。',
  'Benediction: Buff Duration +10% (Regen / DEF↑ / ATK↑)': '[幻灵祝福]的强化效果持续时间 +10%（再生／防御提升／攻击提升）。',
  'Hinrichten: Buff Duration +10% (ATK↑ / Critical Hit Rate↑ / Supplementary DMG / Invincibility)': '[强化之光]的强化效果持续时间 +10%（攻击提升／暴击率提升／追击／无敌）。',

  // 齐格飞
  'Siegfried': '齐格飞',
  'Perfect Striker': '精准攻击特化',
  'Upon performing a perfect execution, Siegfried gains a lvl of Dragonsbane Pulse (max lvl 3).': '成功发动精准攻击时，齐格飞获得 1 级[屠龙律动]（最高 3 级）。',
  'While in effect, it grants ATK +3% per effect lvl.': '效果持续期间，每级使攻击力 +3%。',
  "Dragonsbane Pulse's max lvl is now 5, and it also grants DMG Cap +3% per effect lvl.": '[屠龙律动]的最高等级提升至 5，且每级额外使伤害上限 +3%。',
  'Dragonsbane Pulse no longer expires, but failing a perfectly timed attack removes the effect.': '[屠龙律动]不再随时间解除，但精准攻击失败时会解除。',
  "Dragonsbane Pulse's max lvl is now 7.": '[屠龙律动]的最高等级提升至 7。',
  'At lvl 7, Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) become perfect executions for 9 sec.': '达到 7 级时，特殊攻击在 9 秒内视为精准攻击。',
  'Afterwards, Dragonsbane Pulse falls back to lvl 6.': '效果结束后，[屠龙律动]降至 6 级。',
  'Insight Rank Perk 1: Dragonsbane Pulse grants an additional ATK +2% per effect lvl': '[屠龙律动]每级额外使攻击力 +2%。',
  'Perfect Strikes: ATK +10%': '精准攻击的攻击力 +10%。',
  'Insight Rank Perk 1: At Dragonsbane Pulse lvl 3 and above, it grants DMG Cap +5%': '[屠龙律动]达到 3 级以上时，伤害上限 +5%。',
  'Draconic Release: Stackable ATK↑ grants an additional ATK +5% and Duration +10% per stack': '[龙气外释]赋予的[攻击提升（可叠加）]每层效果量额外 +5%、持续时间 +10%。',
  'Insight Rank Perk 2: At Dragonsbane Pulse lvl 5 and above, it grants DEF +5%': '[屠龙律动]达到 5 级以上时，防御力 +5%。',
  'Insight Rank Perk 3: Dragonsbane Pulse lvl 7 Duration +30%': '[屠龙律动]7 级效果的持续时间 +30%。',
  'Insight Rank Perk 3: At Dragonsbane Pulse lvl 7, perfect executions gain DMG Dealt +5%': '[屠龙律动]达到 7 级时，精准攻击的造成伤害 +5%。',
  'Salvator: Buff Duration 10% (Debuff Immunity / Drain)': '[救世之力]的强化效果持续时间 +10%（弱化免疫／吸血）。',
  'Skilled Slayer': '攻击类能力强化',
  'Upon performing a perfect execution, Siegfried gains a lvl of Dark Zeal (max lvl 1).': '成功发动精准攻击时，齐格飞获得 1 级[暗之斗志]（最高 1 级）。',
  "While in effect, it grants ATK +20% and DMG Cap +20% to Siegfried's next damage skill and is consumed on activation.": '效果持续期间，使齐格飞下一次攻击类能力的攻击力 +20%、伤害上限 +20%，发动后消耗。',
  'Performing perfect executions shortens damage skill cooldowns by 10%.': '成功发动精准攻击时，攻击类能力冷却时间缩短 10%。',
  "Dark Zeal's max lvl is now 5.": '[暗之斗志]的最高等级提升至 5。',
  'Activating damage skills no longer consumes the effect, but failing a perfect attack removes it.': '发动攻击类能力不再消耗效果，但精准攻击失败时会解除。',
  'At lvl 1: Skill ATK +30% / Skill DMG Cap +50%': '达到 1 级时：能力攻击力 +30%／能力伤害上限 +50%。',
  'At lvl 2+: Skill ATK +10% / Skill DMG Cap +40% per effect lvl': '达到 2 级以上时：每级使能力攻击力 +10%、能力伤害上限 +40%。',
  'At lvl 5: Greatly shortens damage skill cooldowns.': '达到 5 级时，大幅缩短攻击类能力的冷却时间。',
  'Essence Rank Perk 1: At lvl 1: Dark Zeal grants an additional ATK +5%; At lvl 2+: Grants an additional ATK +1% per effect lvl': '[暗之斗志]达到 1 级时攻击力额外 +5%；达到 2 级以上时，每级攻击力额外 +1%。',
  'Essence Rank Perk 1: At lvl 1: Dark Zeal grants an additional DMG Cap +10%; At lvl 2+: Grants an additional DMG Cap +5% per effect lvl': '[暗之斗志]达到 1 级时伤害上限额外 +10%；达到 2 级以上时，每级伤害上限额外 +5%。',
  'Skill DMG +2%': '能力伤害 +2%。',
  'Essence Rank Perk 3: Dark Zeal grants an additional ATK +3% per effect lvl': '[暗之斗志]每级额外使攻击力 +3%。',
  'Essence Rank Perk 3: Dark Zeal grants an additional DMG Cap +5% per effect lvl': '[暗之斗志]每级额外使伤害上限 +5%。',
  'Fueled by Pain': '死境之剑',
  "Boosts L'Ombre d'Hier's ATK by a max of +100% based on the strength of Siegfried's DMG Cut (60%-100%).": '根据齐格飞的[伤害减免]效果量（60%～100%），使[昨日之影]的攻击力最多 +100%。',
  'Siegfried now gains Substitute from his buffing skills.': '齐格飞的强化类能力额外赋予自身[挺身而出]。',
  'Whenever he takes damage in place of an ally or performs a link attack, he gains a permanent lvl of Daybreak (max lvl 5).': '代替队友承受伤害或发动连锁攻击时，永久获得 1 级[黎明]（最高 5 级）。',
  'While in effect, it grants ATK +5% and DMG Cap +10% per effect lvl.': '效果持续期间，每级使攻击力 +5%、伤害上限 +10%。',
  "Upon countering with L'Ombre d'Hier, pressing Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) with perfect timing triggers a perfect execution and shortens its cooldown by 50%.": '以[昨日之影]成功反击时，精准输入特殊攻击会发动精准攻击，并使该能力冷却时间缩短 50%。',
  "Daybreak's max lvl is now 10.": '[黎明]的最高等级提升至 10。',
  'At lvl 10, perfect executions gain DMG Dealt +10%, and gaining another effect lvl grants Supplementary DMG (20%).': '[黎明]达到 10 级时，精准攻击的造成伤害 +10%；再次获得等级时，赋予自身[追击]（20%）。',
  'Entering critical condition lowers Daybreak lvl by 1.': '进入濒死状态时，[黎明]等级降低 1。',
  "Crux Rank Perk 1: Boosts L'Ombre d'Hier's ATK by up to an additional +25%": '[昨日之影]的攻击力最多额外 +25%。',
  'Mirage: DMG Cut (70%) Duration +10%': '[幻甲]赋予的[伤害减免]（70%）持续时间 +10%。',
  'Crux Rank Perk 3: At Daybreak lvl 10, perfect executions gain an additional DMG Dealt +5%': '[黎明]达到 10 级时，精准攻击的造成伤害额外 +5%。',
  'Perfect Strikes: DMG Cap +40%': '精准攻击的伤害上限 +40%。',
  'Perfect Executions: DMG Cap +40%': '精准攻击的伤害上限 +40%。',

  // 贝阿朵丽丝
  'Beatrix': '贝雅特丽克丝',
  'Hungry for Causality': '咬因果特化',
  'Whenever Beatrix lands combo finishers in Devour Causality, her skill cooldowns shorten by 5%.': '[游影自如]期间，贝雅特丽克丝的连击收招命中时，能力冷却时间缩短 5%。',
  'While in Devour Causality, Beatrix gains DMG Cap +70%.': '[游影自如]期间，贝雅特丽克丝的伤害上限 +70%。',
  'While not in Devour Causality, the Embrasque gauge fills 5% slower.': '未处于[游影自如]时，恩布拉斯克槽的提升量 -5%。',
  'While in Devour Causality, landing damage skills or dodging a hit with Unchained now fills the Embrasque gauge.': '[游影自如]期间，攻击类能力命中或以[破绽残影]闪避攻击时，提升恩布拉斯克槽。',
  'After 30 sec., the gauge depletes faster.': '经过 30 秒后，槽值消耗速度加快。',
  'While not in Devour Causality, the Embrasque gauge fills a further 5% slower.': '未处于[游影自如]时，恩布拉斯克槽的提升量额外 -5%。',
  'While in Devour Causality: ATK +10%': '[游影自如]期间：攻击力 +10%。',
  'While Delta Clock is in Red Attack Position: Beatrix gains DMG Dealt +5% but takes 20% more auto DMG': '三相时钟处于红色攻击位时：贝雅特丽克丝的造成伤害 +5%，但自动伤害 +20%。',
  'While Delta Clock is in Green Healing Position: Regen gains Healing +1%': '三相时钟处于绿色回复位时：[再生]回复量 +1%。',
  'While Delta Clock is in Yellow Defense Position: Removes 1 debuff every 20 sec. Shifting the clock hand resets the timer': '三相时钟处于黄色防御位时：每 20 秒解除 1 个弱化效果；切换指针会重置计时。',
  'Insight Rank Perk 2: While in Devour Causality: Beatrix gains an additional DMG Cap +50%': '[游影自如]期间：贝雅特丽克丝的伤害上限额外 +50%。',
  'While in Devour Causality: Skill DMG Cap +40%': '[游影自如]期间：能力伤害上限 +40%。',
  'Rising Nova: Boosts the effect strength of Rising Nova': '[新星跃升]的效果量提升。',
  'While not in Devour Causality: DMG Cap +40%': '未处于[游影自如]时：伤害上限 +40%。',
  'Eternity Loop: Slow Duration +10%': '[永恒征程]赋予的[缓速]持续时间 +10%。',
  'On the Clock': '三相时钟强化',
  'Delta Clock is enhanced:': '强化三相时钟：',
  'Red Attack Position grants an additional DMG Dealt +2%.': '红色攻击位额外使造成伤害 +2%。',
  'Yellow Defense Position grants an additional DEF +2%.': '黄色防御位额外使防御力 +2%。',
  'Green Healing Position grants an additional Regen +2%.': '绿色回复位额外使[再生]效果量 +2%。',
  'Upon landing normal combo finishers, or power finishers in Devour Causality, Beatrix gains enhanced Delta Clock buffs.': '普通连击收招命中，或[游影自如]期间强力收招命中时，贝雅特丽克丝获得强化后的三相时钟效果。',
  'Red Attack Position: SBA DMG Cap +30%': '红色攻击位：奥义伤害上限 +30%。',
  'Yellow Defense Position: Damage Skill DMG Cap +30%': '黄色防御位：攻击类能力伤害上限 +30%。',
  'Green Healing Position: Normal Attack DMG Cap +30%': '绿色回复位：普通攻击伤害上限 +30%。',
  'When Embrasque gauge is full, landing a combo finisher while buffed by the aforementioned buffs activates Devour Causality.': '恩布拉斯克槽蓄满时，处于上述强化效果下发动连击收招会进入[游影自如]。',
  'While buffed by the aforementioned buffs in Essence Rank Perk 2 during Devour Causality, landing power finishers grants lvls of Embrasque Unleashed (max lvl 10).': '[游影自如]期间处于上述强化效果下时，强力收招命中会获得[恩布拉斯克解放]等级（最高 10 级）。',
  'While in effect, it grants DMG Cap +20% per effect lvl.': '效果持续期间，每级使伤害上限 +20%。',
  'Upon reaching lvl 10, Beatrix gains Red Attack / Yellow Defense / Green Healing Clock buffs and can perform Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers at any time.': '达到 10 级时，贝雅特丽克丝同时获得红色攻击位／黄色防御位／绿色回复位效果，并可随时发动特殊攻击连击收招。',
  'When Devour Causality ends, all Clock buffs are removed.': '[游影自如]结束时，解除所有时钟强化效果。',
  'Essence Rank Perk 1: Red Attack Position: Additional DMG Dealt +2% / Yellow Defense Position: Additional DEF +2% / Green Healing Position: Additional Regen +2%': '红色攻击位：造成伤害额外 +2%／黄色防御位：防御力额外 +2%／绿色回复位：[再生]效果量额外 +2%。',
  'While Delta Clock is in Green Healing Position during Devour Causality: Drain Cap +10%': '[游影自如]期间三相时钟处于绿色回复位时：吸血上限 +10%。',
  'While Delta Clock is in Yellow Defense Position: DEF +5%': '三相时钟处于黄色防御位时：防御力 +5%。',
  'Essence Rank Perk 2: Buff Duration +20% (Naed Nulli Excel Red Attack Position / Naed Seitset Excel Yellow Defense Position / Naed Nelja Excel Green Healing Position)': '三相时钟强化效果持续时间 +20%（红色攻击位／黄色防御位／绿色回复位）。',
  'Riding Free: ATK +10%': '[自由驰骋]攻击力 +10%。',
  'While Delta Clock is in Red Attack Position: Auto DMG -5%': '三相时钟处于红色攻击位时：自动伤害 -5%。',
  'While in Devour Causality: DMG Dealt +5%': '[游影自如]期间：造成伤害 +5%。',
  'Essence Rank Perk 3: At Embrasque Unleashed lvl 10, Beatrix also gains DMG Dealt +20%': '[恩布拉斯克解放]达到 10 级时，贝雅特丽克丝的造成伤害额外 +20%。',
  'Hearts on Fire: Cooldown -5%': '[热情燃烧]冷却时间 -5%。',
  'Every 3 activations of Unchained heals Beatrix for 1000 HP': '每发动 3 次[破绽残影]，回复贝雅特丽克丝 1000 点生命值。',
  'Skill Chain': '能力连锁',
  "Beatrix's damage skills gain ATK +10% and DMG Cap +20%.": '贝雅特丽克丝的攻击类能力攻击力 +10%、伤害上限 +20%。',
  'Upon landing a fully charged Embrasque Sword, its skill slot becomes a 3-skill combo in the order of Riding Free, Hearts on Fire, and Thunderbird; those skills gain DMG Cap +100%': '完全蓄力的[恩布拉斯克之剑]命中后，该能力栏位依次变为[自由驰骋]、[热情燃烧]、[雷鸟]的三段能力连锁；这些能力的伤害上限 +100%。',
  'In exchange, Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) and Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) deal 10% less damage.': '作为代价，普通攻击与特殊攻击的造成伤害 -10%。',
  'When Beatrix completes the skill combo in Crux Rank Perk 2, she gains Skill DMG↑.': '贝雅特丽克丝完成上述能力连锁时，获得[能力伤害提升]。',
  'While in effect, it grants Skill ATK +20% and Skill DMG Cap +50%.': '效果持续期间，能力攻击力 +20%、能力伤害上限 +50%。',
  'In addition, her skills gain Cooldown -70%.': '此外，能力冷却时间 -70%。',
  "Failing to complete the combo inflicts Beatrix with Skill Sealed for 15 sec. it can't be removed.": '未能完成能力连锁时，贝雅特丽克丝陷入无法解除的[能力封印]，持续 15 秒。',
  'While Delta Clock is in Red Attack Position during Devour Causality: Supplementary DMG +10% / Auto DMG +10%': '[游影自如]期间三相时钟处于红色攻击位时：[追击]效果量 +10%／自动伤害 +10%。',
  "Boosts Beatrix's ATK by a max of +10% based on the number of Devour Causality activations during the quest": '根据本次任务中进入[游影自如]的次数，使贝雅特丽克丝的攻击力最多 +10%。',
  'While in Devour Causality: Embrasque Sword Charge Time -20%': '[游影自如]期间：[恩布拉斯克之剑]蓄力时间 -20%。',
  'Hearts on Fire: Drain Amount +10% / Drain Cap +10%': '[热情燃烧]吸血量 +10%／吸血上限 +10%。',
  'While in Devour Causality: DMG Cap +30%': '[游影自如]期间：伤害上限 +30%。',
  'While Delta Clock is in Green Healing Position during Devour Causality: When Beatrix triggers Drain at full HP, she gains Shield (3000). She can gain Shield again this way with a new clock cycle': '[游影自如]期间三相时钟处于绿色回复位时：满生命值触发吸血会获得[屏障]（3000）；进入新的时钟循环后可再次触发。',
  'Crux Rank Perk 2: Skills in the skill combo gain an additional DMG Cap +50%. In addition, Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain DMG Dealt +10%': '能力连锁中的能力伤害上限额外 +50%；此外，普通攻击与特殊攻击的造成伤害 +10%。',
  'Crux Rank Perk 3: Skill DMG↑ grants an additional Skill ATK +5% and Skill DMG Cap +20%': '[能力伤害提升]额外使能力攻击力 +5%、能力伤害上限 +20%。',
  'Riding Free: DMG Cap +45%': '[自由驰骋]伤害上限 +45%。',
  'Fully charged Embrasque Sword gains ATK +10% and DMG Cap +45%': '完全蓄力的[恩布拉斯克之剑]攻击力 +10%、伤害上限 +45%。',

  // 尤斯提斯
  'Eustace': '尤斯提斯',
  'Keep Your Foes Closer': '近距离射击特化',
  'Grade III and IV shots deal 5% more damage when fired within effective range.': '在有效射程内发射时，三级与四级射击的造成伤害 +5%。',
  'Landing a Grade IV shot within effective range grants Shield (5000) to Eustace.': '四级射击在有效射程内命中时，赋予尤斯提斯[屏障]（5000）。',
  'In exchange, effective range is shortened.': '作为代价，有效射程缩短。',
  'Grade IV shots gain ATK +30% and DMG Cap +150%.': '四级射击的攻击力 +30%、伤害上限 +150%。',
  'Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) now fires a 3-bullet spread.': '普通攻击改为同时散射 3 发子弹。',
  'In exchange, effective range is shortened even further and damage dealt beyond effective range is greatly reduced.': '作为代价，有效射程进一步缩短，且超出有效射程时的造成伤害大幅降低。',
  'Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): Charge Time -5%': '蓄力普通攻击：蓄力时间 -5%。',
  'Grade II Shots: ATK +10%': '二级射击：攻击力 +10%。',
  'Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): Charge Time -5%': '蓄力普通攻击：蓄力时间 -5%。',
  'Grade II Shots: DMG Cap +30%': '二级射击：伤害上限 +30%。',
  'Grade III Shots: ATK +10%': '三级射击：攻击力 +10%。',
  'Upon performing a perfect dodge with Fast Lane: Loaded Gauge Gain +20%': '以[雷光迅步]发动精准闪避时：装填槽提升量 +20%。',
  'Grade III Shots: DMG Cap +30%': '三级射击：伤害上限 +30%。',
  'Grade IV Shots: ATK +10%': '四级射击：攻击力 +10%。',
  'Effective range is slightly longer': '有效射程略微延长。',
  'Never Surrender: Buff Duration +10% (Mirror Image / Supplementary DMG)': '[不屈之志]的强化效果持续时间 +10%（幻影／追击）。',
  'Grade IV Shots gain DMG Cap +40%': '四级射击的伤害上限 +40%。',
  'Lightning Soldier': '奔雷',
  "Landing a Grade IV shot shortens Eustace's damage skill cooldowns by 1%.": '四级射击命中时，尤斯提斯的攻击类能力冷却时间缩短 1%。',
  "Foe attacks won't interrupt Eustace while he's casting Heaven Comes Down or Flamek Thunder.": '发动[撼地天雷]或[弗拉梅克之雷]期间，尤斯提斯不会被敌人的攻击打断。',
  'Both skills also gain DMG Cap +50%, but Heaven Comes Down no longer inflicts Paralysis.': '两种能力的伤害上限 +50%，但[撼地天雷]不再赋予[麻痹]。',
  'After landing enough hits and a finisher with Heaven Comes Down, up to 2 foes become marked.': '[撼地天雷]命中一定次数并以收招命中后，最多标记 2 名敌人。',
  'Hitting a marked foe with a fully charged Flamek Thunder deals 150% bonus DMG, and shortens the cooldowns of Flamek Thunder and Heaven Comes Down by 40%.': '完全蓄力的[弗拉梅克之雷]命中被标记的敌人时，造成 150% 额外伤害，并使[弗拉梅克之雷]与[撼地天雷]的冷却时间缩短 40%。',
  'Upon a perfect reload: Loaded Gauge Gain +10%': '精准装填时：装填槽提升量 +10%。',
  'Extends the window of time to perform a perfect reload by 10%': '精准装填的判定时间延长 10%。',
  'Essence Rank Perk 3: Marked foes +1': '可标记的敌人数 +1。',
  "After emptying the clip: Performing a perfect reload restores 10% of Eustace's HP": '弹匣射空后，发动精准装填会回复尤斯提斯 10% 的生命值。',
  'Forever Yours: Now chains up to 10 times': '[不朽之誓]的连锁次数提升至最多 10 次。',
  'Perfectionist': '完美射击',
  'Grade IV shots gain DMG Cap +20%': '四级射击的伤害上限 +20%。',
  'Upon firing a Grade IV shot, Eustace gains a lvl of Flamek Unleashed (max lvl 2).': '发射四级射击时，尤斯提斯获得 1 级[弗拉梅克解放]（最高 2 级）。',
  'While in effect, it grants ATK +5% and DMG Cap +5% per effect lvl.': '效果持续期间，每级使攻击力 +5%、伤害上限 +5%。',
  'Performing a perfect reload right after a Grade IV shot boosts Loaded Gauge Gain by 10%, but taking any damage removes Flamek Unleashed.': '四级射击后立即精准装填时，装填槽提升量 +10%；受到伤害时解除[弗拉梅克解放]。',
  "Flamek Unleashed's max lvl is now 3 and doesn't expire.": '[弗拉梅克解放]的最高等级提升至 3，且不再随时间解除。',
  'It now grants ATK +10% and DMG Cap +8% per effect lvl instead.': '效果改为每级使攻击力 +10%、伤害上限 +8%。',
  'Upon gaining Flamek Unleashed lvl 3, reloading for the first time fills the clip with bullets for Grade IV shots.': '获得 3 级[弗拉梅克解放]后，首次装填会将弹匣装满四级射击弹药。',
  'Reloading a second time removes Flamek Unleashed.': '第二次装填时解除[弗拉梅克解放]。',
  'Upon perfect dodging with Strafe Shot and landing the shot: Loaded Gauge Gain +10%': '以扫射发动精准闪避并使射击命中时：装填槽提升量 +10%。',
  'Crux Rank Perk 1: Grade IV shots gain an additional DMG Cap +5%': '四级射击的伤害上限额外 +5%。',
  'Strafe Shot gains DMG Cap +25%': '扫射的伤害上限 +25%。',
  'Play with Fire: Cooldown -5%': '[玩火]冷却时间 -5%。',
  'Landing a counter with Acidrage Howl shortens its cooldown by 10%': '以[怒号连击]成功反击时，使其冷却时间缩短 10%。',
  'Crux Rank Perk 2: Flamek Unleashed grants an additional ATK +3% and DMG Cap +3% per effect lvl': '[弗拉梅克解放]每级额外使攻击力 +3%、伤害上限 +3%。',
  'Grade IV shots gain a max of DMG Dealt +10% based on the number of perfect reloads performed during the quest': '根据本次任务中发动精准装填的次数，使四级射击的造成伤害最多 +10%。',
  'Crux Rank Perk 3: Performing a perfect dodge with a charged Strafe Shot also grants a lvl of Flamek Unleashed': '以蓄力扫射发动精准闪避时，额外获得 1 级[弗拉梅克解放]。',
  'Play with Fire: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): ATK +5%': '[玩火]期间：普通攻击的攻击力 +5%。',
  'Crux Rank Perk 3: Flamek Unleashed also grants DMG Dealt +1% per effect lvl': '[弗拉梅克解放]每级额外使造成伤害 +1%。',

  // 希耶提
  'Seofon': '希耶提',
  'Fueling the Avatar': '剑神召唤强化',
  'While an avatar is summoned at max Swordshine lvl, avatar finishers gain DMG Cap +10%.': '剑光达到最高等级且剑神在场时，剑神收招的伤害上限 +10%。',
  'Landing combo finishers, damage skills, or link attacks fills the Avatar gauge by 5%, but the gauge depletes 30% faster while an avatar is summoned.': '连击收招、攻击类能力或连锁攻击命中时，剑神槽提升 5%；剑神在场时，剑神槽消耗速度加快 30%。',
  'While an avatar is summoned at Swordshine lvl 2 or above, Seofon gains a lvl of Samudaya (max lvl 5).': '剑光达到 2 级以上且剑神在场时，希耶提获得 1 级[三昧耶]（最高 5 级）。',
  'While in effect, it grants DMG Dealt +5% and gains a lvl every 7 sec.': '效果持续期间，造成伤害 +5%，并每 7 秒提升 1 级。',
  'At lvl 2 and above, it grants DMG Dealt +10% per effect lvl.': '达到 2 级以上时，每级使造成伤害 +10%。',
  'When avatar leaves, Samudaya is removed.': '剑神离场时，解除[三昧耶]。',
  'If the avatar was dismissed by avatar finisher, Swordshine starts at lvl 2 on next summon.': '若剑神因剑神收招而离场，下次召唤时剑光从 2 级开始。',
  'Upon landing a combo finisher: Avatar Gauge Gain +10%': '连击收招命中时：剑神槽提升量 +10%。',
  'Insight Rank Perk 2: Landing damage skills boosts Avatar Gauge Gain by an additional 10%': '攻击类能力命中时，剑神槽提升量额外 +10%。',
  'While an avatar is summoned: ATK +10%': '剑神在场时：攻击力 +10%。',
  'Upon summoning an avatar: Swordshine now starts from at least lvl 1': '召唤剑神时：剑光至少从 1 级开始。',
  'While an avatar is summoned: DMG Cap +40%': '剑神在场时：伤害上限 +40%。',
  'Sword Tempest': '剑雨',
  'Infinito Creare gains ATK +10%.': '[无尽剑阵]的攻击力 +10%。',
  "Infinito Creare gains DMG Cap +30% and foe attacks won't interrupt Seofon during activation.": '[无尽剑阵]的伤害上限 +30%，且发动期间希耶提不会被敌人的攻击打断。',
  'While Swordshine is at max lvl, Infinito Creare gains DMG Cap +50% and can now be held to activate continuously (consumes Avatar gauge).': '剑光达到最高等级时，[无尽剑阵]的伤害上限 +50%，且可长按持续发动（消耗剑神槽）。',
  'When Infinito Creare consumes the last of the Avatar gauge, Seofon performs an avatar finisher.': '[无尽剑阵]耗尽剑神槽时，希耶提发动剑神收招。',
  "Infinito Creare can be reactivated from a dodge as long as the Avatar gauge isn't empty.": '只要剑神槽尚未耗尽，闪避后可再次发动[无尽剑阵]。',
  "All skills except Seven-Star's Brilliance: Cooldown -2%": '除[七星剑闪]外的所有能力冷却时间 -2%。',
  'Essence Rank Perk 1: Infinito Creare gains an additional ATK +10%': '[无尽剑阵]的攻击力额外 +10%。',
  'Avatar Finishers: ATK +10%': '剑神收招：攻击力 +10%。',
  "All skills except Seven-Star's Brilliance: Cooldown -5%": '除[七星剑闪]外的所有能力冷却时间 -5%。',
  'Avatar Finishers: DMG Cap +30%': '剑神收招：伤害上限 +30%。',
  'Tag Team': '剑神切换特化',
  'Whenever an avatar is summoned or dismissed, Seofon gains Stout Heart and recovers 10% of max HP.': '每当召唤剑神或剑神离场时，希耶提获得[刚健]并回复最大生命值的 10%。',
  'The healing effect has a 30-second cooldown.': '该回复效果有 30 秒冷却时间。',
  'Alternating between landing Combo D with and without an avatar summoned grants different effects to Seofon.': '交替在剑神在场与不在场时使特定连击命中，会分别赋予希耶提不同效果。',
  'Each effect has a max lvl of 4.': '两种效果的最高等级均为 4。',
  'Without avatar: Sovereign (DMG Cap +5% per effect lvl)': '剑神不在场：[君临]（每级伤害上限 +5%）。',
  'With avatar: Star Sea (ATK +5% per effect lvl)': '剑神在场：[星海]（每级攻击力 +5%）。',
  'When Sovereign and Star Sea both reach lvl 4:': '当[君临]与[星海]均达到 4 级时：',
  'Swordshine lvl becomes maxed out.': '剑光等级提升至最高。',
  'Damage skills have no cooldown.': '攻击类能力没有冷却时间。',
  "Avatar finishers don't dismiss avatars.": '剑神收招不会使剑神离场。',
  'After an avatar has been summoned for 30 sec., the Avatar gauge depletes even faster.': '剑神召唤 30 秒后，剑神槽消耗速度进一步加快。',
  'These effects end when dismissing an avatar or when gauge fully depletes.': '剑神离场或剑神槽耗尽时，上述效果结束。',
  'All damage skills then go on cooldown.': '效果结束后，所有攻击类能力进入冷却。',
  'While no avatar is summoned: ATK +10%': '剑神不在场时：攻击力 +10%。',
  'When Swordshine reaches lvl 1 or above: Seofon gains Supplementary DMG; DMG is based on Swordshine lvl': '剑光达到 1 级以上时，希耶提获得[追击]；效果量根据剑光等级提升。',
  'While no avatar is summoned: DMG Cap +25%': '剑神不在场时：伤害上限 +25%。',
  'Crux Rank Perk 2: Sovereign gains an additional DMG Cap +5%': '[君临]额外使伤害上限 +5%。',
  'Crux Rank Perk 2: Star Sea gains an additional ATK +5%': '[星海]额外使攻击力 +5%。',
  "Upon summoning an avatar: Avatar gauge doesn't deplete for a brief amount of time": '召唤剑神时：剑神槽在短时间内不会消耗。',
  'Avatar Finishers: DMG Dealt +5%': '剑神收招：造成伤害 +5%。',
  'Ispirazione: Grants Supplementary DMG (10%)': '[聚灵剑气]赋予自身[追击]（10%）。',
  'Prision de Armas: Slow Duration +10%': '[缚魂剑笼]赋予的[缓速]持续时间 +10%。',

  // 索恩
  'Tweyen': '索恩',
  'Hail to Multilock': '多重瞄准射击特化',
  'At max Ultrasight lvl, a fully charged Multilock Hail gains DMG Cap +20%.': '[超视距]达到最高等级时，完全蓄力的多重瞄准射击伤害上限 +20%。',
  'Upon landing a power finisher, Tweyen gains a lvl of Piercing Gleam (max lvl 5).': '强力收招命中时，索恩获得 1 级[贯穿辉光]（最高 5 级）。',
  'While in effect, it grants Ultrasight Lvl Gain +10% and DMG Dealt +1% per effect lvl to Multilock Hail.': '效果持续期间，每级使多重瞄准射击的[超视距]等级提升量 +10%、造成伤害 +1%。',
  'In addition, Peerless Eye now grants Piercing Gleam lvl 5 instead of Deadshot.': '此外，[弓魔无双]改为赋予 5 级[贯穿辉光]，不再赋予[必中]。',
  "Piercing Gleam's max lvl is now 10, but its duration is shortened.": '[贯穿辉光]的最高等级提升至 10，但持续时间缩短。',
  'At lvl 6 and above, Multilock Hail gains DMG Dealt +2% per effect lvl.': '达到 6 级以上时，每级使多重瞄准射击的造成伤害 +2%。',
  'At lvl 10, it gains Supplementary DMG (10%).': '达到 10 级时，赋予[追击]（10%）。',
  'Peerless Eye now grants Piercing Gleam lvl 10.': '[弓魔无双]改为赋予 10 级[贯穿辉光]。',
  'Multilock Hail: ATK +10%': '多重瞄准射击：攻击力 +10%。',
  'Insight Rank Perk 1: Fully charged Multilock Hail gains an additional DMG Cap +10%': '完全蓄力的多重瞄准射击伤害上限额外 +10%。',
  'While buffed by Deadshot or Piercing Gleam, Tweyen gains DMG Dealt +5%': '[必中]或[贯穿辉光]期间，索恩的造成伤害 +5%。',
  'Insight Rank Perk 2: Piercing Gleam grants an additional DMG Dealt +2% and Ultrasight Lvl Gain +1% per effect lvl': '[贯穿辉光]每级额外使造成伤害 +2%、[超视距]等级提升量 +1%。',
  'Multilock Hail: DMG Cap +35%': '多重瞄准射击：伤害上限 +35%。',
  'Insight Rank Perk 2: Piercing Gleam now starts at lvl 2': '[贯穿辉光]的初始等级提升至 2。',
  'Merculight: Buff Duration +10% (ATK↑ / Mirror Image)': '[信使神光]的强化效果持续时间 +10%（攻击提升／幻影）。',
  'Clinching Victory': '致命一击强化',
  'Whenever Tweyen inflicts a debuff on a foe, she gains a lvl of Enhanced Clincher (max lvl 5).': '索恩对敌人赋予弱化效果时，获得 1 级[致命一击强化]（最高 5 级）。',
  'While in effect, it grants ATK +3% per effect lvl to Clincher.': '效果持续期间，每级使[致命一击]的攻击力 +3%。',
  'Casting Clincher consumes Enhanced Clincher.': '发动[致命一击]时消耗[致命一击强化]。',
  "Enhanced Clincher's max lvl is now 8.": '[致命一击强化]的最高等级提升至 8。',
  'While in effect, Clincher now gains the following buffs per effect lvl.': '效果持续期间，[致命一击]根据效果等级获得以下强化：',
  'Lvl 1-5: ATK +3% and DMG Dealt +5%': '1～5 级：每级攻击力 +3%、造成伤害 +5%。',
  'Lvl 6-8: ATK +10% and DMG Dealt +15%': '6～8 级：每级攻击力 +10%、造成伤害 +15%。',
  "Casting Merculight or Peerless Eye also raises Enhanced Clincher's lvl by 2.": '发动[信使神光]或[弓魔无双]时，[致命一击强化]等级提升 2。',
  'Valiant Weave: Inflicts DEF↓ (30%) but deals 20% less DMG.': '[散矢疾影]赋予[防御降低]（30%），但造成伤害 -20%。',
  'Wheel of Death: Inflicts ATK↓ (30%) but deals 20% less DMG.': '[圆弧散射]赋予[攻击降低]（30%），但造成伤害 -20%。',
  'Lethal Rain: Inflicts Poison but deals 20% less DMG.': '[致命箭雨]赋予[中毒]，但造成伤害 -20%。',
  "When Enhanced Clincher reaches lvl 8: Clincher is reset, and landing Clincher grants a chance to reset 1 of Tweyen's damage skills (excludes Two-Crown's Strife and Clincher).": '[致命一击强化]达到 8 级时，重置[致命一击]；[致命一击]命中时，有概率重置索恩的 1 个攻击类能力（[二王之诤]与[致命一击]除外）。',
  "All skills except Two-Crown's Strife: Cooldown -2%": '除[二王之诤]外的所有能力冷却时间 -2%。',
  'Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): ATK +10%': '蓄力普通攻击：攻击力 +10%。',
  'Essence Rank Perk 1: Enhanced Clincher grants an additional ATK +2% per effect lvl to Clincher': '[致命一击强化]每级额外使[致命一击]的攻击力 +2%。',
  'Boosts ATK by a max of +10% based on the number of debuffs inflicted by Tweyen during the quest': '根据索恩在本次任务中赋予弱化效果的次数，使攻击力最多 +10%。',
  'Boosts DMG Cap by a max of +40% based on the number of debuffs inflicted by Tweyen during the quest': '根据索恩在本次任务中赋予弱化效果的次数，使伤害上限最多 +40%。',
  "All skills except Two-Crown's Strife: Cooldown -3%": '除[二王之诤]外的所有能力冷却时间 -3%。',
  'Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): DMG Cap +35%': '蓄力普通攻击：伤害上限 +35%。',
  'Essence Rank Perk 3: Valiant Weave, Wheel of Death, and Lethal Rain gain DMG Dealt +20%': '[散矢疾影]、[圆弧散射]与[致命箭雨]的造成伤害 +20%。',
  "Two-Crown's Master": '二王之诤特化',
  "Shortens Two-Crown's Strife's cooldown by 10%.": '[二王之诤]冷却时间缩短 10%。',
  "While Two-Crown's Strife is equipped, Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) and Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain Drain.": '装备[二王之诤]时，普通攻击与特殊攻击获得吸血效果。',
  'Whenever Tweyen deals a certain amount of damage, she gains a lvl of both Dawnray and Dull Point (both max lvl 5).': '索恩累计造成一定伤害时，同时获得 1 级[曙光]与[钝点]（均最高 5 级）。',
  "Dawnray boosts Two-Crown's Strife's ATK and DMG Cap per lvl.": '[曙光]每级提升[二王之诤]的攻击力与伤害上限。',
  'Dull Point inflicts Tweyen with a debuff per effect lvl.': '[钝点]每级对索恩赋予 1 个弱化效果。',
  "Activating Two-Crown's Strife removes Dawnray and Dull Point.": '发动[二王之诤]时解除[曙光]与[钝点]。',
  "When Dawnray is removed using Two-Crown's Strife, it grants buffs based on its lvl.": '以[二王之诤]解除[曙光]时，根据其等级赋予强化效果。',
  'Lvl 2: Mirror Image (1 hit) (Self)': '2 级：[幻影]（1 次／自身）。',
  'Lvl 4: DMG Cap↑ (50%) / Mirror Image (1 hit) (Party)': '4 级：[伤害上限提升]（50%）／[幻影]（1 次／全队）。',
  'Lvl 5: DMG↑ (50%) (Self) / (10%) (Allies)': '5 级：[造成伤害提升]（自身 50%／队友 10%）。',
  'Mirror Image and ally buffs last for 30 sec. Other buffs to Tweyen are permanent.': '[幻影]与队友获得的强化效果持续 30 秒；索恩获得的其他强化效果永久持续。',
  'Power Finishers: ATK +10%': '强力收招：攻击力 +10%。',
  'Ultrasight lvl starts at 1': '[超视距]初始等级为 1。',
  'Power Finishers: DMG Cap +30%': '强力收招：伤害上限 +30%。',
  "Two-Crown's Strife: ATK +10%": '[二王之诤]攻击力 +10%。',
  "Crux Rank Perk 1: Shortens Two-Crown's Strife's cooldown by an additional 5%": '[二王之诤]冷却时间额外缩短 5%。',
  'Crux Rank Perk 2: Reduces damage required to gain a lvl of both Dawnray and Dull Point': '降低获得[曙光]与[钝点]等级所需的累计伤害。',
  'Crux Rank Perk 3: DMG↑ grants an additional DMG Dealt +5% (self)': '[造成伤害提升]对自身的效果量额外 +5%。',
  "Upon performing a link attack: Two-Crown's Strife Cooldown -5%": '发动连锁攻击时：[二王之诤]冷却时间 -5%。',
  "Two-Crown's Strife: DMG Cap +45%": '[二王之诤]伤害上限 +45%。',

  // 圣德芬
  'Sandalphon': '圣德芬',
  'Promising Wings': '誓约十二羽翼',
  'Landing Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers boosts Archangel Gauge Gain by 15% and shortens damage skill cooldowns by 1%.': '特殊攻击连击收招命中时，大天司槽提升量 +15%，攻击类能力冷却时间缩短 1%。',
  'While Chromatic Wings is active, Sandalphon gains Limitless Light.': '[十二枚羽翼]期间，圣德芬获得[无尽之光]。',
  'While in effect, it grants ATK +20%.': '效果持续期间，攻击力 +20%。',
  "During link time, Limitless Light's duration doesn't deplete, but when Chromatic Wings ends, the effect is removed.": '连锁时域中，[无尽之光]不会消耗持续时间；[十二枚羽翼]结束时解除该效果。',
  'While Limitless Light is in effect, upon ending Chromatic Wings with Zohar Strike, the Archangel gauge is restored to 50%.': '[无尽之光]期间，以佐哈尔强击结束[十二枚羽翼]时，大天司槽回复至 50%。',
  'Insight Rank Perk 1: Archangel Gauge Gain +5%': '大天司槽提升量 +5%。',
  'Insight Rank Perk 2: Limitless Light grants an additional ATK +10%': '[无尽之光]额外使攻击力 +10%。',
  'Insight Rank Perk 2: Limitless Light Duration +20%': '[无尽之光]持续时间 +20%。',
  'While Chromatic Wings is active: DMG Cap +35%': '[十二枚羽翼]期间：伤害上限 +35%。',
  'Zohar Strike: DMG Dealt +5%': '佐哈尔强击：造成伤害 +5%。',
  'Finding Refuge': '白辉祝福',
  "While Chromatic Wings isn't active, landing the first, third, and sixth Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finisher grants a lvl of Lucent Refuge (max lvl 3).": '未处于[十二枚羽翼]时，第 1、3、6 段特殊攻击连击收招命中会获得 1 级[白辉庇护]（最高 3 级）。',
  'While Chromatic Wings is active, Lucent Refuge grants buffs to Sandalphon based on its effect lvl.': '[十二枚羽翼]期间，[白辉庇护]根据等级赋予圣德芬强化效果。',
  'Lvl 1: Regen (3% of max HP)': '1 级：[再生]（最大生命值的 3%）。',
  'Lvl 2: DMG↑ (2%)': '2 级：[造成伤害提升]（2%）。',
  'Buffs granted by Lucent Refuge last until Chromatic Wings ends.': '[白辉庇护]赋予的强化效果持续至[十二枚羽翼]结束。',
  'Upon activating Chromatic Wings, if Sandalphon is buffed by at least 10 different effects, he gains DMG Cap↑ (100%).': '发动[十二枚羽翼]时，若圣德芬拥有至少 10 种不同强化效果，则获得[伤害上限提升]（100%）。',
  'While Chromatic Wings is active: ATK +10%': '[十二枚羽翼]期间：攻击力 +10%。',
  'While Chromatic Wings is active: Sandalphon gains DMG Cut (10%)': '[十二枚羽翼]期间：圣德芬获得[伤害减免]（10%）。',
  "Essence Rank Perk 1: Lucent Refuge's Regen gains an additional Healing +2%": '[白辉庇护]赋予的[再生]回复量额外 +2%。',
  "Essence Rank Perk 1: Lucent Refuge's DMG↑ grants an additional DMG Dealt +3%": '[白辉庇护]赋予的[造成伤害提升]效果量额外 +3%。',
  'Essence Rank Perk 1: Lucent Refuge grants an additional Supplementary DMG +3%': '[白辉庇护]赋予的[追击]效果量额外 +3%。',
  'Buffs granted to Sandalphon: Buff Duration +10%': '圣德芬获得的强化效果持续时间 +10%。',
  "Essence Rank Perk 3: At Lucent Refuge lvl 3, when Chromatic Wings ends, The Power of One's cooldown resets": '[白辉庇护]达到 3 级时，[十二枚羽翼]结束会重置[一人之力]的冷却时间。',
  'Perfectly timed attacks gain DMG Cap +35%': '精准攻击的伤害上限 +35%。',
  'Essence Rank Perk 1: While Chromatic Wings is active, Lucent Refuge lvl 3 also grants ATK +15%': '[十二枚羽翼]期间，3 级[白辉庇护]额外使攻击力 +15%。',
  'While Chromatic Wings is active: Sandalphon gains DMG Dealt +5%': '[十二枚羽翼]期间：圣德芬的造成伤害 +5%。',
  'Upon countering with Alone in Heaven: Grants DMG Cap↑ (10%)': '以[独守天穹]成功反击时，赋予自身[伤害上限提升]（10%）。',
  'Bell Tolls for Thee': '审判之钟',
  'Inflicting Elemental Friction also inflicts an initial lvl of Bell of War.': '赋予[元素摩擦]时，同时赋予 1 级[战钟]。',
  'Whenever a certain amount of damage is dealt to a foe inflicted with Elemental Friction, Bell of War gains a lvl (max lvl 10).': '对处于[元素摩擦]的敌人累计造成一定伤害时，[战钟]提升 1 级（最高 10 级）。',
  'While Bell of War is in effect, upon using Zohar Strike, it deals 0.5% more damage per effect lvl.': '[战钟]期间，佐哈尔强击每级造成伤害 +0.5%。',
  'Afterwards, Bell of War is removed.': '发动后解除[战钟]。',
  "Gaining a lvl of Bell of War extends Elemental Friction's duration by 1 sec. (max duration: 30 sec.)": '每获得 1 级[战钟]，[元素摩擦]持续时间延长 1 秒（最多 30 秒）。',
  'Sandalphon deals 20% more damage against foes inflicted with Bell of War lvl 10.': '对处于 10 级[战钟]的敌人，圣德芬的造成伤害 +20%。',
  'While Chromatic Wings is active: Skill Cooldown -2%': '[十二枚羽翼]期间：能力冷却时间 -2%。',
  'While Chromatic Wings is active: Ethereal Prison also grants DMG↑ (5%)': '[十二枚羽翼]期间：[定法囚牢]额外赋予[造成伤害提升]（5%）。',
  'Crux Rank Perk 1: Zohar Strike deals an additional 0.5% DMG per effect lvl to foes inflicted with Bell of War': '对处于[战钟]的敌人，佐哈尔强击每级造成伤害额外 +0.5%。',
  'While Chromatic Wings is active: No Way Out gains ATK +10% and DMG Cap +45%': '[十二枚羽翼]期间：[无路可逃]攻击力 +10%、伤害上限 +45%。',
  'Upon activating Chromatic Wings, Sandalphon recovers 10% of his max HP': '发动[十二枚羽翼]时，圣德芬回复最大生命值的 10%。',
  'Breath of Life now grants Shield (5% of max HP) instead of healing HP': '[天司之息]改为赋予相当于最大生命值 5% 的[屏障]，不再回复生命值。',
  'When Chromatic Wings ends, Sandalphon gains Supplementary DMG (10%)': '[十二枚羽翼]结束时，圣德芬获得[追击]（10%）。',
  'While Chromatic Wings is active: Revontulet gains ATK +10% and DMG Cap +45%': '[十二枚羽翼]期间：[极火虹光]攻击力 +10%、伤害上限 +45%。',
  'Breath of Life restores 10% more HP or grants 5% more Shield': '[天司之息]回复量 +10%，或[屏障]效果量 +5%。',
  'While Chromatic Wings is active: Breath of Life Cooldown -5%': '[十二枚羽翼]期间：[天司之息]冷却时间 -5%。',
  'Crux Rank Perk 2: When Bell of War lvl 10 is removed, Ethereal Prison gains Cooldown -50%': '10 级[战钟]解除时，[定法囚牢]冷却时间 -50%。',
  'Ethereal Prison: Elemental Friction Duration +10%': '[定法囚牢]赋予的[元素摩擦]持续时间 +10%。',

  // 芙劳
  'Fraux': '芙劳',
  'Flip the Tides': '正逆位强化',
  "Strengthens Fraux's combo finishers.": '强化芙劳的连击收招。',
  "Whenever Fraux performs a delayed Flip Kick (Reversed) after a normal attack, if the Reversed gauge isn't full, she gains Enhanced Reversed.": '普通攻击后延迟发动逆位踢击时，若逆位槽未蓄满，芙劳获得[逆位强化]。',
  'While in effect, it grants ATK +10%.': '效果持续期间，攻击力 +10%。',
  "When performing a delayed Flip Kick (Upright) after a normal attack, if the Upright gauge isn't full, she gains Enhanced Upright.": '普通攻击后延迟发动正位踢击时，若正位槽未蓄满，芙劳获得[正位强化]。',
  'It grants Stun Power +10%.': '使昏厥值 +10%。',
  'Whenever a stance gauge becomes full, Fraux gains a buff based on the maxed out gauge.': '任一架势槽蓄满时，芙劳根据蓄满的槽获得强化效果。',
  'Enhanced Upright+: Supplementary DMG (20%)': '[正位强化＋]：[追击]（20%）。',
  'Enhanced Reversed+: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): DMG Cap +35% and Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) inflict Burn': '[逆位强化＋]：普通攻击伤害上限 +35%，特殊攻击赋予[灼烧]。',
  'Upright Gauge Gain +10': '正位槽提升量 +10%。',
  'While in Upright stance: ATK +10%': '正位架势期间：攻击力 +10%。',
  'While in Reversed stance: DMG Cap +30%': '逆位架势期间：伤害上限 +30%。',
  'While in Upright stance: DMG Cap +30%': '正位架势期间：伤害上限 +30%。',
  'Reversed Gauge Gain +10%': '逆位槽提升量 +10%。',
  'Insight Rank Perk 2: Buff Duration +10% (Enhanced Upright / Enhanced Reversed)': '强化效果持续时间 +10%（正位强化／逆位强化）。',
  'While in Reversed stance: ATK +10%': '逆位架势期间：攻击力 +10%。',
  'Allure of Strength': '煌煌之力',
  "Upon activating a skill for free from Fraux's Strength Gains support skill, she now gains Skill DMG↑.": '因辅助能力[煌煌之力]免费发动能力时，芙劳获得[能力伤害提升]。',
  'While in effect, it grants Skill ATK +10% and Skill DMG Cap +15%.': '效果持续期间，能力攻击力 +10%、能力伤害上限 +15%。',
  'While activating skills for free from Strength Gains, Fraux takes no damage.': '因[煌煌之力]免费发动能力期间，芙劳不会受到伤害。',
  'Activating skills for free from Strength Gains now grants buffs to the party or inflicts debuffs on nearby foes.': '因[煌煌之力]免费发动能力时，会赋予全队强化效果或对附近敌人赋予弱化效果。',
  'In exchange, both stance gauges fill 20% slower.': '作为代价，两种架势槽的提升量 -20%。',
  'Debuffs:': '弱化效果：',
  'Crimson Nightmare: Slow': '[猩红梦魇]：[缓速]。',
  'Buffs': '强化效果：',
  'Indominus: Drain': '[暴虐之拥]：[吸血]。',
  'Kick Face: Stout Heart': '[破面踢]：[刚健]。',
  'Upright Gauge Gain +10%': '正位槽提升量 +10%。',
  'While in Reversed stance: DMG +40%': '逆位架势期间：伤害 +40%。',
  'While in Upright stance: DMG Cap +40%': '正位架势期间：伤害上限 +40%。',
  'Indominus: Drain gets an additional Drain Amount +10% and Drain Cap +10%': '[暴虐之拥]赋予的[吸血]回复量 +10%、回复上限 +10%。',
  'A Deal with The Devil': '恶魔的低语',
  "While activating skills for free from Strength Gains, foe attacks won't interrupt Fraux.": '因[煌煌之力]免费发动能力期间，芙劳不会被敌人的攻击打断。',
  'Skills activated for free from Strength Gains gain DMG Dealt +50%.': '因[煌煌之力]免费发动的能力，其造成伤害 +50%。',
  'In exchange, Strength Gains now grants only 1 free skill activation, and normal skill activations give 50% less gauge gain.': '作为代价，[煌煌之力]仅能免费发动 1 次能力，且正常发动能力时架势槽提升量 -50%。',
  'Free skill activations from Crux Rank Perk 2 gain an additional DMG Dealt +100%.': '免费发动的能力造成伤害额外 +100%。',
  'In exchange, landing skills no longer fills stance gauges.': '作为代价，能力命中不再提升架势槽。',
  'Crux Rank Perk 2: Skills activated from Strength Gains gain an additional DMG Dealt +25%, but Fraux takes DEF -20%': '因[煌煌之力]发动的能力造成伤害额外 +25%，但芙劳的防御力 -20%。',
  'Crux Rank Perk 3: Skills activated from Strength Gains gain an additional DMG Dealt +25%': '因[煌煌之力]发动的能力造成伤害额外 +25%。',
  'Upon countering with Kick Face: Grants DMG↑ (5%)': '以[破面踢]成功反击时，赋予自身[造成伤害提升]（5%）。',

  // 菲迪埃尔
  'Fediel': '菲迪埃尔',
  'Finishing Touch': '连击收招强化',
  "Fediel's combo finishers gain ATK +10% and DMG Cap +20%.": '菲迪埃尔的连击收招攻击力 +10%、伤害上限 +20%。',
  'Whenever Fediel lands Miasma Hands, she gains a lvl of Enhanced Combo Finishers (max lvl 10).': '[瘴爪]命中时，菲迪埃尔获得 1 级[连击收招强化]（最高 10 级）。',
  'While in effect, it grants DMG Dealt +1% per effect lvl to como finishers.': '效果持续期间，每级使连击收招的造成伤害 +1%。',
  'Performing a combo finisher removes the effect.': '发动连击收招时解除该效果。',
  'Repeatedly pressing Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) after a combo finisher unleashes up to 5 more magic orbs.': '连击收招后连续输入特殊攻击，最多可额外释放 5 枚魔力球。',
  'Blackflash requires 1 fewer Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) input in a combo chain to start charging faster': '[黑闪]在连击中少输入 1 次普通攻击即可开始快速蓄力。',
  'Claws of Reversal: Cooldown -5%': '[逆转之爪]冷却时间 -5%。',
  'Upon emerging from Voidskip, Fediel damages foes she comes in contact with': '从[逆爪]中现身时，菲迪埃尔对接触到的敌人造成伤害。',
  'Insight Rank Perk 3: Each combo finisher orb gains DMG Dealt +0.5%': '连击收招的每枚魔力球造成伤害 +0.5%。',
  'Insight Rank Perk 2: Enhanced Combo Finishers grants DMG Dealt +0.5% per effect lvl to combo finishers': '[连击收招强化]每级额外使连击收招的造成伤害 +0.5%。',
  'Upon countering with Claws of Reversal: Grants Supplementary DMG (10%)': '以[逆转之爪]成功反击时，赋予自身[追击]（10%）。',
  'Corrosive Black': '“黑”之侵蚀',
  'Extends the effect durations of the following skills:': '延长以下能力的效果持续时间：',
  "Whenever Fediel lands a wipe of Miasma Hands, Miasmic Abyss's cooldown shortens by 7%.": '[瘴爪]每次挥击命中时，[瘴域]冷却时间缩短 7%。',
  "Whenever Fediel lands Miasma Hands against foes inside Miasmic Abyss's AoE, it triggers Bonus AoE DMG (70% of DMG dealt by Miasmic Abyss).": '[瘴爪]命中[瘴域]范围内的敌人时，触发额外范围伤害（[瘴域]伤害的 70%）。',
  'Stomp Attacks: ATK +10%': '踩踏攻击：攻击力 +10%。',
  'Essence Rank Perk 1: Listed perk skills gain an additional Duration +10%': '上述能力的效果持续时间额外 +10%。',
  "Upon emerging from Voidskip, Fediel's skill cooldowns shorten. Upon emerging from Blackflash, skill cooldowns shorten even further": '从[逆爪]中现身时，菲迪埃尔的能力冷却时间缩短；从[黑闪]中现身时，冷却时间进一步缩短。',
  'Primordial Fear: Petrified Duration +10%': '[本源恐惧]赋予的[石化]持续时间 +10%。',
  'Stomp Attacks: DMG Cap +30%': '踩踏攻击：伤害上限 +30%。',
  'Essence Rank Perk 3: Grants an additional Bonus AoE DMG +30%': '额外范围伤害的效果量 +30%。',
  "Essence Rank Perk 3: Landing Miasma Hands on foes inside Miasmic Abyss's AoE inflicts Stackable ATK↓ (2%) (max stacks: 5)": '[瘴爪]命中[瘴域]范围内的敌人时，赋予[攻击降低（可叠加）]（2%，最多 5 层）。',
  'Sphere of Reversal: Charge Time -5%': '[逆转之球]蓄力时间 -5%。',
  'Miasmic Abyss: AoE Duration +10%': '[瘴域]范围持续时间 +10%。',
  'Hands of Malice': '理外暗灾',
  "Fediel's damage skills gain DMG Cap +10%.": '菲迪埃尔的攻击类能力伤害上限 +10%。',
  'Whenever Fediel lands a combo finisher, she gains Skill DMG↑.': '连击收招命中时，菲迪埃尔获得[能力伤害提升]。',
  'While in effect, it grants Skill ATK +10% and Skill DMG Cap +30%.': '效果持续期间，能力攻击力 +10%、能力伤害上限 +30%。',
  'Whenever Fediel lands a swipe of Miasma Hands, she gains a lvl of Malice (max lvl 10).': '[瘴爪]每次挥击命中时，菲迪埃尔获得 1 级[恶意]（最高 10 级）。',
  'While in effect, her skill cooldowns shorten based on effect lvl.': '效果持续期间，根据效果等级缩短能力冷却时间。',
  'If Miasma Hands is interrupted, Malice is removed.': '[瘴爪]被打断时，解除[恶意]。',
  'Miasma Hands gains Drain, but Fediel suffers from ATK -10%': '[瘴爪]获得吸血效果，但菲迪埃尔的攻击力 -10%。',
  'Miasma Hands gains up to ATK +10% and DMG Cap +30% the longer it hits': '[瘴爪]持续命中的时间越长，攻击力与伤害上限提升越多，最多分别 +10% 与 +30%。',
  'Crux Rank Perk 1: Damage skills gain an additional DMG Cap +10%': '攻击类能力的伤害上限额外 +10%。',
  'Sign of Calamity: Cooldown -5%': '[灾厄之兆]冷却时间 -5%。',
  'Crux Rank Perk 2: Skill DMG↑ grants an additional Skill ATK +5% and Skill DMG Cap +20%': '[能力伤害提升]额外使能力攻击力 +5%、能力伤害上限 +20%。',
  'Crux Rank Perk 3: Landing a charged Blackflash grants Malice lvl 3. Upon failing to follow-up with Miasma Hands, Malice is removed': '蓄力[黑闪]命中时获得 3 级[恶意]；未能衔接[瘴爪]时解除[恶意]。',
  "Boosts Fediel's DMG Cap by a max of +35% based on the number of times she's used Blackflash during the quest": '根据本次任务中发动[黑闪]的次数，使菲迪埃尔的伤害上限最多 +35%。',
  'Sphere of Reversal: ATK +10%': '[逆转之球]攻击力 +10%。',
  'Crux Rank Perk 3: At Malice lvl 10, it also grants DMG Dealt +30%': '[恶意]达到 10 级时，额外使造成伤害 +30%。',
  "If Fediel isn't buffed by Mirror Image, Sign of Calamity grants Mirror Image to Fediel": '若菲迪埃尔没有[幻影]，[灾厄之兆]会赋予她[幻影]。',

  // 伽兰查
  'Gallanza': '伽兰查',
  'Extreme Deathmatch': '铁衣玉碎强化',
  'Normal Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) power strikes gain DMG Dealt +5% and boost Silver Wolf Gauge Gain by an additional 10%.': '普通特殊攻击的强力打击造成伤害 +5%，银狼槽提升量额外 +10%。',
  'Upon entering Deathmatch Finale, Gallanza gains Daredevil.': '进入[铁衣玉碎]时，加兰萨获得[铤而走险]。',
  'While in effect, it grants DMG Dealt +5% but lowers DEF by 10%': '效果持续期间，造成伤害 +5%，但防御力 -10%。',
  'When Deathmatch Finale ends, Daredevil is removed.': '[铁衣玉碎]结束时，解除[铤而走险]。',
  'Daredevil now grants DMG Dealt +10% but lowers DEF by 15%.': '[铤而走险]改为使造成伤害 +10%，但防御力 -15%。',
  'While in Deathmatch Finale, the Silver Wolf gauge depletes 33% slower, but taking a total of 100,000 or more damage ends Deathmatch Finale.': '[铁衣玉碎]期间，银狼槽消耗速度降低 33%；累计受到 100,000 以上伤害时结束[铁衣玉碎]。',
  'Silver Wolf Gauge Gain +5%': '银狼槽提升量 +5%。',
  'While in Deathmatch Finale: Perfect Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain ATK +10%': '[铁衣玉碎]期间：精准普通攻击的攻击力 +10%。',
  'Insight Rank Perk 1: Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) power strikes gain DMG Dealt +3%': '特殊攻击的强力打击造成伤害 +3%。',
  'Tip of the Spear: DEF↑ Duration +10%': '[横枪立马]赋予的[防御提升]持续时间 +10%。',
  'While in Deathmatch Finale: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain ATK +10%': '[铁衣玉碎]期间：普通攻击的攻击力 +10%。',
  'While in Deathmatch Finale: Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain ATK +10%': '[铁衣玉碎]期间：特殊攻击的攻击力 +10%。',
  "Insight Rank Perk 3: Daredevil's max lvl is now 3 and rises based on time spent in Deathmatch Finale during the quest. It boosts DMG Dealt by a max of +60%": '[铤而走险]的最高等级提升至 3，并根据本次任务中处于[铁衣玉碎]的时间提升等级；造成伤害最多 +60%。',
  'Tip of the Spear: DEF↑ grants an additional DEF +5%': '[横枪立马]赋予的[防御提升]效果量额外 +5%。',
  'While in Deathmatch Finale: DMG Cap +40%': '[铁衣玉碎]期间：伤害上限 +40%。',
  'Turbo Turbine': '回旋枪强化',
  'Upon collapsing from too many Turbine rotations, Gallanza recovers 10% of his max HP.': '因回旋枪转动过多而倒地时，加兰萨回复最大生命值的 10%。',
  'Releasing Turbine right as Gallanza combusts triggers a perfect finisher, which has DMG Dealt +50%.': '在加兰萨爆燃瞬间释放回旋枪会发动精准收招，其造成伤害 +50%。',
  'Performing a Turbine perfect finisher sends Gallanza into Deathmatch Finale.': '发动回旋枪精准收招时，加兰萨进入[铁衣玉碎]。',
  'During Deathmatch Finale, Turbine perfect finishers grant a lvl of Ultimatum (max lvl 3).': '[铁衣玉碎]期间，回旋枪精准收招会赋予 1 级[最后通牒]（最高 3 级）。',
  'While in effect, it grants ATK +20%, DEF +2%, and DMG Dealt +15% per effect lvl.': '效果持续期间，每级使攻击力 +20%、防御力 +2%、造成伤害 +15%。',
  'Failing a perfect finisher inflicts Fall Flat for 10 sec., which causes him to collapse upon using Turbine.': '精准收招失败时，赋予自身[摧山坠地] 10 秒；效果期间使用回旋枪会倒地。',
  'Turbine ATK +10%': '回旋枪攻击力 +10%。',
  'Turbine Finishers: ATK +10%': '回旋枪收招：攻击力 +10%。',
  'Essence Rank Perk 1: Upon collapsing, recover an additional 3% HP': '倒地时，额外回复 3% 生命值。',
  'Turbine Finishers: DMG Cap +30%': '回旋枪收招：伤害上限 +30%。',
  'Turbine DMG Cap +35%': '回旋枪伤害上限 +35%。',
  'Essence Rank Perk 2: Turbine perfect finishers gain an additional DMG Dealt +20%': '回旋枪精准收招的造成伤害额外 +20%。',
  'Essence Rank Perk 3: Allows Gallanza to resume charging Turbine after dodging': '加兰萨可在闪避后继续为回旋枪蓄力。',
  'Essence Rank Perk 1: Upon collapsing from Turbine, removes a debuff from Gallanza': '因回旋枪而倒地时，解除加兰萨的 1 个弱化效果。',
  "Upon entering Deathmatch Finale: When Gallanza's armor flies off, it deals stun damage to nearby foes": '进入[铁衣玉碎]时：加兰萨的铠甲飞散会对附近敌人造成昏厥伤害。',
  'Landing Dashing Lancer boosts Silver Wolf Gauge Gain by an additional 10%': '[锋芒一线]命中时，白狼槽提升量额外 +10%。',
  'Put On a Show': '武夫',
  'Whenever Gallanza lands a damage skill, he gains a lvl of Wild Showman (max lvl 3).': '攻击类能力命中时，加兰萨获得 1 级[武夫]（最高 3 级）。',
  'While in effect, it grants ATK +5% per effect lvl to damage skills.': '效果持续期间，每级使攻击类能力的攻击力 +5%。',
  "Wild Showman's max level is now 6.": '[武夫]的最高等级提升至 6。',
  'While in effect, it now grants ATK +10% and DMG Cap +30% per effect lvl to damage skills.': '效果改为每级使攻击类能力的攻击力 +10%、伤害上限 +30%。',
  'Landing combo finishers also shortens damage skill cooldowns by 15%.': '连击收招命中时，攻击类能力冷却时间缩短 15%。',
  'In exchange, ATK of Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) is lowered by 5%.': '作为代价，普通攻击与特殊攻击的攻击力 -5%。',
  "Wild Showman's max level is now 10.": '[武夫]的最高等级提升至 10。',
  'At lvl 10, all skills become Flashpoint.': '达到 10 级时，所有能力变为[狼牙斩]。',
  'Activating Flashpoint consumes Wild Showman lvl 10.': '发动[狼牙斩]时，消耗 10 级[武夫]。',
  'Crux Rank Perk 1: Wild Showman grants an additional ATK +3% per effect lvl to damage skills': '[武夫]每级额外使攻击类能力的攻击力 +3%。',
  'Eye of the Storm: ATK +10%': '[风卷残云]攻击力 +10%。',
  'Crux Rank Perk 2: Wild Showman grants an additional ATK +10% per effect lvl to damage skills. Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) suffer an additional ATK -5%': '[武夫]每级额外使攻击类能力的攻击力 +10%；普通攻击与特殊攻击的攻击力额外 -5%。',
  'Crux Rank Perk 1: Wild Showman grants an additional ATK +3% per effect lvl to damage skills.': '[武夫]每级额外使攻击类能力的攻击力 +3%。',
  'Crux Rank Perk 3: Wild Showman lvl 10 also grants DMG Dealt +10%': '10 级[武夫]额外使造成伤害 +10%。',
  'Landing Martial Spear boosts Silver Wolf Gauge Gain by an additional 10%': '[武刹枪]命中时，白狼槽提升量额外 +10%。',
  'Eye of the Storm: DMG Cap +45%': '[风卷残云]伤害上限 +45%。',

  // 玛琪拉菲菈
  'Maglielle': '玛琪拉菲菈',
  'Ardent Dancer': '魔剑之舞强化',
  'Whenever a combo finisher becomes enhanced by the Etude of Devotion support skill, hits from the enhanced finisher boost Veil Gauge Gain by 10%.': '连击收招因辅助能力[迅雷之锻]获得强化时，强化收招命中会使帷幕槽提升量 +10%。',
  'Blade Dance gains ATK +5% and DMG Dealt +10%.': '[剑舞]攻击力 +5%、造成伤害 +10%。',
  'Blade Dance now gains ATK +15% and DMG Dealt +20% instead.': '[剑舞]改为攻击力 +15%、造成伤害 +20%。',
  "In exchange, Maglielle's DEF is lowered by 30% during Blade Dance.": '作为代价，[剑舞]期间玛琪艾尔的防御力 -30%。',
  'Consuming a full Veil gauge to land a Blade Dance finisher grants Skill DMG↑ to the entire party.': '消耗蓄满的帷幕槽并使[剑舞]收招命中时，赋予全队[能力伤害提升]。',
  'While in effect, it grants Skill ATK +10% and Skill DMG Cap +20%.': '效果持续期间，能力攻击力 +10%、能力伤害上限 +20%。',
  'Blade Dance Finishers: ATK +10%': '[剑舞]收招：攻击力 +10%。',
  'Blade Dance Finishers: DMG Cap +20%': '[剑舞]收招：伤害上限 +20%。',
  "Grants an additional Veil Gauge Gain +5% to this master style's rank 1 perk.": '本专精 1 阶效果的帷幕槽提升量额外 +5%。',
  'Spear of Legends: Cooldown -5%': '[传说之枪]冷却时间 -5%。',
  "Insight Rank Perk 3: Blade Dance gains an additional ATK +5% and DMG Dealt +10%, but Maglielle's DEF is lowered by an additional 10%": '[剑舞]攻击力额外 +5%、造成伤害额外 +10%，但玛琪艾尔的防御力额外 -10%。',
  'Critical Hit +9%': '暴击率 +9%。',
  'Superlative Sorcery': '超凡系列强化',
  'Landing the following skills boosts Veil Gauge Gain.': '以下能力命中时提升帷幕槽：',
  'Hammer of Thunder: Veil Gauge Gain +10%': '[雷霆之锤]：帷幕槽提升量 +10%。',
  'Pistol of Demons: Veil Gauge Gain +0.2%': '[恶魔之铳]：帷幕槽提升量 +0.2%。',
  'Spear of Legends: Veil Gauge Gain +0.5%': '[传说之枪]：帷幕槽提升量 +0.5%。',
  'Upon casting a weapon-summoning skill, Maglielle gains a lvl of Arts Superior (max lvl 4).': '发动武器召唤类能力时，玛琪艾尔获得 1 级[超凡技艺]（最高 4 级）。',
  'While in effect, summoned weapons gain attack or healing buffs.': '效果持续期间，召唤武器获得攻击或回复强化。',
  'Lvl 2 and above: ATK +2% / DMG Cap +50% / Healing +3% / Healing Cap +3% per effect lvl': '达到 2 级以上时，每级攻击力 +2%／伤害上限 +50%／回复量 +3%／回复上限 +3%。',
  'Landing Blade Dance finishers shortens cooldowns of weapon-summoning skills based on the amount of Veil gauge consumed.': '[剑舞]收招命中时，根据消耗的帷幕槽缩短武器召唤类能力的冷却时间。',
  'Blade Dance II: Cooldown -1%': '[剑舞Ⅱ]：冷却时间 -1%。',
  'Blade Dance III: Cooldown -4%': '[剑舞Ⅲ]：冷却时间 -4%。',
  'Blade Dance IV: Cooldown -100%': '[剑舞Ⅳ]：冷却时间 -100%。',
  'Hammer of Thunder, Pistol of Demons, and Spear of Legends gain ATK +10%': '[雷霆之锤]、[恶魔之铳]与[传说之枪]的攻击力 +10%。',
  "Grants an additional Veil Gauge Gain +2% to this master style's rank 1 perk": '本专精 1 阶效果的帷幕槽提升量额外 +2%。',
  'Essence Rank Perk 2: Arts Superior grants an additional ATK +2% per effect lvl to hammer, pistol, and spear skills': '[超凡技艺]每级额外使锤、铳与枪类能力的攻击力 +2%。',
  'Stave of Divinity now grants Shield (1000) instead of healing HP': '[神性之杖]改为赋予[屏障]（1000），不再回复生命值。',
  'Hammer of Thunder: DMG Cap +45%': '[雷霆之锤]伤害上限 +45%。',
  'Essence Rank Perk 2: Arts Superior grants an additional DMG Cap +30% per effect lvl to hammer, pistol, and spear skills': '[超凡技艺]每级额外使锤、铳与枪类能力的伤害上限 +30%。',
  "Essence Rank Perk 2: Arts Superior's max lvl is now 5": '[超凡技艺]的最高等级提升至 5。',
  'Hammer of Thunder, Pistol of Demons, and Spear of Legends gain DMG Cap +40%': '[雷霆之锤]、[恶魔之铳]与[传说之枪]的伤害上限 +40%。',
  'Pistol of Demons: DMG Cap +45%': '[恶魔之铳]伤害上限 +45%。',
  'Spear of Legends: DEF↓ inflicts an additional DEF -5%': '[传说之枪]赋予的[防御降低]效果量额外 +5%。',
  'Pistol of Demons: Cooldown -5%': '[恶魔之铳]冷却时间 -5%。',
  'Sword Veil Guardianship': '刃重结界',
  'Whenever Maglielle gains Shield, she gains it with an additional Shield Strength +10%': '玛琪艾尔获得[屏障]时，其效果量额外 +10%。',
  'Maglielle gains Shield based on the number of Blade Dance hits landed': '玛琪艾尔根据[剑舞]命中次数获得[屏障]。',
  "Boosts Maglielle's DMG Dealt by a max of +50% based on her Shield strength.": '根据[屏障]效果量，使玛琪艾尔的造成伤害最多 +50%。',
  'In exchange, she loses Shield upon taking any damage.': '作为代价，受到任何伤害时解除[屏障]。',
  'While Shield is active: ATK +5%': '[屏障]期间：攻击力 +5%。',
  'While Shield is active: DMG Cap +20%': '[屏障]期间：伤害上限 +20%。',
  'While Shield is active: DMG Dealt +5%': '[屏障]期间：造成伤害 +5%。',
  'Stave of Divinity: Cooldown -5%': '[神性之杖]冷却时间 -5%。',
  'When Maglielle loses Shield: Grants DMG↑ (5%) to the entire party': '玛琪艾尔失去[屏障]时，赋予全队[造成伤害提升]（5%）。',
  'Crux Rank Perk 3: Boosts DMG Dealt by up to an additional +30% based on Shield strength': '根据[屏障]效果量，使造成伤害最多额外 +30%。',
  'Hammer of Thunder: Cooldown -5%': '[雷霆之锤]冷却时间 -5%。',
  'Paeanic Aegis: AoE Duration +10%': '[曲音萦绕]范围持续时间 +10%。',

  // 已完成角色的来源名与专精标题
  'Gran / Djeeta': '古兰 / 姬塔',
  'Artfully Adept': '职业等级强化',
  'Combat Healer': '回复类能力强化',
  'The Substitute': '挺身而出特化',
  'Katalina': '卡塔莉娜',
  'Forever Ares': '阿瑞斯在场特化',
  'Army of Two': '阿瑞斯强袭特化',
  'Blade Blue': '苍刃',
  'Rackam': '拉卡姆',
  'Precision Blasting': '靶心狙击强化',
  'Expert Coffinmaker': '送葬火舌强化',
  'Collateral Risk': '战地余波特化',
  'Io': '伊欧',
  'Pure Concentration': '专注强化',
  'Magic Chain': '魔法连锁',
  'Flowery Seven Overload': '花耀七闪特化',
  'Cagliostro': '卡莉奥丝特罗',
  'Crippling Combos': '弱化连击爆发',
  'Super Collapse': '岩塌强化',
  'Alchemedic': '回复与辅助强化',
  'Id': '伊德',
  'Faith in Godmight': '神威一体强化',
  'Faith in Dragonform': '龙人化强化',
  'Path of Vengeance': '神愿之力特化',

  // 塞达：觉醒「跃空连击强化」
  'Zeta': '塞达',
  'Intense Loops': '跃空连击强化',
  'Extends the window of time to perform a loop combo, and upon landing Arvess Hammer, Zeta gains DMG↑ (5%).':
    '跃空连击的输入时机延长；阿尔贝斯螺旋枪命中时，塞达获得[造成伤害提升]（5%）。',
  'Upon landing Arvess Hammer, pressing Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) with perfect timing launches Zeta into a high jump.':
    '阿尔贝斯螺旋枪命中后精准衔接普通攻击时，塞达会高高跃起。',
  'Landing 3 or more loop combos grants a lvl of Loop Master (max lvl 5).':
    '连续命中 3 次以上跃空连击时，获得 1 级[跃空强化]（最高 5 级）。',
  'While in effect, loop combos gain a max of ATK +30% and DMG Cap +50% based on effect lvl.':
    '效果持续期间，根据等级提升跃空连击的攻击力与伤害上限（最高攻击力 +30%、伤害上限 +50%）。',
  'When the combo is interrupted, Loop Master is removed.': '跃空连击中断时，解除[跃空强化]。',
  'Loop Combos: ATK +10%': '跃空连击：攻击力 +10%',
  'Loop Combos: DMG Cap +25%': '跃空连击：伤害上限 +25%',
  'Insight Rank Perk 1: DMG↑ grants an additional DMG Dealt +2%': '[造成伤害提升]的效果量额外 +2%',
  'Insight Rank Perk 2: Upon being launched into a high jump from Arvess Hammer, Zeta can perform 1 follow-up Arvess Hammer':
    '阿尔贝斯螺旋枪派生跃空攻击后，可额外派生 1 次阿尔贝斯螺旋枪',
  'Reduces the number of loop combo hits needed to perform Arvess Hammer by 1': '派生阿尔贝斯螺旋枪所需的跃空连击次数减少 1 次',
  'Insight Rank Perk 3: Loop Master also grants DMG Dealt +3%': '[跃空强化]额外使造成伤害 +3%',
  'Insight Rank Perk 3: Loop Master lvl 5 grants an additional DMG Cap +10%': '[跃空强化]达到 5 级时，伤害上限额外 +10%',

  // 塞达：真谛「攻击类能力强化」
  'One with Skills': '攻击类能力强化',
  "Shortens Zeta's skill cooldowns with each consecutive loop combo landed.": '连续命中跃空连击时，缩短塞达的能力冷却时间。',
  '1 consecutive loop combo: Cooldown -0.1%': '连续命中 1 次跃空连击：冷却时间 -0.1%',
  '2 consecutive loop combos: Cooldown -0.2%': '连续命中 2 次跃空连击：冷却时间 -0.2%',
  '3+ consecutive loop combos: Cooldown -0.3%': '连续命中 3 次以上跃空连击：冷却时间 -0.3%',
  "Landing Spear of Arvess or countering with Realm's Majesty launches Zeta into position for a follow-up Arvess Hammer.":
    '阿尔贝斯之枪命中或使用威光领域成功反击时，可派生阿尔贝斯螺旋枪。',
  'In addition, landing Arvess Hammer also has a chance to reset 1 of her damage skill cooldowns at random.':
    '此外，阿尔贝斯螺旋枪命中时，有几率使随机 1 个攻击类能力立刻冷却完毕。',
  'Upon landing Arvess Hammer, Zeta gains Arvess Unleashed.': '阿尔贝斯螺旋枪命中时，塞达获得[阿尔贝斯之力]。',
  'While in effect, the next activated damage skill gains ATK +30% and DMG Cap +30%.':
    '效果持续期间，下次发动的攻击类能力攻击力 +30%、伤害上限 +30%。',
  'Arvess Unleashed is then removed.': '攻击类能力发动后解除[阿尔贝斯之力]。',
  'Essence Rank Perk 1: Further shortens skill cooldowns': '能力冷却时间缩短效果提升',
  'Upon landing Arvess Hammer: Grants Shield (200)': '阿尔贝斯螺旋枪命中时，赋予自身 200 点屏障',
  'Zeta deals 5% more damage to foes inflicted with Arvess Fermare': '对处于[阿尔贝斯之印]的敌人造成伤害 +5%',
  'Essence Rank Perk 2: Arvess Hammer gains DMG Dealt +10%': '阿尔贝斯螺旋枪的造成伤害 +10%',
  'Arvess Hammer: DMG Cap +30%': '阿尔贝斯螺旋枪：伤害上限 +30%',
  'Essence Rank Perk 3: Arvess Unleashed also grants Supplementary DMG (10%) to damage skills':
    '[阿尔贝斯之力]生效期间，攻击类能力额外触发造成伤害 10% 的追击效果',
  'Thousand Flames: Burn Duration +20%': '千炎赋予的[灼热]效果持续时间 +20%',

  // 塞达：秘义「反击特化」
  'Out for Revenge': '反击特化',
  'Zeta deals 10% more damage to foes inflicted with Arvess Fermare.': '塞达对处于[阿尔贝斯之印]的敌人造成伤害 +10%。',
  "Countering with Rhapsody or Realm's Majesty launches Zeta into position for a follow-up Arvess Hammer.":
    '使用狂想曲或威光领域成功反击时，可派生阿尔贝斯螺旋枪。',
  'While airborne, she gains Stout Heart until touching the ground.': '在空中时获得[霸体]，直至落地。',
  'Landing counters or link attacks grants a permanent lvl of Heavy Hammer (max lvl 5).':
    '反击或连锁攻击命中时，永久获得 1 级[阿尔贝斯螺旋枪强化]（最高 5 级）。',
  'While in effect, it grants DMG Dealt +1% per effect lvl to Arvess Hammer.':
    '效果持续期间，每级使阿尔贝斯螺旋枪的造成伤害 +1%。',
  'At Heavy Hammer lvl 5, Zeta gains Supplementary DMG (10%), and upon landing Arvess Hammer, pressing Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) launches her into position for a follow-up Arvess Hammer.':
    '[阿尔贝斯螺旋枪强化]达到 5 级时，赋予塞达[追击]（10%）；阿尔贝斯螺旋枪命中后衔接普通攻击，可再次派生阿尔贝斯螺旋枪。',
  'Heavy Hammer lvl 5 falls back to lvl 4 after 7 sec.': '[阿尔贝斯螺旋枪强化]达到 5 级 7 秒后，降为 4 级。',
  "Extends the window of time to counter using Rhapsody or Realm's Majesty by 10%": '狂想曲与威光领域的反击判定时间 +10%',
  'Zeta gains DMG Cap +10% against foes inflicted with Arvess Fermare': '对处于[阿尔贝斯之印]的敌人，塞达的伤害上限 +10%',
  'Crux Rank Perk 3: Heavy Hammer grants an additional DMG Dealt +0.5% to Arvess Hammer':
    '[阿尔贝斯螺旋枪强化]每级额外使阿尔贝斯螺旋枪的造成伤害 +0.5%',
  'Crux Rank Perk 3: Heavy Hammer lvl 5 Duration +20%': '[阿尔贝斯螺旋枪强化]达到 5 级时，效果持续时间 +20%',
  'Loop Finishers and Arvess Hammer: ATK +10%': '跃空收招与阿尔贝斯螺旋枪：攻击力 +10%',
  'Loop Finishers and Arvess Hammer: DMG Cap +40%': '跃空收招与阿尔贝斯螺旋枪：伤害上限 +40%',
  'Wingclipper: Paralysis Duration +10%': '长枪回旋赋予的[麻痹]效果持续时间 +10%',

  // 娜露梅：觉醒「起手式切换强化」
  'Narmaya': '娜露梅',
  'Paradigm Shift': '起手式切换强化',
  'Upon performing a Dawnfly zone attack, press Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) with perfect timing to execute a Dawnfly finisher without stance shifting.':
    '发动源氏起手式的范围攻击后，精准衔接普通攻击，可在不切换起手式的情况下发动源氏收招。',
  'Upon performing a Freeflutter combo, press Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) with perfect timing to execute a Freeflutter finisher without stance shifting.':
    '发动神乐起手式连击后，精准衔接普通攻击，可在不切换起手式的情况下发动神乐收招。',
  'This allows Narmaya to continue comboing in her preferred stance.': '借此，娜露梅可维持当前起手式继续发动连击。',
  'Upon performing a stance shift combo, Narmaya gains an effect based on the stance she shifts into.':
    '发动起手式切换连击时，娜露梅会根据切换后的起手式获得相应效果。',
  'Each effect is active only when Narmaya is in that stance.': '各效果仅在娜露梅处于对应起手式时生效。',
  'Enhanced Dawnfly grants DMG Cap +50%.': '[源氏起手式强化]使伤害上限 +50%。',
  'Enhanced Freeflutter grants Supplementary DMG (10%).': '[神乐起手式强化]赋予[追击]（10%）。',
  'Mistiming a finisher removes the effects.': '收招未能精准发动时，解除强化效果。',
  'Effects of both Enhanced Dawnfly and Enhanced Freeflutter can now be active at the same time.':
    '[源氏起手式强化]与[神乐起手式强化]现在可同时生效。',
  'In exchange, performing the same stance finisher 4 times in a row removes both effects.':
    '作为代价，连续 4 次发动同一起手式的收招时，会解除两种强化效果。',
  'While in Dawnfly stance: ATK +10%': '源氏起手式下：攻击力 +10%',
  'While in Freeflutter stance: ATK +10%': '神乐起手式下：攻击力 +10%',
  'Insight Rank Perk 2: Enhanced Dawnfly Duration +10%': '[源氏起手式强化]的效果持续时间 +10%',
  'Insight Rank Perk 2: Enhanced Freeflutter Duration +10%': '[神乐起手式强化]的效果持续时间 +10%',
  'Dawnfly Zone Attack: Charge Speed +20%': '源氏蓄力范围攻击的蓄力速度 +20%',
  'Insight Rank Perk 2: Enhanced Dawnfly grants an additional DMG Cap +5%': '[源氏起手式强化]额外使伤害上限 +5%',
  'Insight Rank Perk 2: Enhanced Freeflutter gains an additional Supplementary DMG +5%': '[神乐起手式强化]的追击效果量额外 +5%',
  'Dance of Pink Petals: Buff Duration +10% (ATK↑ / Stout Heart / Supplementary DMG)':
    '花风·薄红舞赋予的[攻击提升]、[霸体]与[追击]效果持续时间 +10%',

  // 娜露梅：真谛「一击必杀」
  'One Cut, One Kill': '一击必杀',
  'Whenever Narmaya gains butterflies, she gains between 1 to 3 additional butterflies.':
    '娜露梅获得蝴蝶时，额外获得 1～3 只蝴蝶。',
  'Narmaya gains Skill DMG +30% and Skill DMG Cap +75%.': '娜露梅的能力造成伤害 +30%、能力伤害上限 +75%。',
  'In exchange, she can only activate damage skills at max butterfly count.': '作为代价，仅在蝴蝶数量达到上限时才能发动攻击类能力。',
  "While at max butterfly count, Narmaya's skills gain Cooldown -20%.": '蝴蝶数量达到上限时，娜露梅的能力冷却时间 -20%。',
  'Whenever she lands a link attack, she gains Kaleidoscope.': '连锁攻击命中时，获得[无限蝶]。',
  "While in effect, her damage skills gain ATK +30%, DMG Dealt +20%, and don't consume butterflies.":
    '效果持续期间，攻击类能力的攻击力 +30%、造成伤害 +20%，且不会消耗蝴蝶。',
  'When all of her damage skills go on cooldown, Kaleidoscope and all butterflies are removed.':
    '所有攻击类能力均进入冷却时，解除[无限蝶]并失去所有蝴蝶。',
  "While at butterfly count 6: Narmaya's attacks drain HP": '蝴蝶数量为 6 时，根据造成的伤害回复自身生命值',
  "Boosts Narmaya's ATK by a max of +18% based on her butterfly count": '根据蝴蝶数量提升攻击力（最高 +18%）',
  'Dawnfly Finishers: DMG Dealt +5%': '源氏收招的造成伤害 +5%',
  'While at butterfly count 6: DMG Cap +35%': '蝴蝶数量为 6 时，伤害上限 +35%',
  "Boosts Normaya's DEF my a max of 6% based on her butterfly count": '根据蝴蝶数量提升防御力（最高 +6%）',
  'While at butterfly count 6: SBA Gauge +10%': '蝴蝶数量为 6 时，奥义槽提升量 +10%',
  'Essence Rank Perk 3: Upon activating her SBA, Narmaya gains Kaleidoscope': '发动奥义时，娜露梅获得[无限蝶]',

  // 娜露梅：秘义「无二无三特化」
  'Devoted to Devotion': '无二无三特化',
  "The duration of Utter Devotion's Hostility↑ is extended by 50%.": '无二无三赋予的[挑衅力提升]效果持续时间延长 50%。',
  'Utter Devotion also grants Mirror Image.': '无二无三额外赋予[幻影]。',
  'Utter Devotion also grants DMG Cap↑ (30%) and Supplementary DMG (10%).':
    '无二无三额外赋予[伤害上限提升]（30%）与[追击]（10%）。',
  'While Narmaya is buffed by Hostility↑, landing fully charged Dawnfly zone attacks or Freeflutter combos inflicts Stackable DEF↓ (10%) (max stacks: 5).':
    '获得[挑衅力提升]期间，完全蓄力的源氏范围攻击或神乐连击命中时，赋予敌人可叠加的[防御降低]（10%，最多 5 层）。',
  'In addition, durations of DMG Cap↑ and Supplementary DMG granted from Crux Rank 2 extend by 5 sec.':
    '此外，专精赋予的[伤害上限提升]与[追击]效果持续时间延长 5 秒。',
  'While buffed by Hostility↑: ATK +10%': '拥有[挑衅力提升]时：攻击力 +10%',
  "Boosts Narmaya's ATK by a max of +20% based on the total amount of damage she's taken. When she enters critical condition, this effect resets":
    '根据自身累计受到的伤害提升攻击力（最高 +20%）；陷入濒死状态时重置提升效果',
  'Upon countering with Apex of Nothingness: Inflicts ATK↓ (10%)': '至人无己反击成功时，额外赋予[攻击降低]（10%）',
  'While buffed by Hostility↑: DMG Cap +35%': '拥有[挑衅力提升]时：伤害上限 +35%',
  "Boosts Narmaya's DMG Cap by a max of +40% based on the total amount of damage she's taken. When she enters critical condition, this effect resets":
    '根据自身累计受到的伤害提升伤害上限（最高 +40%）；陷入濒死状态时重置提升效果',
  'Utter Devotion: Effect Duration +10% (Hostility↑ / DEF↓)': '无二无三赋予的[挑衅力提升]与[防御降低]效果持续时间 +10%',
  'Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) stance shift combo finishers gain DMG Dealt +5%':
    '起手式切换连击的特殊攻击收招造成伤害 +5%',

  // 尤尔达哈：觉醒「三幕心得」
  'Yodarha': '尤尔达哈',
  'Triple Shroud Savvy': '三幕心得',
  'Boosts DMG Cap based on Triple Shroud marks.': '根据[幕]的数量提升伤害上限。',
  '1 Shroud mark: DMG Cap +3%': '1 幕：伤害上限 +3%',
  '2 Shroud marks: DMG Cap +5%': '2 幕：伤害上限 +5%',
  '3 Shroud marks: DMG Cap +10%': '3 幕：伤害上限 +10%',
  'Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) and Combo Finishers now have perfect inputs.':
    '普通攻击与连击收招新增精准输入时机。',
  "Performing perfectly timed attacks shortens Yodarha's combos.": '精准发动攻击时，尤尔达哈的连击阶段缩短。',
  'Combo finishers deal 40% more damage and can now be executed in succession.':
    '连击收招的造成伤害 +40%，且可连续发动。',
  "Each follow-up finisher consumes 1 Shroud mark, and follow-up finishers don't give Shroud marks.":
    '每次追加收招消耗 1 幕，追加收招不会获得幕。',
  'In exchange, taking 10,000 or more damage in a single attack removes 1 mark.':
    '作为代价，单次受到 10,000 以上伤害时失去 1 幕。',
  'Boosts the ATK of combo attacks by a max of +15% the shorter his combos are':
    '根据连击缩短程度提升普通连击的攻击力（最高 +15%）',
  'Insight Rank Perk 1: Boosts DMG Cap by up to an additional +5%': '专精效果中，伤害上限额外提升（最高 +5%）',
  'Upon landing a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) Combo Finisher: Low chance to gain 3 Shroud marks. Chance increases the shorter his combos are':
    '特殊攻击的连击收招命中时，有较低几率获得 3 幕；几率随连击缩短程度增加',
  'Boosts the DMG Cap of combo attacks by a max of +30% the shorter his combos are':
    '根据连击缩短程度提升普通连击的伤害上限（最高 +30%）',
  'Upon landing a combo attack: Low chance to gain 1 shroud mark. Chance increases the shorter his combos are':
    '普通连击命中时，有较低几率获得 1 幕；几率随连击缩短程度增加',

  // 尤尔达哈：真谛「疾攻」
  'Speed Runner': '疾攻',
  'Whenever Yodarha activates a skill, he gains Flash Cut.': '尤尔达哈发动能力时，获得[读秒之刃]。',
  'While in effect, it shortens damage skill cooldowns by 3%.': '效果持续期间，攻击类能力的冷却时间缩短 3%。',
  'Extends the duration of Flash Cut.': '延长[读秒之刃]的效果持续时间。',
  'In addition, Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) and Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) deal 20% more damage.':
    '此外，普通攻击与特殊攻击的造成伤害 +20%。',
  'Flash Cut no longer expires.': '[读秒之刃]不再随时间解除。',
  'While in effect, landing a combo finisher with 3 Shroud marks has a chance to reset 1 of his damage skills at random.':
    '效果持续期间，持有 3 幕时连击收招命中，有几率使随机 1 个攻击类能力立刻冷却完毕。',
  "In exchange, taking any damage removes Flash Cut and inflicts Skill Sealed for 8 sec. It can't be removed.":
    '作为代价，受到伤害时解除[读秒之刃]，并赋予无法解除的[能力封印] 8 秒。',
  'Essence Rank Perk 2: Flash Cut also grants ATK +5% to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '[读秒之刃]额外使普通攻击与特殊攻击的攻击力 +5%',
  'Essence Rank Perk 3: Flash Cut also grants DMG Cap +100% to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click); Skill Sealed Duration +30%':
    '[读秒之刃]额外使普通攻击与特殊攻击的伤害上限 +100%；[能力封印]的效果持续时间延长 30%',
  'Essence Rank Perk 3: Flash Cut also grants ATK +10%, DMG Cap +50%, and DMG Dealt +5% to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '[读秒之刃]额外使普通攻击与特殊攻击的攻击力 +10%、伤害上限 +50%、造成伤害 +5%',
  'Essence Rank Perk 3: Flash Cut grants an additional DMG Dealt +20% to Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) / Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '[读秒之刃]额外使普通攻击与特殊攻击的造成伤害 +20%',

  // 尤尔达哈：秘义「霞返」
  'Deft Deflection': '霞返',
  'Landing counters by holding Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) or with Tit for Tat grants DMG Cap↑ (15%).':
    '长按特殊攻击或使用以牙还牙发动反击命中时，获得[伤害上限提升]（15%）。',
  'Whenever Yodarha lands a link attack, or a counter from Crux Rank Perk 1, he gains a permanent lvl of Payback (max lvl 5).':
    '连锁攻击或专精赋予的反击命中时，尤尔达哈永久获得 1 级[攻守易形]（最高 5 级）。',
  'While in effect, it grants ATK +5% and DMG Cap +10% per effect lvl, but taking any damage lowers effect lvl by 1.':
    '效果持续期间，每级使攻击力 +5%、伤害上限 +10%；受到伤害时效果等级降低 1 级。',
  "Payback's max lvl is now 10.": '[攻守易形]的最高等级提升至 10。',
  'While in effect, it now grants ATK +5% and DMG Cap +15% per effect lvl instead.':
    '效果持续期间，每级改为使攻击力 +5%、伤害上限 +15%。',
  'At lvl 10, it also grants DMG Dealt +15%, and when Yodarha gains another lvl of Payback, he gains Supplementary DMG (20%).':
    '[攻守易形]达到 10 级时，造成伤害 +15%；再次获得等级时，赋予自身[追击]（20%）。',
  'Upon countering: ATK +10%': '发动反击时：攻击力 +10%',
  'Upon countering by holding Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) or with Tit for Tat: DMG Cap +25%':
    '长按特殊攻击或使用以牙还牙发动反击时：伤害上限 +25%',
  'Crux Rank Perk 1: DMG Cap↑ grants an additional DMG Cap +10%': '[伤害上限提升]的效果量额外 +10%',
  'Crux Rank Perk 2: Payback grants an additional ATK +3%': '[攻守易形]每级额外使攻击力 +3%',
  'Crux Rank Perk 2: Payback grants an additional DMG Cap +5%': '[攻守易形]每级额外使伤害上限 +5%',
  'Crux Rank Perk 3: Payback lvl 10 grants an additional DMG Dealt +2%': '[攻守易形]达到 10 级时，造成伤害额外 +2%',
  'Crux Rank Perk 3: Payback lvl 10 grants an additional DMG Dealt +3%': '[攻守易形]达到 10 级时，造成伤害额外 +3%',

  // 伯希瓦尔：觉醒「蓄力攻击强化」
  'Percival': '伯希瓦尔',
  'Charge Forth': '蓄力攻击强化',
  'Whenever Percival lands a damage skill, he gains Stoked Charge.':
    '攻击类能力命中时，伯希瓦尔获得[征战之剑++强化]。',
  'While in effect, it grants ATK +10% and DMG Cap +20% to Schlacht ++.':
    '效果持续期间，征战之剑++的攻击力 +10%、伤害上限 +20%。',
  'Upon landing Schlacht ++, Percival gains Skill DMG↑, which grants Skill ATK +5% and Skill DMG Cap +10%.':
    '征战之剑++命中时，伯希瓦尔获得[能力伤害提升]，使能力的攻击力 +5%、伤害上限 +10%。',
  'Landing Schlacht ++ also has a chance to reset 1 of his skill cooldowns at random.':
    '征战之剑++命中时，还有几率使随机 1 个能力立刻冷却完毕。',
  "While Stoked Charge is in effect, it now grants ATK +15% and DMG Cap +30% instead to Schlacht ++.":
    '[征战之剑++强化]生效期间，征战之剑++的攻击力改为 +15%、伤害上限改为 +30%。',
  "In exchange, while Stoked Charge isn't in effect, Schlacht has ATK -20% and DMG Cap -15%.":
    '作为代价，未获得[征战之剑++强化]时，征战之剑的攻击力 -20%、伤害上限 -15%。',
  'Insight Rank Perk 1: Stoked Charge grants an additional ATK +5% and DMG Cap +5% to Schlacht ++':
    '[征战之剑++强化]强化效果提升：征战之剑++的攻击力与伤害上限额外 +5%',
  'Insight Rank Perk 2: Boosts the chance to reset skill cooldowns': '使能力立刻冷却完毕的几率提升',
  'X-Seele: Petrified Duration +10%': '未知之魂赋予的[恐惧]效果持续时间 +10%',
  'Insight Rank Perk 2: Skill DMG↑ grants an additional Skill ATK +5% and Skill DMG Cap +5%':
    '[能力伤害提升]强化效果提升：能力的攻击力与伤害上限额外 +5%',
  'Insight Rank Perk 3: Stoked Charge grants an additional ATK +10% to Schlacht ++':
    '[征战之剑++强化]强化效果提升：征战之剑++的攻击力额外 +10%',
  'Insight Rank Perk 3: Stoked Charge grants an additional DMG Cap +20% to Schlacht ++':
    '[征战之剑++强化]强化效果提升：征战之剑++的伤害上限额外 +20%',
  'Insight Rank Perk 2: Landing Schlacht ++ now has a chance to reset 1 additional skill cooldown':
    '征战之剑++命中时，有几率额外使 1 个能力立刻冷却完毕',

  // 伯希瓦尔：真谛「红莲之刃」
  'Molten Edge': '红莲之刃',
  'Whenever Percival lands Schlacht ++ or link attacks, he gains a lvl of Molten Edge (max lvl 3).':
    '征战之剑++或连锁攻击命中时，伯希瓦尔获得 1 级[红莲之刃]（最高 3 级）。',
  'While in effect, it grants ATK +2% per effect lvl to his damage skills.': '效果持续期间，每级使攻击类能力的攻击力 +2%。',
  'Activating a damage skill lowers effect lvl by 1.': '发动攻击类能力时，效果等级降低 1 级。',
  "Molten Edge's max lvl is now 6, and it also grants DMG Cap +20% per effect lvl to damage skills.":
    '[红莲之刃]的最高等级提升至 6，每级额外使攻击类能力的伤害上限 +20%。',
  'In addition, the following actions now grant effect lvls:': '此外，以下行动会提升效果等级：',
  'Successful charged parry grants 3 lvls.': '成功发动蓄力反击时提升 3 级。',
  'Flammenmarsch grants 3 lvls.': '发动烈焰脚步时提升 3 级。',
  'Traumerei grants 6 lvls.': '发动梦幻曲时提升 6 级。',
  "Molten Edge's max lvl is now 9, and activating damage skills no longer lowers its effect lvl.":
    '[红莲之刃]的最高等级提升至 9，发动攻击类能力时不再降低其等级。',
  'While in effect, Zerreissen can be held to consume effect lvls, dealing bursts of bonus damage based on the number of lvls consumed.':
    '效果持续期间，可长按撕裂消耗效果等级，并根据消耗的等级连续造成追加伤害。',
  'Consuming 9 lvls in a single activation triggers a final burst of massive bonus DMG.':
    '单次发动消耗 9 级时，最后会造成一次高额追加伤害。',
  'Essence Rank Perk 1: Molten Edge grants an additional ATK +1% per effect lvl to damage skills':
    '[红莲之刃]每级额外使攻击类能力的攻击力 +1%',
  'Essence Rank Perk 2: Molten Edge grants an additional DMG Cap +10% per effect lvl to damage skills':
    '[红莲之刃]每级额外使攻击类能力的伤害上限 +10%',
  'Essence Rank Perk 3: Boosts the amount of bonus DMG dealt from holding Zerreissen': '提升长按撕裂时的追加伤害',
  'Essence Rank Perk 3: At Molten Edge lvl 9, Zerreissen gains Cooldown -75%. Upon consuming all 9 lvls, 30% more bonus DMG is dealt':
    '[红莲之刃]达到 9 级时，撕裂的冷却时间 -75%；消耗全部 9 级时，撕裂的追加伤害 +30%',
  'Essence Rank Perk 3: Upon consuming all 9 lvls of Molten Edge with Zerreissen, Percival gains DMG Cut (10%)':
    '使用撕裂消耗全部 9 级[红莲之刃]时，赋予自身[伤害减免]（10%）',
  'Chain Brust DMG Cap +40%': '奥义连锁伤害上限 +40%',
  'Upon casting Traumerei or Flammenmarsch: Zereissen Cooldown -25%': '发动梦幻曲或烈焰脚步时，撕裂的冷却时间 -25%',
  'Traumerei: Buff Duration +10% (Strength / Supplementary DMG)': '梦幻曲赋予的[强壮]与[追击]效果持续时间 +10%',

  // 伯希瓦尔：秘义「蓄力反击特化」
  'Parry Me This': '蓄力反击特化',
  'While charging Schlacht, gain DEF +10%.': '蓄力发动征战之剑期间，防御力 +10%。',
  'Whenever Percival performs a charged parry or link attack, he gains a permanent lvl of Flame Wolf (max lvl 3).':
    '成功发动蓄力反击或连锁攻击时，伯希瓦尔永久获得 1 级[炎狼]（最高 3 级）。',
  'While in effect, it grants ATK +5%, Stun Power +5%, and DMG Cap +10% per effect lvl.':
    '效果持续期间，每级使攻击力 +5%、昏厥值 +5%、伤害上限 +10%。',
  "Flame Wolf's max lvl is now 5, and it now grants ATK +10%, Stun Power +5%, and DMG Cap +15% per effect lvl instead.":
    '[炎狼]的最高等级提升至 5；每级改为使攻击力 +10%、昏厥值 +5%、伤害上限 +15%。',
  'At lvl 5, charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain DMG Dealt +10%, and upon gaining another lvl of Flame Wolf, Percival also gains Supplementary DMG (10%).':
    '[炎狼]达到 5 级时，蓄力攻击的造成伤害 +10%；再次获得[炎狼]等级时，赋予自身[追击]（10%）。',
  'Extends the window of time to perform a charged parry by 10%': '蓄力反击的判定时间 +10%',
  'Crux Rank Perk 1: While charging Schlacht, gain an additional DEF +5%': '蓄力发动征战之剑期间，防御力额外 +5%',
  'Crux Rank Perk 2: Flame Wolf grants an additional DMG Cap +5%': '[炎狼]每级额外使伤害上限 +5%',
  'Burn inflicted on foes: Duration +10%': '赋予敌人的[灼热]效果持续时间 +10%',
  'Crux Rank Perk 2: Flame Wolf grants an additional Stun Power +5% per effect lvl': '[炎狼]每级额外使昏厥值 +5%',
  'Crux Rank Perk 3: Flame Wolf grants an additional DMG Cap +10% per effect lvl': '[炎狼]每级额外使伤害上限 +10%',
  'Crux Rank Perk 3: While Flame Wolf lvl 5 is in effect, charged Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain an additional DMG Dealt +5%':
    '[炎狼]达到 5 级时，蓄力攻击的造成伤害额外 +5%',

  // 角色与专精标题（截图官方中文）
  'Eugen': '欧根',
  'Flawless Vision': '瞄准模式强化',
  'Grenade Punch': '榴弹拳法',
  'Spitting Venom': '剧毒榴弹强化',
  'Rosetta': '罗塞塔',
  'Rose Requiem': '玫瑰镇魂曲',
  'Battlefield Cultivator': '强化与弱化效果特化',
  'Fortified Roses': '玫瑰强化',

  // 巴恩：觉醒「挑衅+」
  'Vane': '巴恩',
  'Growing Hostility': '挑衅+',
  'Vane gains DEF +3% and starts quests with Shield (30,000).': '巴恩的防御力 +3%，并在任务开始时获得 30,000 点屏障。',
  'Whenever Vane lands Combo C or Beatdown combo finishers, he gains Hostility↑.':
    '特定连击或巨斧连击的连击收招命中时，获得[挑衅力提升]。',
  'His combo finishers gain Drain Amount +20% and Drain Cap +20%.': '连击收招的生命值吸收量 +20%、吸收上限 +20%。',
  'Whenever Vane gains Hostility↑, he also gains a lvl of Heroic Vigor.': '获得[挑衅力提升]时，同时获得 1 级[勇士奋起]。',
  'Casting Breakthrough raises effect lvl by 2.': '发动破军之力时，效果等级提升 2 级。',
  'While in effect, it grants up to ATK +20% and DMG Cap +100% at max lvl 10.':
    '效果持续期间，根据等级提升攻击力与伤害上限；达到最高 10 级时，攻击力 +20%、伤害上限 +100%。',
  "In addition, when Vane's HP is fully restored the first time, he gains Shield (10,000).":
    '此外，巴恩的生命值首次完全恢复时，获得 10,000 点屏障。',
  'He can gain Shield again this way after gaining a lvl of Heroic Vigor.':
    '之后每当[勇士奋起]提升 1 级，均可再次通过完全恢复生命值获得屏障。',
  'Insight Rank Perk 2: Hostility↑ Duration +20%': '[挑衅力提升]的效果持续时间 +20%',
  'Insight Rank Perk 2: Combo finishers gain an additional Drain Amount +10% and Drain Cap +10%':
    '连击收招的生命值吸收量与吸收上限额外 +10%',
  'Insight Rank Perk 3: Heroic Vigor also grants up to DMG Dealt +20% at max lvl':
    '[勇士奋起]额外提升造成伤害，达到最高等级时最多 +20%',
  'Breakthrough: Buff Duration +10% (Hostility↑ / ATK↑)': '破军之力赋予的[挑衅力提升]与[攻击提升]的效果持续时间 +10%',

  // 巴恩：真谛「我助人人」
  'Team Player': '我助人人',
  'Whenever Vane casts a skill that grants ATK↑ or DEF↑ to himself, all allies gain a reduced version of those effects.':
    '巴恩发动会赋予自身[攻击提升]或[防御提升]的能力时，向所有同伴赋予效果量降低的相同强化效果。',
  "Vane gains Synergy Boost based on the number of buffs he's granted to allies.":
    '根据巴恩赋予同伴的强化效果数量，获得[强化回馈]。',
  'While in effect, it boosts ATK and DMG Cap based on its lvl (ATK +10% and DMG Cap +50% at max lvl 15).':
    '效果持续期间，根据等级提升攻击力与伤害上限；达到最高 15 级时，攻击力 +10%、伤害上限 +50%。',
  "Shortens damage skill cooldowns of party members inside Rampart's Invincibility AoE.":
    '缩短处于铜墙铁壁无敌区域内同伴的攻击类能力冷却时间。',
  'Party members that remain in the AoE for at least 2 sec. also gain ATK ↑ (10%).':
    '同伴在无敌区域内停留至少 2 秒后，额外获得[攻击提升]（10%）。',
  'Essence Rank Perk 2: Synergy Boost grants up to an additional ATK +5% and DMG Cap +10% per effect lvl':
    '[强化回馈]强化效果提升：达到最高等级时，攻击力额外 +5%、伤害上限额外 +10%',
  "Essence Rank Perk 3: Allies who remain inside Rampart's AoE for 3 sec. gain DMG Cap↑ (15%)":
    '专精生效时，同伴在铜墙铁壁的无敌区域内停留 3 秒后获得[伤害上限提升]（15%）',
  "Essence Rank Perk 3: Allies who remain inside Rampart's AoE for 5 sec. gain DEF↑ (10%)":
    '专精生效时，同伴在铜墙铁壁的无敌区域内停留 5 秒后获得[防御提升]（10%）',
  "Essence Rank Perk 3: Allies who remain inside Rampart's AoE for 7 sec. gain DMG↑ (5%)":
    '专精生效时，同伴在铜墙铁壁的无敌区域内停留 7 秒后获得[造成伤害提升]（5%）',
  "Essence Rank Perk 3: For allies inside Rampart's AoE, further shortens damage skill cooldowns by 2%":
    '专精生效时，铜墙铁壁无敌区域内同伴的攻击类能力冷却速度额外提升（相当于冷却时间 -2%）',
  "Allies who remain inside Rampart's AoE for 8 sec. gain Mirror Image, but Rampart's duration is shortened by 8 sec.":
    '铜墙铁壁的效果持续时间缩短 8 秒；同伴在无敌区域内停留 8 秒后获得[幻影]。',

  // 巴恩：秘义「勇往直前」
  'Resolve': '勇往直前',
  'Blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) boosts Beatdown Gauge Gain by 20%.':
    '使用特殊攻击防御时，巨斧槽提升量 +20%。',
  'While blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click), Vane is immune to debuffs.':
    '使用特殊攻击防御期间，巴恩不会受到弱化效果影响。',
  'Performing link attacks or blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) grants a permanent lvl of Booming Beatdown (max lvl 5).':
    '发动连锁攻击或使用特殊攻击防御时，永久获得 1 级[巨斧连击强化]（最高 5 级）。',
  'While in effect, Beatdown combos gain DMG Dealt +5% and DMG Taken while Blocking -1% per effect lvl.':
    '效果持续期间，每级使巨斧连击的造成伤害 +5%、防御时受到的伤害 -1%。',
  "Booming Beatdown's max lvl is now 10.": '[巨斧连击强化]的最高等级提升至 10。',
  'While in effect, Beatdown combos now gain DMG Dealt +5%, Drain Amount +1%, and DMG Taken while Blocking -2% per effect lvl.':
    '效果持续期间，每级使巨斧连击的造成伤害 +5%、生命值吸收量 +1%、防御时受到的伤害 -2%。',
  'At lvl 10, gaining another lvl of Booming Beatdown grants Supplementary DMG (10%).':
    '[巨斧连击强化]达到 10 级后，再次获得等级时赋予[追击]（10%）。',
  'Take 10% less damage when blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '使用特殊攻击防御时受到的伤害 -10%',
  'Crux Rank Perk 1: Beatdown Gauge Gain +10%': '巨斧槽提升量 +10%',
  'Perfect guards fill the SBA gauge by 0.1%. Blocking with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) fills the SBA gauge by 0.2%':
    '触发精准格挡时奥义槽 +0.1%；使用特殊攻击防御触发格挡时奥义槽 +0.2%',
  'Take 10% less damage when block with Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click)':
    '使用特殊攻击防御时受到的伤害 -10%',
  'Crux Rank Perk 3: While Booming Beatdown is in effect, Beatdown combos gain an additional Drain Amount +1%':
    '[巨斧连击强化]生效期间，巨斧连击的生命值吸收量额外 +1%',
  'Crux Rank Perk 3: While Booming Beatdown is in effect, Beatdown combos gain an additional DMG Dealt +5%':
    '[巨斧连击强化]生效期间，巨斧连击的造成伤害额外 +5%',

  // 兰斯洛特：觉醒「精准收招特化」
  'Lancelot': '兰斯洛特',
  'Insight': '觉醒',
  'Finish with Perfection': '精准收招特化',
  'Right as Avalanche reaches lvl 5 from rapidly pressing Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click), performing a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finisher executes a perfect finisher instead.':
    '快速连续发动普通攻击，使[连击等级]达到 5 的瞬间衔接特殊攻击的连击收招，将发动精准收招。',
  'Perfect finishers gain DMG Cap +20%.': '精准收招的伤害上限 +20%。',
  'Upon landing a perfect finisher, Lancelot gains Enhanced Damage Skills.': '精准收招命中时，兰斯洛特获得[攻击类能力强化]。',
  'While in effect, it grants ATK +10% and DMG Dealt +20% to damage skills.': '效果持续期间，攻击类能力的攻击力 +10%、造成伤害 +20%。',
  'Enhanced Damage Skills grants an additional ATK +30% and DMG Dealt +50% to damage skills.': '[攻击类能力强化]额外使攻击类能力的攻击力 +30%、造成伤害 +50%。',
  'Rapidly pressing Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) right after a perfect finisher now chains into a combo.':
    '精准收招后立刻快速连续发动普通攻击，可继续衔接连击。',
  "In addition, upon executing a perfect finisher or certain skills, Avalanche's lvl is reset, allowing Lancelot to regain lvls sooner.":
    '此外，发动精准收招或特定能力时会重置[连击等级]，使兰斯洛特能更快重新提升等级。',
  'Avalanche now grants ATK +2% per effect lvl.': '[连击等级]每级使攻击力 +2%。',
  'Insight Rank Perk 1: Extends the window of time to perform a perfect finisher by 10%.': '精准收招的输入时机延长 10%。',
  'Perfect Finishers: ATK +10%': '精准收招：攻击力 +10%',
  'Insight Rank Perk 2: Enhanced Damage Skills grants an additional ATK +20% and DMG Dealt +10% to damage skills':
    '[攻击类能力强化]额外使攻击类能力的攻击力 +20%、造成伤害 +10%',
  'Insight Rank Perk 2: Enhanced Damage Skills also grants Regen': '[攻击类能力强化]额外赋予[自动回复]',
  'Perfect Finishers: DMG Cap +35%': '精准收招：伤害上限 +35%',
  'Kaltzwinger: Also inflicts ATK↓ (10%). Stacks with other master traits of the same effect':
    '寒冰魔爪：额外赋予[攻击降低]（10%）。可与其他相同效果的专精叠加',
  'EX': '额外强化',
  'Insight Rank Perk 3: While Enhanced Damage Skills is in effect, it grows stronger over time. Effect strength resets when Enhanced Damage Skills is removed':
    '[攻击类能力强化]会随持续时间逐渐增强；效果解除时，强化幅度重置',

  // 兰斯洛特：真谛「躲避强化」
  'Essence': '真谛',
  'Artful Dodger': '躲避强化',
  "Luftspiegelung's Mirror Image nullifies 1 more hit.": '乱气流赋予的[幻影]可额外抵消 1 次攻击。',
  'Upon performing a link attack or perfect dodge, Lancelot gains a permanent lvl of Enhanced Combo Finishers (max lvl 5).':
    '发动连锁攻击或精准躲避时，兰斯洛特永久获得 1 级[连击收招强化]（最高 5 级）。',
  'While in effect, it grants ATK +5% and DMG Cap +20% per effect lvl to combo finishers.':
    '效果持续期间，每级使连击收招的攻击力 +5%、伤害上限 +20%。',
  "Perfect dodges trigger by the Flight over Fight trait don't grant Enhanced Combo Finishers.":
    '通过因子[明镜止水]触发的精准躲避不会获得[连击收招强化]。',
  "Enhanced Combo Finishers's max lvl is now 10 and grants an additional ATK +10% and DMG Cap +40% per effect lvl to combo finishers.":
    '[连击收招强化]的最高等级提升至 10；每级额外使连击收招的攻击力 +10%、伤害上限 +40%。',
  'At Enhanced Combo Finisher lvl 10, pressing Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) with perfect timing after a combo finisher triggers a follow-up finisher.':
    '[连击收招强化]达到 10 级时，在连击收招后精准衔接特殊攻击可发动追加收招。',
  'In addition, upon gaining another lvl of Enhanced Combo Finisher, he gains Supplementary DMG (20%).':
    '此外，再次提升[连击收招强化]等级时，获得[追击]（20%）。',
  'Extends the window of time to perform a perfect dodge by 10%. Has no effect if the Improved Dodge trait is equipped':
    '精准躲避的判定时间延长 10%。装备因子[躲避性能]时不会生效',
  'Essence Rank Perk 1: Mirror Image nullifies 1 more hit': '[幻影]可额外抵消 1 次攻击',
  'Essence Rank Perk 2: Boosts DEF by a max of +10% based on the number of Enhanced Combo Finishers gained during the quest':
    '根据本次任务中获得的[连击收招强化]等级，防御力最高 +10%',
  'Schwertgeist: Grants DMG Cap↑ (10%) to the entire party': '剑魂：赋予全队[伤害上限提升]（10%）',
  'Essence Rank Perk 3: Enhanced Combo Finishers grants an additional DMG Cap +15% per effect lvl to Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) finishers':
    '[连击收招强化]每级额外使特殊攻击收招的伤害上限 +15%',
  'Essence Rank Perk 3: Enhanced Combo Finishers also grants DMG Dealt +3% per effect lvl to Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) finishers':
    '[连击收招强化]每级额外使特殊攻击收招的造成伤害 +3%',
  'Lancelot gains DMG Dealt +5%, but Invincibility from perfect dodges can no longer be extended by traits':
    '兰斯洛特的造成伤害 +5%，但精准躲避赋予的[无敌]无法再通过因子延长',
  'Essence Rank Perk 3: After performing a perfect finisher, each follow-up finisher deals 30% Supplementary DMG':
    '发动精准收招后，每次追加收招造成 30% 的追击伤害',

  // 兰斯洛特：秘义「攻击类能力高速化」
  'Crux': '秘义',
  'Skill Acceleration': '攻击类能力高速化',
  'Avalanche now grants ATK +3% per effect lvl.': '[连击等级]每级使攻击力 +3%。',
  "Avalanche's max lvl is now 7 and lasts 3 sec. longer.": '[连击等级]的最高等级提升至 7，持续时间延长 3 秒。',
  "While in effect, all of Lancelot's skills are now chainable into his rapid Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) combo, and landing Normal Attacks shortens his damage skill cooldowns by 0.2%.":
    '效果持续期间，兰斯洛特的所有能力均可衔接至快速普通攻击连击；普通攻击命中时，攻击类能力的冷却时间缩短 0.2%。',
  "Avalanche's max lvl is now 9.": '[连击等级]的最高等级提升至 9。',
  'At lvl 9, landing a Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) has a chance to reset 1 of Lancelot\'s damage skill cooldowns at random.':
    '[连击等级]达到 9 时，普通攻击命中有几率使随机 1 个攻击类能力立刻冷却完毕。',
  'In exchange, taking any damage removes Avalanche.': '作为代价，受到伤害时会解除[连击等级]。',
  'Avalanche now grants ATK +2% per effect lvl': '[连击等级]每级使攻击力 +2%',
  'Crux Rank Perk 1: At lvl 5 and above, Avalanche also grants DMG Cap +8% per effect lvl':
    '[连击等级]达到 5 级以上时，每级额外使伤害上限 +8%',
  'Crux Rank Perk 1: Upon gaining a lvl of Avalanche, Lancelot recovers HP': '提升[连击等级]时，兰斯洛特回复生命值',
  'Crux Rank Perk 3: The longer Lancelot sustains Avalanche at lvl 9, the higher the chance for Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) to reset a damage skill cooldown':
    '[连击等级]维持在 9 的时间越长，普通攻击使攻击类能力立刻冷却完毕的几率越高',
  'Crux Rank Perk 2: Further shortens damage skill cooldowns by 0.3%': '攻击类能力的冷却时间额外缩短 0.3%',
  'Crux Rank Perk 3: At Avalanche lvl 9, skills gain ATK +50% and DMG Cap +50%':
    '[连击等级]达到 9 时，能力的攻击力 +50%、伤害上限 +50%',
  'Crux Rank Perk 3: If Avalanche lvl 9 stays active for at least 10 sec., Lancelot gains Shield (10,000) when Avalanche lvl 9 ends':
    '[连击等级]达到 9 并维持至少 10 秒后，效果结束时赋予兰斯洛特 10,000 点屏障',

  // 罗塞塔：觉醒「玫瑰镇魂曲」
  'Upon casting Lost Love, if 3 roses at lvl 4 land hits simultaneously, Rosetta gains Spiral Rose Bloomed.':
    '发动落花无情时，若 3 朵 4 级玫瑰同时命中，罗塞塔获得[螺旋玫瑰强化]。',
  'While in effect, it grants DMG Dealt +10% to Spiral Rose.': '效果持续期间，螺旋玫瑰的造成伤害 +10%。',
  'Upon casting Spiral Rose, if any number of lvl 4 roses lands at least 5 hits, Rosetta gains Lost Love Bloomed.':
    '发动螺旋玫瑰时，任意数量的 4 级玫瑰合计命中至少 5 次，罗塞塔获得[落花无情强化]。',
  'While in effect, it grants DMG Dealt +20% to Lost Love.': '效果持续期间，落花无情的造成伤害 +20%。',
  'Whenever Rosetta gains both Spiral Rose Bloomed and Lost Love Bloomed, the skill corresponding to the most recent buff gained is reset.':
    '同时获得[螺旋玫瑰强化]与[落花无情强化]时，使最后获得的强化效果所对应的能力立刻冷却完毕。',
  'In exchange, when she takes 100,000 or more damage from a single attack, all roses instantly wilt.':
    '作为代价，单次承受 100,000 以上伤害时，所有玫瑰立刻枯萎。',
  'Rose Attack Interval -10%': '玫瑰的攻击间隔 -10%',
  'Insight Rank Perk 1: Lvl 4 Roses Required -1': '专精生效时，获得强化效果所需同时命中的 4 级玫瑰数量 -1',
  'Insight Rank Perk 1: Upon gaining Spiral Rose Bloomed, Rosetta also gains DMG Cut (10%)':
    '专精生效时，获得[螺旋玫瑰强化]时额外获得 10% 的伤害减免效果',
  'Insight Rank Perk 1: Spiral Rose Bloomed grants an additional DMG Dealt +10% to Lost Love':
    '专精效果中，[螺旋玫瑰强化]强化效果提升：落花无情的造成伤害 +10%',
  'Insight Rank Perk 2: Gaining Lost Love Bloomed also inflicts ATK↓ (10%) to foes that took at least 5 hits':
    '专精效果中，获得[落花无情强化]时，对至少承受 5 次命中的敌人额外赋予[攻击降低]（10%）',
  'Insight Rank Perk 3: When Lost Love is reset by gaining Lost Love Bloomed, Rosetta gains DMG↑ (30%), and existing roses last longer':
    '专精效果中，通过[落花无情强化]使能力立刻冷却完毕时，额外获得[造成伤害提升]（30%），并延长玫瑰的持续时间',
  'Insight Rank Perk 3: When Spiral Rose is reset by gaining Spiral Rose Bloomed, Rosetta gains Shield (3000)':
    '专精效果中，通过[螺旋玫瑰强化]使能力立刻冷却完毕时，赋予自身 3000 点屏障',
  'Insight Rank Perk 2: Lost Love Bloomed grants an additional DMG Dealt +10% to Lost Love':
    '专精效果中，[落花无情强化]强化效果提升：落花无情的造成伤害 +10%',

  // 罗塞塔：真谛「强化与弱化效果特化」
  'Whenever a rose lands extra attacks from Combo D, it also inflicts ATK↓ (2%) and DEF↓ per rose lvl.':
    '玫瑰发动特定连击的追加攻击时，根据玫瑰等级赋予[攻击降低]（每级 2%）与[防御降低]。',
  "Whenever a rose performs extra attacks from Combo D, it grants ATK↑ (2%) and DEF↑ (2%) per rose lvl to party members inside its AoE.":
    '玫瑰发动特定连击的追加攻击时，根据玫瑰等级赋予效果范围内的同伴[攻击提升]与[防御提升]（每级 2%）。',
  'Party members inside overlapping AoEs of 2 or more lvl 4 roses gain Supplementary DMG (30%).':
    '位于至少 2 朵 4 级玫瑰重叠效果范围内的同伴获得追击效果（30%）。',
  'Party members inside overlapping AoEs of 3 or more lvl 4 roses also gain Skill Cooldown -7%.':
    '位于至少 3 朵 4 级玫瑰重叠效果范围内的同伴，能力冷却时间额外缩短 7%。',
  'Each effect ends upon leaving their respective overlaps.': '离开对应的重叠效果范围时，强化效果结束。',
  'Rose ATK +10%': '玫瑰的攻击力 +10%',
  'Essence Rank Perk 1: ATK↓ inflicts an additional ATK -1% per rose lvl':
    '专精效果中，[攻击降低]弱化效果提升：玫瑰每级攻击力 -1%',
  'Essence Rank Perk 1: DEF↓ inflicts an additional DEF -1% per rose lvl':
    '专精效果中，[防御降低]弱化效果提升：玫瑰每级防御力 -1%',
  'Essence Rank Perk 2: Also grants Regen to party members': '专精效果中，赋予强化效果时额外赋予[再生]',
  "Essence Rank Perk 2: ATK↑ and DEF↑ granted by Combo D's extra attacks grant an additional ATK and DEF +1% per rose lvl":
    '专精效果中，追加攻击赋予的[攻击提升]与[防御提升]强化效果提升：玫瑰每级 +1%',
  'Rose Gauge Depletion Speed -10%': '玫瑰槽的减少速度 -10%',
  'Essence Rank Perk 3: Party members inside 3 overlapping AoEs gain an additional Skill Cooldown -3%':
    '专精效果中，位于 3 个重叠效果范围内的同伴能力冷却时间进一步缩短 3%',
  'Iron Maiden: Buff Duration +10% (Stout Heart / Iron Maiden)':
    '铁娘子赋予的[霸体]与[铁娘子]强化效果持续时间 +10%',
  'Rose Barrier: Grants Shield (15,000 to self / 5000 to allies)':
    '玫瑰结界额外赋予屏障：自身 15,000 点 / 同伴 5,000 点',
  'Rose Tycoon: Poison Duration +10%': '群花之主赋予的[中毒]弱化效果持续时间 +10%',

  // 罗塞塔：秘义「玫瑰强化」
  "Whenever a lvl 4 rose lands a hit, Rosetta's skill cooldowns shorten by 0.1%.":
    '每当 4 级玫瑰命中时，罗塞塔的能力冷却时间缩短 0.1%。',
  'Roses gain a 50% chance to deal extra attacks to foes within reach.': '玫瑰有 50% 几率对攻击范围内的敌人发动追加攻击。',
  'Rose attacks gain Drain.': '玫瑰攻击追加汲取效果。',
  'In addition, whenever roses deal 4,000,000 damage, Rosetta gains the following buffs in this order:':
    '此外，玫瑰每累计造成 4,000,000 伤害，罗塞塔会依次获得下列强化效果：',
  'Stackable ATK↑ (5%) (max stacks: 6)': '可叠加的[攻击提升]（5%，最多 6 层）',
  'DMG↑ (30%)': '[造成伤害提升]（30%）',
  'Crux Rank Perk 1: Further shortens skill cooldowns by 0.1%': '专精效果中，能力冷却时间进一步缩短 0.1%',
  'Rose DMG Cap +30%': '玫瑰的伤害上限 +30%',
  'Crux Rank Perk 2: Roses gain an additional 15% chance to deal extra attacks': '专精效果中，玫瑰发动追加攻击的几率 +15%',
  'Crux Rank Perk 3: Boosts the strength of Stackable ATK↑, Supplementary DMG, and DMG↑ gained from roses dealing the required damage':
    '专精效果中，玫瑰累计伤害所赋予的[攻击提升]、追击与[造成伤害提升]强化效果提升',
  'Crux Rank Perk 3: Reduces rose damage required to gain Stackable ATK↑, Supplementary DMG, and DMG↑ by 1,000,000':
    '专精生效时，获得[攻击提升]、追击与[造成伤害提升]所需的玫瑰累计伤害量 -1,000,000',

  // 欧根：觉醒「瞄准模式强化」
  "Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) fired in sniper vision gain ATK +5% and shorten Eugen's skill cooldowns by 0.1%.":
    '瞄准模式下的蓄力攻击获得攻击力 +5%，并使欧根的能力冷却时间缩短 0.1%。',
  'Upon landing a charged Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) in sniper vision, Eugen gains a lvl of Sniper Elite (max lvl 3).':
    '瞄准模式下蓄力攻击命中时，欧根获得 1 级[瞄准模式强化]（最高 3 级）。',
  'While in effect, it grants ATK +20%, DMG Cap +30%, and Skill Cooldown -0.1% per effect lvl to charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) fired in sniper vision.':
    '效果持续期间，每级使瞄准模式下蓄力攻击的攻击力 +20% / 伤害上限 +30%，并使能力冷却时间缩短 0.1%。',
  'Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) fired in sniper vision gain Hit Count +1 but take 30% longer to charge.':
    '瞄准模式下蓄力攻击的命中次数 +1，但蓄力时间延长 30%。',
  'Detonator and Sumrak also grant a lvl of Sniper Elite.': '爆裂射击与暮光也会赋予 1 级[瞄准模式强化]。',
  'At Sniper Elite lvl 3, Detonator grants ATK +30%, DMG Dealt +50%, has a 70% chance to not go on cooldown.':
    '[瞄准模式强化]达到 3 级时，爆裂射击的攻击力 +30% / 造成伤害 +50%，并有 70% 几率立刻冷却完毕。',
  'Activating Detonator consumes Sniper Elite.': '发动爆裂射击时，消耗[瞄准模式强化]。',
  'While in sniper vision: DEF +5%': '瞄准模式下：防御力 +5%',
  'While in sniper vision: ATK +10%': '瞄准模式下：攻击力 +10%',
  'Insight Rank Perk 1: Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain an additional ATK +5%':
    '专精效果中，蓄力攻击的攻击力 +5%',
  'Insight Rank Perk 1: Further shortens skill cooldowns by 0.1%': '专精效果中，能力冷却时间进一步缩短 0.1%',
  'While in sniper vision: DMG Cap +30%': '瞄准模式下：伤害上限 +30%',
  'Sumrak: Reduced recoil': '使用暮光时受到的后坐力降低',
  'While in sniper vision: Charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): Charge Time -5%':
    '瞄准模式下蓄力攻击的蓄力时间 -5%',
  'Insight Rank Perk 3: Detonator gains an additional +30% chance to not go on cooldown. Also gains a 10% chance to not consume Sniper Elite lvl 3':
    '专精效果中，爆裂射击立刻冷却完毕的几率 +30%；发动后有 10% 几率保留[瞄准模式强化]3 级',
  'Insight Rank Perk 2: Sniper Elite grants an additional ATK +10% and DMG Cap +20% per effect lvl to charged Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) fired in sniper vision':
    '专精生效时，[瞄准模式强化]对瞄准模式下蓄力攻击的强化效果提升：每级攻击力 +10% / 伤害上限 +20%',
  "While in sniper vision: Foe attacks won't interrupt Eugen": '瞄准模式下赋予自身霸体效果',

  // 欧根：真谛「榴弹拳法」
  'Grenades gain ATK +20% and Stun Power +10% against weak points.': '榴弹攻击弱点部位时，攻击力 +20% / 昏厥值 +10%。',
  'Grenades gain an additional ATK +10%, DMG Cap +50%, DMG Dealt +30%, and Weak Point DMG Cap +100%.':
    '榴弹额外获得攻击力 +10% / 伤害上限 +50% / 造成伤害 +30% / 弱点伤害上限 +100%。',
  "Grenades attached to a foe now chain explode when detonated by Eugen's Normal Melee Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click).":
    '附着于敌人的榴弹被欧根的近距离普通攻击引爆时，会发生连锁爆炸。',
  'Executing a 3-grenade chain explosion on a foe inflicts Shell Shock.': '对同一敌人触发 3 枚榴弹的连锁爆炸时，赋予[穿甲冲击]。',
  'Grenade DMG dealt to foes debuffed by Shell Shock is always Weak Point DMG.':
    '榴弹对处于[穿甲冲击]状态的敌人造成的伤害必定视为弱点伤害。',
  'Grenades gain an additional ATK +10% and DMG Cap +100%.': '榴弹额外获得攻击力 +10% / 伤害上限 +100%。',
  '2-grenade chain explosions also inflict Shell Shock.': '2 枚榴弹的连锁爆炸也会赋予[穿甲冲击]。',
  '3-grenade chain explosions also gain ATK +10% and DMG Dealt +50%': '3 枚榴弹连锁爆炸的攻击力 +10% / 造成伤害 +50%',
  'Grenade ATK +10%': '榴弹的攻击力 +10%',
  'Grenade Stun Power +5%': '榴弹的昏厥值 +5%',
  'Essence Rank Perk 1: Grenades gain an additional ATK +10% against weak points':
    '专精效果中，攻击弱点部位时榴弹的攻击力 +10%',
  'Grenade DMG Cap +35%': '榴弹的伤害上限 +35%',
  'Essence Rank Perk 2: Grenades gain an additional ATK +30%': '专精生效时，榴弹的攻击力 +30%',
  'Essence Rank Perk 2: Grenades gain an additional DMG Cap +50%': '专精生效时，榴弹的伤害上限 +50%',
  'Essence Rank Perk 2: Armor-Piercing Round can now detonate grenades. Grenades detonated this way gain an additional ATK +10%':
    '专精生效时，可通过穿甲弹引爆榴弹；通过穿甲弹引爆时榴弹的攻击力 +10%',
  'Essence Rank Perk 2: Grenades detonated by Normal Melee Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) deal bonus DMG':
    '专精生效时，通过近距离普通攻击引爆榴弹可造成追加伤害',
  'Essence Rank Perk 2: Intercept can now detonate grenades. Grenades detonated this way inflict Burn':
    '专精生效时，可通过战术拦截引爆榴弹；通过战术拦截引爆时额外赋予[灼热]',
  'Intercept: Always grants Stout Heart': '战术拦截额外赋予[霸体]',

  // 欧根：秘义「剧毒榴弹强化」
  "Venom Grenade's Poison debuff gains Poison DMG +10% and Duration +20%.":
    '剧毒榴弹赋予的[中毒]弱化效果提升：中毒伤害 +10% / 持续时间 +20%。',
  'Eugen gains ATK +20% against foes inflicted by his Poison.': '攻击被自身赋予[中毒]的敌人时，欧根的攻击力 +20%。',
  'In addition, landing shots from Disruptor extends Poison duration by 5 sec. per hit.':
    '此外，驱散射击每次命中会使[中毒]的持续时间延长 5 秒。',
  "Landing Paralyzing Bullet on a foe poisoned by Eugen extends Poison's duration by 10 sec.":
    '麻痹弹命中被欧根赋予[中毒]的敌人时，[中毒]的持续时间延长 10 秒。',
  'Upon inflicting a foe with both Poison and Paralysis, Eugen gains ATK↑ (20%) and DMG↑ (15%).':
    '使敌人同时陷入[中毒]与[麻痹]状态时，欧根获得[攻击提升]（20%）与[造成伤害提升]（15%）。',
  'Crux Rank Perk 1: Poison Duration +10%': '专精效果中，[中毒]的效果持续时间 +10%',
  'Crux Rank Perk 1: Poison DMG +10%': '专精效果中，[中毒]的造成伤害 +10%',
  'Healing Bullet now grants Shield (5% of max HP) instead of healing HP. Stacks with other master traits of the same effect':
    '治疗弹的回复效果变为屏障效果，赋予相当于最大生命值 5% 的屏障；同类效果可叠加',
  'Crux Rank Perk 2: While attacking foes inflicted by his poison, Eugen gains an additional ATK +10%':
    '专精效果中，对处于自身[中毒]状态下的敌人攻击力 +10%',
  'Crux Rank Perk 3: Upon inflicting a foe with both Poison and Paralysis, Eugen gains an additional ATK +10% and DMG Dealt +10%':
    '专精效果中，使敌人同时陷入[中毒]与[麻痹]状态时获得的强化效果提升：攻击力 +10% / 造成伤害 +10%',
  'Paralyzing Bullet: Paralysis Duration +10%': '麻痹弹赋予的[麻痹]弱化效果持续时间 +10%',

  // 伊德：觉醒「神威一体强化」
  'Whenever Id lands a damage skill, he gains a lvl of Heliotrope Aura (max lvl 10).':
    '伊德的攻击类能力命中时，获得 1 级[紫银之力]（最高 10 级）。',
  'While in effect, it grants ATK +2% per effect lvl.': '效果持续期间，每级攻击力 +2%。',
  'At lvl 10, it grants ATK +10% to:': '达到 10 级时，下列攻击的攻击力 +10%：',
  'Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers while untransformed':
    '普通状态下的特殊攻击连击收招',
  'Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers and Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) power strikes while in Godmight':
    '神威一体状态下的特殊攻击派生攻击与特殊攻击连击收招',
  'Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) and Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers while in Dragonform':
    '龙人化状态下的普通攻击与特殊攻击连击收招',
  'Id starts a quest with Heliotrope Aura lvl 2.': '任务开始时，伊德获得 2 级[紫银之力]。',
  'While in effect, it grants an additional ATK +2% per effect lvl, as well as DMG Cap +5% per effect lvl.':
    '效果持续期间，每级额外获得攻击力 +2% / 伤害上限 +5%。',
  'If the Versalis Heart trait is equipped, upon gaining 4 outer segments in Dragonform, the transformation restriction is ignored, and he immediately enters Godmight.':
    '装备维萨斯之心时，龙人化状态下异能槽外圈达到 4 格后，无视变身限制并立刻进入神威一体状态。',
  'Whenever Id performs a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) after Sword Flurry or a combo finisher in Dragonform, he gains a lvl of Heliotrope Aura.':
    '龙人化状态下，在派生攻击或连击收招后发动特殊攻击时，获得 1 级[紫银之力]。',
  "While in Godmight and buffed by Heliotrope Aura, Id's attacks deal more damage based on the effect lvl.":
    '神威一体状态下，[紫银之力]生效时会根据其等级提升伊德的攻击伤害。',
  'At lvl 10, attacks in Godmight gain ATK +10%.': '达到 10 级时，神威一体状态下的攻击力 +10%。',
  'While in Godmight: ATK 10%': '神威一体状态下：攻击力 +10%',
  'Insight Rank Perk 1: Heliotrope Aura Duration +2 sec.': '专精效果中，[紫银之力]的效果持续时间 +2 秒',
  'Upon landing damage skills: Versalis Gauge Gain +5%': '攻击类能力命中时：异能槽提升量 +5%',
  'While in Godmight: Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) power strikes and Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finishers gain ATK +10%':
    '神威一体状态下：特殊攻击派生攻击和特殊攻击连击收招的攻击力 +10%',
  'Reginleiv Recidive: ATK +10%': '圣迹再临：攻击力 +10%',
  'Upon landing Scourge: Versalis Gauge Gain +10%': '天谴命中时：异能槽提升量 +10%',
  'Insight Rank Perk 1: Heliotrope Aura Duration +3 sec.': '专精效果中，[紫银之力]的效果持续时间 +3 秒',
  'Insight Rank Perk 1: When Godmight ends, Id gains Heliotrope Aura lvl 3':
    '专精生效时，神威一体状态解除时赋予自身[紫银之力]3 级',
  'Atonement: While Substitute is in effect, Id gains ATK +20% and DEF +10%':
    '使用赎罪赋予自身[挺身而出]时：攻击力 +20% / 防御力 +10%',
  "When Godmight ends, all of Id's skill cooldowns are reset": '神威一体状态解除时，使所有能力立刻冷却完毕',

  // 伊德：真谛「龙人化强化」
  'While in Dragonform, Id gains ATK +20%, DMG Cap +20%, and DEF -10%.':
    '龙人化状态下，伊德的攻击力 +20% / 伤害上限 +20% / 防御力 -10%。',
  "In addition, landing combo finishers while in Dragonform has a chance to reset 1 of Id's skill cooldowns at random.":
    '此外，龙人化状态下连击收招命中时，有几率使随机 1 个能力立刻冷却完毕。',
  'While in Dragonform, the Versalis gauge depletes 50% slower.': '龙人化状态下，异能槽的消耗速度降低 50%。',
  'Id gains Supplementary DMG (10%), and the attack specs of his damage skills are enhanced.':
    '伊德获得 10% 的追击效果，且攻击类能力的攻击性能提升。',
  'Godmight is permanently sealed by Inversa.': '作为代价，神威一体状态将无法发动。',
  'While in Dragonform, Id gains ATK +20% and DMG Dealt +50%.':
    '龙人化状态下，伊德的攻击力 +20% / 造成伤害 +50%。',
  'His Dragonform Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finisher deals 300% more damage but consumes the entire Versalis gauge.':
    '龙人化状态下，特殊攻击连击收招的造成伤害 +300%，但会消耗全部异能槽。',
  'While in Dragonform: ATK +10%': '龙人化状态下：攻击力 +10%',
  'Versalis Gauge Gain +5%': '异能槽提升量 +5%',
  'While in Dragonform: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) ATK +10%':
    '龙人化状态下：普通攻击的攻击力 +10%',
  'Reginleiv Recidive: Gains Drain': '圣迹再临追加汲取效果',
  'While not transformed: Versalis Gauge Gain +10%': '普通状态下：异能槽提升量 +10%',
  'While in Dragonform: Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) Combo Finishers ATK +10%':
    '龙人化状态下：特殊攻击连击收招的攻击力 +10%',
  'While in Dragonform: DMG Cap +40%': '龙人化状态下：伤害上限 +40%',
  'Ragnarok Form: Grants ATK↑ (15%) to Id': '末日形态额外赋予自身[攻击提升]：攻击力 +15%',
  'Ragnarok Form: Grants ATK↑ (5%) to the party': '使用末日形态时赋予己方全体[攻击提升]：攻击力 +5%',

  // 伊德：秘义「神愿之力特化」
  'Fourfold Vengeance gains ATK +10% and Charge Time -20%.': '神愿之力的攻击力 +10% / 蓄力时间 -20%。',
  'Performing a fully charged Fourfold Vengeance grants ATK↑ (20%) and Supplementary DMG (10%) to Id.':
    '发动完全蓄力的神愿之力时，赋予自身[攻击提升]（20%）与追击效果（10%）。',
  'Landing a fully charged Fourfold Vengeance instantly resets its cooldown.':
    '完全蓄力的神愿之力命中时，使该能力立刻冷却完毕。',
  'In addition, Fourfold Vengeance can now act as a charged parry.': '此外，神愿之力可在蓄力期间招架攻击。',
  'Upon a successful parry, Id gains DMG Cap↑ (50%).': '成功招架时，伊德获得[伤害上限提升]（50%）。',
  'When Fourfold Vengeance is interrupted, it goes on cooldown.': '神愿之力被中断时进入冷却。',
  "Landing combo finishers shortens Fourfold Vengeance's cooldown based on Id's form.":
    '连击收招命中时，根据伊德当前形态缩短神愿之力的冷却时间。',
  "While untransformed or in Dragonform: Fourfold Vengeance's cooldown -20%":
    '普通状态或龙人化状态下：神愿之力的冷却时间 -20%',
  "While in Godmight: Fourfold Vengeance's cooldown -50%": '神威一体状态下：神愿之力的冷却时间 -50%',
  'In addition, while in Godmight, the Versalis gauge no longer depletes while charging Fourfold Vengeance.':
    '此外，神威一体状态下蓄力神愿之力时，异能槽不会减少。',
  'Fourfold Vengeance now remains in its assigned skill slot during Dragonform. While in Dragonform, landing Fourfold Vengeance fills 1 segment of the Versalis gauge':
    '装备神愿之力时，龙人化状态下也可使用该能力；龙人化状态下该能力命中时，异能槽 +1',
  'Fourfold Vengeance: Gains Drain': '神愿之力追加汲取效果',
  'Fourfold Vengeance gains Cooldown -20%, but Id suffers from Max HP -30%':
    '神愿之力的冷却时间 -20%，但最大生命值 -30%',
  'Arcadia: Inflicts DEF↓ (10%) to foes': '乐园之噬额外赋予[防御降低]：防御力 -10%',
  'Fourfold Vengeance gains Charge Time -15%, but Id suffers from DEF -20%':
    '神愿之力的蓄力时间 -15%，但防御力 -20%',
  'While in Dragonform: Skill Cooldown -3%': '龙人化状态下：能力冷却时间 -3%',
  'Never Enough: Grants an additional Drain Amount +30%. Also grants ATK↑ (10%)':
    '永无止境的汲取效果提升，并额外赋予[攻击提升]：生命值吸收量 +30% / 攻击力 +10%',

  // 伊欧：觉醒「专注强化」
  'Stargaze V has reduced DMG specs.': '星梦Ⅴ的伤害性能降低。',
  "Landing Stargaze V while inside Concentration's AoE grants a lvl of Superstar to Io (max lvl 2).":
    '位于专注效果范围内时，星梦Ⅴ命中会获得 1 级[星梦Ⅴ强化]（最高 2 级）。',
  'While in effect, it modifies Stargaze V.': '效果持续期间，星梦Ⅴ的性能发生变化。',
  'No Superstar: ATK -10% / DMG Cap -10%': '无[星梦Ⅴ强化]：攻击力 -10% / 伤害上限 -10%',
  'Superstar lvl 1: Normal DMG Specs': '[星梦Ⅴ强化]1 级：恢复原本伤害性能',
  'Superstar lvl 2: ATK +30% / DMG Cap +30%': '[星梦Ⅴ强化]2 级：攻击力 +30% / 伤害上限 +30%',
  "Whenever Io gains a lvl of Superstar, Concentration's AoE duration extends by 50%.":
    '每当伊欧获得 1 级[星梦Ⅴ强化]时，专注效果区域的持续时间延长 50%。',
  'In exchange, the AoE inflicts her with DEF↓ (10%) instead of granting Stout Heart.':
    '作为代价，专注效果区域不再赋予[霸体]，改为赋予自身[防御降低]（10%）。',
  "Superstar's max lvl is now 3.": '[星梦Ⅴ强化]的等级上限提升至 3 级。',
  "At lvl 3, while inside Concentration's AoE, Stargaze V gains ATK +150% and DMG Cap +150%.":
    '达到 3 级且位于专注效果范围内时，星梦Ⅴ的攻击力 +150% / 伤害上限 +150%。',
  "When Io leaves the AoE, it'll dispel after a short time.": '伊欧离开专注效果范围后，该区域会在短时间后消失。',
  'Insight Rank Perk 1: Stargaze V gains ATK +5% from Superstar':
    '专精效果中，[星梦Ⅴ强化]强化效果提升：星梦Ⅴ的攻击力 +5%',
  "Insight Rank Perk 2: While inside Concentration's AoE, Stargaze V gains DMG Dealt +10% but Io loses 2% HP every 3 sec.":
    '专精生效时，位于专注效果范围内会使星梦Ⅴ的造成伤害 +10%，但每 3 秒减少最大生命值的 2%',
  'Insight Rank Perk 2: Concentration AoE Duration +10%': '专精效果中，专注效果区域持续时间延长 +10%',
  'Insight Rank Perk 1: Stargaze V gains ATK +10% from Superstar':
    '专精效果中，[星梦Ⅴ强化]强化效果提升：星梦Ⅴ的攻击力 +10%',
  "Insight Rank Perk 2: While inside Concentration's AoE, Stargaze V gains DMG Dealt +15% but Io loses 3% HP every 3 sec.":
    '专精生效时，位于专注效果范围内会使星梦Ⅴ的造成伤害 +15%，但每 3 秒减少最大生命值的 3%',
  "Insight Rank Perk 3: While inside Concentration's AoE, Io also gains DMG Cut (20%)":
    '专精生效时，位于专注效果范围内额外获得 20% 的伤害减免效果',
  "Insight Rank Perk 2: While inside Concentration's AoE, Stargaze V gains DMG Dealt +25% but Io loses 5% HP every 3 sec.":
    '专精生效时，位于专注效果范围内会使星梦Ⅴ的造成伤害 +25%，但每 3 秒减少最大生命值的 5%',

  // 伊欧：真谛「魔法连锁」
  "Io's skills gain ATK +10% and DMG Cap +20%": '伊欧的能力获得攻击力 +10% / 伤害上限 +20%',
  'Landing Freeze or Fire inflicts Magic Chain, then landing the other spell consumes Magic Chain, triggering a chain reaction.':
    '寒冰或火焰命中时赋予[魔法连锁]；随后使另一种魔法命中会消耗[魔法连锁]并触发连锁反应。',
  'Freeze + Fire: Deals big AoE damage': '寒冰与火焰：对范围内敌人造成大量伤害',
  'Landing Lightning also inflicts or consumes Magic Chain.': '雷霆命中时同样可以赋予或消耗[魔法连锁]。',
  "In addition, Lightning's cooldown is greatly shortened but no longer inflicts Paralysis.":
    '此外，雷霆的冷却时间大幅缩短，但不再赋予[麻痹]。',
  'Fire + Lightning: Inflicts ATK↓ (20%) / DEF↓ (20%)':
    '火焰与雷霆：生成可使敌人陷入[灼热]状态的区域',
  'Freeze + Lightning: Conjures a circle that inflicts Burn':
    '寒冰与雷霆：赋予敌人[攻击DOWN]（20%）与[防御DOWN]（20%）',
  'Essence Rank Perk 1: Skills gain an additional ATK +10%': '专精效果中，能力的攻击力 +10%',
  'Essence Rank Perk 2: Magic Chain Duration +20%': '专精生效时，[魔法连锁]的效果持续时间 +20%',
  'Essence Rank Perk 3: Freeze + Fire: AoE ATK +50%': '专精生效时，寒冰与火焰的追加伤害攻击力 +50%',
  'Essence Rank Perk 3: Fire + Lightning: AoE Duration +10%': '专精生效时，火焰与雷霆的灼热区域持续时间 +10%',
  'Essence Rank Perk 3: Freeze + Lightning: Debuff Duration +10% (ATK↓ / DEF↓)':
    '专精生效时，寒冰与雷霆赋予的[攻击降低]与[防御降低]持续时间 +10%',
  'Lightning: Paralysis Duration +2 sec.': '雷霆赋予的[麻痹]弱化效果提升：效果持续时间 +2 秒',

  // 伊欧：秘义「花耀七闪特化」
  "Landing Stargaze V shortens Flowery Seven's cooldown by 10%.": '星梦Ⅴ命中时，花耀七闪的冷却时间缩短 10%。',
  'When fully charged, Flowery Seven gains ATK +30% and DMG Cap +100%.':
    '蓄力至最大时，花耀七闪的攻击力 +30% / 伤害上限 +100%。',
  'In exchange, it takes longer to charge.': '作为代价，蓄力时间延长。',
  'When fully charged, Flowery Seven deals progressively greater damage each hit.':
    '蓄力至最大时，花耀七闪每次命中的伤害会逐步提升。',
  'First hit: ATK +10% / DMG Cap +70%': '第 1 次命中：攻击力 +10% / 伤害上限 +70%',
  'Second hit onward: ATK +5% and DMG Cap +50% per hit': '第 2 次命中起：每次命中攻击力 +5% / 伤害上限 +50%',
  'While charging Flowery Seven: DEF +5%': '花耀七闪蓄力过程中：防御力 +5%',
  'Healing Winds now grants Shield (3000) instead of healing HP. Stacks with other master traits of the same effect':
    '治愈之风的回复效果变为屏障效果，赋予 3000 点屏障；同类效果可叠加',
  'Crux Rank Perk 2: Flowery Seven gains an additional ATK +10% and DMG Cap +50%':
    '专精效果中，花耀七闪的攻击力 +10% / 伤害上限 +50%',
  'Crux Rank Perk 3: Flowery Seven also inflicts Stackable ATK↓ (5%) (max stacks: 5)':
    '专精生效时，花耀七闪额外赋予可叠加的[攻击降低]：攻击力 -5%（最多叠加 5 层）',
  "Crux Rank Perk 3: Enhances Flowery Seven's DMG specs": '专精生效时，花耀七闪的魔法弹威力进一步提升',

  // 拉卡姆：觉醒「靶心狙击强化」
  'Landing Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) on weak points or from behind boosts Heat Gauge Gain by 10%.':
    '普通攻击命中弱点部位或从背后命中时，热力槽提升量 +10%。',
  "Landing damage skills or link attacks boosts Heat Gauge Gain by 20% and grants Super Bull's Eye Blast.":
    '攻击类能力或连锁攻击命中时，热力槽提升量 +20%，并获得[强化靶心狙击]。',
  "This effect grants ATK +30% and DMG Dealt +50% to the next Bull's Eye Blast and is consumed on activation.":
    '该效果使下一次靶心狙击的攻击力 +30% / 造成伤害 +50%，发动后消耗。',
  "Boosts Bull's Eye Blast's charge speed by 20%.": '靶心狙击的蓄力速度 +20%。',
  "Landing a Bull's Eye Blast while buffed by Super Bull's Eye Blast grants a 25% chance to reset all of Rackam's skill cooldowns.":
    '在[强化靶心狙击]生效时使靶心狙击命中，有 25% 几率使所有能力立刻冷却完毕。',
  'Heat Gauge Gain +10%': '热力槽提升量 +10%',
  "Bull's Eye Blast: ATK +10%": '靶心狙击：攻击力 +10%',
  'Weak Point / Back Attacks: ATK +20%': '攻击背后或弱点部位时：攻击力 +20%',
  'Upon landing a damage skill: Heat Gauge Gain +10%': '攻击类能力命中时：热力槽提升量 +10%',
  'Rhythmic Trigger attacks: ATK +10%': '射击韵律提升：攻击力 +10%',
  "Bull's Eye Blast: DMG Cap +35%": '靶心狙击：伤害上限 +35%',
  "When all skills are on cooldown, Bull's Eye Blast gains Supplementary DMG (10%). (If no skills are assigned, he always gains the effect.)":
    '所有能力均处于冷却中时，靶心狙击获得 10% 的追击效果；未装备任何能力时始终生效。',
  "Insight Rank Perk 3: Bull's Eye Blast Charge Speed +10%": '专精效果中，靶心狙击的蓄力速度 +10%',

  // 拉卡姆：真谛「送葬火舌强化」
  'Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain a max of ATK +20% based on Heat gauge level.':
    '根据热力槽，普通攻击的攻击力最多 +20%。',
  "Each Normal Attack (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) has a 5% chance to shorten all of Rackam's skill cooldowns by 5%":
    '每次普通攻击命中时，有 5% 几率使所有能力的冷却时间缩短 5%',
  'Coffinmaker gains a max of ATK +30% and DMG Cap +100% based on Heat gauge level, but the Heat gauge fills 20% slower.':
    '根据热力槽，送葬火舌的攻击力最多 +30% / 伤害上限最多 +100%；但热力槽提升量降低 20%。',
  "When held, Coffinmaker now fires continuously as long as the Heat gauge isn't empty.":
    '长按发动送葬火舌时，只要热力槽尚未耗尽便会持续射击。',
  'In exchange, the gauge depletes much faster, and the skill can no longer be activated while on cooldown.':
    '作为代价，热力槽的消耗速度大幅提升，且能力冷却期间无法再次发动。',
  'When Coffinmaker is interrupted, it goes on cooldown.': '送葬火舌被中断时进入冷却。',
  "Landing Bull's Eye Blast V shortens Coffinmaker's cooldown by 30%.":
    '靶心狙击Ⅴ命中时，送葬火舌的冷却时间缩短 30%。',
  'Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click): Range increased. Penalty from firing beyond effective range decreased':
    '普通攻击的有效射程提升，攻击有效射程外敌人时的伤害衰减效果降低',
  'Essence Rank Perk 1: Normal Attacks (Xbox X / PS Square / Switch 2 Y / Mouse Left-Click) gain up to an additional ATK +10% based on Heat gauge level':
    '专精效果中，根据热力槽，普通攻击的攻击力最大值进一步 +10%',
  'Upon activating a link attack or Skybound Art: Coffinmaker Cooldown -50%':
    '发动连锁攻击或奥义时：送葬火舌的冷却时间 -50%',
  "Essence Rank Perk 1: Grants an additional 5% chance to shorten Rackam's skill cooldowns":
    '专精效果中，能力冷却时间缩短效果的触发几率 +5%',
  'Essence Rank Perk 2: Coffinmaker gains up to an additional DMG Cap +100% based on Heat gauge level':
    '专精效果中，根据热力槽，送葬火舌的伤害上限进一步提升（最大 100%）',
  'Essence Rank Perk 2: Coffinmaker also gains a max of DMG Dealt +50% based on Heat gauge level':
    '专精生效时，根据热力槽提升送葬火舌的造成伤害（最大 50%）',
  'Essence Rank Perk 2: When the Heat gauge becomes full, Rackam gains Stout Heart':
    '专精生效时，热力槽满的状态下赋予自身[霸体]',
  'Essence Rank Perk 3: Reduces Heat gauge depletion penality by 10%. Heat gauge no longer depletes while using Duration':
    '专精效果中，热力槽减少效果降低 10%；使用以逸待劳期间热力槽不会减少',
  'Wild Gunsmoke: Reduces DEF↓ penalty by 10%': '荒野硝烟赋予自身的[防御降低]弱化效果降低 10%',

  // 拉卡姆：秘义「战地余波特化」
  'Collateral Damage gains DMG Dealt +10%.': '战地余波的造成伤害 +10%。',
  'Taking damage from the resulting explosion leaves Rackam with 5% HP.':
    '受到战地余波爆炸伤害时，剩余生命值变为 5%。',
  "If he already had less than 5% HP, he's left with 1 HP instead.":
    '若原本生命值低于 5%，则保留 1 点生命值。',
  'Collateral Damage now gains DMG Dealt +20%': '战地余波的造成伤害 +20%',
  'Landing Collateral Damage shortens its cooldown by 80%.': '战地余波命中时，其冷却时间缩短 80%。',
  'Rackam loses the ability to dodge right after and can only avoid the explosion using Duration.':
    '发动后暂时无法进行躲避，只能使用以逸待劳回避爆炸。',
  'Collateral Damage now gains DMG Dealt +30%.': '战地余波的造成伤害 +30%。',
  'Landing Collateral Damage grants Shield (50,000) to Rackam.': '战地余波命中时，赋予自身 50,000 点屏障。',
  "Crux Rank Perk 1: Leaves Rackam with 10% more HP after being hit by Collateral Damage's resulting explosion":
    '专精生效时，受到战地余波爆炸波及时，剩余生命值 +10%',
  'Crux Rank Perk 3: Shield from landing Collateral Damage gains Shield Strength +10,000':
    '专精效果中，战地余波命中时赋予的屏障效果量 +10,000',
  "Duration lasts 30% longer. Successfully dodging a hit with Duration resets Collateral Damage's cooldown":
    '以逸待劳的效果持续时间 +30%；期间成功躲避伤害可使战地余波立刻冷却完毕',

  // 古兰 / 姬塔：觉醒「职业等级强化」
  'Boosts ATK by 10%-20% and combo finisher DMG Cap by 5%-20% based on Adept Arts Lvl.':
    '根据职业等级，攻击力提升 10%～20%，连击收招的伤害上限提升 5%～20%。',
  "At Arts Lvl IV, the captain's skill cooldowns shorten by 10%.":
    '职业等级达到 4 级时，能力冷却时间缩短 10%。',
  'Adept Arts Lvl always starts at Lvl II.': '职业等级固定从 2 级开始。',
  'At Arts Lvl IV, the captain gains DMG Cap +100%, and landing Power Raise ++ extends Arts Lvl duration by 50%.':
    '职业等级达到 4 级时，伤害上限 +100%；力量提升++命中时，职业等级的持续时间延长 50%。',
  'In exchange, taking 50,000 or more damage from a single attack resets Arts Lvl to Lvl II.':
    '作为代价，单次攻击承受 50,000 以上伤害时，职业等级重置为 2 级。',
  'Arts Lvl Duration +20%': '职业等级持续时间 +20%',
  'After activating a damage skill, Power Raise charges faster': '发动攻击类能力后，立刻使用力量提升时蓄力时间缩短',
  'Power Raise: DMG Cap +45% / Charge Time +10%': '力量提升：伤害上限 +45% / 蓄力时间 +10%',
  'Rain of Arrows: ATK↓ inflicts an additional DEF -5%': '箭雨赋予的[攻击降低]弱化效果提升：攻击力 -5%',
  'Insight Rank Perk 3: Withstand more damage before Arts Lvl resets to Lvl II':
    '专精效果中，导致职业等级降低所需的承受伤害量提升',
  'Power Raise: DMG Dealt +10% / Charge Time +20%': '力量提升：造成伤害 +10% / 蓄力时间 +20%',
  'Combos raise Arts Lvl by +1': '连击所提供的职业等级提升量 +1',
  'Insight Rank Perk 1: Gain an additional ATK +20% based on Arts Lvl':
    '专精效果中，根据职业等级提升的攻击力 +20%',

  // 古兰 / 姬塔：真谛「回复类能力强化」
  'Upon casting a healing skill, gain a lvl of Combat Healer.': '发动回复类能力时，获得 1 级[不屈攻刃]。',
  'While in effect, it grants ATK +10% and DMG Cap +20%.': '效果持续期间，攻击力 +10% / 伤害上限 +20%。',
  'Revive now rescues allies anywhere on the battlefield and grants ATK↑ (15%) and DMG Cap↑ (10%) to the entire party.':
    '复苏可救援战场任意位置的同伴，并赋予己方全体[攻击提升]（15%）与[伤害上限提升]（10%）。',
  "In exchange, the captain's skill cooldowns extend by 10%.": '作为代价，自身的能力冷却时间延长 10%。',
  "Combat Healer's max lvl is now 3.": '[不屈攻刃]的等级上限提升至 3 级。',
  'At lvl 2 and above, it grants ATK +15% and DMG Cap +30% per effect lvl.':
    '达到 2 级以上时，每级攻击力 +15% / 伤害上限 +30%。',
  "Upon casting a healing skill, the captain's other skill cooldowns shorten by 10%.":
    '发动回复类能力时，自身其他能力的冷却时间缩短 10%。',
  'Panacea now grants Shield instead of healing HP. Stacks with other master traits of the same effect':
    '全体治疗不再回复生命值，改为赋予屏障；可与其他相同效果的专精叠加',
  'When Revive rescues allies, it grants them Shield (stackable) based on Arts Lvl, but only restores 10% of their HP':
    '复苏救援同伴时，固定回复最大生命值的 10%，并根据职业等级赋予可叠加的屏障',
  'Essence Rank Perk 1: Combat Healer grants an additional ATK +5% and DMG Cap +5% per effect lvl':
    '专精效果中，[不屈攻刃]强化效果提升：每级攻击力 +5% / 伤害上限 +5%',
  'Essence Rank Perk 2: ATK↑ grants an additional ATK +10%. DMG Cap↑ grants an additional DMG Cap +10%':
    '专精效果中，[攻击提升]与[伤害上限提升]强化效果提升：攻击力 +10% / 伤害上限 +10%',
  'Veil: Grants Supplementary DMG (10%)': '圣纱：额外赋予追击效果，造成伤害 10%',
  'Essence Rank Perk 1: Combat Healer Duration +10%': '专精效果中，[不屈攻刃]持续时间 +10%',

  // 古兰 / 姬塔：秘义「挺身而出特化」
  'Whenever the captain takes damage in place of an ally with the Substitute effect, the captain gains a permanent lvl of Charisma (max lvl 5).':
    '每当以[挺身而出]效果替同伴承受攻击时，永久获得 1 级[领袖庇护]（最高 5 级）。',
  'While in effect, it grants DEF +1% per effect lvl.': '效果持续期间，每级防御力 +1%。',
  'Phalanx now grants Substitute.': '密集方阵额外赋予[挺身而出]。',
  "Charisma's max lvl is now 10, and it also grants DMG Dealt +5% per effect lvl.":
    '[领袖庇护]的等级上限提升至 10 级，并且每级造成伤害 +5%。',
  'In addition, at lvl 10, gaining another lvl of Charisma grants Supplementary DMG (20%).':
    '此外，达到 10 级后再次获得[领袖庇护]时，赋予追击效果（20%）。',
  'Crux Rank Perk 1: Charisma grants an additional DEF +0.5% per effect lvl':
    '专精生效时，[领袖庇护]强化效果提升：每级防御力 +0.5%',
  'Crux Rank Perk 2: Charisma grants an additional DMG Dealt +1% per effect lvl':
    '专精生效时，[领袖庇护]强化效果提升：每级造成伤害 +1%',
  'Stall: Slow Duration +10%': '缓沼赋予的[缓速]弱化效果持续时间 +10%',
  'While Substitute is in effect: DMG Cap +50%': '挺身而出效果期间：伤害上限 +50%',
  "Shortens Substitute's skill cooldown by 50%.": '挺身而出的能力冷却时间缩短 50%。',
  'In exchange, its effect duration is also shortened by 20%.': '作为代价，其效果持续时间缩短 20%。',
  "Whenever the captain takes damage in place of an ally with the Substitute effect, the captain's skill cooldowns shorten by 10%.":
    '每当以[挺身而出]效果替同伴承受攻击时，自身的能力冷却时间缩短 10%。',
  'Crux Rank Perk 2: Charisma grants an additional DMG Dealt +2% per effect lvl':
    '专精生效时，[领袖庇护]强化效果提升：每级造成伤害 +2%',
  'Substitute: Grants DMG Cap↑ (10%) to the entire party': '使用挺身而出时，赋予己方全体[伤害上限提升]（10%）',
  'Phalanx: Grants Shield (10% of max HP)': '密集方阵：额外赋予相当于最大生命值 10% 的屏障',
  'Conduction: Grants DMG Cap↑ (max +10%) based on the amount of SBA gauge redistributed':
    '渡能：根据重新分配的奥义槽，额外赋予[伤害上限提升]（最高 +10%）',
  'Conduction: Grants DMG↑ (max +10%) based on the amount of SBA gauge redistributed':
    '渡能：根据重新分配的奥义槽，额外赋予[造成伤害提升]（最高 +10%）',
  'Rage: Grants DMG Cap↑ (10%) to self': '暴怒：额外赋予自身[伤害上限提升]（10%）',

  // 卡塔莉娜：觉醒「阿瑞斯在场特化」
  'While Ares is summoned, damage skills gain ATK +10% and DMG Cap +20%.':
    '阿瑞斯在场期间，攻击类能力的攻击力 +10% / 伤害上限 +20%。',
  "Once summoned, for 10 sec., Ares won't be dismissed from using Pactstrikes or skills.":
    '阿瑞斯召唤后的 10 秒内，使用连携攻击或能力不会令阿瑞斯离场。',
  "Landing the following skills extends Ares's duration:": '下列能力命中时，延长阿瑞斯的在场时间：',
  "Landing combo finishers extends Ares' time with Katalina by 1 sec., while landing link attacks extends it by 1 sec.":
    '连击收招命中时，阿瑞斯的在场时间延长 1 秒；连锁攻击命中时也延长 1 秒。',
  'For every 15 sec. Ares remains summoned, Katalina gains a lvl of Dual Raid (max lvl 5).':
    '阿瑞斯每在场 15 秒，卡塔莉娜获得 1 级[双璧突击]（最高 5 级）。',
  'While in effect, it grants DMG Dealt +5% per effect lvl but ends when Ares is dismissed.':
    '效果持续期间，每级造成伤害 +5%；阿瑞斯离场时效果结束。',
  'While Ares is summoned: ATK +10%': '阿瑞斯在场期间：攻击力 +10%',
  'Blades of Frost: ATK +20%': '寒冰剑阵：攻击力 +20%',
  'Realm of Ice: ATK +25%': '幻灵天启：攻击力 +25%',
  'Insight Rank Perk 3: Ares Summon Duration +1 sec.': '专精效果中，阿瑞斯在场时间延长 1 秒',
  'Insight Rank Perk 3: Dual Raid grants an additional DMG Dealt +5% per effect lvl':
    '专精效果中，[双璧突击]强化效果提升：每级造成伤害 +5%',
  'While Ares is summoned: DEF +5%': '阿瑞斯在场期间：防御力 +5%',

  // 卡塔莉娜：真谛「阿瑞斯强袭特化」
  'While Ares is summoned, Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) gain ATK +10% and DMG Cap +20%.':
    '阿瑞斯在场期间，特殊攻击的攻击力 +10% / 伤害上限 +20%。',
  'Combo E now deals Supplementary DMG (20%).': '普攻连击 E 追加造成伤害 20% 的[追击]效果。',
  'When the Ares gauge is full, or upon activating Azure Sword, Katalina gains 3 charges of Ares Surge.':
    '阿瑞斯槽蓄满或发动苍天之剑时，卡塔莉娜获得 3 层[阿瑞斯强袭]。',
  "While in effect, the Ares gauge won't deplete, but if Ares Pactstrike is performed during a combo, 1 charge is consumed. When charges reach 0, Ares is dismissed.":
    '效果持续期间，阿瑞斯槽不会减少；连击中发动阿瑞斯连携攻击时消耗 1 层，层数归零后阿瑞斯离场。',
  'Landing damage skills now fills the Ares gauge.': '攻击类能力命中时，阿瑞斯槽增加。',
  'At 3 charges of Ares Surge, Katalina gains DMG Dealt +15%, and each charge consumed grants an additional DMG Dealt +25%.':
    '[阿瑞斯强袭]为 3 层时，卡塔莉娜造成伤害 +15%；每消耗 1 层，造成伤害再提升 25%。',
  'Activating and completing Ares Pactstrike enables a follow-up Pactstrike, extending the combo; completed Pactstrikes consume 1 charge. If the combo ends, any remaining charges are removed.':
    '完整发动阿瑞斯连携攻击后可继续衔接连携攻击；每次完成攻击消耗 1 层。连击中断时，剩余层数全部消失。',
  'Boosts DEF by a max of +10% based on the number of times Ares has been summoned during the quest':
    '根据单次任务中召唤阿瑞斯的次数，防御力最多 +10%',
  'Boosts ATK by a max of +30% based on the number of times Ares has been summoned during the quest':
    '根据单次任务中召唤阿瑞斯的次数，攻击力最多 +30%',
  'While Ares is summoned: DMG Cap +25%': '阿瑞斯在场期间：伤害上限 +25%',
  'Heal now grants Shield (5% of max HP) instead of healing HP. Stacks with other master traits of the same effect':
    '治疗不再回复生命值，改为赋予相当于最大生命值 5% 的屏障；可与其他相同效果的专精叠加',
  'Essence Rank Perk 2: Special Supplementary DMG +20%': '专精效果中，特殊追击造成伤害 +20%',
  'Boosts DMG Cap by a max of +40% based on the number of times Ares has been summoned during the quest':
    '根据单次任务中召唤阿瑞斯的次数，伤害上限最多 +40%',
  'When Ares is dismissed: Gain DMG Cut (20%)': '阿瑞斯离场时：获得 20% 的伤害减免效果',
  'While Ares is summoned: Gain Drain': '阿瑞斯在场期间：获得吸血效果',
  'When Ares is dismissed: Gain ATK↑ (10%)': '阿瑞斯离场时：获得[攻击提升]（10%）',

  // 卡塔莉娜：秘义「苍刃」
  'All party members buffed by Light Wall gain a lvl of Blade Blue.':
    '受到光墙屏障强化的所有同伴获得 1 级[苍刃]。',
  'While in effect, it grants ATK +5% and DMG Cap +10%.': '效果持续期间，攻击力 +5% / 伤害上限 +10%。',
  "Blade Blue's max lvl is now 3.": '[苍刃]的等级上限提升至 3 级。',
  'At lvl 2 and above, it grants ATK +5% and DMG Cap +20% per effect lvl.':
    '达到 2 级以上时，每级攻击力 +5% / 伤害上限 +20%。',
  'In addition, all party members affected by Heal also gain a lvl of Blade Blue.':
    '此外，受到治疗影响的所有同伴也会获得 1 级[苍刃]。',
  'All party members buffed by Emerald Shield gain Supplementary DMG (30%).':
    '受到翡翠之盾强化的所有同伴获得追击效果（30%）。',
  'Whenever Katalina deals Supplementary DMG from this effect, she has a 5% chance to gain a lvl of Blade Blue.':
    '每当卡塔莉娜通过此效果造成追击伤害时，有 5% 几率获得 1 级[苍刃]。',
  'Crux Rank Perk 1: Blade Blue grants an additional ATK +3% and DMG Cap +5% per effect lvl':
    '专精生效时，[苍刃]强化效果提升：每级攻击力 +3% / 伤害上限 +5%',
  "While Ares isn't summoned: ATK +10%": '阿瑞斯不在场期间：攻击力 +10%',
  'Upon summoning Ares: Grants Shield (1000) to the entire party': '召唤阿瑞斯时，赋予己方全体 1000 点屏障',
  "While Ares isn't summoned: DMG Cap +30%": '阿瑞斯不在场期间：伤害上限 +30%',
  'Emerald Shield: Buff Duration +10% (DEF↑ / Stout Heart)':
    '翡翠之盾赋予的[防御提升]与[霸体]强化效果持续时间 +10%',
  'Light Wall: Invincibility Duration +2 sec.': '光墙屏障赋予的[无敌]强化效果持续时间 +2 秒',

  // 卡莉奥丝特罗：觉醒「弱化连击爆发」
  'When charged after a Unique Attack (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) combo finisher, Collapse ++ gains ATK +10% and DMG Cap +20%.':
    '在特殊攻击连击收招后进行蓄力时，岩塌++的攻击力 +10%、伤害上限 +20%。',
  'Landing different combo finishers within 15 sec. of each other grants a 5% chance to inflict 1 of these debuffs: ATK↓ (10%) / DEF↓ (10%) / Poison for 15 sec. / Burn for 15 sec. / Slow for 3 sec.':
    '在 15 秒内命中不同的连击收招时，有 5% 几率随机赋予一种弱化效果：攻击力↓（10%）/ 防御力↓（10%）/ 中毒 15 秒 / 灼烧 15 秒 / 缓速 3 秒。',
  'Whenever Cagliostro lands a damage skill, it inflicts a debuff from Insight Rank 2.':
    '卡莉奥丝特罗的伤害类能力命中时，随机赋予觉醒 2 阶中的一种弱化效果。',
  'In addition, whenever she inflicts a debuff, she gains a lvl of Truth (max lvl 10).':
    '此外，每次成功赋予弱化效果时，自身获得 1 级真理（最多 10 级）。',
  "At lvl 10, she's bathed in light for 20 sec., allowing her to perform Collapse ++ without charging.":
    '真理达到 10 级时，自身进入持续 20 秒的闪耀状态，可无需蓄力直接施放岩塌++。',
  'Insight Rank Perk 1: Collapse ++ gains an additional ATK +5% and DMG Cap +10%':
    '专精效果中，岩塌++性能提升：攻击力 +5% / 伤害上限 +10%',
  'Insight Rank Perk 2: Combo Finisher Debuff Chance +10%':
    '专精生效时，连击收招赋予弱化效果的几率 +10%',
  'Insight Rank Perk 2: Combo Finisher Debuff Duration +10%':
    '专精生效时，连击收招赋予的弱化效果持续时间 +10%',
  'Upon inflicting a debuff, skill cooldowns are shortened':
    '每次赋予敌人弱化效果时，所有能力冷却时间缩短',

  // 卡莉奥丝特罗：真谛「岩塌强化」
  'Collapse ++ gains ATK +5% and DMG Cap +10%, but Unique Attacks (Xbox Y / PS Triangle / Switch 2 X / Mouse Right-Click) take 5% longer to charge.':
    '岩塌++的攻击力 +5%、伤害上限 +10%，但蓄力攻击的蓄力时间延长 5%。',
  'Whenever Cagliostro activates a skill, she gains a lvl of Super Collapse (max lvl 4).':
    '卡莉奥丝特罗每次发动能力时，获得 1 级岩塌强化（最多 4 级）。',
  "While in effect, Collapse gains the following based on Super Collapse's lvl.":
    '效果持续期间，岩塌会根据岩塌强化等级获得以下效果。',
  'Lvl 1: ATK +10% and DMG Cap +50%':
    '等级 1：攻击力 +10% / 伤害上限 +50%',
  'Lvl 2 or above: ATK +5% and DMG Cap +30% per effect lvl':
    '等级 2 以上：每级攻击力 +5% / 伤害上限 +30%',
  'Collapse ++ now gains ATK +15%, DMG Cap +10%, and DMG Dealt +40% but takes 10% longer to charge.':
    '岩塌++改为获得攻击力 +15%、伤害上限 +10%、造成伤害 +40%，但蓄力时间延长 10%。',
  'Adrenaline Rush also has a 50% chance to instantly charge Collapse.':
    '肾上腺素爆发还会使岩塌有 50% 几率立即完成蓄力。',
  'Reinforce now grants Shield (5% of max HP) instead of healing HP. Stacks with other master traits of the same effect':
    '固魂的回复效果变为屏障效果，赋予相当于最大生命值 5% 的屏障；同类效果可叠加',
  'Essence Rank Perk 2: Super Collapse grants an additional ATK +10% and DMG Cap +30%':
    '专精效果中，[岩塌强化]强化效果提升：攻击力 +10% / 伤害上限 +30%',
  'Essence Rank Perk 3: Chance to instantly charge Collapse +25%':
    '专精效果中，岩塌立即完成蓄力的几率 +25%',
  'Essence Rank Perk 3: Whenever Collapse is instantly charged, Cagliostro gains DMG Cap↑ (30%)':
    '专精效果中，岩塌立即完成蓄力时，额外赋予自身伤害上限↑：伤害上限 +30%',

  // 卡莉奥丝特罗：秘义「回复&辅助强化」
  'Reinforce gains Healing +20% and Healing Cap +20%.':
    '固魂的回复量 +20%、回复上限 +20%。',
  "Healing that exceeds a party member's max HP is granted as Shield instead.":
    '超过同伴最大生命值的回复量会转化为屏障。',
  'Rhizomata now rescues allies anywhere on the battlefield and grants Phantasmagoria to allies rescued this way.':
    '根源之术可救援战场任意位置的同伴，并对以此方式救援的同伴赋予幻术光影。',
  'In exchange, its cooldown extends by 10%.':
    '作为代价，根源之术的冷却时间延长 10%。',
  'Phantasmagoria grants up to a max of ATK +10%, DEF +5%, and Critical Hit Rate +25% to a party member based on the combined value of their HP and Shield.':
    '幻术光影会根据同伴生命值与屏障效果量的合计值，最多赋予攻击力 +10%、防御力 +5%、暴击率 +25%。',
  "in addition, landing Collapse ++ has a chance to reset 1 of Cagliostro's skill cooldowns at random.":
    '此外，岩塌++命中时有一定几率使卡莉奥丝特罗随机 1 个能力的冷却立即完毕。',
  "Crux Rank Perk 2: Rhizomata now grants Phantasmagoria to all allies even if they weren't rescued from critical condition":
    '专精生效时，根源之术可直接赋予己方全体幻术光影',
  'Crux Rank Perk 2: Extends the duration of Phantasmagoria on self by 10%':
    '专精生效时，自身的幻术光影效果持续时间 +10%',
  'Crux Rank Perk 2: Phantasmagoria also grants DMG Cap↑ (50%)':
    '专精生效时，幻术光影额外赋予伤害上限↑：伤害上限 +50%',
  'Crux Rank Perk 3: Landing Collapse ++ grants an additional 20% chance to reset 1 skill cooldown at random':
    '专精生效时，岩塌++命中后使随机 1 个能力冷却立即完毕的几率 +20%',
  'Crux Rank Perk 3: Phantasmagoria also grants DMG↑ (20%)':
    '专精生效时，幻术光影额外赋予造成伤害↑：造成伤害 +20%',
};

/**
 * 专精数据来自英文攻略站。这里优先处理跨角色复用、含义明确的系统术语；
 * 角色独有机制不做猜译，留给游戏内截图校对。
 */
function translateCommonMasteryText(effect: string): string {
  return effect
    .replace(/healing skills?/gi, '回复类能力')
    .replace(/damage skills?/gi, '攻击类能力')
    .replace(/Charged\s*Unique Attacks?\s*\(Xbox Y \/ PS\s*Triangle \/ Switch 2 X \/ Mouse Right-Click\)/gi, '蓄力攻击')
    .replace(/Unique Attacks?\s*\(Xbox Y \/ PS\s*Triangle \/ Switch 2 X \/ Mouse Right-Click\)/gi, '特殊攻击')
    .replace(/Normal Attacks?\s*\(Xbox X \/ PS Square \/ Switch 2 Y \/ Mouse Left-Click\)/gi, '普通攻击')
    .replace(/Unique Attack Combo Finishers?/gi, '特殊攻击连击收招')
    .replace(/Combo Finishers?/gi, '连击收招')
    .replace(/Insight Rank\s*Perk\s*(\d)/gi, '觉醒强化 $1')
    .replace(/Essence Rank\s*Perk\s*(\d)/gi, '真谛强化 $1')
    .replace(/Crux Rank\s*Perk\s*(\d)/gi, '秘义强化 $1')
    .replace(/Style Rank\s*(\d)\s*-\s*Choose at least\s*(\d)\s*of the following to activate Rank Perk\s*\d/gi, '专精 $1 阶：从下列节点中至少激活 $2 个，以启用本阶强化')
    .replace(/Weakens summons specs in exchange for Summon Cost -1\. Doesn't affect 1-cost or potion-gifting summons\. This trait can't be used with a Summon Cost \+1 trait/gi, '召唤消耗 -1，同时召唤性能降低。召唤消耗为 1 或赋予道具的召唤石不受该效果影响；无法与[召唤消耗 +1]同时生效')
    .replace(/Strengthens summons specs in exchange for Summon Cost \+1\. 3-cost summons can't be called as your first summon\.\s*This trait can't be used with a Summon Cost -1 trait/gi, '召唤消耗 +1，同时召唤性能提升。首次召唤时无法使用消耗为 3 的召唤石；无法与[召唤消耗 -1]同时生效')
    .replace(/ATK \+20% \/ DMG Cap \+50%\. Debuffs on self: DMG Taken \+50% \/ Duration \+50% \/ Movement Restriction \+50%/gi, '攻击力 +20% / 伤害上限 +50%。自身弱化：受到伤害 +50% / 持续时间 +50% / 行动限制时间 +50%')
    .replace(/Primal bursts gain DMG Dealt \+25%\. Effect strength is based on the total number of this effect equipped by the entire party/gi, '高阶召唤的造成伤害 +25%。实际效果量为己方全体该效果叠加总和')
    .replace(/Upon performing a perfect dodge/gi, '触发精准躲避时')
    .replace(/Against foes of the weaker element/gi, '对弱点属性敌人')
    .replace(/While in critical condition/gi, '濒死状态时')
    .replace(/While inflicted with Poison/gi, '自身处于中毒状态时')
    .replace(/While inflicted with Burn/gi, '自身处于灼烧状态时')
    .replace(/While inflicted with Blight/gi, '自身处于灾祸状态时')
    .replace(/While in effect/gi, '效果持续期间')
    .replace(/In exchange/gi, '作为代价')
    .replace(/Stacks with other master traits of the same effect/gi, '可与其他相同效果的专精叠加')
    .replace(/to the entire party/gi, '赋予全队')
    .replace(/to self/gi, '赋予自身')
    .replace(/DMG Cap \+(\d+)% per Basic Stats-type sigil equipped \(max sigils:\s*(\d)\)/gi, '伤害上限随基础能力类因子装备数量增加而提升，每装备 1 个相应因子 +$1%（$2 个因子时效果最大）')
    .replace(/ATK \+(\d+)% per Attack-type sigil equipped \(max sigils:\s*(\d)\)/gi, '攻击力随攻击类因子装备数量增加而提升，每装备 1 个相应因子 +$1%（$2 个因子时效果最大）')
    .replace(/HP \+([\d,]+) per Defense- or Support-type sigil equipped \(max sigils:\s*(\d)\)/gi, '最大HP随防御类因子和支援类因子装备数量增加而提升，每装备 1 个相应因子 +$1（$2 个因子时效果最大）')
    .replace(/DEF \+(\d+)% per Defense- or Support-type sigil equipped \(max sigils:\s*(\d)\)/gi, '防御力随防御类因子和支援类因子装备数量增加而提升，每装备 1 个相应因子 +$1%（$2 个因子时效果最大）')
    .replace(/per Basic Stats-type sigil equipped \(max sigils:\s*(\d)\)/gi, '，每装备 1 个基础能力类因子（最多 $1 个）')
    .replace(/per Attack-type sigil equipped \(max sigils:\s*(\d)\)/gi, '，每装备 1 个攻击类因子（最多 $1 个）')
    .replace(/per Defense- or Support-type sigil equipped \(max sigils:\s*(\d)\)/gi, '，每装备 1 个防御或支援类因子（最多 $1 个）')
    .replace(/Critical Gauge Depletion/gi, '危机槽消耗速度')
    .replace(/Guard Break Resistance/gi, '被破防所需伤害')
    .replace(/Critical Hit DMG/gi, '暴击伤害')
    .replace(/Critical Hit Rate/gi, '暴击率')
    .replace(/Skill DMG Cap/gi, '能力伤害上限')
    .replace(/Skill ATK/gi, '能力攻击力')
    .replace(/Skill Cooldowns?/gi, '能力冷却时间')
    .replace(/Chain Burst DMG Cap/gi, '奥义连锁伤害上限')
    .replace(/Chain Burst DMG/gi, '奥义连锁伤害')
    .replace(/Link Attack DMG Cap/gi, '连锁攻击伤害上限')
    .replace(/Link Attack DMG/gi, '连锁攻击伤害')
    .replace(/SBA DMG Cap/gi, '奥义伤害上限')
    .replace(/SBA DMG/gi, '奥义伤害')
    .replace(/Stun Power/gi, '昏厥值')
    .replace(/Elemental ATK/gi, '属性攻击力')
    .replace(/DMG Taken/gi, '受到伤害')
    .replace(/DMG Dealt/gi, '造成伤害')
    .replace(/DMG Cap/gi, '伤害上限')
    .replace(/Max HP/gi, '最大生命值')
    .replace(/Supplementary DMG/gi, '追击伤害')
    .replace(/Debuff Immunity/gi, '弱化免疫')
    .replace(/Debuff Duration/gi, '弱化效果持续时间')
    .replace(/Buff Duration/gi, '强化效果持续时间')
    .replace(/Effect Duration/gi, '效果持续时间')
    .replace(/\bDuration\b/gi, '持续时间')
    .replace(/Invincibility Duration/gi, '无敌持续时间')
    .replace(/Slow Duration/gi, '缓速持续时间')
    .replace(/Shield Strength/gi, '护盾效果量')
    .replace(/Healing Cap/gi, '回复上限')
    .replace(/Healing/gi, '回复量')
    .replace(/Charge Speed/gi, '蓄力速度')
    .replace(/Charge Time/gi, '蓄力时间')
    .replace(/Gauge Gain/gi, '槽获取量')
    .replace(/AoE Duration/gi, '效果范围持续时间')
    .replace(/Cooldown/gi, '冷却时间')
    .replace(/Grants Shield/gi, '获得护盾')
    .replace(/Grants DMG↑/gi, '获得造成伤害↑')
    .replace(/Grants DMG Cap↑/gi, '获得伤害上限↑')
    .replace(/Grants ATK↑/gi, '获得攻击力↑')
    .replace(/Grants DEF↑/gi, '获得防御力↑')
    .replace(/\bShield\b/gi, '护盾')
    .replace(/Grants Drain/gi, '获得吸血效果')
    .replace(/Gain Drain/gi, '获得吸血效果')
    .replace(/Drain Amount/gi, '吸血回复量')
    .replace(/Inflicts DEF↓/gi, '施加防御力↓')
    .replace(/Inflicts ATK↓/gi, '施加攻击力↓')
    .replace(/DEF↓ inflicts an additional DEF/gi, '防御力↓效果量额外增加防御力')
    .replace(/ATK↓ inflicts an additional ATK/gi, '攻击力↓效果量额外增加攻击力')
    .replace(/grants an additional DEF/gi, '额外获得防御力')
    .replace(/grants an additional ATK/gi, '额外获得攻击力')
    .replace(/grants an additional DMG Cap/gi, '额外获得伤害上限')
    .replace(/DEF/gi, '防御力')
    .replace(/ATK/gi, '攻击力')
    .replace(/\bHP\b/gi, '生命值')
    .replace(/\bskills?\b/gi, '能力')
    .replace(/\bLvl\b/gi, '等级')
    .replace(/\bsec\.?/gi, '秒');
}

export function translateLevelEffect(effect: string): string {
  const normalized = effect.replace(/\u00a0/g, ' ').trim();
  const rankPerkMatch = normalized.match(/^(?:Insight|Essence|Crux) Rank Perk\s*(\d)\s*:/i);
  // 部分数据源在按键提示前使用不换行空格；译文表兼容原文与标准化文本。
  const official = OFFICIAL_MASTERY_EFFECT_TRANSLATIONS[normalized]
    ?? OFFICIAL_MASTERY_EFFECT_TRANSLATIONS[effect.trim()];
  const translated = official
    ? applyScreenshotTerminology(official)
    : applyScreenshotTerminology(translateCommonMasteryText(translateSkillNames(normalized))
    .replace(/Stun Power/gi, '昏厥')
    .replace(/\[Attack\] \/ \[Unique Attack\] DMG cap/gi, '[普通攻击] / [特殊攻击] 伤害上限')
    .replace(/Skill DMG cap/gi, '能力伤害上限')
    .replace(/SBA DMG cap/gi, '奥义伤害上限')
    .replace(/Skill Cooldown/gi, '能力冷却时间')
    .replace(/\bCooldown\b/gi, '冷却时间')
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
    .replace(/Max HP/gi, '最大HP')
    .replace(/ATK/gi, '攻击力')
    .replace(/HP/gi, '生命值')
    .replace(/Healing from allies has no effect/gi, '无法受到队友的治疗效果')
    .replace(/when 3 skills assigned/gi, '（装备 3 个角色技能时）')
    .replace(/when 2 skills assigned/gi, '（装备 2 个角色技能时）')
    .replace(/when 1 skill assigned/gi, '（装备 1 个角色技能时）')
    .replace(/when 0 skills assigned/gi, '（未装备角色技能时）')
    .replace(/\(At 100% 生命值\)/gi, '（生命值为 100% 时）')
    .replace(/\(At 25% 生命值\)/gi, '（生命值为 25% 时）'));

  if (!rankPerkMatch) return translated;
  const rank = Number(rankPerkMatch[1]);
  const body = translated
    .replace(/^(?:专精效果中|专精生效时|专精生效期间)\s*[,，:：]?\s*/, '')
    .replace(/^(?:觉醒|真谛|秘义)强化\s*\d+\s*[,，:：]?\s*/, '');
  return `${'✦'.repeat(rank)} ${rank}阶专精生效时：${body}`;
}
