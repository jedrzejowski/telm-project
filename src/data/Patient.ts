import {boolean, date, object, string} from "yup";
import {date_regex, username_regex, uuid_regex} from "../regex";
import dayjs = require("dayjs");

export interface PatientT {
    patient_id: string
    name1: string
    name2: string
    name3: string | null
    pesel: string | null
    sex: 'M' | 'F' | 'O'
    date_of_birth: string
    date_of_death: string
}

export const PatientY = object<PatientT>({
    patient_id: string().matches(uuid_regex).required(),
    name1: string().required(),
    name2: string().required(),
    name3: string().nullable().default(null).required(),
    pesel: string().nullable().default(null).required(),
    sex: string<PatientT["sex"]>().matches(/^(O|F|M)$/).required(),
    date_of_birth: string().transform(date => dayjs(date).format("YYYY-MM-DD")).matches(date_regex).required(),
    date_of_death: string().transform(date => dayjs(date).format("YYYY-MM-DD")).matches(date_regex).nullable().default(null).required(),
});
