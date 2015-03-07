var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.success);
    var attributes = {};
    attributes["title"] = "User List page";
    if (req.query.error == 1){
        attributes["errormessage"] = "There was an error while trying to draw the character!"
    }else {
        if (req.query.success == 1) {
            attributes["successmessage"] = "Just memorized the character! " +
            "You can see it right there in the laaaaast row:"
        }
        User.find(function (err, users) {
            if (err) attributes["errormessage"] = attributes["errormessage"] +
            "\nThere was an error while trying to get the list of characters!";
            else attributes["userlist"] = users;
            res.render('users', attributes);
        });
    }
});

/* GET add new user page. */
router.get('/newuser', function(req, res, next) {
    res.render('newuser',{"title" : "Add New User page"})
});

/* POST add user service using mongoose */
router.post('/adduser',function(req,res,next){
    var username = req.body.name;
    var useremail = req.body.email;
    var userpassword = req.body.password;
    var entry = {};
    if (username != "")
        entry["username"] = username;
    if (useremail != "")
        entry["email"] = useremail;
    if (userpassword != "")
        entry["password"] = userpassword;

    var user = new User(entry);
    user.save(function (err,user){
        if (err) res.redirect('/users/?error=1')
        res.redirect('/users/?success=1')
    });
});

module.exports = router;

/* OLD POST METHOD USING MONK
// POST add user service
router.post('/adduser',function(req,res,next){
    var db=req.db;
    var collection = db.get('usercollection');

    var username = req.body.name;
    var useremail = req.body.email;
    var userpassword = req.body.password;
    var entry = {};
    if (username != "")
        entry["username"] = username;
    if (useremail != "")
        entry["email"] = useremail;
    if (userpassword != "")
        entry["password"] = userpassword;


    collection.insert(entry,function(err,doc){
        if (err){
            res.redirect('/users/?error=1')
        }else {
            res.redirect('/users/?success=1')
        }
    });

});
*/


/* OLD GET METHOD USING MONK
// GET users listing.
router.get('/', function(req, res, next) {
    console.log(req.query.success);
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        var attributes = {};
        attributes["title"] = "User List page";
        attributes["userlist"] = docs;
        if (req.query.error == 1){
            attributes["errormessage"] = "There was an error while trying to draw the character!"
        }
        if (req.query.success == 1){
            attributes["successmessage"] = "Just memorized the character! You can see it right there in the laaaaast row:"
        }
        res.render('users', attributes);
    });
});
 */