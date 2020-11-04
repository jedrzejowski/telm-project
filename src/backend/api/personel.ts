import express from "express";
import eam from "../eam";
import {PersonelY} from "../../data/personel";
import {
    queryInsertPersonel,
    personelQueryY,
    querySelectPersona,
    querySelectPersonel,
    queryUpdatePersonel
} from "../data/personel";

const personel = express.Router();

personel.get("/", eam(async (req, res) => {
    const query = await personelQueryY.validate(req.query);

    res.status(200).send({
        status: "success",
        result: await querySelectPersonel(query),
    });
}));

personel.get("/:personel_id", eam(async (req, res) => {
    const personel_id = req.params.personel_id as string;

    const personel = await querySelectPersona(personel_id);

    if (!personel) {
        res.status(404).send({
            status: "error",
            error: "not found"
        });
    } else {
        res.status(200).send({
            status: "success",
            personel
        });
    }
}));

personel.post("/", eam(async (req, res) => {
    const personel = await PersonelY.validate(req.body);

    res.status(200).send({
        status: "success",
        personel: await queryInsertPersonel(personel)
    });
}));

personel.put("/:personel_id", eam(async (req, res) => {
    const personel_id = req.params.personel_id as string;
    const personel = await PersonelY.validate(req.body);

    res.status(200).send({
        status: "success",
        personel: await queryUpdatePersonel(personel_id, personel)
    });
}));

export default personel;
