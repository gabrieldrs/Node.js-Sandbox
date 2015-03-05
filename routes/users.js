var express = require('express');
var router = express.Router();

/* GET users listing. */
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

/* GET add new user page. */
router.get('/newuser', function(req, res, next) {
    res.render('newuser',{"title" : "Add New User page"})
});

/* POST add user service*/
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


module.exports = router;
