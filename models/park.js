var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
var Schema = mongoose.Schema;

var ParkSchema = new Schema({
    objectid: {
        type: Number,
        unique: true
    },
    name: String,
    geometry: mongoose.Schema.Types.Geometry
});

ParkSchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('Park', ParkSchema);