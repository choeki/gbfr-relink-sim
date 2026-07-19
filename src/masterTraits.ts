import masterTraitsRaw from './data/master-traits.json';

export interface MasterTraitPool {
  rank: number | 'EX';
  /** 激活对应 Rank Perk 所需的最少节点数; EX 池为 null */
  required: number | null;
  traits: string[];
  /** 源数据若有缺失则标记，界面会显示提示 */
  incomplete?: boolean;
}

export interface MasterTraitStyle {
  /** Insight | Essence | Crux, 对应游戏内 1/2/3 颗菱形的专精类型 */
  type: string;
  name: string;
  rankPerks: { rank: number; effects: string[] }[];
  pools: MasterTraitPool[];
}

interface MasterTraitsFile {
  source: string;
  retrieved: string;
  note: string;
  characters: Record<string, { source: string; styles: MasterTraitStyle[] }>;
}

const data = masterTraitsRaw as unknown as MasterTraitsFile;

export const MASTER_TRAITS_SOURCE = data.source;

/** 三系官方译名前缀: Insight=觉醒, Essence=真谛, Crux=秘义(来自游戏内截图) */
export const STYLE_TYPE_ZH: Record<string, string> = { Insight: '觉醒', Essence: '真谛', Crux: '秘义' };

/** 各角色三系的官方专精名(游戏内「觉醒:XXX」的 XXX 部分); 缺省回退英文 style.name */
const STYLE_NAME_ZH: Record<string, Record<string, string>> = {
  CHAR_GRAN: { Insight: 'Class Lv强化', Essence: '回复类能力强化', Crux: '挺身而出特化' },
  CHAR_DJEETA: { Insight: 'Class Lv强化', Essence: '回复类能力强化', Crux: '挺身而出特化' },
  CHAR_KATALINA: { Insight: '阿瑞斯在场特化', Essence: '阿瑞斯强袭特化', Crux: '苍刃' },
  CHAR_RACKAM: { Insight: '靶心狙击强化', Essence: '送葬火舌强化', Crux: '战地余波特化' },
  CHAR_IO: { Insight: '专注强化', Essence: '魔法连锁', Crux: '花耀七闪特化' },
  CHAR_EUGEN: { Insight: '瞄准模式强化', Essence: '榴弹拳法', Crux: '剧毒榴弹强化' },
  CHAR_ROSETTA: { Insight: '玫瑰镇魂曲', Essence: '强化&弱化效果特化', Crux: '玫瑰强化' },
  CHAR_CHARLOTTA: { Insight: '崇高之姿强化', Essence: '正面对决', Crux: '所向披靡特化' },
  CHAR_GHANDAGOZA: { Insight: '直冲重拳', Essence: '威武雄姿特化', Crux: '直冲绝技拳' },
  CHAR_FERRY: { Insight: '宠物强化', Essence: '孤高幽灵', Crux: '辅助特化' },
  CHAR_NARMAYA: { Insight: '起手式切换强化', Essence: '一击必杀', Crux: '无二无三特化' },
  CHAR_LANCELOT: { Insight: '精准收招特化', Essence: '躲避强化', Crux: '攻击类能力高速化' },
  CHAR_VANE: { Insight: '挑衅+', Essence: '我助人人', Crux: '勇往直前' },
  CHAR_PERCIVAL: { Insight: '蓄力攻击强化', Essence: '红莲之刃', Crux: '蓄力反击特化' },
  CHAR_SIEGFRIED: { Insight: '精准攻击特化', Essence: '攻击类能力强化', Crux: '死境之剑' },
  CHAR_CAGLIOSTRO: { Insight: '弱化连击爆发', Essence: '岩塌强化', Crux: '回复&辅助强化' },
  CHAR_YODARHA: { Insight: '三幕心得', Essence: '疾攻', Crux: '霞返' },
  CHAR_ZETA: { Insight: '跃空连击强化', Essence: '攻击类能力强化', Crux: '反击特化' },
  CHAR_VASERAGA: { Insight: '普攻连击特化', Essence: '蓄力攻击特化', Crux: '蓄力反击特化' },
  CHAR_BEATRIX: { Insight: '啖因果特化', Essence: '三相时钟强化', Crux: '能力连锁' },
  CHAR_EUSTACE: { Insight: '近距离射击特化', Essence: '奔雷', Crux: '完美射击' },
  CHAR_SEOFON: { Insight: '剑神召唤强化', Essence: '剑雨', Crux: '剑神切换特化' },
  CHAR_TWEYEN: { Insight: '多重瞄准射击特化', Essence: '致命一击强化', Crux: '二王之诤特化' },
  CHAR_SANDALPHON: { Insight: '誓约十二羽翼', Essence: '白辉祝福', Crux: '审判之钟' },
  CHAR_FRAUX: { Insight: '正逆位强化', Essence: '煌煌之力', Crux: '恶魔的低语' },
  CHAR_FEDIEL: { Insight: '连击收招强化', Essence: '“黑”之侵蚀', Crux: '理外暗灾' },
  CHAR_ID: { Insight: '神威一体强化', Essence: '龙人化强化', Crux: '神愿之力特化' },
  CHAR_GALLANZA: { Insight: '铁衣玉碎强化', Essence: '回旋枪强化', Crux: '武夫' },
  CHAR_MAGLIELLE: { Insight: '魔剑之舞强化', Essence: '超凡系列强化', Crux: '刃重结界' },
};

export function styleTypeLabel(locale: string, type: string): string {
  return locale === 'zh' ? (STYLE_TYPE_ZH[type] ?? type) : type;
}

export function styleNameZh(characterId: string, type: string): string | null {
  return STYLE_NAME_ZH[characterId]?.[type] ?? null;
}

export function getMasterTraitStyles(characterId: string | null): MasterTraitStyle[] | null {
  if (!characterId) return null;
  return data.characters[characterId]?.styles ?? null;
}

/** 每个 Rank 档位的材料上限(总激活数): Rank1/2/3 各 10, EX 20, 合计 50 */
export const MASTER_RANK_CAPS: Record<string, number> = { '1': 10, '2': 10, '3': 10, EX: 20 };

export function poolKey(styleType: string, rank: number | 'EX'): string {
  return `${styleType}:${rank}`;
}

/** 某一 Rank 档位跨三系的已激活节点总数 */
export function rankActivationCount(selections: Record<string, number[]>, styles: MasterTraitStyle[], rank: number | 'EX'): number {
  return styles.reduce((sum, style) => sum + (selections[poolKey(style.type, rank)]?.length ?? 0), 0);
}
