import assert from "node:assert";
import { describe, it } from "node:test";
import { part1, part2 } from "./day01.ts";

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("2025 Day 01", () => {
  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, "3");
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "6");
  });
});
