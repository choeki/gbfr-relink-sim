import { useState } from 'react';
import type { Build, Dataset } from '../types';
import { adaptBuildToCharacter } from '../characterAdaptation';
import { localizedName, useI18n } from '../i18n';

function portraitUrl(file: string | null) {
  return file ? `${import.meta.env.BASE_URL}icons/chars/${file}` : null;
}

export function CharacterPanel({ build, data, onChange }: {
  build: Build;
  data: Dataset;
  onChange: (b: Build) => void;
}) {
  const { locale, t } = useI18n();
  const [picking, setPicking] = useState(false);
  const current = build.characterId ? data.characters.find(c => c.id === build.characterId) ?? null : null;

  return (
    <div className="panel">
      <div className="panel-title">{t('character')}</div>
      <button className="char-current" onClick={() => setPicking(true)}>
        {current ? (
          <>
            {current.portrait && <img className="char-icon" src={portraitUrl(current.portrait)!} alt={current.nameZh} />}
            <div className="pi-text">
              <div className="pi-name">{localizedName(locale, current.name, current.nameZh)}</div>
              <div className="pi-sub">{locale === 'zh' ? current.name : current.nameZh}</div>
            </div>
          </>
        ) : (
          <span className="dim">{t('chooseCharacter')}</span>
        )}
      </button>

      {picking && (
        <div className="modal-backdrop" onClick={() => setPicking(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span>{t('selectCharacter')}</span>
              <button className="btn-ghost" onClick={() => setPicking(false)}>✕</button>
            </div>
            <div className="char-grid">
              {data.characters.map(c => (
                <button
                  key={c.id}
                  className={'char-cell' + (c.id === build.characterId ? ' on' : '')}
                  onClick={() => {
                    onChange(adaptBuildToCharacter(build, c.id, data));
                    setPicking(false);
                  }}
                >
                  {c.portrait
                    ? <img className="char-icon lg" src={portraitUrl(c.portrait)!} alt={c.nameZh} />
                    : <div className="char-icon lg placeholder">{c.nameZh.slice(0, 1)}</div>}
                  <span className="char-name">{localizedName(locale, c.name, c.nameZh)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
