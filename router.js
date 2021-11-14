var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');


// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route

router.get('/', function (req, res) {
    res.redirect('/start')
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
    res.send('show');
});
router.get('/login', function (req, res) {
    res.send('login');
});
router.get('/logout', function (req, res) {
    res.send('logout');
});


module.exports = router;