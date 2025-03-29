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

  constructor() {
    this._board = Array.from({ length: 10 }, () =>
      Array(10).fill(CellState.Empty),
    );
  }

  get board(): BoardCell[][] {
    return this._board;
  }

  placeShip(ship: Ship, coord: Coordinate): void {
    const arrOfCoor: Coordinate[] = [];
    const [x, y] = coord;
    const length = ship.length;

    // Calculate coordinates based on ship's direction
    if (ship.direction === "Horizontal") {
      for (let index = 0; index < length; index++) {
        arrOfCoor.push([x, y + index]);
      }
    } else if (ship.direction === "Vertical") {
      for (let index = 0; index < length; index++) {
        arrOfCoor.push([x + index, y]);
      }
    } else {
      throw new Error("Invalid Direction Found. Horizontal|Vertical");
    }

    if (HelperFunction.validateCoordinate(this.board, arrOfCoor)) {
      // Place the ship on the board
      for (const [a, b] of arrOfCoor) {
        this.board[a][b] = ship;
      }
    }
  }

  recieveAttack(): void {
    // TODO:
  }
}

export { GameBoard };
