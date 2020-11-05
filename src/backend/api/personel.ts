import createQueryRouter from "../lib/createQueryRouter";
import {string} from "yup";
import {queryCreatePersonel, querySelectPersona, querySelectPersonel, queryUpdatePersonel} from "../data/personel";
import {PersonelShortY, PersonelY} from "../../data/personel";

const personel = createQueryRouter("patients", {
    fullObjValidate: PersonelY,
    shortObjValidate: PersonelShortY,
    filterValidate: {
        name1: string()
    },
    querySelectOne: querySelectPersona,
    querySelectMany: querySelectPersonel,
    queryUpdate: queryUpdatePersonel,
    queryCreate: queryCreatePersonel
});

export default personel;
