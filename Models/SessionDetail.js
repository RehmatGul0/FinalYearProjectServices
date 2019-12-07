const mongoose = require('mongoose');

const sessionDetailSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    _sessionId : { type :String, require :true },
    _isActive : Boolean,
    _createdAt : { type :Date, require :true },
    _expireAt : { type :Date, require :true },
    _userId : {type :mongoose.Types.ObjectId , ref : 'User' , require :true}
});
sessionDetailSchema.index({_sessionId:1});
module.exports.SessionDetail = mongoose.model('SessionDetail',sessionDetailSchema);
