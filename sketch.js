const r = require("raylib");
const t = require("./tasks");
const m = require("./math");

const REGIONWIDTH = 800;
const REGIONHEIGHT = 800;
const FPS = 60;

const scanner1Width = 50;
const scanner2Width = 50;
const scanner3Height = 50;

let scanner1X = 0;
let scanner1Speed = -1;

let scanner2X = m.half(REGIONWIDTH);
let scanner2Speed = -2;

let scanner3Y = 0;
let scanner3Speed = -3;

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

    const s2RangeStart = m.half(REGIONWIDTH);
    const s2RangeEnd = m.sub(REGIONWIDTH, scanner2Width);

    const s3RangeStart = 0;
    const s3RangeEnd = m.sub(REGIONHEIGHT, scanner3Height);

    scanner1Speed = t.moveScanner(
        scanner1X,
        scanner1Speed,
        s1RangeStart,
        s1RangeEnd,
    );
    scanner1X += scanner1Speed;

    scanner2Speed = t.moveScanner(
        scanner2X,
        scanner2Speed,
        s2RangeStart,
        s2RangeEnd,
    );
    scanner2X += scanner2Speed;

    scanner3Speed = t.moveScanner(
        scanner3Y,
        scanner3Speed,
        s3RangeStart,
        s3RangeEnd,
    );
    scanner3Y += scanner3Speed;
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

function createParticle(direction, pfRangeStart, pfRangeEnd) {
    const particleColor = r.SKYBLUE;

    if (direction === "Horizontal") {
        const particleX = pfRangeStart;
        const particleY = 0;

        const particleWidth = m.sub(pfRangeEnd, pfRangeStart);
        const particleHeight = REGIONHEIGHT;

        r.DrawRectangle(
            particleX,
            particleY,
            particleWidth,
            particleHeight,
            particleColor,
        );
    } else {
        const particleX = 0;
        const particleY = pfRangeStart;

        const particleWidth = REGIONWIDTH;
        const particleHeight = m.sub(pfRangeEnd, pfRangeStart);

        r.DrawRectangle(
            particleX,
            particleY,
            particleWidth,
            particleHeight,
            particleColor,
        );
    }
}

function draw() {
    const scanner1Height = REGIONHEIGHT;
    const scanner1Y = 0;

    const scanner2Height = REGIONHEIGHT;
    const scanner2Y = 0;

    const scanner3Width = REGIONWIDTH;
    const scanner3X = 0;

    const horizontal = "Horizontal";
    const vertical = "Vertical";

    const pf1RangeStart = 200;
    const pf1RangeEnd = m.half(REGIONWIDTH);
    const pf1TouchPoint = m.sub(pf1RangeStart, scanner1Width);

    const pf2RangeStart = 480;
    const pf2RangeEnd = 500;
    const pf2TouchPoint = m.sub(pf2RangeStart, scanner2Width);

    const pf3RangeStart = 200;
    const pf3RangeEnd = 250;

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

    createParticle(horizontal, pf1RangeStart, pf1RangeEnd);
    createParticle(horizontal, pf2RangeStart, pf2RangeEnd);
    createParticle(vertical, pf3RangeStart, pf3RangeEnd);

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
    createScanner(scanner3X, scanner3Y, scanner3Width, scanner3Height, r.WHITE);

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
