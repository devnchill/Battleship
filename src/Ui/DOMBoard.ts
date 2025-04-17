import { GameBoard } from "../Core/GameBoard";
import { CellState, ICell } from "../Types/board.types";
import { PlayerType } from "../Types/player.types";

class DomBoard {
  private container: HTMLDivElement;
  private cellType: string;
  constructor(player: PlayerType) {
    this.container = document.createElement("div");
    if (player == PlayerType.Human) {
      this.cellType = "div";
    } else {
      this.cellType = "button";
    }
  }

  createBoard() {
    this.container.classList.add("board");
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement(this.cellType);
        cell.dataset.x = i.toString();
        cell.dataset.y = j.toString();
        if (this.cellType === "button") {
          cell.addEventListener("click", () => {
            console.log(`Clicked AI cell at: (${i}, ${j})`);
          });
        }
        row.appendChild(cell);
      }
      this.container.appendChild(row);
    }
    return this.container;
  }

  renderFromBoard(logicalBoard: GameBoard) {
    const boardMatrix: ICell[][] = logicalBoard.board;
    for (let i = 0; i < boardMatrix.length; i++) {
      const row = this.container.children[i] as HTMLDivElement;
      for (let j = 0; j < boardMatrix[i].length; j++) {
        const cell = row.children[j] as HTMLDivElement;
        const cellData = boardMatrix[i][j];
        if (cellData.hasShip) {
          if (cellData.state === CellState.HIT) {
            cell.classList.add("HIT");
          } else {
            cell.classList.add("UNTOUCHED-SHIP");
          }
        } else if (cellData.state === CellState.MISSED) {
          cell.classList.add("MISSED");
        } else if (cellData.state === CellState.UNTOUCHED) {
          cell.classList.remove("MISSED", "HIT", "UNTOUCHED-SHIP");
          cell.classList.add("UNTOUCHED");
        }
      }
    }
  }
}
export { DomBoard };
