import "./css/styles.css";
import { appInitializer } from "./Ui/AppInitializer";

const form = document.getElementById("player-form") as HTMLFormElement;
const nameInput = document.getElementById("player-name") as HTMLInputElement;

window.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("startup-dialog") as HTMLDialogElement;
  if (dialog && typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    console.error("Dialog element not supported or not found.");
  }
});

form.addEventListener("submit", () => {
  const name = nameInput.value.trim();
  if (name) {
    appInitializer.initApp(name);
  }
});
