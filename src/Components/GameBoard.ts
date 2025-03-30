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

  placeShip(ship: Ship, coordd: Coordinate): void {
    const coorddinates = HelperFunction.calculateCoordinates(
      coordd,
      ship.length,
      ship.direction,
    );
    if (coorddinates.some((c) => HelperFunction.isOutOfBounds(c))) {
      throw new Error("Ship placement out of bounds");
    }
    if (!HelperFunction.areCoordinatesEmpty(this._board, coorddinates)) {
      throw new Error("Invalid Coordinate: Ship already found");
    }
    for (const [x, y] of coorddinates) {
      this._board[x][y] = ship;
    }
    this._ships.push(ship);
  }

  recieveAttack(coord: Coordinate): string {
    if (HelperFunction.isOutOfBounds(coord)) {
      throw new Error("Attack out of bounds");
    }
    const [x, y] = coord;
    if (HelperFunction.areCoordinatesEmpty(this.board, [coord])) {
      this.board[x][y] = CellState.Miss;
      return `Missed at [${x}, ${y}]`;
    }
    if (HelperFunction.containsShip(this.board, [coord])) {
      const ship = this.board[x][y] as Ship; // Cast the cell to Ship
      ship.hit();
      const result = ship.isSunk() ? "Hit and sunk!" : "Hit!";
      return this.allShipsSunk() ? `${result} - Game Over!` : result;
    }
    return "Invalid Move";
  }
}

export { GameBoard };
