import { Player } from "./Player";
import { PlayerType } from "../Types/player.types";
import { getRandomCoord } from "../Util/random";
import GameBoard from "./GameBoard";

class Ai extends Player {
  constructor() {
    super("Chad", PlayerType.Ai);
  }

  /*
   * @returns void
   * @param oppBoard - instance of Opponents Board
   */

  makeMove(oppBoard: GameBoard): void {
    try {
      // generate random coordinates using the utility function.
      const coor = getRandomCoord();
      oppBoard.receiveAttack(coor);
    } catch (error) {
      //NOTE: calling it recursively unless the coordinate is valid and is able to attack.
      this.makeMove(oppBoard);
      console.log(error);
    }
  }
}

export default Ai;
