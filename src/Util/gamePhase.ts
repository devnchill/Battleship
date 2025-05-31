import { GamePhase } from "../Types/state.types";
import Phase1 from "../Ui/Phase1";
import Phase2 from "../Ui/Phase2";

// Handle phase-specific UI updates
function handlePhaseChange(phase: GamePhase) {
  switch (phase) {
    case GamePhase.Intro: {
      const phase1 = new Phase1();
      phase1.setupNameInputUi();
      // binds input and calls phase2
      phase1.setupNameInputHandler();
      break;
    }
    case GamePhase.Placement: {
      //initialize phase 2.
      const phase2 = new Phase2();
      console.log("Phase 2 initialized", phase2);

      break;
    }
    case GamePhase.Battle:
      document.body.innerHTML = "";
      break;
  }
}
export default handlePhaseChange;
