const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
   _id : mongoose.Types.ObjectId,
   _name : { type :String, require :true },
   _questionId : {type : mongoose.Types.ObjectId , ref : 'Question' , require : true}
});

module.exports.Feature = mongoose.model('Feature',featureSchema);
