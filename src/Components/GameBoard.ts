import { BoardCell, GameBoardInterface } from "../Types/GameTypes";

class GameBoard implements GameBoardInterface {
  private __board__: BoardCell[][];

  constructor() {
    this.__board__ = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  get board(): BoardCell[][] {
    return this.__board__;
  }
}
