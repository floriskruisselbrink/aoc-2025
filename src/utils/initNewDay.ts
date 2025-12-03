import { copyFileSync, existsSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const day = args[0];

if (!day) {
  console.error("Please run with the day to bootstrap, i.e. pnpm init-day 1");
  process.exit(1);
}

const dayPrefix = day.padStart(2, "0");

console.log(`Creating template for day ${day}`);

const targetFile = `src/days/day${dayPrefix}.ts`;
const targetTestFile = `src/days/day${dayPrefix}.test.ts`;

if (existsSync(targetFile) || existsSync(targetTestFile)) {
  console.log(`day ${day} already exists`);
  process.exit(0);
}

writeFileSync(
  targetFile,
  `const parseInput = (rawInput: string) => rawInput;

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
`,
);

writeFileSync(
  targetTestFile,
  `import assert from "node:assert";
import { describe, it } from "node:test";
import readFile from "../utils/readFile.ts";
import { part1, part2 } from "./day${dayPrefix}.ts";

const testInput = "TODO";

const realInput = await readFile("src/days/day${dayPrefix}-input.txt");

describe("2025 Day ${dayPrefix}", () => {
  it.skip("should have the correct answers", () => {
    assert.equal(part1(realInput), "");
    assert.equal(part2(realInput), "");
  });

  it("should solve first part", () => {
    const result = part1(testInput);
    assert.equal(result, "0");
  });

  it("should solve second part", () => {
    const result = part2(testInput);
    assert.equal(result, "0");
  });
});
`,
);
