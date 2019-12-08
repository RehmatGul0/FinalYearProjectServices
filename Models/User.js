const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _name : { type :String, required :true },
    _email : { type : String , unique: true },
    _password : { type :String, required :true },
    _isAdmin : { type :String, default :false },
    
});

userSchema.index({_email:1});
module.exports.User = mongoose.model('User',userSchema);
