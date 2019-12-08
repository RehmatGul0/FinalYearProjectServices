const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
   _name : { type :String, required :true },
   _questionId : {type : mongoose.Types.ObjectId , ref : 'Question' , required : true}
});

module.exports.Feature = mongoose.model('Feature',featureSchema);
