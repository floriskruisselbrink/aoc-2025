import Vector from "../utils/Vector.ts";

const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => Vector.of(line));

function rectangleSize(a: Vector, b: Vector): number {
  return (
    (Math.max(a.x, b.x) - Math.min(a.x, b.x) + 1) *
    (Math.max(a.y, b.y) - Math.min(a.y, b.y) + 1)
  );
}

class Line {
  readonly a: Vector;
  readonly b: Vector;

  constructor(a: Vector, b: Vector) {
    this.a = a;
    this.b = b;
  }

  intersects(other: Line): boolean {
    return true; // TODO:
  }
}

class Rectangle {
  readonly topLeft: Vector;
  readonly bottomRight: Vector;
  readonly size: number;

  constructor(a: Vector, b: Vector) {
    this.size = rectangleSize(a, b);

    const x1 = Math.min(a.x, b.x);
    const x2 = Math.max(a.x, b.x);
    const y1 = Math.min(a.y, b.y);
    const y2 = Math.max(a.y, b.y);
    this.topLeft = new Vector(x1, y1);
    this.bottomRight = new Vector(x2, y2);
  }

  intersectsLine(line: Line): boolean {
    const x1 = Math.min(line.a.x, line.b.x);
    const x2 = Math.max(line.a.x, line.b.x);
    const y1 = Math.min(line.a.y, line.b.y);
    const y2 = Math.max(line.a.y, line.b.y);

    return (
      this.topLeft.x < x2 &&
      this.bottomRight.x > x1 &&
      this.topLeft.y < y2 &&
      this.bottomRight.y > y1
    );
  }

  intersectsPolygon(edges: Line[]): boolean {
    for (let edge of edges) {
      if (this.intersectsLine(edge)) return true;
    }
    return false;
  }
}

function calculateRectangles(coordinates: Vector[]): Rectangle[] {
  return coordinates
    .flatMap((a, i) => coordinates.slice(i + 1).map((b) => new Rectangle(a, b)))
    .toSorted((a, b) => b.size - a.size);
}

function createPolygon(coordinates: Vector[]): Line[] {
  return coordinates.flatMap(
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

  // TODO: find first rectangle that doesn't go outside the polygon sketched by the input coordinates
  for (let rectangle of rectangles) {
    if (!rectangle.intersectsPolygon(polygon)) {
      return rectangle.size;
    }
  }

  return 0;
}
