import {InferType, object, string} from "yup";
import {uuid_regex} from "../regex";
import {dayjs_yup_helper} from "./_";

export const PatientShortY = object({
    patient_id: string().matches(uuid_regex).defined(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    date_of_birth: string().transform(dayjs_yup_helper).defined().required(),
}).defined();

export const PatientY = object({
    name1: string().defined().required(),
    name2: string().defined().required(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    date_of_birth: string().transform(dayjs_yup_helper).defined().required(),
    name3: string().nullable().transform(value => value ?? null).defined(),
    sex: string<'M' | 'F' | 'O'>().matches(/^(O|F|M)$/).defined().required(),
    date_of_death: string().transform(dayjs_yup_helper).nullable().defined(),
}).concat(PatientShortY).defined();

export const PatientWithIdY = object({
    patient_id: string().matches(uuid_regex).defined(),
}).concat(PatientY).defined();

export type PatientWithIdT = InferType<typeof PatientWithIdY>;
export type PatientT = InferType<typeof PatientY>;
export type PatientShortT = InferType<typeof PatientShortY>;

