import {InferType, number, object, string} from "yup";
import {yup_timestamp_transform} from "./_";

export const ExaminationY = object({
    id: string().uuid(),
    personel_id: string().uuid().defined().required(),
    hospitalization_id: string().uuid().defined().required(),
    patient_id: string().uuid(),
    timestamp: string().transform(yup_timestamp_transform).defined().nullable(),
    pulse: string().nullable().matches(/^\d{2,3}\/\d{2}$/).defined().nullable(),
    temperature: number().defined().min(25).max(50).nullable(),
    blood_pressure: number().defined().nullable(),
    stool: number().defined().positive().nullable(),
    urine: number().defined().positive().nullable(),
    mass: number().defined().positive().nullable(),
    comment: string().defined().nullable(),
}).defined().required()

export type ExaminationT = InferType<typeof ExaminationY>;