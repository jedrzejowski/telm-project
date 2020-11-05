import {BasicStrategy} from "passport-http";
import passport from "passport";

passport.use(new BasicStrategy(
    async function(username, password, done) {
        // User.findOne({ username: userid }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        // });
    }
));

passport.deserializeUser(function (user: any, done) {
    done(null, user);
});

passport.serializeUser(function (user: any, done) {
    done(null, user);
});