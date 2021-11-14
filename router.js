var express = require('express');
var router = express.Router();

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
router.get('/upload', function (req, res) {
    res.send('upload');
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