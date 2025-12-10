type Light = number;
type Button = number;
type Machine = {
  lights: Light;
  buttons: Button[];
  joltage: number[];
};

const lightBitmask = (light: string): Light =>
  light
    .split("")
    .reduce(
      (mask, value, index) => mask + ((value == "#" ? 1 : 0) << index),
      0,
    );

const buttonMask = (button: string): Button =>
  button
    .split(",")
    .map(Number)
    .reduce((mask, btn) => mask + (1 << btn), 0);

const parseInput = (rawInput: string): Machine[] =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ");
      const lights = lightBitmask(parts.splice(0, 1)[0].slice(1, -1));
      const joltage = parts.splice(-1)[0].slice(1, -1).split(",").map(Number);
      const buttons = parts.map((btn) => buttonMask(btn.slice(1, -1)));

      return {
        lights,
        buttons,
        joltage,
      };
    });

function solveBfs(machine: Machine): number {
  // BFS to find the minimal button presses needed
  let current = 0;
  const visited = new Map<Light, number>([[current, 0]]);
  const queue = [current];

  while (queue.length > 0) {
    current = queue.shift()!;
    const times = visited.get(current)! + 1;

    for (let btn of machine.buttons) {
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
  return input.reduce((sum, machine) => sum + solveBfs(machine), 0);
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
