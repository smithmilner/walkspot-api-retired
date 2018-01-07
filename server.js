const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
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
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./api/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/api/walkers', walkersRoutes);
app.use('/api/users', accountRoutes);

app.use('/user', userRoutes);

app.get('/', function(req, res) {
    res.json({ message: 'Welcome to walkspot' });
});

app.get('*', function(req, res, next) {
    res.status(404).send({ message: req.originalUrl + ' not found' })
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});

module.exports = app;