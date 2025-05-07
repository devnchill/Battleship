import bg2Img from "../assets/images/bg2.jpg";
import sound_on from "../assets/images/sound_on.svg";
import { BuildElement } from "../Util/buildelement";

class ShipPlacementUi {
  goldenYellow = "#f2bb10";
  constructor(name: string) {
    this.resetDisplay();
    this.displayName(name);
  }
  resetDisplay() {
    const body = document.body;
    body.style.gridTemplateRows = "10% 80% 1fr";
    body.style.backgroundImage = `url(${bg2Img})`;
    document.querySelector("h1").style.fontSize = "2rem";
    const muteButton = new BuildElement(
      "img",
      sound_on,
      "Mute/Unmute",
      "mute-btn",
      ["mute-toggle"],
    ).element;
    document.querySelector("header")?.appendChild(muteButton);
    document.querySelector("footer>p").style.fontSize = "2rem";
    document.querySelector("footer>a").style.fontSize = "2rem";
  }
  displayName(name: string) {
    const div = document.createElement("div");
    div.textContent = name;
    div.style.fontSize = "5rem";
    div.style.color = this.goldenYellow;
    div.style.fontFamily = "Tagesschrift-Regular";
  }
}
export { ShipPlacementUi };
