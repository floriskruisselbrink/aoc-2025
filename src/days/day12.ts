class Puzzle {
  readonly size: number;
  readonly counts: number[];

  constructor(str: string) {
    const [size, counts] = str.split(": ");
    const [width, height] = size.split("x").map(Number);
    this.size = width * height;
    this.counts = counts.split(" ").map(Number);
  }
}

const parseInput = (rawInput: string): [number[], Puzzle[]] => {
  const shapes = rawInput.trimEnd().split("\n\n");
  const puzzles = shapes.splice(-1, 1)[0];
  return [
    shapes.map((s) => (s.match(/\#/g) || []).length),
    puzzles.split("\n").map((p) => new Puzzle(p)),
  ];
};

export function part1(rawInput: string) {
  const [shapes, puzzles] = parseInput(rawInput);

  let result = 0;
  for (let puzzle of puzzles) {
    const shapesSize = puzzle.counts
      .map((count, i) => count * shapes[i])
      .reduce((sum, current) => sum + current, 0);

    if (shapesSize <= puzzle.size) result++;
  }

  return result;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "Free Bonus Star";
}
