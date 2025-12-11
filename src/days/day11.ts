type Device = [string, string[]];

const parseInput = (rawInput: string): Device[] =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => {
      const [device, outputs] = line.split(": ");
      return [device, outputs.split(" ")];
    });

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  const graph = new Map<string, string[]>(input);
  // console.log(graph);

  let allPaths = 0;
  const queue = new Array<string[]>();
  queue.push(["you"]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === "out") {
      // console.log("Found path", path);
      allPaths++;
    }

    for (const output of graph.get(current) ?? []) {
      const newPath = [...path, output];
      queue.push(newPath);
    }
  }

  return allPaths;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
