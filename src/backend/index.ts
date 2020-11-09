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
import {querySelectPersona} from "./data/personel";
import {personel2str} from "../data/personel";
import type {AppPermissions, WhoAmI} from "../types";

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
    secret: "qwewqeqwe",
    resave: false,
    saveUninitialized: false,
}))

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

app.post("/login",
    passport.authenticate("basic"),
    (req, res) => {
        res.send({status: "ok", data: req.user});
    });

app.all("/logout",
    (req, res) => {
        req.logOut();
        res.send({status: "ok"});
    });

app.get("/whoami",
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401).send({error: "unauthorized"})
            return;
        }

        const personel = await querySelectPersona(req.user as string, "id");

        if (!personel || !personel.username) {
            res.status(401).send({error: "unauthorized"})
            return;
        }

        const permissions: AppPermissions = {
            patients: {edit: true},
            hospitalizations: {edit: true},
            examinations: {edit: true},
            personel: {edit: false},
        };

        if (personel.is_admin) {
            permissions.personel.edit = true;
        }

        const body: WhoAmI = {
            id: personel.username,
            fullName: personel2str(personel),
            permissions
        };
        res.send(body);
    });

app.use("/api", api);

app.listen(8080);
