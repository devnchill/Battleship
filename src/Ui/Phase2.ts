import sound_off from "../assets/images/sound_off.svg";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";

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
}
export { ShipPlacementUi };
