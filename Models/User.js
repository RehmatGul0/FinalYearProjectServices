const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    _name : { type :String, require :true },
    _email : { type : String , unique: true },
    _password : { type :String, require :true },
    _isAdmin : { type :String, default :false }
});

userSchema.index({_email:1});
module.exports.User = mongoose.model('User',userSchema);
