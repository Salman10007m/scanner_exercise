const sketch = require("./sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const WIDTH = 800;
    const HEIGHT = 800;
    const FPS = 60;

    const world = sketch.setup(WIDTH, HEIGHT, FPS);
    loop(world);
    sketch.teardown();
}

main();
