import { PlayerType } from "../Types/player.types";
import { GameController } from "../Core/GameController";
import { DomBoard } from "./DOMBoard";

class DomController {
  private humanDomBoard: DomBoard;
  private aiDomBoard: DomBoard;
  private game: GameController;

  constructor() {
    this.game = new GameController();
    this.humanDomBoard = new DomBoard(PlayerType.Human);
    this.aiDomBoard = new DomBoard(PlayerType.Ai);
  }

  setupUi() {
    document.body.appendChild(this.humanDomBoard.createBoard());
    document.body.appendChild(this.aiDomBoard.createBoard());
    this.humanDomBoard.renderFromBoard(this.game.human.gameBoard);
    this.aiDomBoard.renderFromBoard(this.game.ai.gameBoard);
  }
}

export { DomController };
