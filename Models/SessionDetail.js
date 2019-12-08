const mongoose = require('mongoose');

const sessionDetailSchema = mongoose.Schema({
    _token : { type :String, require :true , unique : true},
    _email : { type :String, require :true },
    _isActive : { Boolean , default :true},
    _expireAt : { type :Date, require :true },
    _userId : {type :mongoose.Types.ObjectId , ref : 'User' , required :true}
});
sessionDetailSchema.index({_cookie:1,_email:1});
module.exports.SessionDetail = mongoose.model('SessionDetail',sessionDetailSchema);
