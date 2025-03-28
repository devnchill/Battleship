import "./css/styles.css";
const body = document.body as HTMLBodyElement;
const message: HTMLElement = document.createElement("h1");
message.textContent = "Webpack + TypeScript successfully set up! 🚀";

body.appendChild(message);
