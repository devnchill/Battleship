import { ICell } from "../Types/board.types";
import { Coordinates } from "../Types/common.types";
import { ShipOverlapError, InvalidCoordinateError } from "./error";

function isValidCoordinate([x, y]: Coordinates): boolean {
  return x >= 0 && x < 10 && y >= 0 && y < 10;
}

function validateCoordinate(coor: Coordinates): void {
  if (!isValidCoordinate(coor)) {
    throw new InvalidCoordinateError(
      `Invalid coordinate: (${coor[0]}, ${coor[1]})`,
    );
  }
}

function validateNoOverlap(board: ICell[][], coords: Coordinates[]): void {
  for (const [x, y] of coords) {
    const cell = board[x][y];
    if (cell.hasShip) {
      throw new ShipOverlapError(
        `Cannot place ship on (${x}, ${y}) — already occupied.`,
      );
    }
  }
}

export { validateCoordinate, validateNoOverlap };
