import { Player } from "./Player";
import { Coordinate, GameBoardInterface } from "../Types/GameTypes";

class Computer extends Player {
  constructor() {
    super("Computer");
  }

  generateRandomMove(opponentBoard: GameBoardInterface): string {
    let move: Coordinate;
    let moveKey: string;

    do {
      move = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      moveKey = `${move[0]},${move[1]}`;
    } while (this.previousMoves.has(moveKey));

    this.previousMoves.add(moveKey);
    return opponentBoard.recieveAttack(move);
  }
}

export { Computer };
