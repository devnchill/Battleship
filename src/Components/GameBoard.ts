import type { ICell } from "../Types/board.types";
import { CellState } from "../Types/board.types";
import { Coordinates } from "../Types/common.types";
import { Ship } from "./Ship";

class GameBoard {
  private _board: ICell[][];
  private _ships: Set<Ship>;

  constructor() {
    this._board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        state: CellState.EMPTY,
      })),
    );
    this._ships = new Set();
  }

  get board() {
    return this._board;
  }

  isAllShipsSunk() {
    return [...this._ships].every((ship) => ship.isSunk());
  }

  recieveAttack(coor: Coordinates) {
    const board = this.board;
    const [x, y] = coor;
    if (board[x][y].state == CellState.EMPTY)
      board[x][y].state = CellState.MISSED;
    if (board[x][y].ship) {
      board[x][y].state = CellState.HIT;
      const ship = board[x][y].ship;
      ship.hit();
      if (ship.isSunk()) {
        //TODO: handle this case nicely later
        return "Ship Sunk";
      }
    }
  }
}

export { GameBoard };
