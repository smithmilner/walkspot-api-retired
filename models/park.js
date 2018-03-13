var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-geojson-schema');

var ParkSchema = new Schema({
    objectid: {
        type: Number,
        unique: true
    },
    name: String,
    geometry: mongoose.Schema.Types.Geometry,
    walkers: [{ type: Schema.Types.ObjectId, ref: 'Walker' }]
});

ParkSchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('Park', ParkSchema);
