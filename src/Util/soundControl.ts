import sound_on_img from "../assets/images/sound_on.svg";
import sound_off_img from "../assets/images/sound_off.svg";

export function toggleSound(
  music: HTMLAudioElement,
  isMuted: boolean,
  toggleSoundImg: HTMLImageElement,
): boolean {
  if (!toggleSoundImg)
    throw new Error(
      "Couldn't conclude whether it's muted or not . Check Sound Control for more info",
    );
  isMuted = !isMuted;
  toggleSoundImg.src = isMuted ? sound_off_img : sound_on_img;

  if (isMuted) {
    music.pause();
  } else {
    music.play();
  }

  return isMuted;
}
