import type { Build, Dataset, SigilDef, Trait } from './types';
import type { BonusRow, SkillRow } from './components/SkillSummary';
import type { Locale } from './i18n';
import { localizedName } from './i18n';

const WIDTH = 1600;
const MARGIN = 56;
const GOLD = '#8a6331';
const TEXT = '#3a352e';
const DIM = '#756c5f';
const PANEL = 'rgba(247,241,224,.91)';
const PANEL_ALT = 'rgba(235,230,216,.88)';
const LINE = 'rgba(128,91,48,.45)';

function path(url: string) {
  return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`;
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

function panel(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fill = PANEL) {
  roundedRect(ctx, x, y, width, height, 14);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size = 24, color = TEXT, weight = 400, align: CanvasTextAlign = 'left') {
  ctx.font = `${weight} ${size}px "Microsoft YaHei", "Segoe UI", sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, y);
}

function fitText(ctx: CanvasRenderingContext2D, value: string, maxWidth: number) {
  if (ctx.measureText(value).width <= maxWidth) return value;
  let result = value;
  while (result.length > 1 && ctx.measureText(`${result}…`).width > maxWidth) result = result.slice(0, -1);
  return `${result}…`;
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function traitIconSource(trait: Trait | null | undefined) {
  if (!trait) return null;
  if (trait.icon) return trait.icon;
  return trait.iconFile ? path(`icons/${trait.iconFile}`) : null;
}

async function drawIcon(ctx: CanvasRenderingContext2D, src: string | null, x: number, y: number, size: number, circle = false) {
  const image = await loadImage(src);
  if (!image) return;
  ctx.save();
  if (circle) {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
  } else {
    roundedRect(ctx, x, y, size, size, 7);
    ctx.clip();
  }
  drawCover(ctx, image, x, y, size, size);
  ctx.restore();
}

function sectionTitle(ctx: CanvasRenderingContext2D, label: string, count: string, y: number) {
  text(ctx, `◆  ${label}`, MARGIN + 20, y + 31, 29, GOLD, 800);
  text(ctx, count, WIDTH - MARGIN - 20, y + 31, 20, DIM, 600, 'right');
  ctx.save();
  ctx.strokeStyle = 'rgba(128,91,48,.24)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(MARGIN + 245, y + 32);
  ctx.lineTo(WIDTH - MARGIN - 82, y + 32);
  ctx.stroke();
  ctx.restore();
}

function safeFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, '_').trim() || 'GBFR-build';
}

export async function exportBuildImage({ build, data, traitById, sigilById, skills, bonuses, locale }: {
  build: Build;
  data: Dataset;
  traitById: Map<string, Trait>;
  sigilById: Map<string, SigilDef>;
  skills: SkillRow[];
  bonuses: BonusRow[];
  locale: Locale;
}) {
  await document.fonts.ready;
  const sigilRows = 4;
  const summonRows = 2;
  const skillRows = Math.max(1, Math.ceil((skills.length + bonuses.length) / 3));
  const height = 190 + 235 + 62 + sigilRows * 112 + 72 + summonRows * 132 + 72 + skillRows * 70 + 110;
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  const background = await loadImage(path('background.png'));
  if (background) drawCover(ctx, background, 0, 0, WIDTH, height);
  const wash = ctx.createLinearGradient(0, 0, WIDTH, height);
  wash.addColorStop(0, 'rgba(226,238,244,.55)');
  wash.addColorStop(.5, 'rgba(244,238,219,.42)');
  wash.addColorStop(1, 'rgba(209,230,241,.58)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, WIDTH, height);

  panel(ctx, MARGIN, 38, WIDTH - MARGIN * 2, 112, 'rgba(246,239,221,.94)');
  await drawIcon(ctx, path('icon.png'), MARGIN + 22, 55, 76, true);
  text(ctx, locale === 'zh' ? 'GBF Relink 配装分享' : 'GBF Relink Build Share', MARGIN + 122, 79, 34, GOLD, 900);
  text(ctx, build.name || (locale === 'zh' ? '未命名配装' : 'Untitled Build'), MARGIN + 122, 119, 23, DIM, 600);
  text(ctx, 'GBF Relink Wiki', WIDTH - MARGIN - 24, 103, 20, DIM, 600, 'right');

  const overviewY = 174;
  const overviewGap = 16;
  const overviewWidth = (WIDTH - MARGIN * 2 - overviewGap * 2) / 3;
  const character = build.characterId ? data.characters.find(item => item.id === build.characterId) : null;
  const weapon = build.weapon.defId ? data.weapons.find(item => item.id === build.weapon.defId) : null;
  const wrightstone = build.wrightstone.defId ? data.wrightstones.find(item => item.id === build.wrightstone.defId) : null;

  panel(ctx, MARGIN, overviewY, overviewWidth, 205);
  text(ctx, locale === 'zh' ? '角色' : 'Character', MARGIN + 20, overviewY + 30, 25, GOLD, 800);
  if (character) {
    await drawIcon(ctx, character.portrait ? path(`icons/chars/${character.portrait}`) : null, MARGIN + 24, overviewY + 58, 112, true);
    text(ctx, localizedName(locale, character.name, character.nameZh), MARGIN + 157, overviewY + 93, 28, TEXT, 800);
    text(ctx, locale === 'zh' ? character.name : character.nameZh, MARGIN + 157, overviewY + 130, 19, DIM, 400);
  } else text(ctx, locale === 'zh' ? '未选择' : 'Not selected', MARGIN + 24, overviewY + 104, 24, DIM, 500);

  const weaponX = MARGIN + overviewWidth + overviewGap;
  panel(ctx, weaponX, overviewY, overviewWidth, 205);
  text(ctx, locale === 'zh' ? '武器' : 'Weapon', weaponX + 20, overviewY + 30, 25, GOLD, 800);
  text(ctx, weapon ? (locale === 'zh' ? weapon.seriesZh || weapon.series || '' : weapon.series || weapon.seriesZh || '') : (locale === 'zh' ? '未装备' : 'Unequipped'), weaponX + 20, overviewY + 62, 21, TEXT, 800);
  ctx.save();
  ctx.strokeStyle = 'rgba(128,91,48,.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(weaponX + 20, overviewY + 80);
  ctx.lineTo(weaponX + overviewWidth - 20, overviewY + 80);
  ctx.stroke();
  ctx.restore();
  for (const [index, grant] of build.weapon.grants.slice(0, 5).entries()) {
    const trait = grant.traitId ? traitById.get(grant.traitId) : null;
    const label = trait ? localizedName(locale, trait.name, trait.nameZh) : '—';
    const rowY = overviewY + 95 + index * 21;
    await drawIcon(ctx, traitIconSource(trait), weaponX + 20, rowY - 9, 19);
    text(ctx, `${grant.slotLabel || index + 1}`, weaponX + 48, rowY, 13, DIM, 700);
    text(ctx, fitText(ctx, label, overviewWidth - 160), weaponX + 80, rowY, 15, TEXT, 600);
    text(ctx, `Lv${grant.level}`, weaponX + overviewWidth - 18, rowY, 14, GOLD, 800, 'right');
  }

  const stoneX = weaponX + overviewWidth + overviewGap;
  panel(ctx, stoneX, overviewY, overviewWidth, 205);
  text(ctx, locale === 'zh' ? '祝福石' : 'Wrightstone', stoneX + 20, overviewY + 30, 25, GOLD, 800);
  text(ctx, wrightstone ? localizedName(locale, wrightstone.name, wrightstone.nameZh) : (locale === 'zh' ? '未装备' : 'Unequipped'), stoneX + 20, overviewY + 65, 22, TEXT, 800);
  ctx.save();
  ctx.strokeStyle = 'rgba(128,91,48,.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(stoneX + 20, overviewY + 84);
  ctx.lineTo(stoneX + overviewWidth - 20, overviewY + 84);
  ctx.stroke();
  ctx.restore();
  for (const [index, grant] of build.wrightstone.traits.entries()) {
    const trait = grant.traitId ? traitById.get(grant.traitId) : null;
    if (!trait) continue;
    const rowY = overviewY + 105 + index * 29;
    text(ctx, `${index + 1}.`, stoneX + 20, rowY, 16, DIM, 600);
    await drawIcon(ctx, traitIconSource(trait), stoneX + 48, rowY - 13, 26);
    ctx.font = `600 16px "Microsoft YaHei", sans-serif`;
    text(ctx, fitText(ctx, localizedName(locale, trait.name, trait.nameZh), overviewWidth - 190), stoneX + 82, rowY, 16, TEXT, 600);
    text(ctx, `Lv${grant.level}`, stoneX + overviewWidth - 18, rowY, 15, GOLD, 700, 'right');
  }

  let y = 400;
  sectionTitle(ctx, locale === 'zh' ? '因子' : 'Sigils', `${build.sigils.filter(item => item.sigilId).length}/12`, y);
  y += 62;
  const sigilGap = 12;
  const sigilWidth = (WIDTH - MARGIN * 2 - sigilGap * 2) / 3;
  for (let index = 0; index < build.sigils.length; index++) {
    const equip = build.sigils[index];
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = MARGIN + column * (sigilWidth + sigilGap);
    const cardY = y + row * 112;
    panel(ctx, x, cardY, sigilWidth, 100, equip.sigilId ? PANEL : 'rgba(241,239,228,.66)');
    const sigil = equip.sigilId ? sigilById.get(equip.sigilId) : null;
    if (!sigil) {
      text(ctx, `${locale === 'zh' ? '因子槽' : 'Sigil Slot'} ${index + 1}`, x + sigilWidth / 2, cardY + 50, 19, DIM, 500, 'center');
      continue;
    }
    const primary = traitById.get(sigil.primaryTraitId);
    await drawIcon(ctx, traitIconSource(primary), x + 15, cardY + 15, 56);
    ctx.font = `800 21px "Microsoft YaHei", sans-serif`;
    const name = fitText(ctx, localizedName(locale, sigil.name, sigil.nameZh || primary?.nameZh), sigilWidth - 170);
    text(ctx, name, x + 84, cardY + 32, 21, TEXT, 800);
    text(ctx, `Lv${equip.level}`, x + sigilWidth - 18, cardY + 32, 18, GOLD, 800, 'right');
    const secondary = equip.secondaryTraitId ? traitById.get(equip.secondaryTraitId) : null;
    const secondaryLabel = locale === 'zh' ? '副词条' : 'Secondary';
    text(ctx, secondaryLabel, x + 84, cardY + 69, 17, DIM, 500);
    ctx.font = `500 17px "Microsoft YaHei", sans-serif`;
    const secondaryIconX = x + 84 + ctx.measureText(secondaryLabel).width + 10;
    if (secondary) {
      await drawIcon(ctx, traitIconSource(secondary), secondaryIconX, cardY + 50, 28);
      const secondaryNameX = secondaryIconX + 36;
      const secondaryLevel = `Lv${equip.secondaryLevel ?? equip.level}`;
      ctx.font = `500 17px "Microsoft YaHei", sans-serif`;
      const availableNameWidth = x + sigilWidth - 18 - secondaryNameX - ctx.measureText(secondaryLevel).width - 12;
      text(ctx, fitText(ctx, localizedName(locale, secondary.name, secondary.nameZh), availableNameWidth), secondaryNameX, cardY + 69, 17, DIM, 500);
      text(ctx, secondaryLevel, x + sigilWidth - 18, cardY + 69, 17, DIM, 500, 'right');
    } else {
      text(ctx, '—', secondaryIconX, cardY + 69, 17, DIM, 500);
    }
  }
  y += sigilRows * 112 + 10;

  sectionTitle(ctx, locale === 'zh' ? '召唤石' : 'Summons', `${build.summons.filter(item => item.defId).length}/4`, y);
  y += 62;
  const summonGap = 14;
  const summonWidth = (WIDTH - MARGIN * 2 - summonGap) / 2;
  for (let index = 0; index < build.summons.length; index++) {
    const equip = build.summons[index];
    const x = MARGIN + (index % 2) * (summonWidth + summonGap);
    const cardY = y + Math.floor(index / 2) * 132;
    panel(ctx, x, cardY, summonWidth, 120, equip.defId ? PANEL : 'rgba(241,239,228,.66)');
    const summon = equip.defId ? data.summons.find(item => item.id === equip.defId) : null;
    if (!summon) {
      text(ctx, `${locale === 'zh' ? '召唤石' : 'Summon'} ${index + 1}`, x + summonWidth / 2, cardY + 60, 20, DIM, 500, 'center');
      continue;
    }
    text(ctx, `${summon.baseName}  ${summon.rarity}`, x + 20, cardY + 29, 22, TEXT, 800);
    text(ctx, `${summon.typeName} · ${locale === 'zh' ? '消耗' : 'Cost'} ${summon.cost}`, x + summonWidth - 20, cardY + 29, 16, DIM, 500, 'right');
    const trait = equip.trait.traitId ? traitById.get(equip.trait.traitId) : null;
    if (trait) {
      await drawIcon(ctx, traitIconSource(trait), x + 20, cardY + 51, 48);
      text(ctx, `${localizedName(locale, trait.name, trait.nameZh)}  Lv${equip.trait.level}`, x + 80, cardY + 75, 19, TEXT, 700);
    }
    const param = equip.sub.paramId ? data.subParams.find(item => item.id === equip.sub.paramId) : null;
    if (param) {
      const level = Math.min(equip.sub.level, param.maxLevel);
      text(ctx, `${param.name}  +${param.values[level]}${param.isPercent ? '%' : ''}`, x + summonWidth - 20, cardY + 83, 17, GOLD, 700, 'right');
    }
  }
  y += summonRows * 132 + 10;

  sectionTitle(ctx, locale === 'zh' ? '技能等级一览' : 'Skill Levels', `${skills.length}`, y);
  y += 62;
  const summary = [
    ...skills.map(row => ({ icon: traitIconSource(row.trait), name: localizedName(locale, row.trait.name, row.trait.nameZh), value: `Lv${row.effective}/${row.trait.maxLevel}${row.overflow ? ` +${row.overflow}` : ''}` })),
    ...bonuses.map(row => ({ icon: null, name: row.name, value: `+${row.total}${row.isPercent ? '%' : ''}` })),
  ];
  const skillGap = 12;
  const skillWidth = (WIDTH - MARGIN * 2 - skillGap * 2) / 3;
  if (summary.length === 0) {
    panel(ctx, MARGIN, y, WIDTH - MARGIN * 2, 60, PANEL_ALT);
    text(ctx, locale === 'zh' ? '暂无技能' : 'No skills', WIDTH / 2, y + 30, 20, DIM, 500, 'center');
  }
  for (let index = 0; index < summary.length; index++) {
    const item = summary[index];
    const x = MARGIN + (index % 3) * (skillWidth + skillGap);
    const cardY = y + Math.floor(index / 3) * 70;
    panel(ctx, x, cardY, skillWidth, 58, PANEL_ALT);
    if (item.icon) await drawIcon(ctx, item.icon, x + 9, cardY + 8, 42);
    ctx.font = `700 18px "Microsoft YaHei", sans-serif`;
    text(ctx, fitText(ctx, item.name, skillWidth - 150), x + (item.icon ? 62 : 16), cardY + 29, 18, TEXT, 700);
    text(ctx, item.value, x + skillWidth - 14, cardY + 29, 17, GOLD, 800, 'right');
  }

  text(ctx, locale === 'zh' ? '数据来源：GBF Relink Wiki · 感谢社区资料整理与校对' : 'Data source: GBF Relink Wiki · Thanks to the community', WIDTH / 2, height - 42, 17, DIM, 500, 'center');
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG export failed')), 'image/png'));
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(build.name)}.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
