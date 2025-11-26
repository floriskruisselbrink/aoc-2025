import { copyFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const day = args[0];

if (!day) {
  console.error("Please run with the day to bootstrap, i.e. pnpm init-day 1");
  process.exit(1);
}

console.log(`Creating template for day ${day}`);

const sourceFile = "templates/dayXX.ts";
const targetFile = `src/days/day${day.padStart(2, "0")}.ts`;

if (!existsSync(sourceFile)) {
  console.error(`${sourceFile} does not exist, cannot init day ${day}`);
  process.exit(1);
}

if (existsSync(targetFile)) {
  console.log(`day ${day} already exists`);
  process.exit(0);
}

copyFileSync(sourceFile, targetFile);
