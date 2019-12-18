const mongoose = require('mongoose');


const modelInfoSchema = mongoose.Schema({
    _modelFilePath : { type :String, required :true },
    _dataFilePath : { type :String, required :true },
    _algorithm : { type : mongoose.Types.ObjectId , required:true , ref : 'Algorithm'},
    _model : Buffer
});

module.exports.ModelInfo = mongoose.model('ModelInfo',modelInfoSchema);
