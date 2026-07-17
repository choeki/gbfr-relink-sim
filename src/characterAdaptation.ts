import type { Build, Dataset, SigilDef, Trait, TraitGrant } from './types';

function traitOwner(trait: Trait | undefined): string | null {
  return trait?.iconFile?.match(/^chars\/(.+?)_Avatar\.png$/)?.[1] ?? null;
}

function characterOwner(characterName: string): string {
  return characterName === 'Djeeta' ? 'Gran' : characterName;
}

function cloneGrants(grants: TraitGrant[]): TraitGrant[] {
  return grants.map(grant => ({
    ...grant,
    allowedTraitIds: grant.allowedTraitIds ? [...grant.allowedTraitIds] : undefined,
  }));
}

function sigilRole(sigil: SigilDef, primary: Trait | undefined, ownerTraits: Trait[]): string {
  const sigilName = `${sigil.name} ${sigil.nameZh ?? ''}`;
  const traitName = `${primary?.name ?? ''} ${primary?.nameZh ?? ''}`;
  if (/Awakening|觉醒/i.test(sigilName)) return 'awakening';
  if (/Warpath|战气/i.test(traitName)) return 'warpath';

  const ordinary = ownerTraits.filter(trait => !/Awakening|觉醒|Warpath|战气/i.test(`${trait.name} ${trait.nameZh}`));
  return `ordinary-${Math.max(0, ordinary.findIndex(trait => trait.id === primary?.id))}`;
}

function findMatchingSigil(
  source: SigilDef,
  targetSigils: SigilDef[],
  targetTraits: Trait[],
  traitById: Map<string, Trait>,
  sourceOwnerTraits: Trait[],
): SigilDef | null {
  const role = sigilRole(source, traitById.get(source.primaryTraitId), sourceOwnerTraits);
  if (role === 'awakening') {
    return targetSigils.find(sigil => /Awakening|觉醒/i.test(`${sigil.name} ${sigil.nameZh ?? ''}`)) ?? null;
  }
  if (role === 'warpath') {
    return targetSigils.find(sigil => /Warpath|战气/i.test(`${traitById.get(sigil.primaryTraitId)?.name ?? ''} ${traitById.get(sigil.primaryTraitId)?.nameZh ?? ''}`)) ?? null;
  }

  const index = Number(role.slice('ordinary-'.length)) || 0;
  const ordinaryTraits = targetTraits.filter(trait => !/Awakening|觉醒|Warpath|战气/i.test(`${trait.name} ${trait.nameZh}`));
  const targetTrait = ordinaryTraits[index] ?? ordinaryTraits[0];
  return targetSigils.find(sigil => sigil.primaryTraitId === targetTrait?.id && !/Awakening|觉醒/i.test(`${sigil.name} ${sigil.nameZh ?? ''}`)) ?? null;
}

/** 切换角色或载入旧存档时，迁移同类型武器和角色专属因子。 */
export function adaptBuildToCharacter(build: Build, targetCharacterId: string, data: Dataset): Build {
  const targetCharacter = data.characters.find(character => character.id === targetCharacterId);
  if (!targetCharacter) return build;

  const targetOwner = characterOwner(targetCharacter.name);
  const traitById = new Map(data.traits.map(trait => [trait.id, trait]));
  const sigilById = new Map(data.sigils.map(sigil => [sigil.id, sigil]));
  const ownerTraits = (owner: string) => data.traits.filter(trait => traitOwner(trait) === owner);
  const targetTraits = ownerTraits(targetOwner);
  const targetSigils = data.sigils.filter(sigil => traitOwner(traitById.get(sigil.primaryTraitId)) === targetOwner);
  let changed = build.characterId !== targetCharacterId;

  const sigils = build.sigils.map(equip => {
    const source = equip.sigilId ? sigilById.get(equip.sigilId) : undefined;
    if (!source) return equip;
    const sourceOwner = traitOwner(traitById.get(source.primaryTraitId));
    if (!sourceOwner || sourceOwner === targetOwner) return equip;

    const replacement = findMatchingSigil(source, targetSigils, targetTraits, traitById, ownerTraits(sourceOwner));
    changed = true;
    if (!replacement) {
      return { sigilId: null, level: 15, secondaryTraitId: null, secondaryLevel: null };
    }

    const secondaryOwner = equip.secondaryTraitId ? traitOwner(traitById.get(equip.secondaryTraitId)) : null;
    const secondaryTraitId = replacement.defaultSecondaryTraitId
      ?? (secondaryOwner && secondaryOwner !== targetOwner ? null : equip.secondaryTraitId);
    return {
      ...equip,
      sigilId: replacement.id,
      level: Math.min(equip.level, replacement.maxLevel),
      secondaryTraitId: replacement.supportsSecondary ? secondaryTraitId : null,
      secondaryLevel: replacement.supportsSecondary ? equip.secondaryLevel : null,
    };
  });

  let weapon = build.weapon;
  if (build.weapon.defId) {
    const sourceWeapon = data.weapons.find(candidate => candidate.id === build.weapon.defId);
    if (sourceWeapon?.characterId !== targetCharacterId) {
      const replacement = data.weapons.find(candidate => candidate.characterId === targetCharacterId && candidate.series === sourceWeapon?.series);
      changed = true;
      weapon = replacement ? {
        defId: replacement.id,
        name: replacement.seriesZh || replacement.series || '',
        grants: cloneGrants(build.weapon.grants.length === replacement.grants.length ? build.weapon.grants : replacement.grants),
      } : { defId: null, name: '', grants: [] };
    }
  }

  return changed ? { ...build, characterId: targetCharacterId, weapon, sigils } : build;
}
