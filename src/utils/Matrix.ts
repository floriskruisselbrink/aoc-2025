import Vector from "./Vector.ts";

export default class Matrix {
  private _values: number[][];
  private _height: number;
  private _width: number;

  public static of(values: number[][]): Matrix {
    const height = values.length;
    const width = values[0].length;

    return new Matrix(height, width, values);
  }

  constructor(height: number, width: number, values?: number[][]) {
    this._height = height;
    this._width = width;

    // init with all zeroes
    this._values = new Array<number[]>(this._height)
      .fill([])
      .map(() => new Array<number>(this._width).fill(0));

    if (values) this.values = values;
  }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }

  get values(): number[][] {
    return this._values;
  }

  set values(newValues: number[][]) {
    const minHeight = Math.min(newValues.length, this.height);
    const minWidth = Math.min(newValues[0].length, this.width);

    for (let y = 0; y < minHeight; y++) {
      for (let x = 0; x < minWidth; x++) {
        this.values[y][x] = newValues[y][x];
      }
    }
  }

  public at(location: Vector): number {
    return this.values[location.y][location.x];
  }

  public update(location: Vector, newValue: number) {
    this.values[location.y][location.x] = newValue;
  }

  public forEach(callbackFn: (value: number, location: Vector) => void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const location = new Vector(x, y);
        callbackFn(this.at(location), location);
      }
    }
  }
}
