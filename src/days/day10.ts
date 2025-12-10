import { init as initZ3, type Arith, type ContextCtor } from "z3-solver";

type Light = number;
type ButtonMask = number;
type Machine = {
  lights: Light;
  buttons: number[][];
  buttonMask: ButtonMask[];
  joltage: number[];
};

const lightBitmask = (light: string): Light =>
  light
    .split("")
    .reduce(
      (mask, value, index) => mask + ((value == "#" ? 1 : 0) << index),
      0,
    );

const createButtonMask = (button: number[]): ButtonMask =>
  button.reduce((mask, btn) => mask + (1 << btn), 0);

const parseInput = (rawInput: string): Machine[] =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ");
      const lights = lightBitmask(parts.splice(0, 1)[0].slice(1, -1));
      const joltage = parts.splice(-1)[0].slice(1, -1).split(",").map(Number);
      const buttons = parts.map((s) => s.slice(1, -1).split(",").map(Number));
      const buttonMask = buttons.map((btn) => createButtonMask(btn));

      return {
        lights,
        buttons,
        buttonMask,
        joltage,
      };
    });

function solveLights(machine: Machine): number {
  // BFS to find the minimal button presses needed
  let current = 0;
  const visited = new Map<Light, number>([[current, 0]]);
  const queue = [current];

  while (queue.length > 0) {
    current = queue.shift()!;
    const times = visited.get(current)! + 1;

    for (let btn of machine.buttonMask) {
      const next = current ^ btn;

      if (!visited.has(next)) {
        if (next == machine.lights) {
          return times;
        }
        visited.set(next, times);
        queue.push(next);
      }
    }
  }

  throw "No solution found";
}

export function part1(rawInput: string) {
  const input = parseInput(rawInput);
  return input.reduce((sum, machine) => sum + solveLights(machine), 0);
}

async function solveJoltage(
  z3Context: ContextCtor,
  machine: Machine,
): Promise<number> {
  const { Optimize, Int } = z3Context("main");

  const optimizer = new Optimize();

  const buttonVars: Arith<"main">[] = [];
  for (let i = 0; i < machine.buttons.length; i++) {
    const button = Int.const(`button_${i}`);
    buttonVars.push(button);
    optimizer.add(button.ge(0));
  }

  for (let j = 0; j < machine.joltage.length; j++) {
    const target = machine.joltage[j];
    const buttons: Arith<"main">[] = [];
    for (let b = 0; b < machine.buttons.length; b++) {
      if (machine.buttons[b].includes(j)) {
        buttons.push(buttonVars[b]);
      }
    }
    if (buttons.length > 0) {
      const sum = buttons.reduce((acc, val) => acc.add(val));
      optimizer.add(sum.eq(target));
    }
  }

  const total = buttonVars.reduce((acc, val) => acc.add(val));

  optimizer.minimize(total);

  const sat = await optimizer.check();

  if (sat === "sat") {
    const model = optimizer.model();
    const resultButtons = buttonVars.map((btn) => model.get(btn).sexpr());
    return resultButtons.map(Number).reduce((a, b) => a + b);
  } else {
    throw "No solution";
  }
}

export async function part2(rawInput: string) {
  const input = parseInput(rawInput);

  const { Context } = await initZ3();

  let sum = 0;
  for (let machine of input) {
    sum += await solveJoltage(Context, machine);
  }

  return sum;
}
