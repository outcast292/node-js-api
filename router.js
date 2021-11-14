var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const User = require("./models/User");


// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});
router.get('/start', function (req, res) {
    res.send('start');
});
router.get('/find', function (req, res) {
    res.send('find');
});
router.post('/upload', function (req, res) {
    let image;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "image") is used to retrieve the uploaded file
    image = req.files.image;
    uploadPath = __dirname + '/uploads/' + image.name;
    // Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});
router.get('/show', function (req, res) {
    res.sendFile(__dirname + "/uploads/placeholder.jpg")
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    // check for password correctness
    if (req.body.password !== user.password)
        return res.status(400).json({ error: "Password is wrong" });
    res.json({
        error: null,
        data: {
            message: "Login successful",
        },
    });
});

router.get('/logout', function (req, res) {
    res.send('logout');
});

router.post("/register", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    // try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser });
    // } catch (error) {
    // res.status(400).json({ error });
    // }
});


module.exports = router;