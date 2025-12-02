import assert from "node:assert";
import { describe, it } from "node:test";
import { part1, part2 } from "./day02.ts";
import readFile from "../utils/readFile.ts";

const testInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

const realInput = await readFile("src/days/day02-input.txt");

describe("2025 Day 02", () => {
  it("should have the correct answers", () => {
    assert.equal(part1(realInput), "18952700150");
    assert.equal(part2(realInput), "28858486244");
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result.toString(), "1227775554");
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result.toString(), "4174379265");
  });
});
