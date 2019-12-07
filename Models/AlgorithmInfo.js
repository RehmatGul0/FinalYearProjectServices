const mongoose = require('mongoose');


const algorithmInfoSchema = mongoose.Schema({
    _numOfClusters : Number ,
    _maxIterations : Number , 
    _randomState : Number ,
    _init : String , 
    _initialIterations: Number,
    _algorithm : { type : mongoose.Types.ObjectId , ref : 'Algorithm'},
    _model : mongoose.Types.Buffer
});

module.exports = algorithmInfoSchema;
