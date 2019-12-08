const mongoose = require('mongoose');

const algorithmSchema = mongoose.Schema({
    _name : { type :String, required :true }
});

module.exports.Algorithm = mongoose.model('Algorithm',algorithmSchema);