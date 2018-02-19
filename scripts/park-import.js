#!/usr/bin/env node

const ogr2ogr = require('ogr2ogr'),
      mongoose = require('mongoose'),
      Park = require('../models/park'),
      parkfile = process.argv[2];

mongoose.connect('mongodb://localhost/walkspot');

var ogr = ogr2ogr(parkfile)
        .format('GeoJSON')
        .options(['-t_srs', 'EPSG:4326'])
        .skipfailures()
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return;
            };
            let count = 0;
            data.features.map(item => {

                let park = new Park({
                    objectid: item.properties.OBJECTID,
                    name: item.properties.NAME,
                    geometry: item.geometry
                })

                park.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    count++;
                    console.log('success!');
                });

                return park;
            });

            console.log('Processed ' + count + ' items');
            // process.exit();
        });
