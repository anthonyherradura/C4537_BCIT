/**
 * Built with development assistance from Claude.
 */

import { STRINGS } from "../../lang/messages/en/strings.js";


export class UserInterface {
     constructor(setupPanelId, statusPanelId) {
          this.setupPanel = document.getElementById(setupPanelId);
          this.statusPanel = document.getElementById(statusPanelId);
          this.inputElement = null;
     }


     renderHeaderFooter() {
          const pageHeader = document.getElementById("header-text");
          const pageFooter = document.getElementById("footer-text");
          pageHeader.innerHTML = `<h1>${STRINGS.GAME_TITLE}</h1>`;
          pageFooter.innerHTML = `<p>${STRINGS.NAME}</p>`;
     }

     renderSetupForm(onGoClicked) {
          this.renderHeaderFooter()

          this.setupPanel.innerHTML = "";

          const label = document.createElement("label");
          label.setAttribute("for", "button-count-input");
          label.textContent = STRINGS.BTNS_CREATE_LABEL;

          const input = document.createElement("input");
          input.type = "number";
          input.id = "button-count-input";
          input.min = "3";
          input.max = "7";

          const goButton = document.createElement("button");
          goButton.type = "button";
          goButton.textContent = STRINGS.GO_BTN_TEXT;

          goButton.addEventListener("click", () => {
               onGoClicked(input.value);
          });

          this.setupPanel.appendChild(label);
          this.setupPanel.appendChild(input);
          this.setupPanel.appendChild(goButton);

          this.inputElement = input;
     }

     showError(message) {
          this.setStatus(message, true);
     }

     showStatus(message) {
          this.setStatus(message, false);
     }

     setStatus(message, isError) {
          this.statusPanel.textContent = message;
          this.statusPanel.classList.toggle("status-error", isError);
          this.statusPanel.classList.toggle("status-success", !isError);
     }

     clearStatus() {
          this.statusPanel.textContent = "";
          this.statusPanel.classList.remove("status-error", "status-success");
     }
}