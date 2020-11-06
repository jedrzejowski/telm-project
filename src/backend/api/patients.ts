import {PatientY} from "../../data/patients";
import {
    PatientFilterY,
    queryCreatePatient,
    querySelectPatient,
    querySelectPatients,
    queryUpdatePatient
} from "../data/patients";
import createQueryRouter from "../lib/createQueryRouter";

const patients = createQueryRouter("patients", {
    objectSchema: PatientY,
    filterSchema: PatientFilterY,
    querySelectOne: querySelectPatient,
    querySelectMany: querySelectPatients,
    queryUpdate: queryUpdatePatient,
    queryCreate: queryCreatePatient
});

export default patients;
