const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const modules = require("./modules/index.js");

const { DEBUG, PORT, CERT, KEY, PORTS } = process.env;

const app = express();
const port = PORTS ? parseInt(PORTS) : (PORT ? parseInt(PORT) : 3100);

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

if(CERT && KEY && PORTS)
    https.createServer({
        key: fs.readFileSync(KEY, "utf-8"),
        cert: fs.readFileSync(CERT, "utf-8")
    }, app).listen(port);
else
    http.createServer(app).listen(port);