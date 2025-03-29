import { ShipInterface } from "../Types/GameTypes";

class Ship implements ShipInterface {
  //instance variables (unique for each ship object)
  private hitCount: number;
  private readonly __length__: number;
  private readonly __direction__: string;

  constructor(length: number, __direction = "Horizontal") {
    this.__length__ = length;
    this.hitCount = 0;
    this.__direction__ = __direction;
  }

  hit(): void {
    this.hitCount++;
  }

  isSunk(): boolean {
    return this.hitCount >= this.length;
  }

  get health(): number {
    return this.length - this.hitCount;
  }

  get direction(): string {
    return this.__direction__;
  }

  get length(): number {
    return this.__length__;
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
