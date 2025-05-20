import "./css/styles.css";
import bgAudio from "./assets/audio/bg.mp3";

// sets up music button and music coordination.
import { toggleSound } from "./Util/soundControl";

// help in passing of data from one phase to another.
import { GameState } from "./Types/state.types";
import { handlePhaseChange } from "./Util/gamePhase";

const music = new Audio(bgAudio);
let isMuted = true;

// Initialize app when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  handlePhaseChange(GameState.phase);
});

document.querySelector("header")?.addEventListener("click", () => {
  const toggleSoundImg = document.querySelector(
    ".mute-toggle",
  ) as HTMLImageElement;
  if (toggleSoundImg) {
    isMuted = toggleSound(music, isMuted, toggleSoundImg);
  }
});
