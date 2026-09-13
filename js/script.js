import { UserInterface } from "./classes/userinterface";
import { GameEngine } from "./classes/GameEngine";

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UserInterface();
    const boardContainer = document.getElementById("game-board");
    const engine = new GameEngine();
    engine.init();
})