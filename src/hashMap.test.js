import { HashMap } from "./hashMap.js";

describe("HashMap Constructor", () => {
  it("HashMap Constructor exist", () => {
    expect(HashMap).toBeDefined();
  });

  it("HashMap Constructor is a function", () => {
    expect(typeof HashMap).toBe("function");
  });
});

describe("hash method", () => {
  it("hash method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "hash")).toBe(true);
    expect(typeof HashMap.prototype.hash).toBe("function");
  });

  let map;
  beforeAll(() => {
    map = new HashMap();
  });

  it("Accepts non-string keys", () => {
    expect(() => map.hash("")).not.toThrow(Error);
    expect(() => map.hash(1)).not.toThrow(Error);
    expect(() => map.hash(1n)).not.toThrow(Error);
    expect(() => map.hash(true)).not.toThrow(Error);
    expect(() => map.hash(null)).not.toThrow(Error);
    expect(() => map.hash(undefined)).not.toThrow(Error);
    expect(() => map.hash({})).not.toThrow(Error);
    expect(() => map.hash([])).not.toThrow(Error);
    expect(() => map.hash(() => {})).not.toThrow(Error);
  });

  it("Returns a number type", () => {
    expect(typeof map.hash("give number")).toBe("number");
  });

  it("Returns an integer", () => {
    expect(Number.isInteger(map.hash("give integer"))).toBe(true);
  });

  it("Below capacity", () => {
    expect(map.hash("apple banana carrot")).toBeLessThan(map.capacity);
  });

  it("Below max safe integer limit", () => {
    expect(
      map.hash("this is a long long long long long long string")
    ).toBeLessThan(Number.MAX_SAFE_INTEGER);
  });

  it("Returns different hashes for string permutations", () => {
    const string1 = "Sara";
    const string2 = "aSra";
    const string3 = "araS";
    const string1Hash = map.hash(string1);
    const string2Hash = map.hash(string2);
    const string3Hash = map.hash(string3);

    expect(string1Hash).not.toBe(string2Hash);
    expect(string1Hash).not.toBe(string3Hash);
    expect(string2Hash).not.toBe(string3Hash);
  });
});

describe("getBucket method", () => {
  it("getBucket method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "getBucket")).toBe(true);
    expect(typeof HashMap.prototype.getBucket).toBe("function");
  });

  let map;
  beforeAll(() => {
    map = new HashMap();
  });

  it("Throws RangeError for index below 0", () => {
    expect(() => map.getBucket(-1)).toThrow(RangeError);
  });

  it("Throws RangeError for index at or above capacity", () => {
    expect(() => map.getBucket(map.capacity)).toThrow(RangeError);
    expect(() => map.getBucket(map.capacity + 1)).toThrow(RangeError);
  });

  it("Does not throw for indices in bound", () => {
    expect(() => map.getBucket(0)).not.toThrow(RangeError);
    expect(() => map.getBucket(map.capacity - 1)).not.toThrow(RangeError);
  });
});

describe("set method", () => {
  it("set method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "set")).toBe(true);
    expect(typeof HashMap.prototype.set).toBe("function");
  });

  let map;
  beforeEach(() => {
    map = new HashMap();
  });

  it("Assigns value to key", () => {
    map.set("hello", "there");

    const hashCode = map.hash("hello");
    expect(map.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "hello", value: "there" },
        nextNode: null,
      },
    });
  });

  it("Updates value of same key to new value", () => {
    map.set("hello", "there");
    map.set("hello", "world");

    const hashCode = map.hash("hello");
    expect(map.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "hello", value: "world" },
        nextNode: null,
      },
    });
  });

  it("Store separate values for same hash", () => {
    const hash1 = map.hash("Rama");
    const hash2 = map.hash("Sita");
    expect(hash1).toEqual(hash2);

    map.set("Rama", 1);
    map.set("Sita", 2);
    const hashCode = map.hash("Rama");
    expect(map.getBucket(hashCode)).toEqual({
      list: {
        value: { key: "Rama", value: 1 },
        nextNode: { value: { key: "Sita", value: 2 }, nextNode: null },
      },
    });
  });
});

describe("get method", () => {
  it("get method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "get")).toBe(true);
    expect(typeof HashMap.prototype.get).toBe("function");
  });

  let map;
  beforeAll(() => {
    map = new HashMap();
  });

  it("Returns null if no key is found", () => {
    expect(map.get("apple")).toBe(null);
  });

  it("Returns value assigned to key (1)", () => {
    map.set("apple", "red");
    expect(map.get("apple")).toBe("red");
  });

  it("Returns value assigned to key (2)", () => {
    map.set("banana", "yellow");
    expect(map.get("banana")).toBe("yellow");
  });

  it("Returns value assigned to key (3)", () => {
    map.set("carrot", "orange");
    expect(map.get("carrot")).toBe("orange");
  });
});

describe("has method", () => {
  it("has method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "has")).toBe(true);
    expect(typeof HashMap.prototype.has).toBe("function");
  });

  let map;
  beforeAll(() => {
    map = new HashMap();
  });

  it("Returns true if key is in hash map (1)", () => {
    map.set("bird", "chirp");
    expect(map.has("bird")).toBe(true);
  });

  it("Returns true if key is in hash map (2)", () => {
    map.set("bee", "buzz");
    expect(map.has("bee")).toBe(true);
  });

  it("Returns true if key is in hash map (3)", () => {
    map.set("cat", "meow");
    expect(map.has("cat")).toBe(true);
  });

  it("Returns false if key is not in hash map (1)", () => {
    expect(map.has("dog")).toBe(false);
  });

  it("Returns false if key is not in hash map (2)", () => {
    expect(map.has("ant")).toBe(false);
  });

  it("Returns false if key is not in hash map (3)", () => {
    expect(map.has("mouse")).toBe(false);
  });
});

describe("remove method", () => {
  it("remove method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "remove")).toBe(true);
    expect(typeof HashMap.prototype.remove).toBe("function");
  });

  let map;
  beforeAll(() => {
    map = new HashMap();
  });

  it("Removes key if in hash map", () => {
    map.set("dog", "bark");
    expect(map.has("dog")).toBe(true);
    map.remove("dog");
    expect(map.has("dog")).toBe(false);
  });

  it("Returns true if key was removed", () => {
    map.set("bee", "buzz");
    expect(map.remove("bee")).toBe(true);
  });

  it("Returns false if key was not found", () => {
    map.set("cat", "meow");
    expect(map.remove("bat")).toBe(false);
  });
});

describe("length method", () => {
  it("length method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "length")).toBe(true);
    expect(typeof HashMap.prototype.length).toBe("function");
  });
});

describe("clear method", () => {
  it("clear method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "clear")).toBe(true);
    expect(typeof HashMap.prototype.clear).toBe("function");
  });
});

describe("keys method", () => {
  it("keys method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "keys")).toBe(true);
    expect(typeof HashMap.prototype.keys).toBe("function");
  });
});

describe("values method", () => {
  it("values method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "values")).toBe(true);
    expect(typeof HashMap.prototype.values).toBe("function");
  });
});

describe("entries method", () => {
  it("entries method exists", () => {
    expect(Object.hasOwn(HashMap.prototype, "entries")).toBe(true);
    expect(typeof HashMap.prototype.entries).toBe("function");
  });
});
