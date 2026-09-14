import { UserInterface } from "./classes/UserInterface.js"
import { GameController } from "./classes/GameController.js"

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UserInterface("setup-panel", "status-panel");
    const boardContainer = document.getElementById("game-board");
    const controller = new GameController(ui, boardContainer);
    controller.init();
})