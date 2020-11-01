import express from "express";
import eam from "../eam";
import {PatientY, PatientWithIdY} from "../../data/patient";
import {insertPatient, patientQueryY, selectPatient, selectPatients, updatePatient} from "../data/patients";

const patients = express.Router();

patients.get("/", eam(async (req, res) => {
    const query = await patientQueryY.validate(req.query);

    res.status(200).send({
        status: "success",
        result: await selectPatients(query),
    });
}));

patients.get("/:patient_id", eam(async (req, res) => {
    const patient_id = req.params.patient_id as string;

    const patient = await selectPatient(patient_id);

    if (!patient) {
        res.status(404).send({
            status: "error",
            error: "not found"
        });
    } else {
        res.status(200).send({
            status: "success",
            patient
        });
    }
}));

patients.post("/", eam(async (req, res) => {
    const patient = await PatientY.validate(req.body);

    res.status(200).send({
        status: "success",
        patient: await insertPatient(patient)
    });
}));

patients.put("/:patient_id", eam(async (req, res) => {
    const patient_id = req.params.patient_id as string;
    const patient = await PatientY.validate(req.body);

    res.status(200).send({
        status: "success",
        patient: await updatePatient(patient_id, patient)
    });
}));

export default patients;
