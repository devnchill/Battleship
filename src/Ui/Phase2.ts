import sound_off from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation, uiShipObj } from "../Types/ship.types";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";
import { DomBoard } from "./DOMBoard";

class ShipPlacementUi {
  private cellLength!: number;
  private orientationButton: MaybeNull<HTMLButtonElement> = null;
  private body = document.body;
  private activeUiShipEl: MaybeNull<HTMLDivElement> = null;
  private activeShipObj: MaybeNull<uiShipObj> = null;

  constructor() {
    this.modifyHTML();
    this.createBoard();
    this.placeUiShips();
    GameState.phase = GamePhase.Battle;
    handlePhaseChange(GameState.phase);
  }

  modifyHTML() {
    this.body.classList.replace("phase1", "phase2");
    const muteButton = new BuildElement(
      "img",
      sound_off,
      "Mute/Unmute",
      "mute-btn",
      ["mute-toggle"],
    ).element;
    document.querySelector("header")?.appendChild(muteButton);
  }

  displayName(name: string) {
    const div = document.createElement("div");
    div.classList.add("instruct-div");
    const p = document.createElement("p");
    p.textContent = `${name.toUpperCase()}, PLACE YOUR SHIPS:`;
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
  }

  private isHorizontal(): boolean {
    return (
      this.orientationButton?.dataset.orientation ===
      Orientation.HORIZONTAL.toString()
    );
  }

  displayOrientationButton() {
    this.orientationButton = document.createElement("button");
    this.orientationButton.classList.add("ship-axis");
    this.orientationButton.textContent = "AXIS: X";
    this.orientationButton.dataset.orientation = Orientation.HORIZONTAL;
    document
      .querySelector(".instruct-div")
      ?.appendChild(this.orientationButton);

    this.setupOrientationToggle();
  }

  private setupOrientationToggle() {
    if (!this.orientationButton) {
      console.log("Orientation Button not found");
      return;
    }

    this.orientationButton.addEventListener("click", () => {
      this.changeOrientation();
    });
  }

  createBoard() {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");

    const board = new DomBoard(PlayerType.Human).createBoard();
    boardContainer.appendChild(board);

    document.querySelector("main")?.appendChild(boardContainer);
    this.cellLength = document
      .querySelector(".board-cell")
      .getBoundingClientRect().width;
  }

  private createUiShipElement(ship: uiShipObj): HTMLDivElement {
    const uiShip = document.createElement("div");
    uiShip.classList.add("activeUiShip");

    if (!this.isHorizontal()) {
      uiShip.style.width = `${ship.length * this.cellLength}px`;
      uiShip.style.height = `${this.cellLength}px`;
    } else {
      uiShip.style.height = `${ship.length * this.cellLength}px`;
      uiShip.style.width = `${this.cellLength}px`;
    }

    document.body.appendChild(uiShip);
    return uiShip;
  }

  placeUiShips() {
    const board: HTMLDivElement = document.querySelector(
      ".board",
    ) as HTMLDivElement;
    const shipsToPlace: uiShipObj[] = [
      { name: "Destroyer", length: 2 },
      { name: "Submarine", length: 3 },
      { name: "Cruiser", length: 3 },
      { name: "Battleship", length: 4 },
      { name: "Carrier", length: 5 },
    ];
    let activeShip: MaybeNull<uiShipObj> = null;

    activeShip = this.getNextShip(shipsToPlace, activeShip);
    if (!activeShip) {
      console.log("No ships in queue");
      return;
    }

    this.activeShipObj = activeShip;
    this.activeUiShipEl = this.createUiShipElement(activeShip);
    if (board && this.activeUiShipEl) {
      this.attachBoardHoverEvents(this.activeUiShipEl, board);
    }
  }

  private getNextShip(
    shipsQueue: uiShipObj[],
    current: MaybeNull<uiShipObj>,
  ): uiShipObj | null {
    return current ?? shipsQueue.shift() ?? null;
  }

  private changeOrientation() {
    if (!this.orientationButton) return;
    if (this.isHorizontal()) {
      this.orientationButton.textContent = "AXIS: Y";
      this.orientationButton.dataset.orientation = Orientation.VERTICAL;
    } else {
      this.orientationButton.textContent = "AXIS: X";
      this.orientationButton.dataset.orientation = Orientation.HORIZONTAL;
    }

    // Update UI ship size if it's currently visible
    if (this.activeUiShipEl && this.activeShipObj) {
      const length = this.activeShipObj.length;
      if (
        this.orientationButton?.dataset.orientation === Orientation.HORIZONTAL
      ) {
        this.activeUiShipEl.style.width = `${length * 50}px`;
        this.activeUiShipEl.style.height = "50px";
      } else {
        this.activeUiShipEl.style.height = `${length * 50}px`;
        this.activeUiShipEl.style.width = "50px";
      }
    }
  }

  /**
   * Get cells that ship would occupy starting from a cell
   * @param startCell - the starting cell HTMLElement
   * @param length - length of the ship
   * @param orientation - 'x' or 'y'
   * @returns array of HTMLElements for cells covered
   */
  private getShipCells(
    startCell: HTMLElement,
    length: number,
    orientation: string,
  ): HTMLElement[] {
    const cells: HTMLElement[] = [];
    const startX = parseInt(startCell.dataset.x ?? "0");
    const startY = parseInt(startCell.dataset.y ?? "0");

    for (let i = 0; i < length; i++) {
      const x = orientation === Orientation.HORIZONTAL ? startX + i : startX;
      const y = orientation === Orientation.VERTICAL ? startY + i : startY;
      const selector = `.board-cell[data-x="${x}"][data-y="${y}"]`;
      const cell = document.querySelector(selector);
      if (cell) {
        cells.push(cell as HTMLElement);
      } else {
        break; // out of board or invalid cell
      }
    }
    return cells;
  }

  private attachBoardHoverEvents(
    uiShip: HTMLDivElement,
    board: HTMLDivElement,
  ) {
    board.addEventListener("mouseleave", () => {
      uiShip.style.display = "none";
    });

    board.addEventListener("mousemove", (e: MouseEvent) => {
      board.style.cursor = "grab";
      uiShip.style.display = "block";
      const targetCell = (e.target as HTMLElement).closest(
        ".board-cell",
      ) as HTMLDivElement;
      if (!targetCell) return;

      const currentAxis = this.orientationButton?.dataset.orientation;

      if (!currentAxis) return;

      const shipCells = this.getShipCells(
        targetCell,
        this.activeShipObj?.length ?? 0,
        currentAxis,
      );

      // Clear previous highlights first
      document
        .querySelectorAll(".board-cell.valid, .board-cell.invalid")
        .forEach((cell) => {
          cell.classList.remove("valid", "invalid");
        });

      // Check validity
      const isValid =
        shipCells.length ===
        (this.activeShipObj?.length ?? 0); /* && no collisions etc.*/

      // Add highlight classes
      shipCells.forEach((cell) => {
        cell.classList.add(isValid ? "valid" : "invalid");
      });

      // Position your UI ship element like before
      const x = e.clientX;
      const y = e.clientY;
      uiShip.innerHTML = `X: ${x}<br>Y: ${y}`;
      uiShip.style.top = `${y}px`;
      uiShip.style.left = `${x + 20}px`;
    });

    board.addEventListener("click", (e) => {
      //as soon as click check for bounds.
      const targetCell = (e.target as HTMLDivElement).closest(
        ".board-cell",
      ) as HTMLDivElement;
      if (!targetCell) return;

      let currentAxis = "x";
      if (this.isHorizontal()) {
        currentAxis = "y";
      }
      const coord = parseInt(targetCell.dataset[currentAxis] || "0", 10);

      if (!this.activeShipObj) return;

      const shipEnd = coord + this.activeShipObj.length - 1;
      if (shipEnd <= 9) {
        //  place ship and go to next one
      } else {
        //  don't place ship
      }
    });
  }
}

export { ShipPlacementUi };
