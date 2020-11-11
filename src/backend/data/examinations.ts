import {knex} from "../postgresql";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {ExaminationT, ExaminationY} from "../../data/examinations";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yup-utils";
import {HospitalizationY} from "../../data/hospitalizations";
import {InferType, object, string} from "yup";

export async function querySelectExamination(examination_id: string): Promise<ExaminationT | null> {

    const rows = await knex({examination: "examinations"}).select({
        id: "examination.examination_id",
        personel_id: "examination.personel_id",
        patient_id: "pat.patient_id",
        hospitalization_id: "examination.hospitalization_id",
        timestamp: knex.raw(`"examination"."timestamp"::text`),
        pulse: "examination.pulse",
        temperature: "examination.temperature",
        blood_pressure1: "examination.blood_pressure1",
        blood_pressure2: "examination.blood_pressure2",
        stool: "examination.stool",
        urine: "examination.urine",
        mass: "examination.mass",
        comment: "examination.comment",
    }).innerJoin({hosp: "hospitalizations"}, "hosp.hospitalization_id", "examination.hospitalization_id")
        .innerJoin({pat: "patients"}, "pat.patient_id", "hosp.patient_id")
        .where("examination_id", examination_id)
        .then();

    return oneOrNull(rows, ExaminationY)
}

export const ExaminationFilterY = object({
    timestamp: string(),
    patient_id: string().uuid(),
    hospitalization_id: string().uuid(),
}).defined();

export async function querySelectExaminations(
    query: AppQueryFilter<InferType<typeof ExaminationFilterY>>
): Promise<AppQueryResult<ExaminationT>> {

    const builder = knex.from({examination: "examinations"}).select({
        id: "examination.examination_id",
        personel_id: "examination.personel_id",
        patient_id: "pat.patient_id",
        hospitalization_id: "examination.hospitalization_id",
        timestamp: knex.raw(`"examination"."timestamp"::text`),
        pulse: "examination.pulse",
        temperature: "examination.temperature",
        blood_pressure1: "examination.blood_pressure1",
        blood_pressure2: "examination.blood_pressure2",
        stool: "examination.stool",
        urine: "examination.urine",
        mass: "examination.mass",
        comment: "examination.comment",
    }).select(knex.raw("count(*) over() as _full_count"))
        .innerJoin({hosp: "hospitalizations"}, "hosp.hospitalization_id", "examination.hospitalization_id")
        .innerJoin({pat: "patients"}, "pat.patient_id", "hosp.patient_id");

    if (query.filter) {
        const {
            patient_id,
            hospitalization_id
        } = query.filter;

        hospitalization_id && builder.where("examination.hospitalization_id", hospitalization_id);

        patient_id && builder.where("pat.patient_id", patient_id);

    }

    builder.offset(query.offset);
    builder.limit(query.limit);
    builder.orderBy("examination." + query.sortField, query.sortOrder);

    const rows = await builder.then();

    return {
        totalCount: parseInt(rows[0]?._full_count ?? "0"),
        rows: await yupMap(rows, ExaminationY),
        query
    };
}

export async function queryCreateExamination(
    examination: ExaminationT
): Promise<[id: string, examination: ExaminationT]> {

    const rows = await knex("examinations")
        .insert({
            personel_id: examination.personel_id,
            hospitalization_id: examination.hospitalization_id,
            pulse: examination.pulse,
            temperature: examination.temperature,
            blood_pressure1: examination.blood_pressure1,
            blood_pressure2: examination.blood_pressure2,
            stool: examination.stool,
            urine: examination.urine,
            mass: examination.mass,
            comment: examination.comment,
        }).returning([
            "examination_id as id",
            "personel_id",
            "hospitalization_id",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            knex.raw(`timestamp"::text`),
            "pulse",
            "temperature",
            "blood_pressure1",
            "blood_pressure2",
            "stool",
            "urine",
            "mass",
            "comment",
        ]).then();

    const examinations_db = await oneOrDbErr(rows, ExaminationY);
    return [examinations_db.id, examinations_db];
}


export async function queryUpdateExamination(
    examination_id: string, examination: ExaminationT
): Promise<ExaminationT> {

    const rows = await knex("examinations")
        .where("examinations_id", "=", examination_id)
        .update({
            pulse: examination.pulse,
            temperature: examination.temperature,
            blood_pressure1: examination.blood_pressure1,
            blood_pressure2: examination.blood_pressure2,
            stool: examination.stool,
            urine: examination.urine,
            mass: examination.mass,
            comment: examination.comment,
        }).returning([
            "examination_id as id",
            "personel_id",
            "hospitalization_id",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            knex.raw(`timestamp"::text`),
            "pulse",
            "temperature",
            "blood_pressure1",
            "blood_pressure2",
            "stool",
            "urine",
            "mass",
            "comment",
        ]).then();

    return await oneOrDbErr(rows, HospitalizationY);
}