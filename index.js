const express = require('express');
const app = express();
var private_router = require("./routes/private_routes");
var public_router = require("./routes/public_routes");
var validate_token = require("./validate-token");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(
    'mongodb://localhost:27017/mydbone', {
    useNewUrlParser: true,
    user: "username",
    pass: "password"
},
    () => console.log("connected to db")
);
app.use(express.json()); 
app.use(cors({
    origin: '*'
}));
app.use(fileUpload());
app.use('/api/', validate_token,private_router);
app.use('/', public_router);

app.listen(8888, () => console.log("server has started"));