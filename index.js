const express = require("express");
const modules = require("./modules/index.js");

const { DEBUG, PORT } = process.env;

const app = express();
const port = PORT ? parseInt(PORT) : 3100;

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