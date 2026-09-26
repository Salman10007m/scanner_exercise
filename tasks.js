function moveScanner(scannerX, scannerSpeed, rangeStart, rangeEnd) {
    return scannerX <= rangeStart || scannerX >= rangeEnd
        ? -scannerSpeed
        : scannerSpeed;
}

function isOverLapping(scannerRoute, pfRangeTouch, pfRangeEnd) {
    return scannerRoute >= pfRangeTouch && scannerRoute <= pfRangeEnd
        ? true
        : false;
}

module.exports = {
    moveScanner,
    isOverLapping,
};
