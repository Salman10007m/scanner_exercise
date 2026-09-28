const s = require("./screen.js");

const height = 50;
let range = 0;
let velocity = 2;
const startPos = 0;
const endPos = s.SCREEN_HEIGHT;
let detectedParticle;

module.exports = {
    height,
    range,
    detectedParticle,
    startPos,
    endPos,
    velocity,
};
