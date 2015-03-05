var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/helloworld', function(req, res, next) {
    res.render('hw', { title: 'Hey World, how are ya!?' });
});

module.exports = router;
