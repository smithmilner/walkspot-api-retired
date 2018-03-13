let mongoose = require('mongoose');
let Schema = mongoose.Schema;

require('mongoose-geojson-schema');

let ParkSchema = new Schema({
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
