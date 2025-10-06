import { Item } from './Item';
import type { ItemComparator } from './ItemComparator';

export class Inventory {
  #items: Item[];

  constructor(items: Item[] = []) {
    this.#items = [...items];
  }

  addItem(item: Item): void {
    this.#items.push(item);
  }

  getItems(): Item[] {
    return [...this.#items];
  }

  sort(): void;
  sort(comparator: ItemComparator): void;
  sort(comparator?: ItemComparator): void {
    if (comparator) {
      this.#items.sort((first, second) => comparator.compare(first, second));
      return;
    }

    this.#items.sort((first, second) => first.compareTo(second));
  }

  toString(): string {
    return this.#items.map((item) => item.toString()).join(', ');
  }
}
