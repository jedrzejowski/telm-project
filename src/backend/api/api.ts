import express from "express";
import patients from "./patients";
import personel from "./personel";
import hospitalizations from "./hospitalizations";
import examinations from "./examinations";
import passport from "passport";
import {querySelectPersona} from "../data/personel";
import {AppPermissions, WhoAmI} from "../../types";
import {personel2str} from "../../data/personel";
import logReqRes from "../logReqRes";
import ensureLoggedIn from "../lib/ensureLogin";

const api = express.Router();

api.use(logReqRes);

api.post("/login",
    passport.authenticate("basic"),
    (req, res) => {
        res.send({status: "ok", data: req.user});
    });

api.all("/logout",
    (req, res) => {
        req.logOut();
        res.send({status: "ok"});
    });

api.get("/whoami",
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

        res.status(200).json(body);
    });

api.use("/patients", ensureLoggedIn(), patients)
api.use("/personel", ensureLoggedIn(), personel)
api.use("/hospitalizations", ensureLoggedIn(), hospitalizations)
api.use("/examinations", ensureLoggedIn(), examinations)

export default api;
