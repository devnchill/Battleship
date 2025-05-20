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
    this.createBoard();
    this.displayName(GameState.playerName);
    this.displayOrientationButton();
    this.attachListenerToSpeaker();
  }

  private resetHTML() {
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

  private attachListenerToSpeaker() {
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

  private displayName(name: string) {
    const div = document.createElement("div");
    div.classList.add("instruct-div");
    const p = document.createElement("p");
    p.textContent = `${name.toUpperCase()}, PLACE YOUR SHIPS:`;
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
  }

  displayOrientationButton() {
    this.orientationButton = document.createElement("button");
    this.orientationButton.classList.add("ship-axis");
    this.orientationButton.textContent = "AXIS: X";
    this.orientationButton.dataset.orientation = Orientation.HORIZONTAL;
    document
      .querySelector(".instruct-div")
      ?.appendChild(this.orientationButton);
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
  }
}

export default Phase2;
