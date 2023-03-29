"use strict";

const server = require("./ex-main");
const port = 3030;

server.listen(port, '0.0.0.0',() =>
{
    console.log("Local Web Server on port 3030.");
});