export type Testcase = {
  input: string;
  expectedOutput1: string;
  expectedOutput2: string;
};

export type Puzzle = {
  part1: (rawInput: string) => string;
  part2: (rawInput: string) => string;
  testcases?: Testcase[];
};
