const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const readPixels = require("./readImg");
const parser = require("./pixelParser");

const panelConfig = {
    panelSize: 18,
    panelsX: 3,
    panelsY: 2,
};

app.use(express.static("public"));
app.use(bodyparser.json());

app.route("/img").get((req, res, next) => {
    const img = `${process.cwd()}/app/images/${req.query.img || "minion.jpg"}`;

    readPixels(img, panelConfig)
        .then(
            pixels => res.status(200).json(parser(pixels, panelConfig)),
            err => res.status(500).json(err)
        );
});

app.route("/test").get((req, res) => res.status(200).json({success:true}));

app.route(["/", "/*"]).all((req, res) => res.sendFile(`${process.cwd()}/public/index.html`));

app.listen(4000, () => console.log("Server listening on 4000"));