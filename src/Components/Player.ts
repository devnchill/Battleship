import { GameBoard } from "./GameBoard";

class Player {
  name: string;
  private _gameBoard: GameBoard;

  constructor(name: string) {
    this.name = name;
    this._gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this._gameBoard;
  }
}

export { Player };
