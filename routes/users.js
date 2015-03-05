var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('users', {
            "title" : "User List page",
            "userlist" : docs
        });
    });
});

/* GET add new user page. */
router.get('/newuser', function(req, res, next) {
    res.render('newuser',{"title" : "Add New User page"})
});

module.exports = router;
