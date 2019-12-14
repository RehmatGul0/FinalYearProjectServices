const mongoose = require('mongoose');
const algorithmInfoSchema = require ('./AlgorithmInfo');

const questionSchema = mongoose.Schema({
    _question : { type :String, require :true },
    _dataFilepath : { type :String, require :true },
    _answerPath : { type :String, require :true }, 
    _adminEmail : { type : String , ref : 'User' , required : true},
    _domainId : { type : mongoose.Types.ObjectId , ref : 'Domain' , required : true},
    _algorithmInfo : algorithmInfoSchema
});
module.exports.Question = mongoose.model('Question',questionSchema);
