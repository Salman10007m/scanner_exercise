const s = require("./screen.js");

const width = 50;
let range = 0;
let velocity = 2;
const startPos = 0;
const endPos = s.SCREEN_WIDTH / 2;
let detectedField;

module.exports = {
    width,
    range,
    detectedField,
    startPos,
    endPos,
    velocity,
};
