const express = require('express');
const app = express();
var router = require("./router");
const fileUpload = require('express-fileupload');


app.use(fileUpload());
app.use('/', router);

app.listen(8888, () => console.log("server has started"));