import "./css/styles.css";
import sound_on_img from "./assets/images/sound_on.svg";
import sound_off_img from "./assets/images/sound_off.svg";
import bgAudio from "./assets/audio/bg.mp3";
import { AppInitializer } from "./Ui/AppInitializer";

const music = new Audio(bgAudio);
let isMuted = true;

window.addEventListener("DOMContentLoaded", () => {
  const appInitializer = new AppInitializer();
});

document.querySelector("header")?.addEventListener("click", (e) => {
  if (e) {
    const toggleSoundImg = e.target.closest(".mute-toggle");
    console.log(toggleSoundImg);

    if (!toggleSoundImg) return;
    isMuted = !isMuted;
    console.log(`Muted: ${isMuted}`);

    toggleSoundImg.src = isMuted ? sound_off_img : sound_on_img;
    if (isMuted) {
      music.pause();
    } else {
      music.play();
    }
  }
});
