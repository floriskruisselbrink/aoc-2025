import type { Puzzle } from "./types.ts";
import readFile from "./utils/readFile.ts";

const AOC_SESSION_KEY = process.env.AOC_SESSION_KEY;
if (!AOC_SESSION_KEY) {
  console.error("AOC_SESSION_KEY not set in environment!");
  process.exit(1);
}

const args = process.argv.slice(2);
const dayToSolve = args[0].padStart(2, "0");

if (!dayToSolve) {
  console.error("No day specified, run with pnpm run dev {day}");
  process.exit(1);
}

try {
  const puzzlePath = `./days/day${dayToSolve}.ts`;
  const { part1, part2 }: Puzzle = await import(puzzlePath);

  const inputPath = `./src/days/day${dayToSolve}-input.txt`;
  const input = await readFile(inputPath);

  console.log(`--- Day ${dayToSolve} ---`);
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
} catch (error) {
  console.error(error);
  process.exit(1);
}
