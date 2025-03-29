import {
  BoardCell,
  GameBoardInterface,
  Coordinate,
  CellState,
} from "../Types/GameTypes";

import { HelperFunction } from "../Util/Helper";
import { Ship } from "./Ship";

class GameBoard implements GameBoardInterface {
  private _board: BoardCell[][];
  private _ships: Ship[] = [];

  constructor() {
    this._board = Array.from({ length: 10 }, () =>
      Array(10).fill(CellState.Empty),
    );
  }

  get board(): BoardCell[][] {
    return this._board;
  }

  allShipsSunk(): boolean {
    return this._ships.every((ship) => ship.isSunk());
  }

  placeShip(ship: Ship, coord: Coordinate): void {
    if (ship.direction !== "Horizontal" && ship.direction !== "Vertical") {
      throw new Error("Invalid direction. Must be 'Horizontal' or 'Vertical'");
    }
    // Calculate coordinates based on ship's direction
    const coordinates = HelperFunction.calculateCoordinates(
      coord,
      ship.length,
      ship.direction,
    );

    if (HelperFunction.validateCoordinate(this.board, coordinates)) {
      for (const [a, b] of coordinates) {
        this.board[a][b] = ship;
      }
      this._ships.push(ship);
    }
  }

  recieveAttack(coord: Coordinate): string {
    const [x, y] = coord;

    // Validate bounds
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Attack out of bounds");
    }
    const cell = this.board[x][y];
    if (cell === CellState.Empty) {
      this.board[x][y] = CellState.Miss;
      return `Missed at [${x}, ${y}]`;
    }
    if (cell instanceof Ship) {
      cell.hit();
      const result = cell.isSunk() ? "Hit and sunk!" : "Hit!";

      // Check for game over after each attack
      if (this.allShipsSunk()) {
        return `${result} - Game Over!`;
      }
      return result;
    }
    return "Already attacked here!";
  }
}

export { GameBoard };
