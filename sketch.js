const r = require("raylib");
const t = require("./tasks");
const m = require("./math");

const REGIONWIDTH = 800;
const REGIONHEIGHT = 800;
const FPS = 60;

const scanner1Width = 50;
const scanner2Width = 50;

let scanner1X = 0;
let scanner1Speed = -1;

let scanner2X = m.half(REGIONWIDTH);
let scanner2speed = -2;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(REGIONWIDTH, REGIONHEIGHT, "Scanner");
    r.SetTargetFPS(FPS);
    r.SetTraceLogLevel(r.LOG_NONE);
}

function update() {
    const s1RangeStart = 0;
    const s1RangeEnd = m.sub(m.half(REGIONWIDTH), scanner1Width);

    scanner1Speed = t.moveScanner(
        scanner1X,
        scanner1Speed,
        s1RangeStart,
        s1RangeEnd,
    );
    scanner1X += scanner1Speed;

    const s2RangeStart = m.half(REGIONWIDTH);
    const s2RangeEnd = m.sub(REGIONWIDTH, scanner2Width);

    scanner2speed = t.moveScanner(
        scanner2X,
        scanner2speed,
        s2RangeStart,
        s2RangeEnd,
    );

    scanner2X += scanner2speed;
}

function createScanner(
    scannerX,
    scannerY,
    scannerWidth,
    scannerHeight,
    scannerColor,
) {
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
    const particleColor = r.SKYBLUE;

    r.DrawRectangle(
        particleX,
        particleY,
        particleWidth,
        particleHeight,
        particleColor,
    );
}

function draw() {
    const scanner1Height = REGIONHEIGHT;
    const scanner1Y = 0;

    const scanner2Height = REGIONHEIGHT;
    const scanner2Y = 0;

    const pf1RangeStart = 200;
    const pf1RangeEnd = m.half(REGIONWIDTH);
    const pf1TouchPoint = m.sub(pf1RangeStart, scanner1Width);

    const pf2RangeStart = 480;
    const pf2RangeEnd = 500;
    const pf2TouchPoint = m.sub(pf2RangeStart, scanner2Width);

    const scanner1Color =
        t.isOverLapping(scanner1X, pf1TouchPoint, pf1RangeEnd) ||
        t.isOverLapping(scanner1X, pf2TouchPoint, pf2RangeEnd)
            ? r.ColorAlpha(r.RED, 0.7)
            : r.WHITE;

    const scanner2Color =
        t.isOverLapping(scanner2X, pf2TouchPoint, pf2RangeEnd) ||
        t.isOverLapping(scanner2X, pf1TouchPoint, pf1RangeEnd)
            ? r.ColorAlpha(r.RED, 0.7)
            : r.WHITE;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createParticle(pf1RangeStart, pf1RangeEnd);
    createParticle(pf2RangeStart, pf2RangeEnd);

    createScanner(
        scanner1X,
        scanner1Y,
        scanner1Width,
        scanner1Height,
        scanner1Color,
    );
    createScanner(
        scanner2X,
        scanner2Y,
        scanner2Width,
        scanner2Height,
        scanner2Color,
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
