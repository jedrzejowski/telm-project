import {boolean, InferType, number, object, string} from "yup";
import {WithId, yup_timestamp_transform} from "./_";
import {numeric} from "../lib/yup-utils";

export const ExaminationY = object({
    id: string().uuid(),
    personel_id: string().uuid().defined().required(),
    hospitalization_id: string().uuid().defined().required(),
    patient_id: string().uuid(),
    timestamp: string().transform(yup_timestamp_transform).defined().required(),
    pulse: numeric(3, 0).defined().nullable().default(null),
    temperature: numeric(4, 2).defined().nullable().default(null),
    blood_pressure1: numeric(3, 0).defined().nullable().default(null),
    blood_pressure2: numeric(3, 0).defined().nullable().default(null),
    stool: boolean().defined().nullable().default(null),
    urine: numeric(6, 3).defined().nullable().default(null),
    mass: numeric(6, 3).defined().nullable().default(null),
    comment: string().defined().nullable().default(null),
}).defined().required()

export type ExaminationT = InferType<typeof ExaminationY>;
export type ExaminationRa = WithId<ExaminationT>;
