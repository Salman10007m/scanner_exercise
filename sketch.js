const r = require("raylib");
const d = require("./detector.js");

const screen = {
    WIDTH: 800,
    HEIGHT: 800,
    FPS: 60,
};

const d1 = {
    direction: "Horizontal",
    range: 0,
    width: 50,
    velocity: 2,
    startPos: 0,
    endPos: screen.WIDTH / 2,
    detectedField: false,
};

const d2 = {
    direction: "Horizontal",
    width: 50,
    range: screen.WIDTH / 2,
    velocity: 2,
    startPos: screen.WIDTH / 2,
    endPos: screen.WIDTH,
    detectedField: false,
};

const d3 = {
    direction: "Vertical",
    height: 50,
    range: 0,
    velocity: 2,
    startPos: 0,
    endPos: screen.HEIGHT,
    detectedField: false,
};

const f1 = {
    direction: "Horizontal",
    start: 200,
    width: 100,
};

const f2 = {
    direction: "Horizontal",
    start: 400,
    width: 50,
};

const f3 = {
    direction: "Vertical",
    start: 500,
    width: 50,
};

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(screen.WIDTH, screen.HEIGHT, "Scanner");
    r.SetTargetFPS(screen.FPS);
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
    if (direction === "Horizontal") {
        r.DrawRectangle(start, 0, size, screen.HEIGHT, color);
    } else {
        r.DrawRectangle(0, start, screen.WIDTH, size, color);
    }
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createRange(f1.direction, f1.start, f1.width, r.BLUE);
    createRange(f2.direction, f2.start, f2.width, r.BLUE);
    createRange(f3.direction, f3.start, f3.width, r.BLUE);

    createRange(
        d1.direction,
        d1.range,
        d1.width,
        d1.detectedParticle ? r.RED : r.WHITE,
    );
    createRange(
        d2.direction,
        d2.range,
        d2.width,
        d2.detectedParticle ? r.RED : r.WHITE,
    );
    createRange(
        d3.direction,
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
