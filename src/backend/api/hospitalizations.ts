import createQueryRouter from "../lib/createQueryRouter";
import {HospitalizationShortY, HospitalizationY} from "../../data/hospitalization";
import {
    queryCreateHospitalization,
    querySelectHospitalization,
    querySelectHospitalizations,
    queryUpdateHospitalization
} from "../data/hospitalizations";
import {string} from "yup";

const hospitalizations = createQueryRouter("patients", {
    fullObjValidate: HospitalizationY,
    shortObjValidate: HospitalizationShortY,
    filterValidate: {
        name: string()
    },
    querySelectOne: querySelectHospitalization,
    querySelectMany: querySelectHospitalizations,
    queryUpdate: queryUpdateHospitalization,
    queryCreate: queryCreateHospitalization
});

export default hospitalizations;
