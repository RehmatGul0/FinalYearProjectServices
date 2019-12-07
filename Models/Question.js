const mongoose = require('mongoose');
const algorithmInfoSchema = require ('AlgorithmInfo.js');

const questionSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    _question : { type :String, require :true },
    _dataFilepath : { type :String, require :true },
    _answerPath : { type :String, require :true }, 
    _adminId : { type : mongoose.Types.ObjectId , ref : 'User' , require : true},
    _domainId : { type : mongoose.Types.ObjectId , ref : 'Domain' , require : true},
    _algorithmInfo : algorithmInfoSchema
});
module.exports.Question = mongoose.model('Question',questionSchema);
