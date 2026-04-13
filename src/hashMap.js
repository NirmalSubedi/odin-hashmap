import { LinkedList } from "./linkedList.js";

export class HashMap {
  capacity = 16;
  loadFactor = 0.75;
  #items = 0;
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

  #getStoredItem(item = { key: null }, bucket = new LinkedList()) {
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
      ++this.#items;
    }

    // TODO: Implement growth logic

    return this;
  }

  get(key = "") {
    const hashCode = this.hash(key);
    const bucket = this.getBucket(hashCode);
    const storedItem = this.#getStoredItem({ key }, bucket);

    return storedItem ? storedItem.value : null;
  }

  has(key = "") {
    const hashCode = this.hash(key);
    const bucket = this.getBucket(hashCode);
    const storedItem = this.#getStoredItem({ key }, bucket);

    return Boolean(storedItem);
  }

  remove(key = "") {
    const hashCode = this.hash(key);
    const bucket = this.getBucket(hashCode);
    const itemIndex = bucket.findIndex({ key });
    const itemFound = itemIndex >= 0;

    if (itemFound) {
      bucket.removeAt(itemIndex);
      --this.#items;
    }

    return itemFound;
  }

  length() {
    return this.#items;
  }

  #getFilledBuckets() {
    const measuredBuckets = this.#buckets.map((bucket) => [
      bucket,
      bucket.size(),
    ]);
    const filledBuckets = measuredBuckets.filter(([, size]) => size > 0);

    return filledBuckets;
  }

  clear() {
    const filledBuckets = this.#getFilledBuckets();

    filledBuckets.forEach(([bucket, size]) => {
      while (size > 0) {
        bucket.pop();
        --this.#items;
        --size;
      }
    });
  }

  keys() {
    const keys = [];
    const filledBuckets = this.#getFilledBuckets();

    filledBuckets.forEach(([bucket, size]) => {
      for (let i = 0; i < size; ++i) {
        const item = bucket.at(i);
        keys.push(item.key);
      }
    });

    return keys;
  }

  values() {
    const values = [];
    const filledBuckets = this.#getFilledBuckets();

    filledBuckets.forEach(([bucket, size]) => {
      for (let i = 0; i < size; ++i) {
        const item = bucket.at(i);
        values.push(item.value);
      }
    });

    return values;
  }

  entries() {}
}
