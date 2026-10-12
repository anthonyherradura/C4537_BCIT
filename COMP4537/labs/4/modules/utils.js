/**
 * Gets the date of the server.
 */
function getDate() {
    return new Date().toString();
}

/**
 * Gets the user message from en.json.
 */
async function getJsonData() {
    const data = require("../lang/en/en.json")
    return data.userMsg;
}

module.exports = { getDate, getJsonData };