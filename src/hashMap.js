import { LinkedList } from "./linkedList.js";

export class HashMap {
  capacity = 16;
  loadFactor = 0.75;
  items = 0;
  #buckets = [];

  constructor() {
    for (let i = 0; i < this.capacity; ++i) {
      this.#buckets.push(new LinkedList());
    }
  }

  hash(key = "") {
    key = String(key);
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; ++i) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  getBucket(hashCode) {
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new RangeError("Trying to access index out of bounds");
    }

    return this.#buckets[hashCode];
  }

  #getStoredItem(item = {}, bucket = new LinkedList()) {
    const itemIndex = bucket.findIndex(item);

    return itemIndex >= 0 ? bucket.at(itemIndex) : null;
  }

  set(key = "", value) {
    const hashCode = this.hash(key);
    const bucket = this.getBucket(hashCode);
    const item = { key, value };

    const storedItem = this.#getStoredItem(item, bucket);
    if (storedItem && storedItem.key === key) {
      storedItem.value = value;
    } else {
      bucket.append(item);
      ++this.items;
    }

    // TODO: Implement growth logic

    return this;
  }

  get(key = "") {
    const hashCode = this.hash(key);
    const bucket = this.getBucket(hashCode);
    const item = { key, value: null };
    const storedItem = this.#getStoredItem(item, bucket);

    return storedItem ? storedItem.value : null;
  }

  has() {}
  remove() {}
  length() {}
  clear() {}
  keys() {}
  values() {}
  entries() {}
}
