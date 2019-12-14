const mongoose = require('mongoose');


const algorithmInfoSchema = mongoose.Schema({
    _numOfClusters : {type : Number , require : true} ,
    _maxIterations : Number , 
    _randomState : Number ,
    _init : String , 
    _initialIterations: Number,
    _algorithmId : { type : mongoose.Types.ObjectId , require:true , ref : 'Algorithm'},
    _model : Buffer
});

module.exports = algorithmInfoSchema;
