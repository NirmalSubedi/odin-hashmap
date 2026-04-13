import { HashMap } from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

const printInfo = () => {
  console.log({
    entries: test.entries(),
    length: test.length(),
    capacity: test.capacity,
  });
};

console.log("Initial Map:");
printInfo();

test.set("apple", null);
test.set("dog");

console.log("Values Modified Map:");
printInfo();

test.set("moon", "silver");

console.log("Map after exceeding load:");
printInfo();

test.set("apple", "aaaaaaaaaaaaaaaaaaaaaaaa");
test.set("kite", "======================");
test.set("frog", "++++++++++++++++++++++++++++++++++++++++++++++");

console.log("Values Modified Map after resize:");
printInfo();

console.log("Testing other methods after resize:");
console.log(test.get("kite"));
console.log(test.get("banana"));
console.log(test.get("dog"));

console.log(test.has("lion"));

console.log(test.entries());
console.log(test.remove("lion"));
console.log(test.entries());

console.log(test.keys());
console.log(test.values());
test.clear();
console.log(test.entries());
