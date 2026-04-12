export class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  list = new Node();

  #isObject(value) {
    return typeof value === "object" && value !== null;
  }

  #hasSameKeys(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (!(this.#isObject(obj1) && this.#isObject(obj2))) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (let i = 0; i < keys1.length; ++i) {
      const k1 = keys1[i];
      const k2 = keys2[i];

      if (this.#isObject(obj1[k1])) {
        return this.#hasSameKeys(obj1[k1], obj2[k2]);
      } else if (k1 !== k2) {
        return false;
      }
    }

    return true;
  }

  #isEmptyList() {
    if (this.list === null) this.list = new Node();
    return this.list.value === null;
  }

  append(value) {
    const addToEnd = (list) => {
      if (this.#isEmptyList()) return (list.value = value);
      if (!list.nextNode) return (list.nextNode = new Node(value));

      addToEnd(list.nextNode);
    };

    addToEnd(this.list);
    return this;
  }

  prepend(value) {
    if (this.#isEmptyList()) {
      this.list.value = value;
    } else {
      const node = new Node(value, this.list);
      this.list = node;
    }

    return this;
  }

  size() {
    const count = (list, size = 0) => {
      if (this.#isEmptyList() || !list) return size;
      return count(list.nextNode, size + 1);
    };
    return count(this.list);
  }

  head() {
    return this.list.value ? this.list.value : undefined;
  }

  at(searchIndex) {
    if (!Number.isInteger(searchIndex))
      throw new TypeError("Index is not an integer.");
    if (searchIndex < 0) throw new Error("Index must be positive.");

    const getValue = (list, currentIndex = 0) => {
      if (this.#isEmptyList() || !list) return;
      if (currentIndex === searchIndex) return list.value;
      return getValue(list.nextNode, currentIndex + 1);
    };

    return getValue(this.list);
  }

  pop() {
    if (this.#isEmptyList()) return;

    const removedNode = this.list;
    const hasNextNode = this.list.nextNode !== null;

    this.list = hasNextNode ? this.list.nextNode : new Node();

    return removedNode.value;
  }

  contains(searchValue) {
    const checkList = (list) => {
      if (this.#isEmptyList() || !list) return false;
      if (list.value === searchValue) return true;
      if (this.#isObject(list.value) && this.#isObject(searchValue)) {
        return this.#hasSameKeys(searchValue, list.value);
      }
      return checkList(list.nextNode);
    };

    return checkList(this.list);
  }

  findIndex(searchValue) {
    if (searchValue === undefined)
      throw new Error("Search value not specified.");

    const getIndex = (list, currentIndex = 0) => {
      if (this.#isEmptyList() || !list) return -1;
      if (list.value === searchValue) return currentIndex;
      if (
        this.#isObject(searchValue) &&
        this.#isObject(list.value) &&
        this.#hasSameKeys(searchValue, list.value)
      ) {
        return currentIndex;
      }
      return getIndex(list.nextNode, currentIndex + 1);
    };

    return getIndex(this.list);
  }

  toString() {
    const getSequence = (list, sequence = "") => {
      if (this.#isEmptyList()) return sequence;
      if (!list) return null;
      return `( ${list.value} ) -> ${getSequence(list.nextNode)}`;
    };

    return getSequence(this.list);
  }

  insertAt(targetIndex, ...values) {
    if (!Number.isInteger(targetIndex))
      throw new TypeError("Target index should be an integer.");
    if (targetIndex < 0 || targetIndex > this.size())
      throw new RangeError("Target index is out of bound.");

    const goToIndex = (currentNode, leftNode = null, currentIndex = 0) => {
      if (currentIndex === targetIndex) {
        values.forEach((value) => {
          const newNode = new Node(value);

          if (leftNode === null) {
            this.list = newNode;
          } else {
            leftNode.nextNode = newNode;
          }

          if (currentNode?.value !== null) newNode.nextNode = currentNode;

          leftNode = newNode;
        });

        return;
      }
      if (currentNode === null) return;

      goToIndex(currentNode.nextNode, currentNode, currentIndex + 1);
    };

    goToIndex(this.list);
  }

  removeAt(targetIndex) {
    if (!Number.isInteger(targetIndex))
      throw new TypeError("Index must be an integer.");
    if (targetIndex < 0 || targetIndex > this.size())
      throw new RangeError("Index is out of bound.");

    const goToIndex = (currentNode, leftNode = null, currentIndex = 0) => {
      if (this.#isEmptyList()) return;
      if (currentIndex === targetIndex) {
        if (leftNode === null) {
          this.list = currentNode.nextNode;
        } else {
          leftNode.nextNode = currentNode.nextNode;
        }
        return;
      }
      if (currentNode === null) return;

      goToIndex(currentNode.nextNode, currentNode, currentIndex + 1);
    };

    goToIndex(this.list);
  }
}
