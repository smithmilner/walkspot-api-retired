var passport = require('passport'),
    passportJWT = require('passport-jwt'),
    ExtractJwt = passportJWT.ExtractJwt,
    Strategy = passportJWT.Strategy,
    Account = require('./models/account'),
    config = require('./config/database');

var options = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = {
    initialize: function() {
        var strategy = new Strategy(options, function(payload, done) {
            Account.findById(payload.id, function(err, user) {
                if (err) {
                    // something went wrong.
                    return done(err, false);
                }

                if (user) {
                    // user is found
                    done(null, user);
                } else {
                    // user not found
                    done(null, false);
                }
            });
        });

        passport.use(strategy);

        return passport.initialize();
    },
    authenticate: function() {
        return passport.authenticate('jwt', { session: false });
    }
};