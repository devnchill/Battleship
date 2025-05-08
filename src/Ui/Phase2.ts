import bg2Img from "../assets/images/bg2.jpg";
import sound_off from "../assets/images/sound_off.svg";
import { GamePhase, GameState } from "../Types/state.types";
import { BuildElement } from "../Util/buildelement";
import { handlePhaseChange } from "../Util/gamePhase";

class ShipPlacementUi {
  private static oceanicText = "#e1e8ed";
  resetDisplay() {
    const body = document.body;
    body.style.gridTemplateRows = "10% 80% 1fr";
    body.style.backgroundImage = `url(${bg2Img})`;
    const h1 = document.querySelector("h1");
    if (h1) {
      h1.style.fontSize = "2rem";
      h1.style.color = ShipPlacementUi.oceanicText;
      h1.style.borderBottom = `0.5rem solid ${ShipPlacementUi.oceanicText}`;
    }
    const muteButton = new BuildElement(
      "img",
      sound_off,
      "Mute/Unmute",
      "mute-btn",
      ["mute-toggle"],
    ).element;
    document.querySelector("header")?.appendChild(muteButton);
    const footer_p = document.querySelector("footer>p") as HTMLParagraphElement;
    if (footer_p) {
      footer_p.style.fontSize = "2rem";
      footer_p.style.color = ShipPlacementUi.oceanicText;
    }
    const anchor = document.querySelector("footer > a") as HTMLAnchorElement;
    anchor.style.fontSize = "2rem";
    const svg = anchor.querySelector("svg");
    if (svg) {
      svg.style.filter =
        "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(207%) hue-rotate(169deg) brightness(96%) contrast(97%)";
    }
  }
  displayName(name: string) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    const p = document.createElement("p");
    p.textContent = `${name.toUpperCase()}, PLACE YOUR SHIPS:`;
    p.style.fontSize = "2rem";
    p.style.color = ShipPlacementUi.oceanicText;
    p.style.fontFamily = "Tagesschrift-Regular";
    div.appendChild(p);
    document.querySelector("main")?.appendChild(div);
    GameState.phase = GamePhase.Battle;
    handlePhaseChange(GameState.phase);
  }
}
export { ShipPlacementUi };
