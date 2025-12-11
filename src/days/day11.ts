type Graph = Map<string, string[]>;

const parseInput = (rawInput: string): Graph =>
  new Map<string, string[]>(
    rawInput
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [device, outputs] = line.split(": ");
        return [device, outputs.split(" ")];
      }),
  );

function dfs(graph: Graph, start: string, destination: string): number {
  const memo = new Map<string, number>();

  const dfs_recursive = (current: string): number => {
    if (current === destination) {
      return 1;
    }
    if (memo.has(current)) {
      return memo.get(current)!;
    }

    const count = (graph.get(current) ?? []).reduce(
      (sum, output) => sum + dfs_recursive(output),
      0,
    );
    memo.set(current, count);
    return count;
  };

  return dfs_recursive(start);
}

export function part1(rawInput: string) {
  const graph = parseInput(rawInput);

  return dfs(graph, "you", "out");
}

export function part2(rawInput: string) {
  const graph = parseInput(rawInput);

  return (
    // first fft, then dac
    dfs(graph, "svr", "fft") *
      dfs(graph, "fft", "dac") *
      dfs(graph, "dac", "out") +
    // first dac, then fft
    dfs(graph, "svr", "dac") *
      dfs(graph, "dac", "fft") *
      dfs(graph, "fft", "out")
  );
}
