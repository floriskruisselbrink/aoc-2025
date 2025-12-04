export default class Vector {
  public readonly x: number;
  public readonly y: number;

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

  public toString() {
    return `${this.x},${this.y}`;
  }
}
