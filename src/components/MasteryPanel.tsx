import { useState } from 'react';
import type { Build, Dataset } from '../types';
import {
  getMasterTraitStyles, MASTER_RANK_CAPS, poolKey, rankActivationCount,
  styleNameZh, styleTypeLabel, type MasterTraitStyle,
} from '../masterTraits';
import { translateLevelEffect } from '../effectTranslations';
import { localizedName, useI18n } from '../i18n';
import { adaptBuildToCharacter } from '../characterAdaptation';

const RANKS: (number | 'EX')[] = [1, 2, 3, 'EX'];
const RANK_SHAPE: Record<string, string> = { '1': '●', '2': '◆', '3': '⬢', EX: '⬣' };

function styleDiamonds(index: number): string {
  return '✦'.repeat(index + 1);
}

function localizeEffect(locale: string, text: string): string {
  return locale === 'zh' ? translateLevelEffect(text) : text;
}

function effectParts(text: string): { requirement: string; body: string } | null {
  const match = text.match(/^(✦+\s+\d阶专精生效时：)(.*)$/s);
  return match ? { requirement: match[1], body: match[2] } : null;
}

function portraitUrl(file: string | null): string | null {
  return file ? `${import.meta.env.BASE_URL}icons/chars/${file}` : null;
}

const CHARACTERS_WITH_MASTERY_ART = new Set([
  'CHAR_GRAN', 'CHAR_DJEETA', 'CHAR_KATALINA', 'CHAR_RACKAM', 'CHAR_IO', 'CHAR_EUGEN', 'CHAR_ROSETTA',
  'CHAR_LANCELOT', 'CHAR_VANE', 'CHAR_PERCIVAL', 'CHAR_SIEGFRIED', 'CHAR_CHARLOTTA',
  'CHAR_YODARHA', 'CHAR_NARMAYA', 'CHAR_ZETA', 'CHAR_VASERAGA', 'CHAR_FERRY',
  'CHAR_GHANDAGOZA', 'CHAR_CAGLIOSTRO', 'CHAR_SANDALPHON', 'CHAR_BEATRIX', 'CHAR_EUSTACE',
  'CHAR_SEOFON', 'CHAR_TWEYEN', 'CHAR_FRAUX', 'CHAR_FEDIEL', 'CHAR_ID', 'CHAR_GALLANZA', 'CHAR_MAGLIELLE',
]);

function masteryArtUrl(characterId: string): string | null {
  return CHARACTERS_WITH_MASTERY_ART.has(characterId)
    ? `${import.meta.env.BASE_URL}mastery-art/${characterId}.jpg`
    : null;
}

function MasteryOverview({ build, data, styles, selections, onChange }: {
  build: Build;
  data: Dataset;
  styles: MasterTraitStyle[] | null;
  selections: Record<string, number[]>;
  onChange: (build: Build) => void;
}) {
  const { locale, t } = useI18n();
  const [picking, setPicking] = useState(false);
  const character = build.characterId ? data.characters.find(c => c.id === build.characterId) ?? null : null;
  const art = character ? masteryArtUrl(character.id) : null;

  return (
    <>
      <section className="mt-overview">
        <button type="button" className="mt-overview-character" onClick={() => setPicking(true)}>
          {character ? (
            <>
              {art
                ? <img className="mt-overview-art" src={art} alt={localizedName(locale, character.name, character.nameZh)} />
                : character.portrait && <img className="mt-overview-art fallback" src={portraitUrl(character.portrait)!} alt={character.nameZh} />}
              <span className="mt-overview-character-shade" />
              <span className="mt-overview-character-name">
                <b>{localizedName(locale, character.name, character.nameZh)}</b>
                <small>{locale === 'zh' ? character.name : character.nameZh}</small>
                <em>{locale === 'zh' ? '点击切换角色' : 'Click to change character'}</em>
              </span>
            </>
          ) : (
            <span className="mt-overview-choose">＋ {t('chooseCharacter')}</span>
          )}
        </button>

        <div className="mt-overview-main">
          {character && styles ? (
            <>
              <div className="mt-overview-styles">
                {styles.map((style, index) => {
                  const activePerks = [1, 2, 3].map(rank => {
                    const pool = style.pools.find(candidate => candidate.rank === rank);
                    if (!pool?.required) return false;
                    return (selections[poolKey(style.type, rank)]?.length ?? 0) >= pool.required;
                  });
                  const masteryLevel = activePerks.reduce(
                    (level, active, perkIndex) => active ? perkIndex + 1 : level,
                    0,
                  );
                  return (
                    <div
                      key={style.type}
                      className={`mt-overview-style mt-overview-style-${style.type.toLowerCase()} mastery-level-${masteryLevel}`}
                    >
                      <div className="mt-overview-style-head">
                        <span className="mt-overview-emblem">{styleDiamonds(index)}</span>
                        <span>
                          <small>{styleTypeLabel(locale, style.type)}</small>
                          <b>{locale === 'zh' ? (styleNameZh(character.id, style.type) ?? style.name) : style.name}</b>
                        </span>
                      </div>
                      <div className="mt-overview-ranks">
                        {RANKS.map(rank => (
                          <span key={String(rank)} className={'mt-overview-rank rank-' + String(rank).toLowerCase()}>
                            <small>{rank === 'EX' ? 'EX' : (locale === 'zh' ? `${rank}阶` : `R${rank}`)}</small>
                            <i>{RANK_SHAPE[String(rank)]}</i>
                            <b>{selections[poolKey(style.type, rank)]?.length ?? 0}</b>
                          </span>
                        ))}
                      </div>
                      <div className="mt-overview-perks">
                        <small>{locale === 'zh' ? '强化等级' : 'Perk level'}</small>
                        {activePerks.map((active, perkIndex) => (
                          <i key={perkIndex} className={active ? 'active' : ''}>
                            <span>{perkIndex + 1}</span>
                          </i>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-overview-totals">
                <span>{locale === 'zh' ? '总激活数' : 'Total activated'}</span>
                {RANKS.map(rank => {
                  const used = rankActivationCount(selections, styles, rank);
                  const cap = MASTER_RANK_CAPS[String(rank)];
                  return (
                    <b key={String(rank)} className={'rank-' + String(rank).toLowerCase()}>
                      <i>{RANK_SHAPE[String(rank)]}</i>{used}<small>/{cap}</small>
                    </b>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mt-overview-empty">{t('chooseCharacterFirstMastery')}</div>
          )}
        </div>
      </section>

      {picking && (
        <div className="modal-backdrop" onClick={() => setPicking(false)}>
          <div className="modal" onClick={event => event.stopPropagation()}>
            <div className="modal-head">
              <span>{t('selectCharacter')}</span>
              <button className="btn-ghost" onClick={() => setPicking(false)}>✕</button>
            </div>
            <div className="char-grid">
              {data.characters.map(candidate => (
                <button
                  key={candidate.id}
                  className={'char-cell' + (candidate.id === build.characterId ? ' on' : '')}
                  onClick={() => {
                    onChange(adaptBuildToCharacter(build, candidate.id, data));
                    setPicking(false);
                  }}
                >
                  {candidate.portrait
                    ? <img className="char-icon lg" src={portraitUrl(candidate.portrait)!} alt={candidate.nameZh} />
                    : <div className="char-icon lg placeholder">{candidate.nameZh.slice(0, 1)}</div>}
                  <span className="char-name">{localizedName(locale, candidate.name, candidate.nameZh)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StyleColumn({ characterId, style, styleIndex, selections, styles, onToggle }: {
  characterId: string;
  style: MasterTraitStyle;
  styleIndex: number;
  selections: Record<string, number[]>;
  styles: MasterTraitStyle[];
  onToggle: (styleType: string, rank: number | 'EX', traitIndex: number) => void;
}) {
  const { locale } = useI18n();
  const zhName = styleNameZh(characterId, style.type);
  const displayName = locale === 'zh' ? (zhName ?? style.name) : style.name;
  return (
    <div className={'mt-style mt-style-' + style.type.toLowerCase()}>
      <div className="mt-style-head">
        <span className="mt-diamonds">{styleDiamonds(styleIndex)}</span>
        <span className="mt-style-title">
          <span className="mt-style-type">{styleTypeLabel(locale, style.type)}</span>
          <span className="mt-style-name">{displayName}</span>
        </span>
      </div>

      {RANKS.map(rank => {
        const pool = style.pools.find(p => p.rank === rank);
        if (!pool) return null;
        const key = poolKey(style.type, rank);
        const selected = selections[key] ?? [];
        const perk = typeof rank === 'number' ? style.rankPerks.find(p => p.rank === rank) : null;
        const perkActive = !!(pool.required && selected.length >= pool.required);
        const rankUsed = rankActivationCount(selections, styles, rank);
        const rankCap = MASTER_RANK_CAPS[String(rank)];
        const poolLabel = locale === 'zh'
          ? (rank === 'EX' ? 'EX 阶专精技能' : `${rank} 阶专精技能`)
          : (rank === 'EX' ? 'Rank EX' : `Rank ${rank}`);
        return (
          <section key={String(rank)} className={'mt-pool mt-rank-' + String(rank).toLowerCase()}>
            <header className="mt-pool-head">
              <span className="mt-pool-title">
                <span className="mt-pool-shape">{RANK_SHAPE[String(rank)]}</span>
                {poolLabel}
              </span>
              {pool.required && (
                <span className={'mt-pool-count' + (perkActive ? ' done' : '')}>
                  {Math.min(selected.length, pool.required)}/{pool.required}
                </span>
              )}
            </header>

            {pool.incomplete && pool.traits.length === 0 ? (
              <div className="mt-empty">{locale === 'zh' ? '该池数据缺失,欢迎提供游戏内截图' : 'Data missing for this pool'}</div>
            ) : (
              <div className="mt-nodes">
                {pool.traits.map((trait, traitIndex) => {
                  const checked = selected.includes(traitIndex);
                  const capReached = !checked && rankUsed >= rankCap;
                  const localizedTrait = localizeEffect(locale, trait);
                  const parts = effectParts(localizedTrait);
                  return (
                    <button
                      key={traitIndex} type="button"
                      className={'mt-node' + (checked ? ' on' : '') + (capReached ? ' capped' : '')}
                      onClick={() => onToggle(style.type, rank, traitIndex)}
                      disabled={capReached}
                    >
                      <span className="mt-node-mark">{RANK_SHAPE[String(rank)]}</span>
                      <span className="mt-node-text">
                        {parts ? (
                          <>
                            <strong className="mt-node-requirement">{parts.requirement}</strong>
                            <span>{parts.body}</span>
                          </>
                        ) : localizedTrait}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {perk && pool.required && (
              <div className={'mt-perk' + (perkActive ? ' active' : '')}>
                <div className="mt-perk-head">
                  <span className="mt-perk-label">{locale === 'zh' ? '专精类型强化' : `Rank Perk ${perk.rank}`}</span>
                  <span className="mt-perk-pips">
                    {Array.from({ length: pool.required }, (_, i) => (
                      <span key={i} className={'mt-pip' + (i < Math.min(selected.length, pool.required!) ? ' fill' : '')}>
                        {RANK_SHAPE[String(rank)]}
                      </span>
                    ))}
                  </span>
                </div>
                {perk.effects.map((effect, i) => (
                  <div key={i} className="mt-perk-effect">{localizeEffect(locale, effect)}</div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function MasteryPanel({ build, data, onChange }: {
  build: Build;
  data: Dataset;
  onChange: (build: Build) => void;
}) {
  const { locale, t } = useI18n();
  const character = build.characterId ? data.characters.find(c => c.id === build.characterId) ?? null : null;
  const styles = getMasterTraitStyles(build.characterId);
  const selections = build.masterTraits ?? {};

  if (!character || !styles) {
    return (
      <div className="panel mt-panel">
        <MasteryOverview build={build} data={data} styles={styles} selections={selections} onChange={onChange} />
      </div>
    );
  }

  const toggle = (styleType: string, rank: number | 'EX', traitIndex: number) => {
    const key = poolKey(styleType, rank);
    const current = selections[key] ?? [];
    const checked = current.includes(traitIndex);
    if (!checked && rankActivationCount(selections, styles, rank) >= MASTER_RANK_CAPS[String(rank)]) return;
    const next = checked ? current.filter(i => i !== traitIndex) : [...current, traitIndex];
    onChange({ ...build, masterTraits: { ...selections, [key]: next } });
  };

  const clearAll = () => onChange({ ...build, masterTraits: {} });

  return (
    <div className="panel mt-panel">
      <MasteryOverview build={build} data={data} styles={styles} selections={selections} onChange={onChange} />
      <div className="mt-topbar">
        <div className="mt-title-block">
          <span className="mt-mlv">MLv <b>50</b></span>
        </div>
        <button className="btn mt-clear" onClick={clearAll}>{locale === 'zh' ? '重置专精' : 'Reset'}</button>
      </div>
      <div className="mt-hint">{t('masteryHint')}</div>
      <div className="mt-grid">
        {styles.map((style, index) => (
          <StyleColumn
            key={style.type} characterId={character.id} style={style} styleIndex={index}
            selections={selections} styles={styles} onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
