const MAX_BUTTONS = 7;
const MIN_BUTTONS = 3;

export class GameEngine {
    constructor(ui, boardContainer) {
        this.ui = ui;
        this.boardContainer = boardContainer;
    }

    validate(numInput) {
        const num = Number(numInput);
        if (!Number.isInteger(num) || num < 3 || n > 7) {
            return null;
        } else {
            return num;
        }
    }
}