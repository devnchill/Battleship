import sound_off from "../assets/images/sound_off.svg";
import { PlayerType } from "../Types/player.types";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";
import { DomBoard } from "./DOMBoard";

class ShipPlacementUi {
  resetDisplay() {
    const body = document.body;
    body.classList.replace("phase1", "phase2");
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
    const axisbutton = document.createElement("button");
    axisbutton.classList.add("ship-axis");
    axisbutton.textContent = "AXIS: X";
    document.querySelector(".instruct-div")?.appendChild(axisbutton);
  }
  createBoard() {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    const board = new DomBoard(PlayerType.Human).createBoard();
    boardContainer.appendChild(board);
    document.querySelector("main")?.appendChild(boardContainer);
  }
  placeUiShips() {
    const board = document.querySelector(".board");
    if (!board) return;
    const shipsToPlace = [
      { name: "Destroyer", length: 2 },
      { name: "Submarine", length: 3 },
      { name: "Cruiser", length: 3 },
      { name: "Battleship", length: 4 },
      { name: "Carrier", length: 5 },
    ];
  }
}
export { ShipPlacementUi };
