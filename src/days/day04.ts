import Matrix from "../utils/Matrix.ts";
import Vector from "../utils/Vector.ts";

const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => line.split("").map((c) => (c === "@" ? 1 : 0)));

function doWithNeighbours(
  matrix: Matrix,
  location: Vector,
  callbackFn: (n: Vector) => void,
) {
  for (let neighbour of location.allNeighbours()) {
    if (neighbour.x < 0 || neighbour.x >= matrix.width) continue;
    if (neighbour.y < 0 || neighbour.y >= matrix.height) continue;

    if (matrix.at(neighbour) > 0) callbackFn(neighbour);
  }
}

function countNeighbours(matrix: Matrix, location: Vector): number {
  if (matrix.at(location) === 0) return +Infinity;

  let count = 0;
  doWithNeighbours(matrix, location, (n) => {
    if (matrix.at(n) > 0) count++;
  });

  return count;
}

export function part1(rawInput: string) {
  const matrix = Matrix.of(parseInput(rawInput));

  let sum = 0;
  matrix.forEach((_, location) => {
    const count = countNeighbours(matrix, location);
    if (count < 4) sum++;
  });

  return sum;
}

export function part2(rawInput: string) {
  let matrix = Matrix.of(parseInput(rawInput));
  let sum = 0;

  while (true) {
    let removed = 0;

    matrix.forEach((_, location) => {
      const count = countNeighbours(matrix, location);
      if (count < 4) {
        removed++;
        matrix.update(location, 0);
      }
    });

    if (removed === 0) break;
    sum += removed;
  }

  return sum;
}
