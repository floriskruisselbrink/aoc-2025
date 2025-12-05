import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day05.ts";

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const realInput = await readFile("src/days/day05-input.txt");

describe("2025 Day 05", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), 563);
    assert.equal(part2(realInput), 338693411431456);
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 3);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, 14);
  });
});
