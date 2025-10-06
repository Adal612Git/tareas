import { Comparable } from './Comparable';

export abstract class Item implements Comparable<Item> {
  static idCounter = 1;

  static resetIdCounter(): void {
    Item.idCounter = 1;
  }

  #id: number;
  #name: string;
  #value: number;
  #weight: number;

  protected constructor(name: string, value: number, weight: number) {
    this.#id = Item.idCounter++;
    this.#name = name;
    this.#value = value;
    this.#weight = weight;
  }

  getId(): number {
    return this.#id;
  }

  getName(): string {
    return this.#name;
  }

  protected setName(name: string): void {
    this.#name = name;
  }

  getValue(): number {
    return this.#value;
  }

  protected setValue(value: number): void {
    this.#value = value;
  }

  getWeight(): number {
    return this.#weight;
  }

  protected setWeight(weight: number): void {
    this.#weight = weight;
  }

  compareTo(other: Item): number {
    if (this.#value > other.getValue()) {
      return 1;
    }

    if (this.#value < other.getValue()) {
      return -1;
    }

    const thisName = this.#name.toLowerCase();
    const otherName = other.getName().toLowerCase();
    if (thisName === otherName) {
      return 0;
    }

    return thisName > otherName ? 1 : -1;
  }

  toString(): string {
    const valueFormatted = this.#value.toFixed(2);
    const weightFormatted = this.#weight.toFixed(2);
    return `${this.#name} - Value: ${valueFormatted}, Weight: ${weightFormatted}`;
  }
}
