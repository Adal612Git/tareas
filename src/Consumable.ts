import { Item } from './Item';

export abstract class Consumable extends Item {
  #isConsumed: boolean;
  #isSpoiled: boolean;

  protected constructor(name: string, value: number, weight: number, isSpoiled: boolean) {
    super(name, value, weight);
    this.#isConsumed = false;
    this.#isSpoiled = isSpoiled;
  }

  getIsSpoiled(): boolean {
    return this.#isSpoiled;
  }

  use(): string {
    if (this.#isConsumed) {
      return `There's nothing left of the ${this.getName()} to consume.`;
    }

    this.#isConsumed = true;
    let message = `You consumed the ${this.getName()}.`;

    if (this.#isSpoiled) {
      message += `
You feel sick.`;
    }

    return message;
  }

  protected getIsConsumed(): boolean {
    return this.#isConsumed;
  }

  protected setConsumed(consumed: boolean): void {
    this.#isConsumed = consumed;
  }

  protected setSpoiled(spoiled: boolean): void {
    this.#isSpoiled = spoiled;
  }
}
