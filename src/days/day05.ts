type Range = [number, number];

const parseInput = (rawInput: string): [Range[], number[]] => {
  let [ranges, ingredients] = rawInput.split("\n\n");

  return [
    deduplicateRanges(
      ranges
        .split("\n")
        .map((r) => r.split("-").map(Number))
        .toSorted((a, b) => a[0] - b[0]) as Range[],
    ),
    ingredients.split("\n").map(Number),
  ];
};

function deduplicateRanges(ranges: Range[]): Range[] {
  const newRanges: Range[] = [];

  let lastRange = [-1, -1];
  for (let range of ranges) {
    // overlaps previous range?
    if (range[0] <= lastRange[1]) {
      lastRange[1] = Math.max(lastRange[1], range[1]);
    } else {
      newRanges.push(range);
      lastRange = range;
    }
  }

  return newRanges;
}

function inRange(ingredient: number, range: Range): boolean {
  return range[0] <= ingredient && ingredient <= range[1];
}

function rangeLength(range: Range): number {
  return range[1] - range[0] + 1;
}

export function part1(rawInput: string) {
  const [ranges, ingredients] = parseInput(rawInput);

  return ingredients.reduce(
    (count, ingredient) =>
      ranges.find((range) => inRange(ingredient, range)) ? count + 1 : count,
    0,
  );
}

export function part2(rawInput: string) {
  const [ranges, _] = parseInput(rawInput);

  return ranges.reduce((length, range) => length + rangeLength(range), 0);
}
