import createQueryRouter from "../lib/createQueryRouter";
import {HospitalizationY} from "../../data/hospitalizations";
import {
    HospitalizationFilterY,
    queryCreateHospitalization,
    querySelectHospitalization,
    querySelectHospitalizations,
    queryUpdateHospitalization
} from "../data/hospitalizations";

const hospitalizations = createQueryRouter("patients", {
    objectSchema: HospitalizationY,
    filterSchema: HospitalizationFilterY,
    querySelectOne: querySelectHospitalization,
    querySelectMany: querySelectHospitalizations,
    queryUpdate: queryUpdateHospitalization,
    queryCreate: queryCreateHospitalization
});

export default hospitalizations;
