const express = require('express');
const app = express();
var router = require("./router");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");



mongoose.connect(
    'mongodb://localhost:27017/mydbone', {
    useNewUrlParser: true,
    user: "username",
    pass: "password"
},
// mongoose.connect(
//     "mongodb+srv://test:<password>@cluster0.7mwk5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// },
    () => console.log("connected to db")
);


app.use(express.json()); // for body parser

app.use(fileUpload());
app.use('/', router);

app.listen(8888, () => console.log("server has started"));