import type { ICell } from "../Types/board.types";
import { CellState } from "../Types/board.types";
import { Coordinates } from "../Types/common.types";
import { Direction } from "../Types/ship.types";
import { Ship } from "./Ship";

class GameBoard {
  private _board: ICell[][];
  ships: Set<Ship>;

  constructor() {
    const BOARD_ROWS = 10;
    const BOARD_COLUMNS = 10;
    this._board = Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLUMNS }, () => ({
        state: CellState.UNTOUCHED,
        hasShip: false,
      })),
    );
    this.ships = new Set();
  }

  areAllShipsSunk() {
    return [...this.ships].every((ship) => ship.isSunk());
  }

  get board() {
    return this._board;
  }

  placeShip(ship: Ship, coor: Coordinates) {
    const [x, y] = coor;
    const lengthOfShip = ship.health;
    const orientation = ship.orientation;
    const arrOfCoor: Coordinates[] = [];
    let count = 0;
    if (orientation == Direction.HORIZONTAL) {
      while (count < lengthOfShip) {
        arrOfCoor.push([x, y + count]);
        count++;
      }
    } else {
      while (count < lengthOfShip) {
        arrOfCoor.push([x + count, y]);
        count++;
      }
    }
    const board = this.board;
    for (const c of arrOfCoor) {
      const [a, b] = c;
      board[a][b].ship = ship;
      board[a][b].hasShip = true;
    }
    this.ships.add(ship);
  }

  receiveAttack(coor: Coordinates) {
    const board = this._board;
    const [x, y] = coor;
    if (board[x][y].state == CellState.UNTOUCHED)
      board[x][y].state = CellState.MISSED;
    if (board[x][y].hasShip && board[x][y].ship) {
      board[x][y].state = CellState.HIT;
      const ship = board[x][y].ship;
      ship.hit();
    }
  }
}

export { GameBoard };
