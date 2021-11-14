var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var path = require('path');

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route


router.get('/start', function (req, res) {
    console.log("Request handler 'start' was called.");
    setTimeout(function () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello start");
        res.end();
    }, 60000);
});
router.get('/find', function (req, res) {
    var exec = require("child_process").exec;

    exec("find /",
        { timeout: 10000, maxBuffer: 20000 * 1024 },
        function (error, stdout, stderr) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(stdout);
            res.end();
        });
});
router.post('/upload', async (req, res) => {
    let image;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "image") is used to retrieve the uploaded file
    image = req.files.image;
    tempPath = req.user.id + '-' + Date.now() + "-" + image.name;
    uploadPath = path.resolve('uploads/' + tempPath);
    console.log(uploadPath);
    // Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath, async function (err) {
        if (err)
            return res.status(500).send(err);
        var user = await User.findOne({ id: req.user.id });
        user.image = tempPath;
        await user.save();
        res.send('File uploaded!');
    });
});
router.get('/show', async (req, res) => {
    const user = await User.findOne({ id: req.user.id });
    res.sendFile(path.resolve("uploads/" + user.image))
});

router.get('/logout', function (req, res) {
    res.send('logout');
});



module.exports = router;