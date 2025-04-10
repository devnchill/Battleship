import { Player } from "./Player";
import { PlayerType } from "../Types/player.types";
import { getRandomCoord } from "../Util/random";
import { GameBoard } from "./GameBoard";

class Ai extends Player {
  constructor(name = PlayerType.Ai) {
    super(name);
  }

  makeMove(oppBoard: GameBoard): void {
    const coor = getRandomCoord();
    oppBoard.receiveAttack(coor);
  }
}
export { Ai };
