import {InferType, object, string} from "yup";
import {RaRecord, yup_timestamp_transform} from "./_";

export const HospitalizationY = object({
    id: string().uuid(),
    patient_id: string().uuid().defined().required(),
    time_start: string().transform(yup_timestamp_transform).required().defined(),
    time_end: string().nullable().transform(yup_timestamp_transform).default(null).defined(),
    personel_id_start: string().uuid().defined().required(),
    personel_id_end: string().uuid().nullable().default(null).defined(),
    comment_start: string().nullable().default(null).defined(),
    comment_end: string().nullable().default(null).defined(),
}).defined().required();

export type HospitalizationT = InferType<typeof HospitalizationY>;
export type HospitalizationRa = RaRecord<HospitalizationT>;
