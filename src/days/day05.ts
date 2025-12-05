type Range = [number, number];

const parseInput = (rawInput: string) => {
  let [ranges, ingredients] = rawInput.split("\n\n");

  return [
    deduplicateRanges(
      ranges
        .split("\n")
        .map((r) => r.split("-").map(Number))
        .toSorted((a, b) => a[0] - b[0]),
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

export function part1(rawInput: string) {
  const [ranges, ingredients] = parseInput(rawInput);

  let count = 0;

  for (let ingredient of ingredients) {
    for (let range of ranges) {
      if (range[0] <= ingredient && ingredient <= range[1]) {
        count++;
        continue;
      }
    }
  }

  return count;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
