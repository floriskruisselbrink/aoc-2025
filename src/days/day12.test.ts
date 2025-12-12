import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day12.ts";

const realInput = await readFile("src/days/day12-input.txt");

describe("2025 Day 12", () => {
  it("should solve first part", () => {
    const result = part1(realInput);
    assert.equal(result, 526);
  });

  it("should solve second part", () => {
    const result = part2(realInput);
    assert.equal(result, "Free Bonus Star");
  });
});
