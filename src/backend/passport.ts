import {BasicStrategy} from "passport-http";
import passport from "passport";
import {getOnePersonelById} from "./data/Personel";

passport.use(new BasicStrategy(
    async function(username, password, done) {
        getOnePersonelById(username)
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