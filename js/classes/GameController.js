import { STRINGS } from "../../lang/messages/en/strings.js";
import { GameBoard } from "./GameBoard.js";

const MAX_BUTTONS = 7;
const MIN_BUTTONS = 3;

const GameState = Object.freeze({
    IDLE: "IDLE",
    DISPLAYING: "DISPLAYING",
    SCRAMBLING: "SCRAMBLING",
    AWAITING_CLICKS: "AWAITING_CLICKS",
    WON: "WON",
    LOST: "LOST"
});

export class GameController {
    constructor(uiManager, boardContainerElem) {
        this.ui = uiManager;
        this.board = new GameBoard(boardContainerElem);
        this.state = GameState.IDLE;
        this.expectedIndex = 0;
        this.timers = [];
    }

    init() {
        this.ui.renderSetupForm((rawValue) => this.handleGoClicked(rawValue));
    }

    handleGoClicked(rawValue) {
        const n = this.validateInput(rawValue);
        if (n === null) {
            this.ui.showError(STRINGS.ERROR_INVALID_NUMBER);
            return;
        }
        this.startNewGame(n);
    }

    validateInput(numInput) {
        const num = Number(numInput);
        if (!Number.isInteger(num) || num < MIN_BUTTONS || num > MAX_BUTTONS) {
            return null;
        } else {
            return num;
        }
    }

    startNewGame(n) {
        this.clearTimers();
        this.ui.clearStatus();
        this.board.createButtons(n);
        this.board.renderInRow();
        this.expectedIndex = 0;
        this.state = GameState.DISPLAYING;

        const displayDelayMs = n * 1000;
        this.timers.push(setTimeout(() => this.runScrambleSequence(n, displayDelayMs), displayDelayMs));
    }

    runScrambleSequence(n, timeMs) {
        this.state = GameState.SCRAMBLING;
        let scrambleCount = 0;

        const scrambleStep = () => {
            this.board.scrambleOnce();
            scrambleCount++;
            if (scrambleCount < n) {
                this.timers.push(setTimeout(scrambleStep, timeMs))
            } else {
                this.beginRecallPhase();
            }
        };

        scrambleStep();
    }

    beginRecallPhase() {
        this.board.hideAllLabels();
        this.state = GameState.AWAITING_CLICKS;
        this.ui.showStatus(STRINGS.PROCEED_TEXT);
        this.board.enableClicks((button) => this.handleButtonClicked(button));
    }

    handleButtonClicked(button) {
        if (this.state !== GameState.AWAITING_CLICKS) {
            return;
        }

        if (button.order === this.expectedIndex) {
            button.reveal();
            this.expectedIndex++;
            if (this.expectedIndex === this.board.buttons.length) {
                this.state = GameState.WON;
                this.board.disableClicks();
                this.ui.showStatus(STRINGS.MSG_EXCELLENT);
            }
        } else {
            this.state = GameState.LOST;
            this.board.disableClicks();
            this.board.revealAll();
            this.ui.showError(STRINGS.MSG_WRONG_ORDER);
        }
    }

    clearTimers() {
        this.timers.forEach((t) => clearTimeout(t));
        this.timers = [];
    }
}