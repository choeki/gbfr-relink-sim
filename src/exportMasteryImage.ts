import type { Locale } from './i18n';
import { localizedName } from './i18n';
import type { Build, Dataset } from './types';
import {
  getMasterTraitStyles,
  MASTER_RANK_CAPS,
  poolKey,
  rankActivationCount,
  styleNameZh,
  styleTypeLabel,
  type MasterTraitStyle,
} from './masterTraits';
import { translateLevelEffect } from './effectTranslations';

const WIDTH = 1800;
const MARGIN = 48;
const GAP = 18;
const COLUMN_WIDTH = (WIDTH - MARGIN * 2 - GAP * 2) / 3;
const RANKS: (number | 'EX')[] = [1, 2, 3, 'EX'];
const RANK_SHAPE: Record<string, string> = { '1': '●', '2': '◆', '3': '⬢', EX: '⬣' };
const RANK_COLOR: Record<string, string> = { '1': '#c47bf0', '2': '#8799ff', '3': '#55c7f4', EX: '#f0c565' };
const STYLE_COLOR = ['#72d7ff', '#bb8cff', '#f2cf69'];
const TEXT = '#eef5ff';
const DIM = '#a7b9d9';

interface TextLine {
  text: string;
}

interface NodeLayout {
  text: string;
  selected: boolean;
  lines: TextLine[];
}

interface PoolLayout {
  rank: number | 'EX';
  required: number | null;
  selectedCount: number;
  nodes: NodeLayout[];
  rowHeights: number[];
  perkEffects: TextLine[][];
  perkActive: boolean;
  height: number;
}

interface StyleLayout {
  style: MasterTraitStyle;
  index: number;
  pools: PoolLayout[];
  height: number;
}

function assetPath(value: string) {
  return `${import.meta.env.BASE_URL}${value.replace(/^\//, '')}`;
}

function loadImage(src: string | null | undefined): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius = 12) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fillRounded(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fill: string, stroke?: string, radius = 12) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawText(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size = 22, color = TEXT, weight = 500, align: CanvasTextAlign = 'left') {
  ctx.font = `${weight} ${size}px "Microsoft YaHei", "Segoe UI", sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, y);
}

function wrapText(ctx: CanvasRenderingContext2D, value: string, maxWidth: number, size: number, weight = 500): TextLine[] {
  ctx.font = `${weight} ${size}px "Microsoft YaHei", "Segoe UI", sans-serif`;
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) return [{ text: '—' }];
  const lines: string[] = [];
  let current = '';
  for (const character of normalized) {
    const next = current + character;
    if (current && ctx.measureText(next).width > maxWidth) {
      lines.push(current);
      current = character;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines.map(text => ({ text }));
}

function drawContain(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function localizedEffect(locale: Locale, value: string) {
  return locale === 'zh' ? translateLevelEffect(value) : value;
}

function safeFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, '_').trim() || 'GBFR-mastery';
}

function createLayouts(ctx: CanvasRenderingContext2D, styles: MasterTraitStyle[], selections: Record<string, number[]>, locale: Locale): StyleLayout[] {
  return styles.map((style, index) => {
    const pools = RANKS.flatMap(rank => {
      const pool = style.pools.find(candidate => candidate.rank === rank);
      if (!pool) return [];
      const selected = selections[poolKey(style.type, rank)] ?? [];
      const nodes = pool.traits.map((trait, traitIndex) => ({
        text: localizedEffect(locale, trait),
        selected: selected.includes(traitIndex),
        lines: wrapText(ctx, localizedEffect(locale, trait), (COLUMN_WIDTH - 54) / 2 - 42, 16, 500),
      }));
      const rowHeights: number[] = [];
      for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex += 2) {
        const lineCount = Math.max(nodes[nodeIndex]?.lines.length ?? 1, nodes[nodeIndex + 1]?.lines.length ?? 1);
        rowHeights.push(Math.max(48, lineCount * 21 + 18));
      }
      const perk = typeof rank === 'number' ? style.rankPerks.find(candidate => candidate.rank === rank) : null;
      const perkEffects = (perk?.effects ?? []).map(effect => wrapText(ctx, localizedEffect(locale, effect), COLUMN_WIDTH - 52, 15, 500));
      const perkHeight = perk && pool.required
        ? 42 + perkEffects.reduce((sum, lines) => sum + lines.length * 20 + 5, 0) + 12
        : 0;
      const height = 42 + rowHeights.reduce((sum, rowHeight) => sum + rowHeight + 7, 0) + perkHeight + 13;
      return [{
        rank,
        required: pool.required,
        selectedCount: selected.length,
        nodes,
        rowHeights,
        perkEffects,
        perkActive: !!(pool.required && selected.length >= pool.required),
        height,
      } satisfies PoolLayout];
    });
    return { style, index, pools, height: 78 + pools.reduce((sum, pool) => sum + pool.height, 0) };
  });
}

function drawBackground(ctx: CanvasRenderingContext2D, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, height);
  gradient.addColorStop(0, '#172749');
  gradient.addColorStop(.48, '#111d39');
  gradient.addColorStop(1, '#0b1730');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, height);
  const glow = ctx.createRadialGradient(WIDTH * .18, 220, 0, WIDTH * .18, 220, 760);
  glow.addColorStop(0, 'rgba(74,118,220,.38)');
  glow.addColorStop(1, 'rgba(74,118,220,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, height);
  ctx.strokeStyle = 'rgba(107,151,225,.09)';
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
}

function drawStyleColumn(ctx: CanvasRenderingContext2D, layout: StyleLayout, x: number, y: number, characterId: string, selections: Record<string, number[]>, locale: Locale) {
  const accent = STYLE_COLOR[layout.index];
  fillRounded(ctx, x, y, COLUMN_WIDTH, layout.height, 'rgba(18,31,61,.9)', 'rgba(92,131,201,.55)', 14);
  drawText(ctx, '✦'.repeat(layout.index + 1), x + 18, y + 35, 18, '#f2d384', 800);
  drawText(ctx, styleTypeLabel(locale, layout.style.type), x + 82, y + 23, 13, DIM, 700);
  const styleName = locale === 'zh'
    ? (styleNameZh(characterId, layout.style.type) ?? layout.style.name)
    : layout.style.name;
  drawText(ctx, styleName, x + 82, y + 50, 22, accent, 800);
  let poolY = y + 78;
  for (const pool of layout.pools) {
    const rankKey = String(pool.rank);
    const rankColor = RANK_COLOR[rankKey];
    fillRounded(ctx, x + 12, poolY, COLUMN_WIDTH - 24, 36, 'rgba(60,70,128,.34)', rankColor, 6);
    const rankLabel = pool.rank === 'EX'
      ? (locale === 'zh' ? 'EX 阶专精技能' : 'Rank EX')
      : (locale === 'zh' ? `${pool.rank} 阶专精技能` : `Rank ${pool.rank}`);
    drawText(ctx, `${RANK_SHAPE[rankKey]}  ${rankLabel}`, x + 25, poolY + 18, 16, rankColor, 800);
    if (pool.required) drawText(ctx, `${Math.min(pool.selectedCount, pool.required)}/${pool.required}`, x + COLUMN_WIDTH - 25, poolY + 18, 15, pool.perkActive ? '#f4d67d' : DIM, 800, 'right');
    let nodeY = poolY + 43;
    const nodeWidth = (COLUMN_WIDTH - 31) / 2;
    for (let row = 0; row < pool.rowHeights.length; row++) {
      const rowHeight = pool.rowHeights[row];
      for (let column = 0; column < 2; column++) {
        const node = pool.nodes[row * 2 + column];
        if (!node) continue;
        const nodeX = x + 12 + column * (nodeWidth + 7);
        fillRounded(
          ctx,
          nodeX,
          nodeY,
          nodeWidth,
          rowHeight,
          node.selected ? 'rgba(63,105,196,.7)' : 'rgba(8,18,40,.58)',
          node.selected ? rankColor : 'rgba(84,111,167,.35)',
          7,
        );
        drawText(ctx, node.selected ? '✓' : RANK_SHAPE[rankKey], nodeX + 14, nodeY + rowHeight / 2, 14, node.selected ? '#ffffff' : rankColor, 800);
        const lineHeight = 21;
        const firstLineY = nodeY + (rowHeight - node.lines.length * lineHeight) / 2 + lineHeight / 2;
        node.lines.forEach((line, lineIndex) => {
          drawText(ctx, line.text, nodeX + 37, firstLineY + lineIndex * lineHeight, 16, node.selected ? TEXT : '#9eb0cf', node.selected ? 700 : 500);
        });
      }
      nodeY += rowHeight + 7;
    }
    if (pool.required && pool.perkEffects.length) {
      const perkHeight = poolY + pool.height - 13 - nodeY;
      fillRounded(
        ctx,
        x + 12,
        nodeY,
        COLUMN_WIDTH - 24,
        perkHeight,
        pool.perkActive ? 'rgba(127,91,31,.35)' : 'rgba(8,17,37,.66)',
        pool.perkActive ? '#e7bf63' : 'rgba(83,108,157,.4)',
        8,
      );
      drawText(ctx, locale === 'zh' ? '专精类型强化' : `Rank Perk ${pool.rank}`, x + 25, nodeY + 20, 15, pool.perkActive ? '#f4d67d' : DIM, 800);
      drawText(ctx, pool.perkActive ? '已激活' : '未激活', x + COLUMN_WIDTH - 25, nodeY + 20, 13, pool.perkActive ? '#f4d67d' : DIM, 700, 'right');
      let effectY = nodeY + 45;
      pool.perkEffects.forEach(lines => {
        lines.forEach(line => {
          drawText(ctx, line.text, x + 25, effectY, 15, pool.perkActive ? '#e9efff' : '#889bbd', 500);
          effectY += 20;
        });
        effectY += 5;
      });
    }
    poolY += pool.height;
  }

  const activeRanks = [1, 2, 3].map(rank => {
    const pool = layout.style.pools.find(candidate => candidate.rank === rank);
    return !!(pool?.required && (selections[poolKey(layout.style.type, rank)]?.length ?? 0) >= pool.required);
  });
  return activeRanks.reduce((level, active, index) => active ? index + 1 : level, 0);
}

export async function exportMasteryImage({ build, data, locale }: { build: Build; data: Dataset; locale: Locale }) {
  await document.fonts.ready;
  const character = build.characterId ? data.characters.find(candidate => candidate.id === build.characterId) ?? null : null;
  const styles = getMasterTraitStyles(build.characterId);
  if (!character || !styles) {
    window.alert(locale === 'zh' ? '请先选择拥有专精数据的角色。' : 'Choose a character with mastery data first.');
    return;
  }
  const selections = build.masterTraits ?? {};
  const measureCanvas = document.createElement('canvas');
  const measureContext = measureCanvas.getContext('2d');
  if (!measureContext) throw new Error('Canvas is not available');
  const layouts = createLayouts(measureContext, styles, selections, locale);
  const columnsY = 420;
  const height = columnsY + Math.max(...layouts.map(layout => layout.height)) + 86;
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');
  drawBackground(ctx, height);

  fillRounded(ctx, MARGIN, 32, WIDTH - MARGIN * 2, 88, 'rgba(12,25,51,.9)', 'rgba(100,148,225,.6)', 14);
  const logo = await loadImage(assetPath('icon.png'));
  if (logo) drawContain(ctx, logo, MARGIN + 18, 45, 62, 62);
  drawText(ctx, locale === 'zh' ? 'GBF Relink 专精配置' : 'GBF Relink Mastery Build', MARGIN + 100, 67, 30, '#f1d486', 900);
  drawText(ctx, build.name || (locale === 'zh' ? '未命名配装' : 'Untitled Build'), MARGIN + 100, 98, 18, DIM, 600);
  drawText(ctx, 'MLv 50', WIDTH - MARGIN - 22, 76, 28, '#f1d486', 800, 'right');

  const overviewY = 138;
  const artWidth = 330;
  const overviewHeight = 250;
  fillRounded(ctx, MARGIN, overviewY, WIDTH - MARGIN * 2, overviewHeight, 'rgba(19,40,83,.88)', 'rgba(91,139,218,.62)', 14);
  fillRounded(ctx, MARGIN + 1, overviewY + 1, artWidth, overviewHeight - 2, 'rgba(31,55,108,.75)', undefined, 13);
  const art = await loadImage(assetPath(`mastery-art/${character.id}.jpg`));
  const portrait = await loadImage(character.portrait ? assetPath(`icons/chars/${character.portrait}`) : null);
  const characterImage = art ?? portrait;
  if (characterImage) drawContain(ctx, characterImage, MARGIN + 8, overviewY + 8, artWidth - 16, overviewHeight - 16);
  const shade = ctx.createLinearGradient(MARGIN, overviewY, MARGIN + artWidth, overviewY);
  shade.addColorStop(.55, 'rgba(11,25,54,0)');
  shade.addColorStop(1, 'rgba(11,25,54,.92)');
  ctx.fillStyle = shade;
  ctx.fillRect(MARGIN, overviewY, artWidth, overviewHeight);
  drawText(ctx, localizedName(locale, character.name, character.nameZh), MARGIN + 20, overviewY + overviewHeight - 50, 27, '#fff', 900);
  drawText(ctx, locale === 'zh' ? character.name : character.nameZh, MARGIN + 20, overviewY + overviewHeight - 22, 15, '#bfd0ef', 500);

  const summaryX = MARGIN + artWidth + 26;
  const summaryWidth = WIDTH - MARGIN - summaryX - 22;
  const rowHeight = overviewHeight / 3;
  layouts.forEach((layout, index) => {
    const rowY = overviewY + index * rowHeight;
    if (index) {
      ctx.strokeStyle = 'rgba(112,157,226,.3)';
      ctx.beginPath();
      ctx.moveTo(summaryX, rowY);
      ctx.lineTo(WIDTH - MARGIN - 20, rowY);
      ctx.stroke();
    }
    const styleName = locale === 'zh' ? (styleNameZh(character.id, layout.style.type) ?? layout.style.name) : layout.style.name;
    drawText(ctx, '✦'.repeat(index + 1), summaryX, rowY + rowHeight / 2, 17, STYLE_COLOR[index], 800);
    drawText(ctx, styleTypeLabel(locale, layout.style.type), summaryX + 68, rowY + 25, 13, DIM, 700);
    drawText(ctx, styleName, summaryX + 68, rowY + 52, 21, TEXT, 800);
    let rankX = summaryX + 440;
    RANKS.forEach(rank => {
      const used = selections[poolKey(layout.style.type, rank)]?.length ?? 0;
      fillRounded(ctx, rankX, rowY + 21, 112, 43, 'rgba(16,31,63,.75)', 'rgba(99,132,192,.4)', 7);
      drawText(ctx, RANK_SHAPE[String(rank)], rankX + 15, rowY + 43, 14, RANK_COLOR[String(rank)], 800);
      drawText(ctx, `${rank === 'EX' ? 'EX' : rank}  ${used}`, rankX + 39, rowY + 43, 15, TEXT, 700);
      rankX += 124;
    });
    const activeRanks = [1, 2, 3].map(rank => {
      const pool = layout.style.pools.find(candidate => candidate.rank === rank);
      return !!(pool?.required && (selections[poolKey(layout.style.type, rank)]?.length ?? 0) >= pool.required);
    });
    const level = activeRanks.reduce((current, active, perkIndex) => active ? perkIndex + 1 : current, 0);
    drawText(ctx, locale === 'zh' ? `强化 Lv ${level}` : `Perk Lv ${level}`, summaryX + summaryWidth, rowY + rowHeight / 2, 17, level ? '#f2d073' : DIM, 800, 'right');
  });

  layouts.forEach((layout, index) => {
    drawStyleColumn(ctx, layout, MARGIN + index * (COLUMN_WIDTH + GAP), columnsY, character.id, selections, locale);
  });

  let totalX = MARGIN;
  drawText(ctx, locale === 'zh' ? '总激活数' : 'Total activated', totalX, height - 42, 17, '#f0d17a', 800);
  totalX += 130;
  RANKS.forEach(rank => {
    const used = rankActivationCount(selections, styles, rank);
    drawText(ctx, `${RANK_SHAPE[String(rank)]} ${used}/${MASTER_RANK_CAPS[String(rank)]}`, totalX, height - 42, 17, RANK_COLOR[String(rank)], 800);
    totalX += 105;
  });
  drawText(ctx, locale === 'zh' ? '数据来源：GBF Relink Wiki' : 'Data source: GBF Relink Wiki', WIDTH - MARGIN, height - 42, 15, DIM, 500, 'right');

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG export failed')), 'image/png'));
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(build.name)}-${locale === 'zh' ? '专精' : 'mastery'}.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
