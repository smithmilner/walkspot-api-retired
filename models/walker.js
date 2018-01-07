var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WalkerSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Walker', WalkerSchema);