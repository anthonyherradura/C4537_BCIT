const button = document.querySelector("#goButton");

button.addEventListener("click", function() {
    alert("The game button has been clicked, let's start the game!");
})

// import { AppController } from "./classes/AppController.js";
// import { GameEngine } from "./classes/GameEngine.js";
// import { UserInterface } from "./classes/UserInterface.js";

// const ui = new UserInterface();
// const game = new GameEngine(ui);
// const app = new AppController(ui, game);

// app.start();