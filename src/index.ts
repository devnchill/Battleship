import "./css/styles.css";
import { GameController } from "./Core/GameController";

const controller = new GameController();
const humanPlayer = controller.human.gameBoard.board;
const aiPlayer = controller.ai.gameBoard.board;
console.log("Human's Board", humanPlayer);
console.log("Ai's Board", aiPlayer);
controller.makeMove();
