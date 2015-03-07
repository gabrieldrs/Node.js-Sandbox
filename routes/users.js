var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Array of attributes to pass to the view
    var attributes = {};
    attributes["title"] = "User List page";

    //Check for query parameters
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
            // Log the users queried
            for (var i=0;i<users.length;i++) {
                var temp = new User(users[i]);
                console.log(temp.getInfo());
            }
            // Render the results in the users view
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
    // Get info from post
    var username = req.body.name;
    var useremail = req.body.email;
    var userpassword = req.body.password;

    //Build Json array
    var entry = {};
    if (username != "")
        entry["username"] = username;
    if (useremail != "")
        entry["email"] = useremail;
    if (userpassword != "")
        entry["password"] = userpassword;

    // Create a User mongoose object
    var user = new User(entry);
    // Save and redirect with the proper message
    user.save(function (err,user){
        if (err) res.redirect('/users/?error=1')
        res.redirect('/users/?success=1')
    });
});

module.exports = router;