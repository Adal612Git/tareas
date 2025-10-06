import { Weapon } from './Weapon';

export class Sword extends Weapon {
  constructor(
    value: number,
    weight: number,
    baseDamage: number,
    damageModifier: number,
    baseDurability: number,
    durabilityModifier: number,
  ) {
    super('sword', value, weight, baseDamage, damageModifier, baseDurability, durabilityModifier);
  }

  polish(): void {
    const maxModifier = this.getBaseDamage() * 0.25;
    const proposedModifier = this.getDamageModifier() + Weapon.MODIFIER_CHANGE_RATE;
    const clampedModifier = proposedModifier > maxModifier ? maxModifier : proposedModifier;
    this.setDamageModifier(clampedModifier);
  }
}
