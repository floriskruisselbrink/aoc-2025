import type { Testcase } from "../types.ts";

class Dial {
  pointer = 50;
  hitZero = 0;
  passesZero = 0;

  private logRotation(count: number, passes: number) {
    return;
    if (passes > 0) {
      console.log(
        `The dial is rotated ${count} to point at ${this.pointer}; during this rotation, it points at zero ${passes} times.`,
      );
    } else {
      console.log(`The dial is rotated ${count} to point at ${this.pointer}`);
    }
  }

  private rotate(count: number) {
    const partialRotation = count % 100;
    let fullRotations = Math.floor(Math.abs(count) / 100);

    const newPointer = this.pointer + partialRotation;
    if (newPointer === 0 || newPointer === 100) {
      this.passesZero += fullRotations;
      this.hitZero += 1;
      this.pointer = 0;
      this.logRotation(count, fullRotations);
    } else if (newPointer > 0 && newPointer < 100) {
      this.passesZero += fullRotations;
      this.pointer = newPointer;
      this.logRotation(count, fullRotations);
    } else if (newPointer < 0 || newPointer > 100) {
      if (this.pointer !== 0) fullRotations++;
      this.passesZero = this.passesZero + fullRotations;
      this.pointer = (newPointer + 100) % 100;
      this.logRotation(count, fullRotations);
    } else {
      throw "Huh?";
    }
  }

  rotateLeft(count: number) {
    return this.rotate(count * -1);
  }

  rotateRight(count: number) {
    return this.rotate(count);
  }
}

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/g).map((row) => {
    const dir = row[0];
    const count = Number(row.slice(1));
    return { dir, count };
  });

export const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const dial = new Dial();

  for (let { dir, count } of input) {
    if (dir === "L") {
      dial.rotateLeft(count);
    } else if (dir === "R") {
      dial.rotateRight(count);
    }
  }

  return dial.hitZero;
};

export const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const dial = new Dial();

  for (let { dir, count } of input) {
    if (dir === "L") {
      dial.rotateLeft(count);
    } else if (dir === "R") {
      dial.rotateRight(count);
    }
  }

  return dial.hitZero + dial.passesZero;
};

export const testcases: Testcase[] = [
  {
    input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
    expectedOutput1: "3",
    expectedOutput2: "6",
  },
];
