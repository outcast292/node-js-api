var express = require('express');
var router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var path = require('path');

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route

router.get('/', function (req, res) {
    res.sendFile(path.resolve('static/index.html'));
});
router.get('/start', function (req, res) {
    res.send('start');
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    // check for password correctness
    if (req.body.password !== user.password)
        return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign({
        name: user.name,
        id: user._id,
    },
        "meriam123"
    );
    res.header("auth-token", token).json({
        error: null,
        data: {
            message: "Login successful",
            token: token
        },
    });
});

router.post("/register", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.json({ error: null, data: savedUser });
    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = router;