class Ship {
  private hitCount: number;
  private readonly length: number;

  constructor(length: number) {
    this.length = length;
    this.hitCount = 0;
  }

  hit(): void {
    this.hitCount++;
  }

  get health(): number {
    return this.length - this.hitCount;
  }

  isSunk(): boolean {
    return this.hitCount >= this.length;
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
