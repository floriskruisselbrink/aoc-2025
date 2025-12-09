import Vector from "../utils/Vector.ts";

const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => Vector.of(line));

function rectangleSize(a: Vector, b: Vector): number {
  return (
    (Math.max(a.x, b.x) - Math.min(a.x, b.x) + 1) *
    (Math.max(a.y, b.y) - Math.min(a.y, b.y) + 1)
  );
}

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let maxSize = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const size = rectangleSize(input[i], input[j]);
      maxSize = Math.max(maxSize, size);
    }
  }

  return maxSize;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
