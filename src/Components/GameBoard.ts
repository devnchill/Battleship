import type { ICell } from "../Types/board.types";
import { CellState } from "../Types/board.types";
import { Coordinates } from "../Types/common.types";
import { Orientation } from "../Types/ship.types";
import { validateCoordinate, validateNoOverlap } from "../Util/validation";
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

  placeShip(ship: Ship, coor: Coordinates): void {
    const [x, y] = coor;
    const lengthOfShip = ship.length;
    const orientation = ship.orientation;
    const arrOfCoor: Coordinates[] = [];
    let count = 0;

    if (orientation == Orientation.HORIZONTAL) {
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

    for (const c of arrOfCoor) {
      validateCoordinate(c);
    }

    validateNoOverlap(this.board, arrOfCoor);

    for (const c of arrOfCoor) {
      const [a, b] = c;
      const cell = this.board[a][b];
      cell.ship = ship;
      cell.hasShip = true;
    }
    this.ships.add(ship);
  }

  receiveAttack(coor: Coordinates): void {
    validateCoordinate(coor);
    const board = this._board;
    const [x, y] = coor;
    const cell = board[x][y];

    if (cell.state !== CellState.UNTOUCHED) {
      throw new Error(`Coordinates [${x}, ${y}] already attacked.`);
    }

    if (cell.hasShip && cell.ship) {
      cell.state = CellState.HIT;
      const ship = cell.ship;
      ship.hit();
    } else {
      cell.state = CellState.MISSED;
    }
  }
}

export { GameBoard };
