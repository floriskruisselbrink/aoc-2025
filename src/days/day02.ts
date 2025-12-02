type Range = {
  firstId: bigint;
  lastId: bigint;
};

const parseInput = (rawInput: string): Range[] =>
  rawInput.split(",").map((str) => {
    const [a, b] = str.split("-", 2);
    return { firstId: BigInt(a), lastId: BigInt(b) };
  });

function* generateSequencesInRange(range: Range) {
  let minLength = range.firstId.toString().length;
  let maxLength = range.lastId.toString().length;

  // alleen indien lengte van ids even is kunnen we sequences genereren
  if (minLength % 2 != 0) minLength++;
  if (maxLength % 2 != 0) maxLength--;
  if (minLength > maxLength) return;
  if (minLength != maxLength) {
    // aanname dat ranges altijd ongeveer even lang zijn en er sowieso maar 1 lengte even is.
    throw "minLength != maxLength";
  }

  const startSequence = BigInt("100000000000000000".slice(0, minLength / 2));
  const endSequence = BigInt("999999999999999999".slice(0, minLength / 2));

  let sequence = startSequence;
  while (sequence <= endSequence) {
    yield sequence.toString();
    sequence++;
  }
}

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = BigInt(0);

  for (let range of input) {
    for (let sequence of generateSequencesInRange(range)) {
      const number = BigInt(sequence + sequence);
      if (range.firstId <= number && number <= range.lastId) {
        //console.log("Illegal id found:", number.toString());
        sum += number;
      }
    }
  }

  return sum.toString();
};

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return "0";
};
