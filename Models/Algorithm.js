const mongoose = require('mongoose');

const algorithmSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId , 
    _name : { type :String, require :true }
});

module.exports.Algorithm = mongoose.model('Algorithm',algorithmSchema);