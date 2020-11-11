import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import {BasicStrategy} from "passport-http";
import expressSession from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import "./passport";
import api from "./api/api";
import getEnv from "./getEnv";
import {authBasic} from "./data/auth";
import logReqRes from "./logReqRes";

const RedisStore = connectRedis(expressSession)
const env = getEnv();
const app = express();
const redisClient = redis.createClient({
    url: env.APP_REDISURL
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
    store: new RedisStore({client: redisClient}),
    secret: env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
}));

passport.use(new BasicStrategy(
    function (username, password, done) {
        authBasic(username, password)
            .then(personel_id => done(null, personel_id))
            .catch(error => done(error));
    }
));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("./dist/public"));

app.use("/api", api);

app.listen(env.APP_PORT);

