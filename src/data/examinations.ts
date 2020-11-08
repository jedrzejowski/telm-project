import {InferType, number, object, string} from "yup";
import {yup_timestamp_transform} from "./_";
import {numeric} from "../lib/yup-utils";

export const ExaminationY = object({
    id: string().uuid(),
    personel_id: string().uuid().defined().required(),
    hospitalization_id: string().uuid().defined().required(),
    patient_id: string().uuid(),
    timestamp: string().transform(yup_timestamp_transform).defined().required(),
    pulse: string().nullable().matches(/^\d{2,3}\/\d{2}$/).defined().nullable().default(null),
    temperature: numeric(4, 2).defined().nullable().default(null),
    blood_pressure: numeric(4).defined().nullable().default(null),
    stool: numeric(6, 3).defined().nullable().default(null),
    urine: numeric(6, 3).defined().nullable().default(null),
    mass: numeric(6, 3).defined().nullable().default(null),
    comment: string().defined().nullable().default(null),
}).defined().required()

export type ExaminationT = InferType<typeof ExaminationY>;
