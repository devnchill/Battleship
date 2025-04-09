import type { ICell } from "../Types/board.types";
import { CellState } from "../Types/board.types";
import { Coordinates } from "../Types/common.types";
import { Direction } from "../Types/ship.types";
import { Ship } from "./Ship";

class GameBoard {
  private _board: ICell[][];
  ships: Set<Ship>;

  constructor() {
    this._board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        state: CellState.UNTOUCHED,
        hasShip: false,
      })),
    );
    this.ships = new Set();
  }

  isAllShipsSunk() {
    return [...this.ships].every((ship) => ship.isSunk());
  }

  get getBoard() {
    return this._board;
  }

  placeShip(ship: Ship, coor: Coordinates) {
    const [x, y] = coor;
    const lengthOfShip = ship.health;
    const orientation = ship.orientation;
    const arrOfCoor: Coordinates[] = [];
    if (orientation == Direction.HORIZONTAL) {
      let count = 0;
      while (count < lengthOfShip) {
        arrOfCoor.push([x, y + count]);
        count++;
      }
    } else {
      let count = 0;
      while (count < lengthOfShip) {
        arrOfCoor.push([x + count, y]);
        count++;
      }
    }
    const board = this.getBoard;
    for (const c of arrOfCoor) {
      const [a, b] = c;
      board[a][b].ship = ship;
      board[a][b].state = CellState.UNTOUCHED;
      board[a][b].hasShip = true;
    }
  }

  recieveAttack(coor: Coordinates) {
    const board = this._board;
    const [x, y] = coor;
    if (board[x][y].state == CellState.UNTOUCHED)
      board[x][y].state = CellState.MISSED;
    if (board[x][y].ship) {
      board[x][y].state = CellState.HIT;
      const ship = board[x][y].ship;
      ship.hit();
      if (ship.isSunk()) {
        //TODO: handle this case nicely later
        return;
      }
    }
  }
}

export { GameBoard };
