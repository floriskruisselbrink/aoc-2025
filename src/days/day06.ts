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
  const input = rawInput.trimEnd().split("\n");

  let operators = input.pop()!.split(/\s+/);
  let results = Array<bigint>(operators.length);
  for (let [i, operator] of operators.entries()) {
    if (operator == "+") {
      results[i] = 0n;
    } else if ((operator = "*")) {
      results[i] = 1n;
    } else {
      throw "Illegal operator: " + operator;
    }
  }

  for (let i = input[0].length - 1; i >= 0; i--) {
    let number = 0;
    for (let line of input) {
      if (line[i] != " ") {
        number = number * 10 + Number(line[i]);
      }
    }

    if (number != 0) {
      const operator = operators[operators.length - 1];
      if (operator == "+") {
        results[operators.length - 1] += BigInt(number);
      } else {
        results[operators.length - 1] *= BigInt(number);
      }
    } else {
      operators.pop();
    }
  }

  return results.reduce((sum, value) => sum + value, 0n);
}
