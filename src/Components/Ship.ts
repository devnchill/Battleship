import { ShipInterface } from "../Types/GameTypes";

class Ship implements ShipInterface {
  //instance variables (unique for each ship object)
  private hitCount: number;
  private readonly length: number;
  private readonly __direction__: string;

  constructor(length: number, __direction = "horizontal") {
    this.length = length;
    this.hitCount = 0;
    this.__direction__ = __direction;
  }

  hit(): void {
    this.hitCount++;
  }

  get health(): number {
    return this.length - this.hitCount;
  }

  get direction(): string {
    return this.__direction__;
  }

  isSunk(): boolean {
    return this.hitCount >= this.length;
  }
}
class Carrier extends Ship {
  constructor(direction = "horizontal") {
    super(5, direction);
  }
}
class Battleship extends Ship {
  constructor(direction = "horizontal") {
    super(4, direction);
  }
}
class Cruiser extends Ship {
  constructor(direction = "horizontal") {
    super(3, direction);
  }
}
class Submarine extends Ship {
  constructor(direction = "horizontal") {
    super(3, direction);
  }
}
class Destroyer extends Ship {
  constructor(direction = "horizontal") {
    super(2, direction);
  }
}

export { Ship };
