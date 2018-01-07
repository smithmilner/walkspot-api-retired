const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    auth = require('./auth'),
    port = process.env.PORT || 3001,
    accountRoutes = require('./api/routes/accountRoutes'),
    walkersRoutes = require('./api/routes/walkerRoutes'),
    userRoutes = require('./api/routes/userRoutes');
    mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/walkspot');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(auth.initialize());

app.use('/api/walkers', walkersRoutes);
app.use('/api/users', accountRoutes);

app.use('/user', userRoutes);

app.get('/', function(req, res) {
    res.json({ message: 'Welcome to the walkspot api.' });
});

app.get('*', function(req, res, next) {
    res.status(404).send({ message: req.originalUrl + ' not found' })
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});

module.exports = app;