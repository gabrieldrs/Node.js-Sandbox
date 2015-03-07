var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username :  String,
    password :  String,
    email :     String
});

userSchema.methods.getInfo = function(){
    var name = this.username;
    var id = this._id;
    var message = this._id ?
        this._id + ":" +
        this.name ?
            this.name
            :   "I'm an unnamed person!"
        : "I don't have an id (How odd) : " +
    this.name ?
        this.name
        :   "I'm an unnamed person!"
    return message;
}

module.exports = mongoose.model('User',userSchema);