import {InferType, object, string} from "yup";
import {uuid_regex} from "../regex";
import {dayjs_yup_helper} from "./_";

export const PatientY = object({
    name1: string().defined().required(),
    name2: string().defined().required(),
    name3: string().nullable().transform(value => value ?? null).defined(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    sex: string<'M' | 'F' | 'O'>().matches(/^(O|F|M)$/).defined().required(),
    date_of_birth: string().transform(dayjs_yup_helper).defined().required(),
    date_of_death: string().transform(dayjs_yup_helper).nullable().defined(),
}).defined();

export const PatientRowY = object({
    patient_id: string().uuid().defined(),
}).concat(PatientY).defined();

export const PatientShortY = object({
    patient_id: string().uuid().defined(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    date_of_birth: string().transform(dayjs_yup_helper).defined().required(),
}).defined();

export type PatientRowT = InferType<typeof PatientRowY>;
export type PatientT = InferType<typeof PatientY>;
export type PatientShortT = InferType<typeof PatientShortY>;

