import type { Testcase } from "../types.ts";

const parseInput = (rawInput: string) => rawInput;

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return "41";
};

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return "42";
};

export const testcases: Testcase[] = [
  { input: "dummy-input", expectedOutput1: "41", expectedOutput2: "42" },
];
