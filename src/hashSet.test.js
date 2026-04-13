import { HashSet } from "./hashSet.js";

describe("HashSet Constructor", () => {
  it("HashSet Constructor exist", () => {
    expect(HashSet).toBeDefined();
  });

  it("HashSet Constructor is a function", () => {
    expect(typeof HashSet).toBe("function");
  });
});

describe("hash method", () => {
  it("hash method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "hash")).toBe(true);
    expect(typeof HashSet.prototype.hash).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Accepts non-string keys", () => {
    expect(() => set.hash("")).not.toThrow(Error);
    expect(() => set.hash(1)).not.toThrow(Error);
    expect(() => set.hash(1n)).not.toThrow(Error);
    expect(() => set.hash(true)).not.toThrow(Error);
    expect(() => set.hash(null)).not.toThrow(Error);
    expect(() => set.hash(undefined)).not.toThrow(Error);
    expect(() => set.hash({})).not.toThrow(Error);
    expect(() => set.hash([])).not.toThrow(Error);
    expect(() => set.hash(() => {})).not.toThrow(Error);
  });

  it("Returns a number type", () => {
    expect(typeof set.hash("give number")).toBe("number");
  });

  it("Returns an integer", () => {
    expect(Number.isInteger(set.hash("give integer"))).toBe(true);
  });

  it("Below capacity", () => {
    expect(set.hash("apple banana carrot")).toBeLessThan(set.capacity);
  });

  it("Below max safe integer limit", () => {
    expect(
      set.hash("this is a long long long long long long string")
    ).toBeLessThan(Number.MAX_SAFE_INTEGER);
  });

  it("Returns different hashes for string permutations", () => {
    const string1 = "Sara";
    const string2 = "aSra";
    const string3 = "araS";
    const string1Hash = set.hash(string1);
    const string2Hash = set.hash(string2);
    const string3Hash = set.hash(string3);

    expect(string1Hash).not.toBe(string2Hash);
    expect(string1Hash).not.toBe(string3Hash);
    expect(string2Hash).not.toBe(string3Hash);
  });
});

describe("getBucket method", () => {
  it("getBucket method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "getBucket")).toBe(true);
    expect(typeof HashSet.prototype.getBucket).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Throws RangeError for index below 0", () => {
    expect(() => set.getBucket(-1)).toThrow(RangeError);
  });

  it("Throws RangeError for index at or above capacity", () => {
    expect(() => set.getBucket(set.capacity)).toThrow(RangeError);
    expect(() => set.getBucket(set.capacity + 1)).toThrow(RangeError);
  });

  it("Does not throw for indices in bound", () => {
    expect(() => set.getBucket(0)).not.toThrow(RangeError);
    expect(() => set.getBucket(set.capacity - 1)).not.toThrow(RangeError);
  });
});

describe("add method", () => {
  it("add method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "add")).toBe(true);
    expect(typeof HashSet.prototype.add).toBe("function");
  });

  let set;
  beforeEach(() => {
    set = new HashSet();
  });

  it("Adds a value", () => {
    set.add("hello");

    const hashCode = set.hash("hello");
    expect(set.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "hello", value: "hello" },
        nextNode: null,
      },
    });
  });

  it("Does not add duplicate value", () => {
    set.add("hello");
    set.add("hello");

    const hashCode = set.hash("hello");
    expect(set.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "hello", value: "hello" },
        nextNode: null,
      },
    });
  });

  it("Store separate values for same hash", () => {
    const hash1 = set.hash("Rama");
    const hash2 = set.hash("Sita");
    expect(hash1).toEqual(hash2);

    set.add("Rama");
    set.add("Sita");
    const hashCode = set.hash("Rama");
    expect(set.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "Rama", value: "Rama" },
        nextNode: { value: { key: "Sita", value: "Sita" }, nextNode: null },
      },
    });
  });
});

describe("has method", () => {
  it("has method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "has")).toBe(true);
    expect(typeof HashSet.prototype.has).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Returns true if value is in hash set (1)", () => {
    set.add("bird");
    expect(set.has("bird")).toBe(true);
  });

  it("Returns true if value is in hash set (2)", () => {
    set.add("bee");
    expect(set.has("bee")).toBe(true);
  });

  it("Returns true if value is in hash set (3)", () => {
    set.add("cat");
    expect(set.has("cat")).toBe(true);
  });

  it("Returns false if value is not in hash set (1)", () => {
    expect(set.has("dog")).toBe(false);
  });

  it("Returns false if value is not in hash set (2)", () => {
    expect(set.has("ant")).toBe(false);
  });

  it("Returns false if value is not in hash set (3)", () => {
    expect(set.has("mouse")).toBe(false);
  });
});

describe("delete method", () => {
  it("delete method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "delete")).toBe(true);
    expect(typeof HashSet.prototype.delete).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Removes value if in hash set", () => {
    set.add("dog");
    expect(set.has("dog")).toBe(true);
    set.delete("dog");
    expect(set.has("dog")).toBe(false);
  });

  it("Returns true if value was deleted", () => {
    set.add("bee");
    expect(set.delete("bee")).toBe(true);
  });

  it("Returns false if value was not found", () => {
    set.add("cat");
    expect(set.delete("bat")).toBe(false);
  });
});

describe("size method", () => {
  it("size method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "size")).toBe(true);
    expect(typeof HashSet.prototype.size).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Returns 0 if empty", () => {
    expect(set.size()).toBe(0);
  });

  it("Returns updated size if a value is added", () => {
    set.add("ant");
    expect(set.size()).toBe(1);
  });

  it("Returns updated size if multiple values are added", () => {
    set.add("elephant");
    set.add("giraffe");
    set.add("dog");
    set.add("whale");
    expect(set.size()).toBe(5);
  });

  it("Returns updated size if a value is deleted", () => {
    set.delete("whale");
    expect(set.size()).toBe(4);
  });

  it("Returns updated size if multiple value are deleted", () => {
    set.delete("elephant");
    set.delete("giraffe");
    expect(set.size()).toBe(2);
  });
});

describe("clear method", () => {
  it("clear method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "clear")).toBe(true);
    expect(typeof HashSet.prototype.clear).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Remove one entry from hash set", () => {
    set.add("apple");
    expect(set.size()).toBe(1);
    expect(set.has("apple")).toBe(true);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.has("apple")).toBe(false);
  });

  it("Removes all entries from hash set", () => {
    set.add("banana");
    set.add("cherry");
    set.add("durian");
    expect(set.size()).toBe(3);
    expect(set.has("banana")).toBe(true);
    expect(set.has("cherry")).toBe(true);
    expect(set.has("durian")).toBe(true);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.has("banana")).toBe(false);
    expect(set.has("cherry")).toBe(false);
    expect(set.has("durian")).toBe(false);
  });
});

describe("keys method", () => {
  it("keys method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "keys")).toBe(true);
    expect(typeof HashSet.prototype.keys).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Returns empty array on 0 entries", () => {
    expect(set.keys()).toEqual([]);
  });

  it("Returns key of a entry", () => {
    set.add("ant");
    expect(set.keys()).toEqual(["ant"]);
  });

  it("Returns keys of multiple entries", () => {
    set.add("bear");
    set.add("cat");
    expect(set.keys().sort()).toEqual(["ant", "bear", "cat"]);
  });

  it("Returns correct keys if a entry is deleted", () => {
    set.delete("bear");
    expect(set.keys().sort()).toEqual(["ant", "cat"]);
  });

  it("Returns empty array if entires cleared", () => {
    set.clear();
    expect(set.keys()).toEqual([]);
  });
});

describe("values method", () => {
  it("values method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "values")).toBe(true);
    expect(typeof HashSet.prototype.values).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Returns empty array on 0 entries", () => {
    expect(set.values()).toEqual([]);
  });

  it("Returns value of a entry", () => {
    set.add("tiny");
    expect(set.values()).toEqual(["tiny"]);
  });

  it("Returns values of multiple entries", () => {
    set.add("small");
    set.add("huge");
    expect(set.values().sort()).toEqual(["huge", "small", "tiny"]);
  });

  it("Returns correct values if a entry is deleted", () => {
    set.delete("tiny");
    expect(set.values().sort()).toEqual(["huge", "small"]);
  });

  it("Returns empty array if entires cleared", () => {
    set.clear();
    expect(set.values()).toEqual([]);
  });
});

describe("entries method", () => {
  it("entries method exists", () => {
    expect(Object.hasOwn(HashSet.prototype, "entries")).toBe(true);
    expect(typeof HashSet.prototype.entries).toBe("function");
  });

  let set;
  beforeAll(() => {
    set = new HashSet();
  });

  it("Returns empty array on 0 entries", () => {
    expect(set.entries()).toEqual([]);
  });

  it("Returns key value pair of a entry", () => {
    set.add("ant");
    expect(set.entries()).toEqual([["ant", "ant"]]);
  });

  it("Returns key value pairs of multiple entries", () => {
    set.add("bear");
    set.add("cat");
    expect(set.entries().sort()).toEqual([
      ["ant", "ant"],
      ["bear", "bear"],
      ["cat", "cat"],
    ]);
  });

  it("Returns correct key value pair if a entry is deleted", () => {
    set.delete("cat");
    expect(set.entries().sort()).toEqual([
      ["ant", "ant"],
      ["bear", "bear"],
    ]);
  });

  it("Returns empty array if entires cleared", () => {
    set.clear();
    expect(set.entries()).toEqual([]);
  });
});

describe("hashSet growth", () => {
  let set;
  beforeAll(() => {
    set = new HashSet();
    set.add("apple");
    set.add("banana");
    set.add("carrot");
    set.add("dog");
    set.add("elephant");
    set.add("frog");
    set.add("grape");
    set.add("hat");
    set.add("ice cream");
    set.add("jacket");
    set.add("kite");
    set.add("lion");
  });

  it("Ignores existing values of nodes", () => {
    expect(set.size()).toBe(12);
    expect(set.capacity).toBe(16);
    set.add("lion");
    expect(set.size()).toBe(12);
    expect(set.capacity).toBe(16);
  });

  it("Capacity doubles after overloading", () => {
    expect(set.capacity).toBe(16);
    set.add("moon");
    expect(set.capacity).toBe(32);
  });

  it("Length only increased by one", () => {
    expect(set.size()).toBe(13);
  });

  it("has method still works", () => {
    expect(set.has("kite")).toBe(true);
  });

  it("delete method still works", () => {
    expect(set.size()).toBe(13);
    expect(set.has("ice cream")).toBe(true);

    expect(set.delete("ice cream")).toBe(true);

    expect(set.size()).toBe(12);
    expect(set.has("ice cream")).toBe(false);
  });

  it("size method still works", () => {
    expect(set.size()).toBe(12);
    set.add("rainbow");
    expect(set.size()).toBe(13);
  });

  it("values method still works", () => {
    expect(set.values().sort()).toEqual([
      "apple",
      "banana",
      "carrot",
      "dog",
      "elephant",
      "frog",
      "grape",
      "hat",
      "jacket",
      "kite",
      "lion",
      "moon",
      "rainbow",
    ]);
  });

  it("keys method still works", () => {
    expect(set.keys().sort()).toEqual([
      "apple",
      "banana",
      "carrot",
      "dog",
      "elephant",
      "frog",
      "grape",
      "hat",
      "jacket",
      "kite",
      "lion",
      "moon",
      "rainbow",
    ]);
  });

  it("entries method still works", () => {
    expect(set.entries().sort()).toEqual([
      ["apple", "apple"],
      ["banana", "banana"],
      ["carrot", "carrot"],
      ["dog", "dog"],
      ["elephant", "elephant"],
      ["frog", "frog"],
      ["grape", "grape"],
      ["hat", "hat"],
      ["jacket", "jacket"],
      ["kite", "kite"],
      ["lion", "lion"],
      ["moon", "moon"],
      ["rainbow", "rainbow"],
    ]);
  });

  it("clear method still works", () => {
    expect(set.size()).toBe(13);
    expect(set.has("apple")).toBe(true);

    set.clear();

    expect(set.has("apple")).toBe(false);
    expect(set.size()).toBe(0);
  });
});
