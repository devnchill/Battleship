import { GameState } from "../Types/state.types";

class Phase3 {
  constructor() {
    document.body.innerHTML = "";
    document.body.classList.remove("phase2");
    document.body.classList.add("phase3");
    console.log(GameState.playerShips);
  }
}
export default Phase3;
