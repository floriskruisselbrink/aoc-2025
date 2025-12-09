export default class Vector {
  public readonly x: number;
  public readonly y: number;

  public static of(str: string): Vector {
    const [x, y] = str.split(",");
    return new Vector(Number(x), Number(y));
  }

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  public subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  public *neighbours(): Generator<Vector> {
    yield new Vector(this.x - 1, this.y);
    yield new Vector(this.x, this.y - 1);
    yield new Vector(this.x + 1, this.y);
    yield new Vector(this.x, this.y + 1);
  }

  public *allNeighbours(): Generator<Vector> {
    yield* this.neighbours();
    yield new Vector(this.x - 1, this.y - 1);
    yield new Vector(this.x - 1, this.y + 1);
    yield new Vector(this.x + 1, this.y - 1);
    yield new Vector(this.x + 1, this.y + 1);
  }

  public toString() {
    return `${this.x},${this.y}`;
  }
}
