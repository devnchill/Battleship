import sound_off from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation, uiShipObj } from "../Types/ship.types";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";
import { DomBoard } from "./DOMBoard";

class ShipPlacementUi {
  private orientationButton: HTMLButtonElement = document.querySelector(
    ".ship-axis",
  ) as HTMLButtonElement;
  private body = document.body;
  private activeUiShipEl: MaybeNull<HTMLDivElement> = null;
  private activeShipData: MaybeNull<uiShipObj> = null;

  resetDisplay() {
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
    GameState.phase = GamePhase.Battle;
    handlePhaseChange(GameState.phase);
  }

  displayAxis() {
    this.orientationButton = document.createElement("button");
    this.orientationButton.classList.add("ship-axis");
    this.orientationButton.textContent = "AXIS: X";
    this.orientationButton.dataset.orientation =
      Orientation.HORIZONTAL.toString();
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
  }

  private createUiShipElement(ship: uiShipObj): HTMLDivElement {
    const uiShip = document.createElement("div");
    uiShip.classList.add("activeUiShip");

    if (
      this.orientationButton?.dataset.orientation ==
      Orientation.HORIZONTAL.toString()
    ) {
      uiShip.style.width = `${ship.length * 50}px`;
      uiShip.style.height = "50px";
    } else {
      uiShip.style.height = `${ship.length * 50}px`;
      uiShip.style.width = "50px";
    }

    document.body.appendChild(uiShip);
    return uiShip;
  }

  placeUiShips() {
    const board: HTMLDivElement = document.querySelector(
      ".board",
    ) as HTMLDivElement;
    let activeShip: MaybeNull<uiShipObj> = null;
    const shipsToPlace: uiShipObj[] = [
      { name: "Destroyer", length: 2 },
      { name: "Submarine", length: 3 },
      { name: "Cruiser", length: 3 },
      { name: "Battleship", length: 4 },
      { name: "Carrier", length: 5 },
    ];

    activeShip = this.getNextShip(shipsToPlace, activeShip);
    if (!activeShip) {
      console.log("No ships in queue");
      return;
    }

    this.activeShipData = activeShip;
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

    if (this.orientationButton.textContent === "AXIS: Y") {
      this.orientationButton.textContent = "AXIS: X";
      this.orientationButton.dataset.orientation =
        Orientation.HORIZONTAL.toString();
    } else {
      this.orientationButton.textContent = "AXIS: Y";
      this.orientationButton.dataset.orientation =
        Orientation.VERTICAL.toString();
    }

    // Update UI ship size if it's currently visible
    if (this.activeUiShipEl && this.activeShipData) {
      const length = this.activeShipData.length;
      if (
        this.orientationButton.dataset.orientation ===
        Orientation.HORIZONTAL.toString()
      ) {
        this.activeUiShipEl.style.width = `${length * 50}px`;
        this.activeUiShipEl.style.height = "50px";
      } else {
        this.activeUiShipEl.style.height = `${length * 50}px`;
        this.activeUiShipEl.style.width = "50px";
      }
    }
  }

  private attachBoardHoverEvents(
    uiShip: HTMLDivElement,
    board: HTMLDivElement,
  ) {
    board.addEventListener("mouseleave", () => {
      uiShip.style.display = "none";
    });

    board.addEventListener("mousemove", (e: MouseEvent) => {
      uiShip.style.display = "block";
      const x = e.clientX;
      const y = e.clientY;
      uiShip.innerHTML = `X: ${x}<br>Y: ${y}`;
      uiShip.style.top = `${y}px`;
      uiShip.style.left = `${x + 20}px`;
    });
  }
}

export { ShipPlacementUi };
