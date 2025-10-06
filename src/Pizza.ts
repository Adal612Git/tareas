import { Consumable } from './Consumable';

export class Pizza extends Consumable {
  #numberOfSlices: number;
  #numberOfEatenSlices: number;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled: boolean) {
    super('pizza', value, weight, isSpoiled);
    this.#numberOfSlices = numberOfSlices;
    this.#numberOfEatenSlices = 0;
  }

  getNumberOfSlices(): number {
    return this.#numberOfSlices;
  }

  getNumberOfEatenSlices(): number {
    return this.#numberOfEatenSlices;
  }

  use(): string {
    if (this.#numberOfEatenSlicesReachedLimit()) {
      this.#numberOfEatenSlices = this.#numberOfSlices;
      this.setConsumed(true);
      return `There's nothing left of the ${this.getName()} to consume.`;
    }

    const message = super.use();
    this.#numberOfEatenSlices += 1;

    if (!this.#numberOfEatenSlicesReachedLimit()) {
      this.setConsumed(false);
    }

    return message;
  }

  #numberOfEatenSlicesReachedLimit(): boolean {
    return this.#numberOfEatenSlices >= this.#numberOfSlices;
  }
}
