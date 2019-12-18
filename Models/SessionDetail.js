const mongoose = require('mongoose');

const sessionDetailSchema = mongoose.Schema({
    _token : { type :String, required :true , unique : true},
    _email : { type :String, required :true },
    _isActive : { Boolean , default :true},
    _expireAt : { type :Date, required :true },
    _userId : {type :mongoose.Types.ObjectId , ref : 'User' , required :true}
});
sessionDetailSchema.index({_cookie:1,_email:1});
module.exports.SessionDetail = mongoose.model('SessionDetail',sessionDetailSchema);
