const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");
const range = require("./range.js");

function running() {
    return !r.WindowShouldClose();
}

function setup(WIDTH, HEIGHT, FPS) {
    r.InitWindow(WIDTH, HEIGHT, "Scanner");
    r.SetTargetFPS(FPS);
    r.SetTraceLogLevel(r.LOG_NONE);

    const world = {};

    world.d1 = d.createDetector("Horizontal", 50, 0, WIDTH / 2, 2, WIDTH);
    world.d2 = d.createDetector("Horizontal", 50, WIDTH / 2, WIDTH, 2, WIDTH);
    world.d3 = d.createDetector("vertical", 50, 0, HEIGHT, 2, HEIGHT);

    world.f1 = p.createParticle("Horizontal", 200, 100, WIDTH);
    world.f2 = p.createParticle("Horizontal", 400, 50, WIDTH);
    world.f3 = p.createParticle("Vertical", 500, 50, HEIGHT);
    world.f4 = p.createParticle("Vertical", 120, 50, HEIGHT);

    return world;
}

function update(world) {
    d.newVelocity(world.d1);
    d.currentPosition(world.d1);
    range.overLaps(world.d1, world.f1, world.f2);

    d.newVelocity(world.d2);
    d.currentPosition(world.d2);
    range.overLaps(world.d2, world.f1, world.f2);

    d.newVelocity(world.d3);
    d.currentPosition(world.d3);
    range.overLaps(world.d3, world.f3, world.f4);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    range.draw(world.f1);
    range.draw(world.f2);
    range.draw(world.f3);
    range.draw(world.f4);

    d.draw(world.d1);
    d.draw(world.d2);
    d.draw(world.d3);

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
