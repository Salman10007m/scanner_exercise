const r = require("raylib");

function isOverLapping(d, f) {
    const dEnd = d.start + d.size;
    const fEnd = f.start + f.size;

    return d.start < fEnd && f.start < dEnd;
}

function overLaps(d, f1, f2) {
    const isF1OverLapping = isOverLapping(d, f1);
    const isF2OverLapping = isOverLapping(d, f2);

    return isF1OverLapping || isF2OverLapping;
}

function draw(obj) {
    if (obj.direction === "Horizontal") {
        r.DrawRectangle(obj.start, 0, obj.size, obj.screenSize, obj.color);
    } else {
        r.DrawRectangle(0, obj.start, obj.screenSize, obj.size, obj.color);
    }
}

module.exports = {
    overLaps,
    draw,
};
