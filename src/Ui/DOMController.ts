import { PlayerType } from "../Types/player.types";
import { GameController } from "../Core/GameController";
import { DomBoard } from "./DOMBoard";

class DomController {
  private game: GameController;
  private humanDomBoard: DomBoard;
  private aiDomBoard: DomBoard;

  constructor(name: string) {
    this.game = new GameController(name);
    this.humanDomBoard = new DomBoard(PlayerType.Human);
    this.aiDomBoard = new DomBoard(PlayerType.Ai);
    this.setupUi();
    this.humanDomBoard.renderFromBoard(this.game.human.gameBoard);
    this.aiDomBoard.renderFromBoard(this.game.ai.gameBoard);
  }

  setupUi() {}
}

export { DomController };
