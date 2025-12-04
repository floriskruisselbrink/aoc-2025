import Vector from "../utils/Vector.ts";

type Grid = string[];

const parseInput = (rawInput: string) => rawInput.split("\n");

const directions: Vector[] = [
  // straight
  new Vector(1, 0),
  new Vector(-1, 0),
  new Vector(0, -1),
  new Vector(0, 1),
  // diagonal
  new Vector(-1, -1),
  new Vector(-1, 1),
  new Vector(1, -1),
  new Vector(1, 1),
];

function isAccessibleRoll(grid: Grid, location: Vector): boolean {
  if (grid[location.y][location.x] !== "@") return false;

  const width = grid[0].length;
  const height = grid.length;

  let neighbours = 0;
  for (let direction of directions) {
    const neighbour = location.add(direction);

    if (neighbour.x < 0 || neighbour.x >= width) continue;
    if (neighbour.y < 0 || neighbour.y >= height) continue;

    if (grid[neighbour.y][neighbour.x] === "@") neighbours++;
  }

  return neighbours < 4;
}

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let sum = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isAccessibleRoll(input, new Vector(x, y))) {
        sum++;
      }
    }
  }

  return sum;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
