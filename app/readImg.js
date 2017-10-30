const Q = require("q");
const jimp = require("jimp");
const getPixels = require("get-pixels");

const group = (response) => {
	return response.reduce(function(a, b, c) {
		if (c % 4 === 0 && c !== 0) {
			a.push([]);
		}
		a[a.length - 1].push(b);
		return a;
	}, [[]]);
};

module.exports = (src, config) => {
    const d = Q.defer();

    jimp.read(src, (err, lenna) => {
        if (err) {
            return d.reject(err);
        }

        lenna
            .resize(config.panelSize * config.panelsX, config.panelSize * config.panelsY)
            .quality(60)
            .getBuffer(jimp.MIME_JPEG, (err, buffer) => {
                getPixels(buffer, jimp.MIME_JPEG, (err, pixels) => {
                    d.resolve(group(pixels.data));
                });
            });
    });

    return d.promise;
};