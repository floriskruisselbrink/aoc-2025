import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day11.ts";

const testInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const realInput = await readFile("src/days/day11-input.txt");

describe("2025 Day 11", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), 634);
    // assert.equal(part2(realInput), 0);
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 5);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, 0);
  });
});
