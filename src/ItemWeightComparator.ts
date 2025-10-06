import { ItemComparator } from './ItemComparator';
import { Item } from './Item';

export class ItemWeightComparator implements ItemComparator {
  compare(first: Item, second: Item): number {
    const firstWeight = first.getWeight();
    const secondWeight = second.getWeight();

    if (firstWeight > secondWeight) {
      return 1;
    }

    if (firstWeight < secondWeight) {
      return -1;
    }

    return first.compareTo(second);
  }
}
