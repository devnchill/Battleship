export class InvalidCoordinateError extends Error {
  constructor(coordinate: string) {
    super(`Invalid coordinate: ${coordinate}`);
    this.name = "InvalidCoordinateError";
  }
}

export class ShipOverlapError extends Error {
  constructor(coordinate: string) {
    super(`Cannot place ship at coordinate: ${coordinate} — already occupied.`);
    this.name = "ShipOverlapError";
  }
}

export class AlreadyAttackedError extends Error {
  constructor(coordinate: string) {
    super(`Coordinate ${coordinate} has already been attacked.`);
    this.name = "AlreadyAttackedError";
  }
}
