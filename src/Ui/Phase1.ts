import { BuildElement } from "../Util/buildelement";
import { GamePhase, GameState } from "../Types/state.types";
import { handlePhaseChange } from "../Util/gamePhase";
class StartupUi {
  public setupNameInputUi() {
    const nameLabel = new BuildElement(
      "label",
      "",
      "",
      "",
      [],
      "ENTER YOUR NAME:",
      "",
    );
    nameLabel.element.setAttribute("for", "name-input");
    const nameInput = new BuildElement(
      "input",
      "",
      "",
      "name-input",
      ["input-field"],
      "",
      "text",
    );
    nameInput.element.id = "name-input";
    nameInput.element.setAttribute("required", "true");
    nameInput.element.setAttribute("minlength", "3");
    const inputDiv = new BuildElement(
      "div",
      "",
      "",
      "name-input-div",
      [],
      "",
      "",
      [nameLabel.element, nameInput.element],
    );

    const submitButton = new BuildElement(
      "button",
      "",
      "",
      "submit-name-button",
      ["submit-button"],
      "Start",
      "submit",
    );

    const form = new BuildElement(
      "form",
      "",
      "",
      "startup-dialog-form",
      [],
      "",
      "",
      [inputDiv.element, submitButton.element],
    );
    form.element.setAttribute("method", "dialog");

    const dialog = new BuildElement(
      "dialog",
      "",
      "",
      "",
      ["dialog-class"],
      "",
      "",
      [form.element],
    );
    const FOOTER = new BuildElement("footer", "", "", "", ["footer-class"], "");

    const copyrightText = new BuildElement("p", "", "", "", [], "");
    copyrightText.element.innerHTML = "&copy; DevNChill";

    const githubLink = new BuildElement(
      "a",
      "https://github.com/devnchill/Battleship", // href attribute
      "",
      "",
      [],
      "",
    );
    const SVG_NS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 105 105");
    svg.setAttribute("width", "3rem");
    svg.setAttribute("height", "3rem");

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute(
      "d",
      "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z",
    );
    path.setAttribute("fill", "#24292f");

    svg.appendChild(path);

    if (githubLink) githubLink.element.appendChild(svg);

    githubLink.element.appendChild(svg);

    FOOTER.element.appendChild(copyrightText.element);
    FOOTER.element.appendChild(githubLink.element);

    document.body.appendChild(FOOTER.element);
    const MAIN = new BuildElement("main", "", "", "", [], "", "", [
      dialog.element,
    ]);
    document.body.appendChild(MAIN.element);
    document.body.appendChild(FOOTER.element);
  }

  setupNameInputHandler() {
    const dialog = document.querySelector("dialog");
    dialog?.showModal();
    const form = document.querySelector("#startup-dialog-form");
    form?.addEventListener("submit", () => {
      const nameInput = document.querySelector<HTMLInputElement>("#name-input");
      if (nameInput) {
        GameState.playerName = nameInput.value.trim();
        GameState.phase = GamePhase.Placement;
        handlePhaseChange(GameState.phase);
      }
    });
  }
}

export { StartupUi };
