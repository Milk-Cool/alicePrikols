const express = require("express");
const modules = require("./modules/index.js");

const app = express();
const port = 3100;

const { DEBUG } = process.env;

app.use(express.json());

for(let i in modules) {
    app.post("/" + i, (req, res) => {
        if(DEBUG) {
            console.log("REQUEST");
            console.log(req.body);
        }
        const respsonse = modules[i](req.body);
        if(DEBUG) {
            console.log("RESPONSE");
            console.log(respsonse);
        }
        res.status(200).send(respsonse);
    });
}

app.listen(port, () => {
    console.log("Listening:", port);
});