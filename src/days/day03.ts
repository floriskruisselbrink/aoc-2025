const parseInput = (rawInput: string) =>
  rawInput.split(/\n/g).filter((s) => /\w+/.test(s));

const findLargestNumber = (
  str: string,
  largestNumber: number,
  position: number = 0,
): number => {
  let number = largestNumber + 1;
  let result = -1;
  while (result < 0 && number > 0) {
    number--;
    //console.log("Trying to find", number, "in", str, position);
    result = str.indexOf(number.toString(), position);
  }

  //if (result >= 0) console.log("Found", number, result);

  return result;
};

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;

  for (let bank of input) {
    let largestNumber = 9;
    let first = -1;
    let second = -1;
    do {
      first = findLargestNumber(bank, largestNumber);
      second = findLargestNumber(bank, 9, first + 1);
      largestNumber--;
      if (largestNumber < 0) throw "Oops";
    } while (first < 0 || second < 0);

    const joltage = Number(bank[first]) * 10 + Number(bank[second]);

    console.log(bank, "has joltage", joltage);
    sum += joltage;
  }
  return sum;
};

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return "0";
};
