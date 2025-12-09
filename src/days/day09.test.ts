import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day09.ts";

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const realInput = await readFile("src/days/day09-input.txt");

describe("2025 Day 09", () => {
  it.skip("should have the correct answers", () => {
    assert.equal(part1(realInput), 4782268188);
    assert.equal(part2(realInput), "");
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 50);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "0");
  });
});
