const express = require('express');
const app = express();
var router = require("./router");


app.use('/', router);

app.listen(8888, () => console.log("server has started"));