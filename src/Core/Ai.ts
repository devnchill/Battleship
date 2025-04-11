import { Player } from "./Player";
import { PlayerType } from "../Types/player.types";
import { getRandomCoord } from "../Util/random";
import { GameBoard } from "./GameBoard";

class Ai extends Player {
  constructor(name = PlayerType.Ai) {
    super(name);
  }

  makeMove(oppBoard: GameBoard): void {
    try {
      const coor = getRandomCoord();
      oppBoard.receiveAttack(coor);
    } catch (error) {
      //NOTE: calling it recursively unless the coordinate is valid and is able to attack.
      this.makeMove(oppBoard);
      console.log(error);
    }
  }
}
export { Ai };
