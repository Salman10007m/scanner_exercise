function isOutOfBound(start, startPos, endTouch) {
    return start < startPos || start > endTouch;
}

function calcVelocity(start, velocity, startPos, endPos, dSize) {
    const endTouch = endPos - dSize;

    return isOutOfBound(start, startPos, endTouch) ? -velocity : velocity;
}

function calcDirection(start, velocity) {
    return start + velocity;
}

function isOverLapping(dStart, dWidth, fStart, fWidth) {
    const dEnd = dStart + dWidth;
    const fEnd = fStart + fWidth;

    return dStart < fEnd && fStart < dEnd;
}

function overLapping(dStart, dWidth, f1Start, f1Width, f2Start, f2Width) {
    const isF1OverLapping = isOverLapping(dStart, dWidth, f1Start, f1Width);
    const isF2OverLapping = isOverLapping(dStart, dWidth, f2Start, f2Width);

    return isF1OverLapping || isF2OverLapping;
}

module.exports = {
    calcVelocity,
    calcDirection,
    isOverLapping,
    overLapping,
};
