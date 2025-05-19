import { GamePhase, GameState } from "../Types/state.types";
import { StartupUi } from "../Ui/Phase1";
import { ShipPlacementUi } from "../Ui/Phase2";

// Handle phase-specific UI updates
function handlePhaseChange(phase: GamePhase) {
  switch (phase) {
    case GamePhase.Intro: {
      const appInit = new StartupUi();
      appInit.setupNameInputUi();
      appInit.setupNameInputHandler();
      break;
    }
    case GamePhase.Placement: {
      const shipPlacement = new ShipPlacementUi();
      shipPlacement.displayName(GameState.playerName);
      shipPlacement.displayOrientationButton();
      break;
    }
    case GamePhase.Battle:
      break;
  }
}
export { handlePhaseChange };
