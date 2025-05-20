import "./css/styles.css";

// helps in passing of data from one phase to another.
import { GameState } from "./Types/state.types";
import handlePhaseChange from "./Util/gamePhase";

// Initialize app only when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  handlePhaseChange(GameState.phase);
});
