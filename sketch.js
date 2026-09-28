const r = require("raylib");
const d = require("./detector.js");
const d1 = require("./detector1.js");
const d2 = require("./detector2.js");
const d3 = require("./detector3.js");
const f1 = require("./field1.js");
const f2 = require("./field2.js");
const f3 = require("./field3.js");
const s = require("./screen.js");

const HORIZONTAL = "Horizontal";
const VERTICAL = "Vertical";

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(s.SCREEN_WIDTH, s.SCREEN_HEIGHT, "Scanner");
    r.SetTargetFPS(s.FPS);
    r.SetTraceLogLevel(r.LOG_NONE);
}

function update() {
    d1.velocity = d.calcVelocity(
        d1.range,
        d1.velocity,
        d1.startPos,
        d1.endPos,
        d1.width,
    );
    d1.range = d.calcDirection(d1.range, d1.velocity);
    d1.detectedParticle = d.overLapping(
        d1.range,
        d1.width,
        f1.start,
        f1.width,
        f2.start,
        f2.width,
    );

    d2.velocity = d.calcVelocity(
        d2.range,
        d2.velocity,
        d2.startPos,
        d2.endPos,
        d2.width,
    );
    d2.range = d.calcDirection(d2.range, d2.velocity);
    d2.detectedParticle = d.overLapping(
        d2.range,
        d2.width,
        f1.start,
        f1.width,
        f2.start,
        f2.width,
    );

    d3.velocity = d.calcVelocity(
        d3.range,
        d3.velocity,
        d3.startPos,
        d3.endPos,
        d3.height,
    );
    d3.range = d.calcDirection(d3.range, d3.velocity);
    d3.detectedParticle = d.isOverLapping(
        d3.range,
        d3.height,
        f3.start,
        f3.width,
    );
}

function createRange(direction, start, size, color) {
    if (direction === HORIZONTAL) {
        r.DrawRectangle(start, 0, size, s.SCREEN_HEIGHT, color);
    } else {
        r.DrawRectangle(0, start, s.SCREEN_WIDTH, size, color);
    }
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createRange(HORIZONTAL, f1.start, f1.width, r.BLUE);
    createRange(HORIZONTAL, f2.start, f2.width, r.BLUE);
    createRange(VERTICAL, f3.start, f3.width, r.BLUE);

    createRange(
        HORIZONTAL,
        d1.range,
        d1.width,
        d1.detectedParticle ? r.RED : r.WHITE,
    );
    createRange(
        HORIZONTAL,
        d2.range,
        d2.width,
        d2.detectedParticle ? r.RED : r.WHITE,
    );
    createRange(
        VERTICAL,
        d3.range,
        d3.height,
        d3.detectedParticle ? r.RED : r.WHITE,
    );

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
