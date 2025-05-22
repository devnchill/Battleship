import sound_on_img from "../assets/images/sound_on.svg";
import sound_off_img from "../assets/images/sound_off.svg";
import { MaybeNull } from "../Types/common.types";
import { PlayerType } from "../Types/player.types";
import { Orientation } from "../Types/ship.types";
import { GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { DomBoard } from "./DOMBoard";
import bgAudio from "../assets/audio/bg.mp3";

class Phase2 {
  private soundToggleButton: MaybeNull<HTMLImageElement> = null;
  private orientationButton: MaybeNull<HTMLButtonElement> = null;
  private body = document.body;

  constructor() {
    this.resetHTML();
    this.displayName(GameState.playerName);
    this.attachListenerToSpeaker();
    this.createBoard();
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

  /*
   * @returns void
   * method which would be called when changeOrientation is clicked.
   */
  private changeOrientation(): void {
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
  }

  private attachListenerToOrientationButton(): void {
    this.orientationButton?.addEventListener("click", () => {
      console.log("button clicked and listener triggered");
      this.changeOrientation();
    });
  }
}

export default Phase2;
