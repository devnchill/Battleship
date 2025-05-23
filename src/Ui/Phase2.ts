import sound_on_img from "../assets/images/sound_on.svg";
import sound_off_img from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation, uiShipObj } from "../Types/ship.types";
import { GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { DomBoard } from "./DOMBoard";
import bgAudio from "../assets/audio/bg.mp3";

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
  private activeUiShipPreview = this.buildUiShipPreview(
    Phase2.pendingShips[0],
  ) as HTMLDivElement;

  constructor() {
    this.resetHTML();
    this.displayName(GameState.playerName);
    this.attachListenerToSpeaker();
    this.createBoard();
    this.enableBoardInteraction();
    this.displayOrientationButton();
    this.attachListenerToOrientationButton();
    //Adds Listener to be able to play/pause music by clicking the speaker
  }

  /*
   * @returns void
   * This functions modifies some bits and pieces of phase1 to be suitable for phase2.
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

  /*
   * @returns none
   * Adds event listener to speaker button placed at top right corner.
   */
  private attachListenerToSpeaker(): void {
    let isMuted = true;
    const music = new Audio(bgAudio);
    this.soundToggleButton?.addEventListener("click", () => {
      if (isMuted) {
        music.play();
        // unmute and use unmuted img
      } else {
        music.pause();
        //mute and use muted img
      }
      isMuted = !isMuted;
      (this.soundToggleButton as HTMLImageElement).src = isMuted
        ? sound_off_img
        : sound_on_img;
    });
  }

  /*
   * @returns void
   * Uses the name taken from phase1 and displays it in phsae2.
   */
  private displayName(name: string): void {
    const div = document.createElement("div");
    div.classList.add("instruct-div");
    const p = document.createElement("p");
    p.textContent = `${name.toUpperCase()}, PLACE YOUR SHIPS:`;
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
  }

  /*
   * @returns void
   * Uses DomBoard instance to create new board and displays it on webpage.
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

  /*
   * @returns void
   * Button to determine orientaitno of ship(HORIZONTAL|Vertical)
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

  private rotateActiveUiShip() {
    const isHorizontal: boolean =
      this.activeUiShipPreview.dataset.orientation === Orientation.HORIZONTAL;
    const gridCell = document.querySelector(".grid-cell") as HTMLDivElement;
    if (!gridCell) {
      console.error("Board cell not found in rotateActiveUiShip");
      return;
    }
    if (isHorizontal) {
      // ship is horizontal , so we now need to make it vertical
      this.activeUiShipPreview.style.width = gridCell.style.width;
      this.activeUiShipPreview.style.height = (
        parseFloat(gridCell.style.height) * Phase2.pendingShips[0].length
      ).toString();
    } else {
      this.activeUiShipPreview.style.height = gridCell.style.height;
      this.activeUiShipPreview.style.width = (
        parseFloat(gridCell.style.width) * Phase2.pendingShips[0].length
      ).toString();
    }
  }
  /*
   * @returns void
   * method which would be called when changeOrientation is clicked.
   */
  private switchOrientation(): void {
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

  /*
   *@returns void
   * calls changeOrientation method when orientationButton is clicked
   */
  private attachListenerToOrientationButton(): void {
    this.orientationButton?.addEventListener("click", () => {
      console.log("button clicked and listener triggered");
      this.switchOrientation();
    });
  }

  /*
   * @param activeShip - ship going to be placed and atached to cursor
   * @returns MaybeNull<HTMLDivElement>
   * returns null if all ships are already placed
   * returns HTMLDivElement if there is ships still left in shipQueue
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
    return currentShip;
  }

  private dequeueNextShip(): number {
    if (Phase2.pendingShips.length <= 0) {
      return 1;
    }
    Phase2.pendingShips.shift();
    return 0;
  }

  private showBorderColorForValidation(e: MouseEvent) {
    //boards current locaiton
    const board = document.querySelector(".board");
    if (!board) {
      console.error(
        "GameBoard not found when requiring it inside showBorderColorForValidation",
      );
      return;
    }
    const boardRect = board.getBoundingClientRect();
    const relativeX = e.clientX - boardRect.left;
    const relativeY = e.clientY - boardRect.top;
    console.log("Mouse relative to board:", relativeX, relativeY);
  }
  /*
  *Manages listener when cursor is moved over the gameboard
  * Responsible for tasks such as 
  - display uiship over board 
  - on right click ship gets placed
  TODO: Get mouse location on board
  TODO: See if ship can be placed
  TODO: Place Ship
  TODO: Retrive nexxt ship from shipQueue and repeat until shipQueue is empty
  TODO: Maybe split this task so that attachEventToGameBoard doesn't becomes too large and complicated to handle ?
  */
  private enableBoardInteraction(): void {
    const gameBoard = document.querySelector(".board");
    if (!gameBoard) {
      console.log("Gameboard not found");
      return;
    }
    this.body.appendChild(this.activeUiShipPreview);
    gameBoard?.addEventListener("mouseover", (e) => {
      this.activeUiShipPreview.style.backgroundColor = "red";
      // Position the ship near the mouse
      this.activeUiShipPreview.style.left = `${e as MouseEvent}.clientX}px`;
      this.activeUiShipPreview.style.top = `${e as MouseEvent}.clientY}px`;
      if (!this.activeUiShipPreview) return;
    });
    gameBoard.addEventListener("mouseenter", (e) => {
      this.activeUiShipPreview.style.display = "block";
      this.activeUiShipPreview.style.position = "absolute";
      this.showBorderColorForValidation(e as MouseEvent);
    });
    gameBoard.addEventListener("mouseleave", () => {
      this.activeUiShipPreview.style.display = "none";
    });
    //NOTE: Once ship is placed , shift shipQueue and call createUiForActiveShip method and repeat all over again.
  }
}

export default Phase2;
