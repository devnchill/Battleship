import { PlayerType } from "../Types/player.types";
import { GameBoard } from "./GameBoard";

class Player {
  name: PlayerType;
  private _gameBoard: GameBoard;

  constructor(name: PlayerType) {
    this.name = name;
    this._gameBoard = new GameBoard();
  }

  get gameBoard() {
    return this._gameBoard;
  }
}

export { Player };
