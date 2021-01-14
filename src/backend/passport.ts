import passport from "passport";

passport.deserializeUser(function (user: any, done) {
    done(null, user);
});

passport.serializeUser(function (user: any, done) {
    done(null, user);
});