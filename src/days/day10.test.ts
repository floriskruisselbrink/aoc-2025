import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day10.ts";

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

const realInput = await readFile("src/days/day10-input.txt");

describe("2025 Day 10", () => {
  it("should have the correct answers", async () => {
    assert.equal(await part1(realInput), 530);
    assert.equal(await part2(realInput), 20172);
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, 7);
  });

  it("should solve second part", async () => {
    const result = await part2(testInput);
    assert.equal(result, 33);
  });
});
