import {InferType, object, string} from "yup";
import {yup_date_transform} from "./_";

export const PatientY = object({
    id: string().uuid(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    name3: string().nullable().transform(value => value ?? null).defined(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    sex: string<'M' | 'F' | 'O'>().matches(/^(O|F|M)$/).defined().required(),
    date_of_birth: string().transform(yup_date_transform).defined().required(),
    date_of_death: string().transform(yup_date_transform).nullable().defined(),
}).defined();

export const PatientShortY = object({
    id: string().uuid().required().defined(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    date_of_birth: string().transform(yup_date_transform).defined().required(),
}).defined().strip(true);

export type PatientT = InferType<typeof PatientY>;
export type PatientShortT = InferType<typeof PatientShortY>;

