import { readdirSync } from "node:fs";
import { describe, it, type TestContext } from "node:test";
import type { Puzzle } from "./types.ts";
import assert from "node:assert";

describe("AoC test runner", () => {
  const puzzles = readdirSync("./src/days", { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".ts"))
    .map((dirent) => dirent.name);

  for (const puzzle of puzzles) {
    it(`Tests ${puzzle}`, async (t: TestContext) => {
      try {
        const puzzlePath = `./days/${puzzle}`;
        const { part1, part2, testcases }: Puzzle = await import(puzzlePath);

        assert.ok(
          testcases !== undefined && testcases.length > 0,
          "No testcases found",
        );

        for (const [n, testcase] of testcases?.entries() || []) {
          it(`testcase ${n}`, async () => {
            assert.strictEqual(
              part1(testcase.input).toString(),
              testcase.expectedOutput1,
            );
            assert.strictEqual(
              part2(testcase.input).toString(),
              testcase.expectedOutput2,
            );
          });
        }
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  }
});
