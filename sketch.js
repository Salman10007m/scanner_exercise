const r = require("raylib");
const t = require("./tasks");

const REGIONWIDTH = 720;
const REGIONHEIGHT = 480;
const FPS = 60;

const scannerWidth = 50;
const scannerHeight = REGIONHEIGHT;

const rangeStart = 0;
const rangeEnd = REGIONWIDTH - scannerWidth;

let scannerX = 0;
const scannerY = 0;

let scannerSpeed = -1;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(REGIONWIDTH, REGIONHEIGHT, "Scanner");
    r.SetTargetFPS(FPS);
}

function update() {
    scannerSpeed = t.moveScanner(scannerX, scannerSpeed, rangeStart, rangeEnd);
    scannerX += scannerSpeed;
}

function createScanner() {
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, r.WHITE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    createScanner();

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
