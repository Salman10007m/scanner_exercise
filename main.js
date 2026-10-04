const sketch = require("./sketch");

function loop() {
    while (sketch.running()) {
        sketch.update();
        sketch.draw();
    }
}

function main() {
    const WIDTH = 800;
    const HEIGHT = 800;
    const FPS = 60;

    sketch.setup(WIDTH, HEIGHT, FPS);
    loop();
    sketch.teardown();
}

main();
