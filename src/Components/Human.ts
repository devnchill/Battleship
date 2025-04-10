import { Player } from "./Player";
import { PlayerType } from "../Types/player.types";
import { GameBoard } from "./GameBoard";
import { Coordinates } from "../Types/common.types";

class Ai extends Player {
  constructor(name = PlayerType.Human) {
    super(name);
  }

  makeMove(coor: Coordinates, oppBoard: GameBoard): void {
    oppBoard.receiveAttack(coor);
  }
}
export { Ai };
