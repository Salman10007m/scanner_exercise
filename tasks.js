function moveScanner(scannerX, scannerSpeed, rangeStart, rangeEnd) {
    const speed =
        scannerX <= rangeStart || scannerX >= rangeEnd
            ? -scannerSpeed
            : scannerSpeed;

    return speed;
}

function isOverLapping(scannerRoute, pfRangeTouch, pfRangeEnd) {
    const isOverLapping =
        scannerRoute >= pfRangeTouch && scannerRoute <= pfRangeEnd
            ? true
            : false;

    return isOverLapping;
}

module.exports = {
    moveScanner,
    isOverLapping,
};
