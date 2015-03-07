var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username :  String,
    password :  String,
    email :     String
}, { collection: 'usercollection' });

userSchema.methods.getInfo = function(){
    var name = this.username;
    var id = this._id;
    var message = id ?
        (id + " : " +
            (name ? name : "I'm an unnamed person!")
        )
        : ("I don't have an id (How odd) : " +
            (name ? name : "I'm an unnamed person!")
          );
    return message;
}

module.exports = mongoose.model('User',userSchema);