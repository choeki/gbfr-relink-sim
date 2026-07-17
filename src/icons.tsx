import type { Trait } from './types';

/** 从字符串生成稳定的色相 */
function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

function categoryOf(trait: Trait): 'res' | 'char' | 'normal' {
  if (/Resistance|耐性/.test(trait.name + trait.nameZh)) return 'res';
  // 角色专属因子词条 (SKILL_114 及之后的 X's Y 系列)
  if (/'s |Boundary|Versalis|Fearless|Ain$/.test(trait.name)) return 'char';
  return 'normal';
}

/** 程序化生成的词条宝石图标;trait.icon (dataURL) 优先 */
export function TraitIcon({ trait, size = 34 }: { trait: Trait | null; size?: number }) {
  if (!trait) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <polygon points="20,3 36,12 36,28 20,37 4,28 4,12" fill="none" stroke="#3a4358" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    );
  }
  if (trait.icon) {
    return <img src={trait.icon} width={size} height={size} style={{ borderRadius: 6, objectFit: 'cover' }} alt={trait.nameZh || trait.name} />;
  }
  if (trait.iconFile) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}icons/${trait.iconFile}`}
        width={size} height={size} style={{ objectFit: 'contain' }}
        alt={trait.nameZh || trait.name}
      />
    );
  }
  const hue = hashHue(trait.id);
  const cat = categoryOf(trait);
  const letter = (trait.nameZh || trait.name).slice(0, 1);
  const gid = `g-${trait.id.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 70% 62%)`} />
          <stop offset="100%" stopColor={`hsl(${hue} 75% 32%)`} />
        </linearGradient>
      </defs>
      {cat === 'res' && (
        <circle cx="20" cy="20" r="16" fill={`url(#${gid})`} stroke={`hsl(${hue} 60% 75%)`} strokeWidth="1.5" />
      )}
      {cat === 'char' && (
        <path d="M20 3 L35 10 V22 Q35 32 20 38 Q5 32 5 22 V10 Z" fill={`url(#${gid})`} stroke={`hsl(${hue} 60% 78%)`} strokeWidth="1.5" />
      )}
      {cat === 'normal' && (
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill={`url(#${gid})`} stroke={`hsl(${hue} 60% 78%)`} strokeWidth="1.5" />
      )}
      <polygon points="20,6 32,13 20,20 8,13" fill="rgba(255,255,255,0.22)" />
      <text x="20" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" style={{ textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>
        {letter}
      </text>
    </svg>
  );
}
