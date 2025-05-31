import sound_on_img from "../assets/images/sound_on.svg";
import sound_off_img from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation, uiShipObj } from "../Types/ship.types";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { DomBoard } from "./DOMBoard";
import bgAudio from "../assets/audio/bg.mp3";
import handlePhaseChange from "../Util/gamePhase";
import submarine from "../assets/images/submarine.svg";
import patrol from "../assets/images/patrol.svg";
import destroyer from "../assets/images/destroyer.svg";
import carrier from "../assets/images/carrier.svg";

class Phase2 {
  private soundToggleButton: MaybeNull<HTMLImageElement> = null;
  private orientationButton: MaybeNull<HTMLButtonElement> = null;
  private body = document.body;
  private static pendingShips = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];
  private static shipImages: Record<string, string> = {
    Carrier: carrier,
    Battleship: destroyer,
    Cruiser: destroyer,
    Submarine: submarine,
    Destroyer: patrol,
  };
  private activeUiShipPreview: MaybeNull<HTMLDivElement> = null;
  private music: HTMLAudioElement = new Audio(bgAudio);

  constructor() {
    this.resetHTML();
    this.displayName(GameState.playerName);
    this.attachListenerToSpeaker();
    this.createBoard();
    this.activeUiShipPreview = this.buildUiShipPreview(Phase2.pendingShips[0]);
    this.rotateActiveUiShip();
    this.enableBoardInteraction();
    this.displayOrientationButton();
    this.attachListenerToOrientationButton();
  }

  /**
   * Prepares the HTML elements required for Phase 2 by modifying Phase 1 layout.
   * Adds the mute/unmute button to the header.
   */
  private resetHTML(): void {
    this.body.classList.replace("phase1", "phase2");
    this.soundToggleButton = new BuildElement(
      "img",
      sound_off_img,
      "Mute/Unmute",
      "mute-btn",
      ["mute-toggle"],
    ).element as HTMLImageElement;
    document.querySelector("header")?.appendChild(this.soundToggleButton);
  }

  /**
   * Adds event listener to the speaker button to toggle background music playback.
   * Updates the speaker icon based on the mute state.
   */
  private attachListenerToSpeaker(): void {
    let isMuted = true;
    if (!this.soundToggleButton) {
      console.log(
        "Sound toggle button not found in phase2 this.attachListenerToSpeaker()",
      );
      return;
    }
    const btn = this.soundToggleButton;
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (isMuted) {
        this.music.play();
      } else {
        this.music.pause();
      }
      isMuted = !isMuted;
      btn.src = isMuted ? sound_off_img : sound_on_img;
    });
  }

  /**
   * Displays the player's name in uppercase followed by an instruction to place ships.
   * @param name - Player's name.
   */
  private displayName(name: string): void {
    const div = document.createElement("div");
    div.classList.add("instruct-div");
    const p = document.createElement("p");
    p.textContent = `${name.toUpperCase()}, PLACE YOUR SHIPS:`;
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
  }

  /**
   * Uses DomBoard to create and append a player board to the main section.
   * Throws an error if the initial board cell is not found.
   */
  private createBoard(): void {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    const board = new DomBoard(PlayerType.Human).createBoard();
    boardContainer.appendChild(board);
    document.querySelector("main")?.appendChild(boardContainer);
    const boardCell = document.querySelector(".grid-cell");
    if (!boardCell) {
      throw new Error("Board cell not found when initializing cellLength.");
    }
  }

  /**
   * Creates and displays the orientation toggle button for ship placement (X/Y axis).
   */
  private displayOrientationButton(): void {
    this.orientationButton = document.createElement("button");
    this.orientationButton.classList.add("ship-axis");
    this.orientationButton.textContent = "AXIS: Y";
    this.orientationButton.dataset.orientation = Orientation.HORIZONTAL;
    document
      .querySelector(".instruct-div")
      ?.appendChild(this.orientationButton);
  }

  /**
   * Adjusts the dimensions of the active UI ship preview based on its orientation.
   */

  private rotateActiveUiShip(): void {
    console.log("rotateActiveUiShip method triggered");

    if (!this.activeUiShipPreview) {
      console.error("activeUiShipPreview is null in method rotateActiveUiShip");
      return;
    }
    if (!this.orientationButton) {
      console.log("orientation button not found in rotateActiveUiShip");
      return;
    }
    const isHorizontal =
      this.orientationButton.dataset.orientation === Orientation.HORIZONTAL;
    const gridCell = document.querySelector(".grid-cell") as HTMLDivElement;
    if (!gridCell) {
      console.error("Board cell not found in rotateActiveUiShip");
      return;
    }
    const width = parseFloat(getComputedStyle(gridCell).width);
    const height = parseFloat(getComputedStyle(gridCell).height);
    const shipLength = Phase2.pendingShips[0].length;
    const preview = this.activeUiShipPreview;
    const img = preview.querySelector("img") as HTMLImageElement;
    preview.style.position = "absolute";
    preview.style.display = "block";

    if (isHorizontal) {
      preview.style.width = `${shipLength * width}px`;
      preview.style.height = `${height}px`;
      img.style.transform = "rotate(0deg)";
      img.style.transformOrigin = "top left";
    } else {
      img.style.transformOrigin = "top left";
      img.style.transform = "rotate(90deg)";
    }
  }

  /**
   * Toggles the ship orientation between HORIZONTAL and VERTICAL.
   * Updates the UI button text and re-rotates the preview ship accordingly.
   */
  private switchOrientation(): void {
    console.log("switchOrientation method called");
    if (!this.orientationButton) {
      console.log("Orientation button not found", this.orientationButton);
      return;
    }
    if (this.orientationButton.dataset.orientation === Orientation.HORIZONTAL) {
      this.orientationButton.dataset.orientation = Orientation.VERTICAL;
      this.orientationButton.textContent = "AXIS: X";
    } else {
      this.orientationButton.dataset.orientation = Orientation.HORIZONTAL;
      this.orientationButton.textContent = "AXIS: Y";
    }
    this.rotateActiveUiShip();
  }

  /**
   * Attaches a click listener to the orientation button to switch ship axis.
   */
  private attachListenerToOrientationButton(): void {
    this.orientationButton?.addEventListener("click", () => {
      console.log("button clicked and listener triggered");
      this.switchOrientation();
    });
  }

  /**
   * Builds a visual preview element for the currently selected ship.
   * @param activeShip - The ship to be displayed as preview.
   * @returns A HTMLDivElement representing the UI ship preview or null if grid cell not found.
   */

  private buildUiShipPreview(activeShip: uiShipObj): MaybeNull<HTMLDivElement> {
    const currentShip = document.createElement("div");
    currentShip.classList.add("ui-ship", activeShip.name);

    const gridCell = document.querySelector(".grid-cell") as HTMLDivElement;
    if (!gridCell) {
      console.log("Grid cells not found", gridCell);
      return null;
    }

    const cellLength = parseFloat(getComputedStyle(gridCell).width);

    currentShip.style.width = `${activeShip.length * cellLength}px`;
    currentShip.style.height = `${cellLength}px`;
    currentShip.style.position = "absolute";
    currentShip.style.display = "block";

    // Use ship image from map
    const img = document.createElement("img");
    img.src = Phase2.shipImages[activeShip.name];
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover"; // or "cover" depending on style
    currentShip.appendChild(img);
    return currentShip;
  }

  /**
   * Removes the next ship from the pending ships queue.
   * @returns 0 if a ship was dequeued, 1 if no ships are left.
   */
  private dequeueNextShip(): number {
    if (Phase2.pendingShips.length <= 0) {
      return 1;
    }
    Phase2.pendingShips.shift();
    return 0;
  }

  /**
   * Calculates the grid cell index (row and column) based on relative mouse position.
   * @param relativeX - X coordinate relative to the board.
   * @param relativeY - Y coordinate relative to the board.
   * @returns An object containing row and col, or null if grid cell is not found.
   */
  private getCellIndexFromPosition(
    relativeX: number,
    relativeY: number,
  ): MaybeNull<{ row: number; col: number }> {
    const gridCell = document.querySelector(".grid-cell") as HTMLElement;
    if (!gridCell) return null;
    const cellWidth = gridCell.offsetWidth;
    const cellHeight = gridCell.offsetHeight;
    const col = Math.floor(relativeX / cellWidth);
    const row = Math.floor(relativeY / cellHeight);
    return { row, col };
  }

  /**
   * Validates if a ship can be placed at the specified position with the given orientation.
   * @param row - Starting row position.
   * @param col - Starting column position.
   * @param length - Length of the ship.
   * @param orientation - Ship orientation (horizontal or vertical).
   * @returns True if ship fits within bounds; false otherwise.
   */
  private canPlaceShip(
    row: number,
    col: number,
    length: number,
    orientation: Orientation,
  ): boolean {
    const boardSize = 10;
    if (orientation === Orientation.HORIZONTAL) {
      if (col + length > boardSize) return false;
    } else {
      if (row + length > boardSize) return false;
    }
    // Collision detection can go here in the future
    return true;
  }

  /**
   * Removes all visual highlight indicators (valid/invalid) from board cells.
   */
  private clearHighlights(): void {
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("valid");
      cell.classList.remove("invalid");
    });
  }

  /**
   * Highlights cells on the board to indicate whether placement is valid or invalid.
   * @param row - Starting row index.
   * @param col - Starting column index.
   * @param length - Length of the ship.
   * @param orientation - Ship orientation (horizontal or vertical).
   * @param valid - Whether the ship placement is valid.
   */
  private highlightCells(
    row: number,
    col: number,
    length: number,
    orientation: Orientation,
    valid: boolean,
  ): void {
    const boardSize = 10;
    for (let i = 0; i < length; i++) {
      const targetRow = orientation === Orientation.HORIZONTAL ? row : row + i;
      const targetCol = orientation === Orientation.HORIZONTAL ? col + i : col;
      if (targetRow >= boardSize || targetCol >= boardSize) continue;
      const selector = `.grid-cell[data-x="${targetCol}"][data-y="${targetRow}"]`;
      const cell = document.querySelector(selector);
      if (cell) {
        cell.classList.add(valid ? "valid" : "invalid");
      }
    }
  }

  /**
   * Highlights the cells under the cursor depending on whether a ship can be validly placed.
   * @param e - MouseEvent object from the cursor movement.
   */
  private showBorderColorForValidation(e: MouseEvent): void {
    const board = document.querySelector(".board");
    if (!board || !this.orientationButton || Phase2.pendingShips.length === 0)
      return;
    const boardRect = board.getBoundingClientRect();
    const relativeX = e.clientX - boardRect.left;
    const relativeY = e.clientY - boardRect.top;
    const cellPos = this.getCellIndexFromPosition(relativeX, relativeY);
    if (!cellPos) return;
    const orientation =
      this.orientationButton.dataset.orientation === Orientation.HORIZONTAL
        ? Orientation.HORIZONTAL
        : Orientation.VERTICAL;
    const activeShip = Phase2.pendingShips[0];
    this.clearHighlights();
    const isValid = this.canPlaceShip(
      cellPos.row,
      cellPos.col,
      activeShip.length,
      orientation,
    );
    this.highlightCells(
      cellPos.row,
      cellPos.col,
      activeShip.length,
      orientation,
      isValid,
    );
  }

  /**
   * Handles the placement of the currently active ship on valid highlighted cells.
   * If placement is successful, removes the ship from the queue,
   * creates the next ship's preview, or ends the placement phase if all ships are placed.
   */
  private placeShipOnBoard(): void {
    const currentShip = Phase2.pendingShips[0];
    console.log("Mouse Clicked . Placing Ship on board");
    const clickedCell = document.querySelectorAll(".valid");
    console.log(clickedCell);

    if (clickedCell.length == 0) {
      console.error("Valid cells not found");
      return;
    }
    clickedCell.forEach((cell, index) => {
      cell.classList.add("occupied");
      (cell as HTMLDivElement).dataset["ship"] = `${currentShip.name}-${index}`;
    });
    this.clearHighlights();
    if (this.dequeueNextShip() === 1) {
      console.log("All ships placed! Proceed to Phase 3.");
      // TODO: Transition to next phase
      handlePhaseChange(GamePhase.Battle);
      return;
    }
    const nextShip = Phase2.pendingShips[0];
    if (!nextShip) {
      console.log("No more ships to preview.");
      this.activeUiShipPreview?.remove();
      return;
    }
    if (this.activeUiShipPreview) {
      this.activeUiShipPreview.remove();
    }
    const newPreview = this.buildUiShipPreview(nextShip);
    if (newPreview) {
      this.activeUiShipPreview = newPreview;
      document.querySelector(".board-container")?.appendChild(newPreview);
      this.rotateActiveUiShip();
      this.bindPreviewToCursor(newPreview);
    }
  }

  /**
   * Binds a floating preview ship to the user's cursor as it moves over the board.
   * Also updates visual feedback for valid or invalid placement in real time.
   *
   * @param preview - The HTMLDivElement representing the floating ship preview.
   */
  private bindPreviewToCursor(preview: HTMLDivElement): void {
    const gameBoard = document.querySelector(".board");
    if (!gameBoard) return;

    gameBoard.addEventListener("mouseenter", () => {
      preview.style.display = "block";
      preview.style.position = "absolute";
    });

    gameBoard.addEventListener("mouseleave", () => {
      preview.style.display = "none";
      this.clearHighlights();
    });

    gameBoard.addEventListener("mousemove", (e) => {
      const relativeX = (e as MouseEvent).clientX + 10;
      const relativeY = (e as MouseEvent).clientY + 10;
      preview.style.left = `${relativeX}px`;
      preview.style.top = `${relativeY}px`;
      this.showBorderColorForValidation(e as MouseEvent);
    });
  }

  /**
   * Initializes event listeners for the game board to support
   * interactive ship placement via mouse movement and click.
   */
  private enableBoardInteraction(): void {
    const gameBoard = document.querySelector(".board");
    if (!gameBoard || !this.activeUiShipPreview) {
      console.log("Gameboard or ship preview not found");
      return;
    }

    const preview = this.activeUiShipPreview;
    const boardContainer = document.querySelector(".board-container");
    boardContainer?.appendChild(preview);

    this.bindPreviewToCursor(preview);

    gameBoard.addEventListener("click", () => {
      this.placeShipOnBoard();
    });
  }
}

export default Phase2;
