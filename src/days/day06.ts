const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => line.trim().split(/\s+/));

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let results = Array<bigint>(input[0].length);
  let operators = input.pop()!;
  for (let [i, operator] of operators.entries()) {
    if (operator == "+") {
      results[i] = 0n;
    } else if ((operator = "*")) {
      results[i] = 1n;
    } else {
      throw "Illegal operator: " + operator;
    }
  }

  for (let line of input) {
    for (let [i, value] of line.entries()) {
      if (operators[i] == "+") {
        results[i] += BigInt(value);
      } else {
        results[i] *= BigInt(value);
      }
    }
  }

  return results.reduce((sum, value) => sum + value, 0n);
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
