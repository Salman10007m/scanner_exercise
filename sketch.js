const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");
const range = require("./range.js");

let d1;
let d2;
let d3;

let f1;
let f2;
let f3;

function running() {
    return !r.WindowShouldClose();
}

function setup(WIDTH, HEIGHT, FPS) {
    r.InitWindow(WIDTH, HEIGHT, "Scanner");
    r.SetTargetFPS(FPS);
    r.SetTraceLogLevel(r.LOG_NONE);

    d1 = d.createDetector(50, 0, WIDTH / 2, 2, "Horizontal", WIDTH);
    d2 = d.createDetector(50, WIDTH / 2, WIDTH, 2, "Horizontal", WIDTH);
    d3 = d.createDetector(50, 0, HEIGHT, 2, "vertical", HEIGHT);

    f1 = p.createParticle("Horizontal", 200, 100, WIDTH);
    f2 = p.createParticle("Horizontal", 400, 50, WIDTH);
    f3 = p.createParticle("Vertical", 500, 50, HEIGHT);
    f4 = p.createParticle("Vertical", 120, 50, HEIGHT);
}

function update() {
    d.newVelocity(d1);
    d.currentPosition(d1);
    d1.detectedParticle = range.overLaps(d1, f1, f2);

    d.newVelocity(d2);
    d.currentPosition(d2);
    d2.detectedParticle = range.overLaps(d2, f1, f2);

    d.newVelocity(d3);
    d.currentPosition(d3);
    d3.detectedParticle = range.overLaps(d3, f3, f4);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    range.draw(f1);
    range.draw(f2);
    range.draw(f3);
    range.draw(f4);

    d.draw(d1);
    d.draw(d2);
    d.draw(d3);

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
