import { LinkedList } from "./linkedList.js";

export class HashMap {
  capacity = 16;
  loadFactor = 0.75;
  items = 0;
  buckets = [];

  constructor() {
    for (let i = 0; i < this.capacity; ++i) {
      this.buckets.push(new LinkedList());
    }
  }

  hash(key) {
    key = String(key);
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; ++i) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];
    const item = { key, value };
    const itemIndex = bucket.findIndex(item);

    const storedItem = itemIndex >= 0 ? bucket.at(itemIndex) : null;
    if (storedItem && storedItem.key === key) {
      storedItem.value = value;
    } else {
      bucket.append(item);
      ++this.items;
    }

    return this;
  }

  get() {}
  has() {}
  remove() {}
  length() {}
  clear() {}
  keys() {}
  values() {}
  entries() {}
}
