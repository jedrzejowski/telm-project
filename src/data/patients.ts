import {InferType, object, string} from "yup";
import {WithId, yup_date_transform} from "./_";

export const PatientY = object({
    id: string().uuid(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    name3: string().nullable().transform(value => value ?? null).defined(),
    pesel: string().nullable().transform(value => value ?? null).defined(),
    sex: string<'M' | 'F' | 'O'>().matches(/^(O|F|M)$/).defined().required(),
    date_of_birth: string().transform(yup_date_transform).defined().required(),
    date_of_death: string().transform(yup_date_transform).nullable().defined(),
}).defined().required();

export type PatientT = InferType<typeof PatientY>;
export type PatientRa = WithId<PatientT>;

export function patient2str(patient: PatientT) {
    return patient.name1 + " " + patient.name2;
}