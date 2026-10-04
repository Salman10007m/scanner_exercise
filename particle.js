const r = require("raylib");

function createParticle(direction, start, size, screenSize) {
    return {
        direction,
        start,
        size,
        screenSize,
        color: r.SKYBLUE,
    };
}

module.exports = {
    createParticle,
};
