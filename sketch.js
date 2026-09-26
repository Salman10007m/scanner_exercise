const r = require("raylib");
const t = require("./tasks");
const m = require("./math");

const REGIONWIDTH = 720;
const REGIONHEIGHT = 480;
const FPS = 60;

const scannerWidth = 50;
const scannerHeight = REGIONHEIGHT;

let scannerX = 0;
const scannerY = 0;

let scannerSpeed = -2;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(REGIONWIDTH, REGIONHEIGHT, "Scanner");
    r.SetTargetFPS(FPS);
}

function update() {
    const sRangeStart = 0;
    const sRangeEnd = m.sub(REGIONWIDTH, scannerWidth);

    scannerSpeed = t.moveScanner(
        scannerX,
        scannerSpeed,
        sRangeStart,
        sRangeEnd,
    );
    scannerX += scannerSpeed;
}

function createScanner(scannerColor) {
    r.DrawRectangle(
        scannerX,
        scannerY,
        scannerWidth,
        scannerHeight,
        scannerColor,
    );
}

function createParticle(pfRangeStart, pfRangeEnd) {
    const particleX = pfRangeStart;
    const particleY = 0;

    const particleWidth = m.sub(pfRangeEnd, pfRangeStart);
    const particleHeight = REGIONHEIGHT;
    const particleColor = r.BLUE;

    r.DrawRectangle(
        particleX,
        particleY,
        particleWidth,
        particleHeight,
        particleColor,
    );
}

function draw() {
    const pf1RangeStart = 240;
    const pf1RangeEnd = 360;
    const pf1TouchPoint = m.sub(pf1RangeStart, scannerWidth);

    const pf2RangeStart = 480;
    const pf2RangeEnd = 500;
    const pf2TouchPoint = m.sub(pf2RangeStart, scannerWidth);

    const scannerColor =
        t.isOverLapping(scannerX, pf1TouchPoint, pf1RangeEnd) ||
        t.isOverLapping(scannerX, pf2TouchPoint, pf2RangeEnd)
            ? r.RED
            : r.WHITE;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createParticle(pf1RangeStart, pf1RangeEnd);
    createParticle(pf2RangeStart, pf2RangeEnd);
    createScanner(scannerColor);

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
