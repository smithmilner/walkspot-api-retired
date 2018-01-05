const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3001,
    walkersRoutes = require('./api/routes/walkerRoutes'),
    mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/walkspot');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/walkers', walkersRoutes);

app.use('/', function(req, res) {
    res.json({ message: 'Welcome to walkspot' });
});

app.use(function(req, res) {
    res.status(404).send({ message: req.originalUrl + ' not found' })
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});
