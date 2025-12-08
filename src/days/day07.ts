const parseInput = (rawInput: string) => rawInput.trimEnd().split("\n");

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  const start = input[0].indexOf("S");

  let splits = 0;
  let beams = new Set<number>();
  beams.add(start);

  for (let line of input.slice(1)) {
    const newBeams = new Set<number>();
    for (let beam of beams) {
      if (line[beam] == "^") {
        splits++;
        newBeams.add(beam - 1);
        newBeams.add(beam + 1);
      } else {
        newBeams.add(beam);
      }
    }
    beams = newBeams;
  }

  return splits;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return 40;
}
