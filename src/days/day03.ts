import memoize from "../utils/memoize.ts";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/g).filter((s) => /\w+/.test(s));

let findLargestJoltage = (bank: string, length: number): number => {
  if (length === 0) return 0;
  if (bank.length === length) return Number(bank);

  const a =
    Number(bank[0]) * 10 ** (length - 1) +
    findLargestJoltage(bank.slice(1), length - 1);

  const b = findLargestJoltage(bank.slice(1), length);

  return Math.max(a, b);
};
findLargestJoltage = memoize(findLargestJoltage);

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return input
    .map((bank) => findLargestJoltage(bank, 2))
    .reduce((sum, current) => sum + current, 0);
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return input
    .map((bank) => findLargestJoltage(bank, 12))
    .reduce((sum, current) => sum + current, 0);
}
