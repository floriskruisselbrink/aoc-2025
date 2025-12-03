type Range = {
  firstId: bigint;
  lastId: bigint;
};

const parseInput = (rawInput: string): Range[] =>
  rawInput.split(",").map((str) => {
    const [a, b] = str.split("-", 2);
    return { firstId: BigInt(a), lastId: BigInt(b) };
  });

function* generateSequencesPart1(range: Range): Generator<string> {
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

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let sum = BigInt(0);

  for (let range of input) {
    for (let sequence of generateSequencesPart1(range)) {
      const number = BigInt(sequence + sequence);
      if (range.firstId <= number && number <= range.lastId) {
        //console.log("Illegal id found:", number.toString());
        sum += number;
      }
    }
  }

  return sum.toString();
}

function* generateSequences(length: number): Generator<string> {
  let sequence = BigInt("10000000000000000000".slice(0, length));
  while (sequence.toString().length === length) {
    yield sequence.toString();
    sequence++;
  }
}

function* generateSequencesPart2(range: Range): Generator<string> {
  const minLength = 1;
  const maxLength = Math.floor(range.lastId.toString().length / 2);

  for (let length = minLength; length <= maxLength; length++) {
    yield* generateSequences(length);
  }
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  let illegalIds = new Set<bigint>();

  for (let range of input) {
    const minLength = range.firstId.toString().length;
    const maxLength = range.lastId.toString().length;

    for (let sequence of generateSequencesPart2(range)) {
      let id = sequence;
      while (id.length < maxLength) {
        id += sequence;

        if (id.length >= minLength) {
          const number = BigInt(id);

          if (range.firstId <= number && number <= range.lastId) {
            if (!illegalIds.has(number)) {
              //console.log("Illegal id found:", id);
              illegalIds.add(number);
            }
          }
        }
      }
    }
  }

  return illegalIds
    .values()
    .reduce((sum, id) => sum + id)
    .toString();
}
