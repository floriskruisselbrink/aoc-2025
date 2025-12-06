import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day06.ts";

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const realInput = await readFile("src/days/day06-input.txt");

describe("2025 Day 06", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), 6891729672676n);
    assert.equal(part2(realInput), "0");
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 4277556);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "0");
  });
});
