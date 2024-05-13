const express = require("express");
const modules = require("./modules/index.js");

const app = express();
const port = 3100;

app.use(express.json());

for(let i in modules) {
    app.post("/" + i, (req, res) => {
        res.status(200).send(modules[i](req.body));
    });
}

app.listen(port, () => {
    console.log("Listening:", port);
});