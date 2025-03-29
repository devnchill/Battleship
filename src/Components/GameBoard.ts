import { BoardCell, GameBoardInterface, Coordinate } from "../Types/GameTypes";
import { Ship } from "./Ship";

class GameBoard implements GameBoardInterface {
  private __board__: BoardCell[][];

  constructor() {
    this.__board__ = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  get board(): BoardCell[][] {
    return this.__board__;
  }

  placeShip(ship: Ship, coord: Coordinate): void {
    const arrOfCoor = [];
    const [x, y] = coord;
    const length = ship.length;
    if (ship.direction === "horizontal") {
      for (let index = 0; index < length; index++) {
        arrOfCoor.push([x, y + index]);
      }
    } else if (ship.direction === "vertical") {
      for (let index = 0; index < length; index++) {
        arrOfCoor.push([x + index, y]);
      }
    } else throw new Error("Invalid Direction Found. horizontal|vertical");

    for (const [a, b] of arrOfCoor) {
      if (a < 0 || a >= 10 || b < 0 || b >= 10) {
        throw new Error("Ship placement out of bounds");
      }
      if (this.board[a][b] !== null) {
        throw new Error("Invalid Coordinate: Ship already found");
      }
      this.board[a][b] = ship;
    }
  }
}
