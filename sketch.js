const r = require("raylib");
const t = require("./tasks");

const REGIONWIDTH = 720;
const REGIONHEIGHT = 480;
const FPS = 60;

const scannerWidth = 50;
const scannerHeight = REGIONHEIGHT;

const sRangeStart = 0;
const sRangeEnd = REGIONWIDTH - scannerWidth;

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
    scannerSpeed = t.moveScanner(
        scannerX,
        scannerSpeed,
        sRangeStart,
        sRangeEnd,
    );
    scannerX += scannerSpeed;
}

function createScanner(pfTouchPoint, pfRangeEnd) {
    const scannerColor = t.isOverLapping(scannerX, pfTouchPoint, pfRangeEnd)
        ? r.RED
        : r.WHITE;

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

    const particleWidth = pfRangeEnd - pfRangeStart;
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
    const pfRangeStart = 240;
    const pfRangeEnd = 360;
    const pfTouchPoint = pfRangeStart - scannerWidth;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createParticle(pfRangeStart, pfRangeEnd);
    createScanner(pfTouchPoint, pfRangeEnd);

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
