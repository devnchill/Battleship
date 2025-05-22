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
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement(this.cellType);
      cell.classList.add("grid-cell");

      const row = Math.floor(i / 10);
      const col = i % 10;
      cell.dataset.x = col.toString();
      cell.dataset.y = row.toString();

      this.container.append(cell);
    }
    return this.container;
  }

  renderFromBoard(logicalBoard: GameBoard) {
    const boardMatrix: ICell[][] = logicalBoard.board;
    for (let i = 0; i < 100; i++) {
      const cell = this.container.children[i] as HTMLDivElement;
      const row = Math.floor(i / 10);
      const col = i % 10;
      const cellData = boardMatrix[row][col];
      cell.classList.remove("HIT", "MISSED", "UNTOUCHED");
      if (cellData.state === CellState.HIT) {
        cell.classList.add("HIT");
      } else if (cellData.state === CellState.MISSED) {
        cell.classList.add("MISSED");
      } else if (cellData.state === CellState.UNTOUCHED) {
        cell.classList.add("UNTOUCHED");
      }
    }
  }
}
export { DomBoard };
