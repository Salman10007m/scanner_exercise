function moveScanner(scannerX, scannerSpeed, rangeStart, rangeEnd) {
    return scannerX <= rangeStart || scannerX >= rangeEnd
        ? -scannerSpeed
        : scannerSpeed;
}

module.exports = {
    moveScanner,
};
