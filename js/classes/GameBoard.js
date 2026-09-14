import { MemoryButton } from "./MemoryButton.js";

export class GameBoard {
    constructor(containerElement) {
        this.container = containerElement;
        this.buttons = [];
    }

    createButtons(n) {
        this.clear();
        for (let i = 0; i < n; i++) {
            const color = this.generateRandomColor();
            this.buttons.push(new MemoryButton(i, color))
        }

        return this.buttons;
    }

    renderInRow() {
        this.buttons.forEach((btn) => {
            btn.element.style.position = "static";
            btn.renderInitialLabel();
            this.container.appendChild(btn.getElement());
        });
    }

    scrambleOnce() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.buttons.forEach((btn) => {
            const maxX = Math.max(width - btn.getWidth(), 0);
            const maxY = Math.max(height - btn.getHeight(), 0);
            const x = Math.random() * maxX;
            const y = Math.random() * maxY;
            btn.moveTo(x, y);
        });
    }

    hideAllLabels() {
        this.buttons.forEach((btn) => btn.hideLabel());
    }

    revealAll() {
        this.buttons.forEach((btn) => btn.reveal());
    }

    enableClicks(callback) {
        this.buttons.forEach((btn) => btn.enableClicks(callback));
    }

    disableClicks() {
        this.buttons.forEach((btn) => btn.disableClicks());
    }

    generateRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    clear() {
        this.container.innerHTML = "";
        this.buttons = [];
    }
}