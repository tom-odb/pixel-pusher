function chunkBy(size, data) {
    const chunks = [];

    while (data.length > 0) {
        chunks.push(data.splice(0, size));
    }

    return chunks;
}

function reverseUneven(data) {
    return data.map((line, i) => i % 2 > 0 ? line.reverse() : line);
}

function flatten(pixels) {
    return pixels.map(pixel => pixel.map(val => Math.round(val / 32) * 32));
}

function calc(rawData, config) {
    const lines = chunkBy(config.panelSize * config.panelsX, rawData);
    const panels = new Array(config.panelsX * config.panelsY).fill(0).map(item => []);

    lines.forEach((line, i) => {
        const chunks = chunkBy(config.panelSize, line);
        const panelOffset = Math.floor(i / config.panelSize) * config.panelsX;

        chunks.forEach((chunk, j) => {
            panels[j + panelOffset].push(chunk);
        });
    });

    return panels;
}

module.exports = (rawData, config) => calc(flatten(rawData), config);