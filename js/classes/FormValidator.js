import { STRINGS } from "../../lang/messages/en/strings";

export class FormValidator {

    static validate(numInput) {
        const num = Number(numInput);
        if (!Number.isInteger(num) || num < 3 || n > 7) {
            return null;
        } else {
            return num;
        }
    }
    
}