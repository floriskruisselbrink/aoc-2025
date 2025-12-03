import assert from "node:assert";
import { describe, it } from "node:test";
import { part1, part2 } from "./day03.ts";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111
`;

describe("2025 Day 03", () => {
  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 357);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "0");
  });
});
