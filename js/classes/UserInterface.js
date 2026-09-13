import { STRINGS } from "../lang/messages/en/strings.js"

export class UserInterface {
     constructor(rootElementId) {
        this.root = document.getElementById(rootElementId);
        this.header = null;
        this.messageLabel = null;
        this.inputLabel = null;
        this.inputBox = null;
        this.goButton = null;
        this.statusMessage = null;
     }

     renderPage() {

     }
     
}