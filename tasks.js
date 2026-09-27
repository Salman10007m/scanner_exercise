function moveScanner(scannerCoord, scannerSpeed, rangeStart, rangeEnd) {
    const speed =
        scannerCoord <= rangeStart || scannerCoord >= rangeEnd
            ? -scannerSpeed
            : scannerSpeed;

    return speed;
}

function isOverLapping(scannerRoute, pfRangeStart, pfRangeEnd, pfsize) {
    const pfRangeTouch = pfRangeStart - pfsize;
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
