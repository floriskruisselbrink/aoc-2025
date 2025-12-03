import assert from "node:assert";
import { describe, it } from "node:test";
import { part1, part2 } from "./day03.ts";
import readFile from "../utils/readFile.ts";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111
`;

const realInput = await readFile("src/days/day03-input.txt");

describe("2025 Day 03", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), "16858");
    assert.equal(part2(realInput), "167549941654721");
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 357);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, 3121910778619);
  });
});
