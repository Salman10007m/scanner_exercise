const s = require("./screen.js");

const width = 50;
let range = s.SCREEN_WIDTH / 2;
let velocity = 2;
const startPos = s.SCREEN_WIDTH / 2;
const endPos = s.SCREEN_WIDTH;
let detectedField;

module.exports = {
    width,
    range,
    detectedField,
    startPos,
    endPos,
    velocity,
};
