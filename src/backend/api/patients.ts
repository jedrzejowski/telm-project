import {PatientY, PatientShortY} from "../../data/patient";
import {
    queryCreatePatient,
    querySelectPatient,
    querySelectPatients,
    queryUpdatePatient
} from "../data/patients";
import createQueryRouter from "../lib/createQueryRouter";
import {string} from "yup";

const patients = createQueryRouter("patients", {
    fullObjValidate: PatientY,
    shortObjValidate: PatientShortY,
    filterValidate: {
        name1: string()
    },
    querySelectOne: querySelectPatient,
    querySelectMany: querySelectPatients,
    queryUpdate: queryUpdatePatient,
    queryCreate: queryCreatePatient
});

export default patients;
