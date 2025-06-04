import { Orientation } from "../Types/ship.types";

class Ship {
  private hitCount: number;
  private readonly _length: number;
  protected _orientation: Orientation;

  constructor(length: number, orientation = Orientation.HORIZONTAL) {
    this._length = length;
    this.hitCount = 0;
    this._orientation = orientation;
  }

  /*
   * @returns void
   */
  hit(): void {
    this.hitCount++;
  }

  /*
   * @returns number
   */
  get health(): number {
    return this._length - this.hitCount;
  }

  /*
   * @returns number
   */
  get length(): number {
    return this._length;
  }

  /*
   * @returns Orientation - determines whether ship is horizontal or vertical
   */
  get orientation(): Orientation {
    return this._orientation;
  }

  set orientation(param: Orientation) {
    this._orientation = param;
  }

  /*
   * @returns boolean
   */
  isSunk(): boolean {
    return this.hitCount >= this._length;
  }
}

class Carrier extends Ship {
  constructor() {
    super(5);
  }
}

class Battleship extends Ship {
  constructor() {
    super(4);
  }
}

class Cruiser extends Ship {
  constructor() {
    super(3);
  }
}

class Submarine extends Ship {
  constructor() {
    super(3);
  }
}

class Destroyer extends Ship {
  constructor() {
    super(2);
  }
}

export { Ship, Cruiser, Carrier, Battleship, Submarine, Destroyer };
