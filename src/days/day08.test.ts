import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day08.ts";

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const realInput = await readFile("src/days/day08-input.txt");

describe("2025 Day 08", () => {
  it.skip("should have the correct answers", () => {
    assert.equal(part1(realInput), 90036);
    assert.equal(part2(realInput), "");
  });

  it("should solve first part", () => {
    const result = part1(testInput, 10);
    assert.equal(result, 40);
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "0");
  });
});
