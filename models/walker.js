let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WalkerSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Walker', WalkerSchema);
