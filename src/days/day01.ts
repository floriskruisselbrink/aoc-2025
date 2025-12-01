import type { Testcase } from "../types.js";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/g).map((row) => {
    const dir = row[0];
    const count = Number(row.slice(1));
    return { dir, count };
  });

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let pointer = 50;
  let zeros = 0;

  for (let { dir, count } of input) {
    if (dir == "L") {
      pointer = (100 + pointer - count) % 100;
    } else {
      pointer = (100 + pointer + count) % 100;
    }
    if (pointer === 0) zeros++;
  }

  return zeros;
};

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return "XYZ";
};

export const testcases: Testcase[] = [
  {
    input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
    expectedOutput1: "3",
    expectedOutput2: "XYZ",
  },
];
