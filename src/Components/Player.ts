import { Coordinate, GameBoardInterface } from "../Types/GameTypes";
import { GameBoard } from "./GameBoard";

class Player {
  private _gameBoard: GameBoardInterface;
  name: string;
  protected previousMoves: Set<string>;
  constructor(name: string) {
    this.name = name;
    this._gameBoard = new GameBoard();
    this.previousMoves = new Set();
  }

  makeMove(coord: Coordinate, opponentBoard: GameBoardInterface): string {
    const moveKey = `${coord[0]},${coord[1]}`;
    if (!this.previousMoves.has(moveKey)) {
      this.previousMoves.add(moveKey);
      return opponentBoard.recieveAttack(coord);
    } else {
      return "You’ve already attacked this spot. Try a different Coordinate.";
    }
  }
}

export { Player };
