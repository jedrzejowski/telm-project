import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import expressSession from "express-session";
import "./passport";
import api from "./api/api";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
    secret: "qwewqeqwe",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("./dist/public"));

app.post("/login",
    passport.authenticate("default"),
    (req, res) => {
        res.send({status: "ok", data: req.user});
    });

app.post("/logout",
    (req, res) => {
        req.logOut();
        res.send({status: "ok"});
    });

app.use("/api", api);

app.listen(8080);
