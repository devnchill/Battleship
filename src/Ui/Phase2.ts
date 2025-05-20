import sound_off from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation, uiShipObj } from "../Types/ship.types";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";
import { DomBoard } from "./DOMBoard";

import destroyerImg from "../assets/images/destroyer.svg";
import submarineImg from "../assets/images/submarine.svg";
import patrolImg from "../assets/images/patrol.svg";
import carrierImg from "../assets/images/carrier.svg";

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
    const boardCell = document.querySelector(".board-cell");
    if (!boardCell) {
      throw new Error("Board cell not found when initializing cellLength.");
    }
    this.cellLength = boardCell.getBoundingClientRect().width;
  }

  private shipImages: Record<string, string> = {
    Destroyer: destroyerImg,
    Submarine: submarineImg,
    Cruiser: patrolImg,
    Carrier: carrierImg,
  };

  private createUiShipElement(ship: uiShipObj): HTMLDivElement {
    const uiShip = document.createElement("div");
    uiShip.classList.add("activeUiShip");

    const img = document.createElement("img");
    img.src = this.shipImages[ship.name];
    img.alt = ship.name;
    img.style.pointerEvents = "none";

    if (!this.isHorizontal()) {
      uiShip.style.width = `${ship.length * this.cellLength}px`;
      uiShip.style.height = `${this.cellLength}px`;
      img.style.transform = "rotate(90deg)";
    } else {
      uiShip.style.height = `${ship.length * this.cellLength}px`;
      uiShip.style.width = `${this.cellLength}px`;
    }

    img.style.width = "100%";
    img.style.height = "100%";

    uiShip.appendChild(img);
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
    startCell: HTMLDivElement,
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
      document
        .querySelectorAll(".board-cell.valid, .board-cell.invalid")
        .forEach((cell) => {
          cell.classList.remove("valid", "invalid");
        });
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
      // Resize and rotate preview image live
      if (this.activeShipObj) {
        const length = this.activeShipObj.length;
        const img = uiShip.querySelector("img") as HTMLImageElement | null;

        if (img) {
          if (currentAxis === Orientation.HORIZONTAL) {
            uiShip.style.width = `${length * this.cellLength}px`;
            uiShip.style.height = `${this.cellLength}px`;
            img.style.transform = "rotate(0deg)";
          } else {
            uiShip.style.width = `${this.cellLength}px`;
            uiShip.style.height = `${length * this.cellLength}px`;
            img.style.transform = "rotate(90deg)";
          }
        }
      }
    });

    board.addEventListener("click", (e) => {
      const targetCell = (e.target as HTMLDivElement).closest(
        ".board-cell",
      ) as HTMLDivElement;
      if (!targetCell) {
        console.log("Target cell not found");
        return;
      }

      const orientation =
        this.orientationButton?.dataset.orientation ?? Orientation.HORIZONTAL;
      const shipCells = this.getShipCells(
        targetCell,
        this.activeShipObj?.length ?? 0,
        orientation,
      );
      const isValid = shipCells.length === this.activeShipObj?.length;

      if (!isValid) return;

      const img = document.createElement("img");
      img.src = this.shipImages[this.activeShipObj.name];
      img.alt = this.activeShipObj.name;
      img.classList.add("placed-ship-img");
      board.style.position = "relative";
      img.style.position = "absolute";
      img.style.pointerEvents = "none";
      const boardRect = board.getBoundingClientRect();
      if (!isValid || shipCells.length === 0) return;
      const firstCellRect = shipCells[0].getBoundingClientRect();

      // Calculate top and left relative to board
      const top = firstCellRect.top - boardRect.top;
      const left = firstCellRect.left - boardRect.left;

      img.style.top = `${top}px`;
      img.style.left = `${left}px`;

      if (orientation === Orientation.HORIZONTAL) {
        img.style.width = `${this.cellLength * this.activeShipObj.length}px`;
        img.style.height = `${this.cellLength}px`;
        img.style.transform = "rotate(0deg)";
      } else {
        img.style.width = `${this.cellLength}px`;
        img.style.height = `${this.cellLength * this.activeShipObj.length}px`;
        img.style.transform = "rotate(90deg)";
      }

      // Append image inside the board container (so positioning works relative to board)
      board.appendChild(img);

      // TODO: store ship position & move to next ship
    });
  }
}

export { ShipPlacementUi };
