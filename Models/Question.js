const mongoose = require('mongoose');
const algorithmInfoSchema = require ('AlgorithmInfo.js');

const questionSchema = mongoose.Schema({
    _question : { type :String, require :true },
    _dataFilepath : { type :String, require :true },
    _answerPath : { type :String, require :true }, 
    _adminId : { type : mongoose.Types.ObjectId , ref : 'User' , required : true},
    _domainId : { type : mongoose.Types.ObjectId , ref : 'Domain' , required : true},
    _algorithmInfo : algorithmInfoSchema
});
module.exports.Question = mongoose.model('Question',questionSchema);
