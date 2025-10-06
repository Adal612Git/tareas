import { Item } from './Item';

export abstract class Weapon extends Item {
  static readonly MODIFIER_CHANGE_RATE = 0.05;

  #baseDamage: number;
  #damageModifier: number;
  #baseDurability: number;
  #durabilityModifier: number;
  #isBroken: boolean;

  protected constructor(
    name: string,
    value: number,
    weight: number,
    baseDamage: number,
    damageModifier: number,
    baseDurability: number,
    durabilityModifier: number,
  ) {
    super(name, value, weight);
    this.#baseDamage = baseDamage;
    this.#damageModifier = damageModifier;
    this.#baseDurability = baseDurability;
    this.#durabilityModifier = durabilityModifier;
    this.#isBroken = this.getEffectiveDurability() <= 0;
  }

  getEffectiveDamage(): number {
    return this.#baseDamage + this.#damageModifier;
  }

  getEffectiveDurability(durabilityModifier?: number): number {
    const modifier = durabilityModifier ?? this.#durabilityModifier;
    const effective = this.#baseDurability + modifier;
    return effective > 0 ? effective : 0;
  }

  use(): string {
    if (this.#isBroken) {
      return `You can't use the ${this.getName()}, it is broken.`;
    }

    const updatedModifier = this.#durabilityModifier - Weapon.MODIFIER_CHANGE_RATE;
    this.setDurabilityModifier(updatedModifier);

    const durabilityPercent = (this.getEffectiveDurability() * 100).toFixed(2);
    let message = `You use the ${this.getName()}, the remaining durability is ${durabilityPercent}%.`;

    if (this.#isBroken) {
      message += `
The ${this.getName()} breaks.`;
    }

    return message;
  }

  toString(): string {
    const damageFormatted = this.getEffectiveDamage().toFixed(2);
    const durabilityFormatted = (this.getEffectiveDurability() * 100).toFixed(2);
    return `${super.toString()}, Damage: ${damageFormatted}, Durability: ${durabilityFormatted}%`;
  }

  isBroken(): boolean {
    return this.#isBroken;
  }

  protected getBaseDamage(): number {
    return this.#baseDamage;
  }

  protected getDamageModifier(): number {
    return this.#damageModifier;
  }

  protected setDamageModifier(modifier: number): void {
    this.#damageModifier = modifier;
  }

  protected getBaseDurability(): number {
    return this.#baseDurability;
  }

  protected getDurabilityModifier(): number {
    return this.#durabilityModifier;
  }

  protected setDurabilityModifier(modifier: number): void {
    const effective = this.#baseDurability + modifier;
    if (effective <= 0) {
      this.#durabilityModifier = -this.#baseDurability;
      this.#isBroken = true;
      return;
    }

    this.#durabilityModifier = modifier;
    this.#isBroken = false;
  }

  abstract polish(): void;
}
