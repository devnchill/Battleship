import { Player } from "./Player";
import { PlayerType } from "../Types/player.types";
import { GameBoard } from "./GameBoard";
import { Coordinates } from "../Types/common.types";

class Human extends Player {
  constructor(name = PlayerType.Human) {
    super(name);
  }

  makeMove(coor: Coordinates, oppBoard: GameBoard): void {
    try {
      oppBoard.receiveAttack(coor);
    } catch (error) {
      //TODO: Notify user to select a choose again
      console.log(error);
    }
  }
}
export { Human };
