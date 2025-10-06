import { Weapon } from './Weapon';

export class Bow extends Weapon {
  constructor(
    value: number,
    weight: number,
    baseDamage: number,
    damageModifier: number,
    baseDurability: number,
    durabilityModifier: number,
  ) {
    super('bow', value, weight, baseDamage, damageModifier, baseDurability, durabilityModifier);
  }

  polish(): void {
    const proposedModifier = this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE;
    if (this.getEffectiveDurability(proposedModifier) <= 1) {
      this.setDurabilityModifier(proposedModifier);
    }
  }
}
