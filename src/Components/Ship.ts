import { ShipInterface } from "../Types/GameTypes";

class Ship implements ShipInterface {
  //instance variables (unique for each ship object)
  private hitCount: number;
  private readonly _length: number;
  private _direction: string;

  constructor(length: number, _direction = "Horizontal") {
    this._length = length;
    this.hitCount = 0;
    if (_direction !== "Horizontal" && _direction !== "Vertical") {
      throw new Error("Invalid direction. Must be 'Horizontal' or 'Vertical'");
    }

    this._direction = _direction;
  }

  hit(): void {
    this.hitCount++;
  }

  maneuver(): string {
    return (this._direction =
      this._direction === "Horizontal" ? "Vertical" : "Horizontal");
  }

  isSunk(): boolean {
    return this.hitCount >= this.length;
  }

  get health(): number {
    return this.length - this.hitCount;
  }

  get direction(): string {
    return this._direction;
  }

  get length(): number {
    return this._length;
  }
}
class Carrier extends Ship {
  constructor(direction = "Horizontal") {
    super(5, direction);
  }
}
class Battleship extends Ship {
  constructor(direction = "Horizontal") {
    super(4, direction);
  }
}
class Cruiser extends Ship {
  constructor(direction = "Horizontal") {
    super(3, direction);
  }
}
class Submarine extends Ship {
  constructor(direction = "Horizontal") {
    super(3, direction);
  }
}
class Destroyer extends Ship {
  constructor(direction = "Horizontal") {
    super(2, direction);
  }
}

export { Ship };
