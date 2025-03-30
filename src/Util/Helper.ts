import {
  BoardCell,
  CellState,
  Coordinate,
  Direction,
} from "../Types/GameTypes";
import {
  Carrier,
  Cruiser,
  Battleship,
  Submarine,
  Destroyer,
} from "../Components/Ship";
import { Ship } from "../Components/Ship";

class HelperFunction {
  /**
   * Check if coorddinates are out of bounds.
   */
  static isOutOfBounds(coord: Coordinate): boolean {
    const [x, y] = coord;
    return x < 0 || x >= 10 || y < 0 || y >= 10;
  }

  /**
   * Check if all coorddinates in the array are empty.
   */
  static areCoordinatesEmpty(
    board: BoardCell[][],
    coorddinates: Coordinate[],
  ): boolean {
    return coorddinates.every(([x, y]) => board[x][y] === CellState.Empty);
  }

  /**
   * Check if any of the given coorddinates contain a ship.
   */
  static containsShip(
    board: BoardCell[][],
    coorddinates: Coordinate[],
  ): boolean {
    return coorddinates.some(
      ([x, y]) =>
        board[x][y] !== CellState.Empty && board[x][y] !== CellState.Miss,
    );
  }

  /**
   * Generate an array of coorddinates based on the start point, length, and direction.
   */
  static calculateCoordinates(
    start: Coordinate,
    length: number,
    direction: string,
  ): Coordinate[] {
    const [x, y] = start;
    if (
      direction !== Direction.Horizontal &&
      direction !== Direction.Vertical
    ) {
      throw new Error("Invalid direction. Must be 'Horizontal' or 'Vertical'");
    }
    return Array.from({ length }, (_, i) =>
      direction === Direction.Horizontal ? [x, y + i] : [x + i, y],
    );
  }

  static getRandomCoordinate(): Coordinate {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  static deployShips(): Ship[] {
    return [
      new Carrier(),
      new Destroyer(),
      new Cruiser(),
      new Submarine(),
      new Battleship(),
    ];
  }
}

export { HelperFunction };
