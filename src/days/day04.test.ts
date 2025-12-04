import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day04.ts";

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const realInput = await readFile("src/days/day04-input.txt");

describe("2025 Day 04", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), 1537);
    assert.equal(part2(realInput), 8707);
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 13);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, 43);
  });
});
