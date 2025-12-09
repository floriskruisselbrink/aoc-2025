import Vector from "../utils/Vector.ts";

const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => Vector.of(line));

class Line {
  readonly a: Vector;
  readonly b: Vector;

  constructor(a: Vector, b: Vector) {
    this.a = new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.b = new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y));
  }
}

class Rectangle {
  readonly topLeft: Vector;
  readonly bottomRight: Vector;
  readonly size: number;

  constructor(a: Vector, b: Vector) {
    this.topLeft = new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y));
    this.bottomRight = new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y));
    this.size =
      (this.bottomRight.x - this.topLeft.x + 1) *
      (this.bottomRight.y - this.topLeft.y + 1);
  }

  intersectsLine = (line: Line): boolean =>
    this.topLeft.x < line.b.x &&
    this.bottomRight.x > line.a.x &&
    this.topLeft.y < line.b.y &&
    this.bottomRight.y > line.a.y;

  intersectsPolygon = (edges: Line[]): boolean =>
    edges.some((edge) => this.intersectsLine(edge));
}

function calculateRectangles(coordinates: Vector[]): Rectangle[] {
  return coordinates
    .flatMap((a, i) => coordinates.slice(i + 1).map((b) => new Rectangle(a, b)))
    .toSorted((a, b) => b.size - a.size);
}

function createPolygon(coordinates: Vector[]): Line[] {
  return coordinates.map(
    (a, i) =>
      new Line(
        a,
        i < coordinates.length - 1 ? coordinates[i + 1] : coordinates[0],
      ),
  );
}

export function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return calculateRectangles(input)[0].size;
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  const rectangles = calculateRectangles(input);
  const polygon = createPolygon(input);

  return rectangles.find((rectangle) => !rectangle.intersectsPolygon(polygon))
    ?.size;
}
