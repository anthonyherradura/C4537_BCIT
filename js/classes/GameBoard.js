import { MemoryButton } from "./MemoryButton";

export class GameBoard {
    constructor(containerElement) {
        this.container = containerElement;
        this.buttons = [];
    }

    createButtons(n) {
        this.clear();
        for (let i = 0; i < n; i++) {
            this.buttons.push(new MemoryButton())
        }
        return this.buttons;
    }

    clear() {
        this.container.innerHTML = "";
        this.buttons = [];
    }
}