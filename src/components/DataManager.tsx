import { useMemo, useState } from 'react';
import type { DataCustom, Dataset, SigilDef, Trait, WeaponDef } from '../types';
import { TraitIcon } from '../icons';
import { downloadJson, pickJsonFile } from '../store';
import { emptyCustom } from '../types';
import { GrantRow } from './Panels';

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

export function DataManager({ data, custom, setCustom }: {
  data: Dataset;
  custom: DataCustom;
  setCustom: (c: DataCustom) => void;
}) {
  const [tab, setTab] = useState<'traits' | 'sigils' | 'weapons'>('traits');
  const [q, setQ] = useState('');

  const patchTrait = (t: Trait, patch: Partial<Trait>) => {
    const isCustom = custom.customTraits.some(x => x.id === t.id);
    if (isCustom) {
      setCustom({ ...custom, customTraits: custom.customTraits.map(x => (x.id === t.id ? { ...x, ...patch } : x)) });
    } else {
      setCustom({ ...custom, traitOverrides: { ...custom.traitOverrides, [t.id]: { ...custom.traitOverrides[t.id], ...patch } } });
    }
  };

  const patchSigil = (s: SigilDef, patch: Partial<SigilDef>) => {
    const isCustom = custom.customSigils.some(x => x.id === s.id);
    if (isCustom) {
      setCustom({ ...custom, customSigils: custom.customSigils.map(x => (x.id === s.id ? { ...x, ...patch } : x)) });
    } else {
      setCustom({ ...custom, sigilOverrides: { ...custom.sigilOverrides, [s.id]: { ...custom.sigilOverrides[s.id], ...patch } } });
    }
  };

  const addTrait = () => {
    const id = `CUSTOM_T_${Date.now()}`;
    setCustom({
      ...custom,
      customTraits: [...custom.customTraits, { id, hash: '', name: 'New Trait', nameZh: '新词条', maxLevel: 30, canPrimary: true, canSecondary: true }],
    });
    setTab('traits');
    setQ('新词条');
  };

  const addSigil = () => {
    const first = data.traits[0];
    const id = `CUSTOM_S_${Date.now()}`;
    setCustom({
      ...custom,
      customSigils: [...custom.customSigils, {
        id, hash: '', name: '新因子', category: 'normal', isPlus: false, supportsSecondary: true,
        allowedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], defaultLevel: 15, maxLevel: 15,
        primaryTraitId: first.id, secondaryPool: -1,
      }],
    });
    setTab('sigils');
    setQ('新因子');
  };

  const removeCustom = (kind: 'trait' | 'sigil', id: string) => {
    if (kind === 'trait') setCustom({ ...custom, customTraits: custom.customTraits.filter(x => x.id !== id) });
    else setCustom({ ...custom, customSigils: custom.customSigils.filter(x => x.id !== id) });
  };

  const patchWeapon = (w: WeaponDef, patch: Partial<WeaponDef>) => {
    const isCustom = custom.customWeapons.some(x => x.id === w.id);
    if (isCustom) {
      setCustom({ ...custom, customWeapons: custom.customWeapons.map(x => (x.id === w.id ? { ...x, ...patch } : x)) });
    } else {
      setCustom({ ...custom, weaponOverrides: { ...custom.weaponOverrides, [w.id]: { ...custom.weaponOverrides[w.id], ...patch } } });
    }
  };

  const addWeapon = () => {
    const id = `CUSTOM_W_${Date.now()}`;
    setCustom({ ...custom, customWeapons: [...custom.customWeapons, { id, name: '新武器', grants: [] }] });
    setTab('weapons');
  };

  const traitList = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return data.traits.filter(t => !qq || (t.name + t.nameZh).toLowerCase().includes(qq));
  }, [data.traits, q]);

  const sigilList = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return data.sigils.filter(s => {
      if (!qq) return true;
      const t = data.traits.find(x => x.id === s.primaryTraitId);
      return (s.name + (t?.nameZh ?? '') + (t?.name ?? '')).toLowerCase().includes(qq);
    });
  }, [data.sigils, data.traits, q]);

  const traitById = useMemo(() => new Map(data.traits.map(t => [t.id, t])), [data.traits]);

  return (
    <div className="datamgr">
      <div className="dm-toolbar">
        <div className="seg">
          <button className={tab === 'traits' ? 'seg-on' : ''} onClick={() => setTab('traits')}>词条 ({data.traits.length})</button>
          <button className={tab === 'sigils' ? 'seg-on' : ''} onClick={() => setTab('sigils')}>因子 ({data.sigils.length})</button>
          <button className={tab === 'weapons' ? 'seg-on' : ''} onClick={() => setTab('weapons')}>武器 ({data.weapons.length})</button>
        </div>
        <input className="search" placeholder="搜索…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="dm-actions">
          {tab === 'traits' && <button className="btn" onClick={addTrait}>+ 新增词条</button>}
          {tab === 'sigils' && <button className="btn" onClick={addSigil}>+ 新增因子</button>}
          {tab === 'weapons' && <button className="btn" onClick={addWeapon}>+ 新增武器</button>}
          <button className="btn" onClick={() => downloadJson({ custom }, 'gbfr-sim-data-custom.json')}>导出自定义</button>
          <button
            className="btn"
            onClick={async () => {
              try {
                const obj = await pickJsonFile() as { custom?: DataCustom };
                if (obj && obj.custom) setCustom({ ...emptyCustom(), ...obj.custom });
                else alert('文件格式不正确:需要包含 custom 字段');
              } catch (e) { alert('导入失败: ' + e); }
            }}
          >导入自定义</button>
          <button
            className="btn danger"
            onClick={() => { if (confirm('清除全部自定义数据(词条/因子修改与新增)?')) setCustom(emptyCustom()); }}
          >重置为原始数据</button>
        </div>
      </div>
      <div className="panel-hint">中文名与数据均提取自 GBFR.PE.Patch.Tool 内嵌官方数据,可直接修改;图标可点击上传替换。</div>

      {tab === 'traits' && (
        <table className="dm-table">
          <thead>
            <tr><th>图标</th><th>中文名</th><th>英文名</th><th>等级上限</th><th>可主</th><th>可副</th><th>效果说明</th><th>ID</th><th></th></tr>
          </thead>
          <tbody>
            {traitList.map(t => {
              const isCustom = custom.customTraits.some(x => x.id === t.id);
              return (
                <tr key={t.id}>
                  <td>
                    <label className="icon-upload" title="点击上传自定义图标">
                      <TraitIcon trait={t} size={28} />
                      <input
                        type="file" accept="image/*" hidden
                        onChange={async e => {
                          const f = e.target.files?.[0];
                          if (f) patchTrait(t, { icon: await fileToDataUrl(f) });
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </td>
                  <td><input className="cell-input" value={t.nameZh} onChange={e => patchTrait(t, { nameZh: e.target.value })} /></td>
                  <td><input className="cell-input" value={t.name} onChange={e => patchTrait(t, { name: e.target.value })} /></td>
                  <td><input className="cell-input num" type="number" min={1} value={t.maxLevel} onChange={e => patchTrait(t, { maxLevel: Math.max(1, Number(e.target.value) || 1) })} /></td>
                  <td><input type="checkbox" checked={t.canPrimary} onChange={e => patchTrait(t, { canPrimary: e.target.checked })} /></td>
                  <td><input type="checkbox" checked={t.canSecondary} onChange={e => patchTrait(t, { canSecondary: e.target.checked })} /></td>
                  <td><input className="cell-input" placeholder="技能效果…" value={t.desc ?? ''} onChange={e => patchTrait(t, { desc: e.target.value })} /></td>
                  <td className="dim mono">{t.id}</td>
                  <td>
                    {t.icon && <button className="btn-ghost" title="移除自定义图标" onClick={() => patchTrait(t, { icon: undefined })}>清图标</button>}
                    {isCustom && <button className="btn-ghost" onClick={() => removeCustom('trait', t.id)}>删除</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {tab === 'sigils' && (
        <table className="dm-table">
          <thead>
            <tr><th>图标</th><th>中文名</th><th>英文名</th><th>主词条</th><th>+因子</th><th>等级上限</th><th>ID</th><th></th></tr>
          </thead>
          <tbody>
            {sigilList.map(s => {
              const t = traitById.get(s.primaryTraitId) ?? null;
              const isCustom = custom.customSigils.some(x => x.id === s.id);
              return (
                <tr key={s.id}>
                  <td><TraitIcon trait={t} size={28} /></td>
                  <td><input className="cell-input" value={s.nameZh ?? ''} onChange={e => patchSigil(s, { nameZh: e.target.value })} /></td>
                  <td><input className="cell-input" value={s.name} onChange={e => patchSigil(s, { name: e.target.value })} /></td>
                  <td>
                    <select className="cell-input" value={s.primaryTraitId} onChange={e => patchSigil(s, { primaryTraitId: e.target.value })}>
                      {data.traits.map(x => <option key={x.id} value={x.id}>{x.nameZh || x.name}</option>)}
                    </select>
                  </td>
                  <td>
                    <input type="checkbox" checked={s.isPlus} onChange={e => patchSigil(s, { isPlus: e.target.checked, supportsSecondary: e.target.checked ? true : s.supportsSecondary })} />
                  </td>
                  <td><input className="cell-input num" type="number" min={1} value={s.maxLevel} onChange={e => patchSigil(s, { maxLevel: Math.max(1, Number(e.target.value) || 1) })} /></td>
                  <td className="dim mono">{s.id}</td>
                  <td>{isCustom && <button className="btn-ghost" onClick={() => removeCustom('sigil', s.id)}>删除</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {tab === 'weapons' && (
        <div className="weapon-cards">
          {data.weapons.filter(w => {
            const qq = q.trim().toLowerCase();
            if (!qq) return true;
            const c = data.characters.find(x => x.id === w.characterId);
            return (w.name + (w.nameZh ?? '') + (c?.nameZh ?? '') + (c?.name ?? '') + (w.seriesZh ?? '')).toLowerCase().includes(qq);
          }).map(w => {
            const isCustom = custom.customWeapons.some(x => x.id === w.id);
            const owner = data.characters.find(x => x.id === w.characterId);
            return (
              <div key={w.id} className="weapon-card">
                <div className="wc-head">
                  {owner && <span className="dim">{owner.nameZh}</span>}
                  {w.seriesZh && <span className="ws-label">{w.seriesZh}</span>}
                  <input className="cell-input wc-name" value={w.name} onChange={e => patchWeapon(w, { name: e.target.value })} />
                  {isCustom && (
                    <button className="btn-ghost" onClick={() => setCustom({ ...custom, customWeapons: custom.customWeapons.filter(x => x.id !== w.id) })}>删除</button>
                  )}
                </div>
                {w.effect && <div className="weapon-effect">{w.effect}</div>}
                <div className="panel-hint">该武器提供的技能词条与等级:</div>
                {w.grants.map((g, i) => (
                  <GrantRow
                    key={i} grant={g} traitById={traitById} traits={data.traits}
                    onChange={ng => patchWeapon(w, { grants: w.grants.map((x, j) => (j === i ? ng : x)) })}
                    onRemove={() => patchWeapon(w, { grants: w.grants.filter((_, j) => j !== i) })}
                  />
                ))}
                <button className="btn" onClick={() => patchWeapon(w, { grants: [...w.grants, { traitId: null, level: 10 }] })}>+ 添加词条</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
