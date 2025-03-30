import { Coordinate, GameBoardInterface } from "../Types/GameTypes";
import { GameBoard } from "./GameBoard";

class Player {
  private _gameBoard: GameBoardInterface;
  name: string;
  private previousMoves: Set<string>;
  constructor(name: string) {
    this.name = name;
    this._gameBoard = new GameBoard();
    this.previousMoves = new Set();
  }

  makeMove(coordd: Coordinate, opponentBoard: GameBoardInterface): string {
    const moveKey = `${coordd[0]},${coordd[1]}`;
    if (!this.previousMoves.has(moveKey)) {
      this.previousMoves.add(moveKey);
      return opponentBoard.recieveAttack(coordd);
    } else {
      return "Move already made.Try Again";
    }
  }
}
