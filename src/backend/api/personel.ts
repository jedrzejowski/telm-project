import createQueryRouter from "../lib/createQueryRouter";
import {
    PersonelFilterY,
    queryCreatePersonel,
    querySelectPersona,
    querySelectPersonel,
    queryUpdatePersonel
} from "../data/personel";
import {PersonelY} from "../../data/personel";

const personel = createQueryRouter("patients", {
    objectSchema: PersonelY,
    filterSchema: PersonelFilterY,
    querySelectOne: querySelectPersona,
    querySelectMany: querySelectPersonel,
    queryUpdate: queryUpdatePersonel,
    queryCreate: queryCreatePersonel
});

export default personel;
