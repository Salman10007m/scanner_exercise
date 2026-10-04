const range = require("./range");
const r = require("raylib");

function createDetector(size, start, endPos, velocity, direction, screenSize) {
    const startPos = start;
    return {
        direction,
        size,
        start,
        startPos,
        endPos,
        velocity,
        screenSize,
        detectedParticle: false,
    };
}

function isOutOfBound(detector) {
    const endTouch = detector.endPos - detector.size;
    return detector.start < detector.startPos || detector.start > endTouch;
}

function newVelocity(detector) {
    detector.velocity = isOutOfBound(detector)
        ? -detector.velocity
        : detector.velocity;
    return detector;
}

function currentPosition(detector) {
    detector.start = detector.start + detector.velocity;
    return detector;
}

function chooseColor(d) {
    return d.detectedParticle ? r.RED : r.WHITE;
}

function draw(d) {
    d.color = chooseColor(d);
    range.draw(d);
}

module.exports = {
    newVelocity,
    currentPosition,
    createDetector,
    draw,
};
