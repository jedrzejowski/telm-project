import database from "../database";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {ExaminationT, ExaminationY} from "../../data/examinations";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yupUtils";
import {HospitalizationT, HospitalizationY} from "../../data/hospitalizations";
import {InferType, object} from "yup";

const select_fields = [
    `examination_id as "id"`,
    `personel_id`,
    `hospitalization_id`,
    `"timestamp"::text`,
    `pulse`,
    `temperature`,
    `blood_pressure`,
    `stool`,
    `urine`,
    `mass`,
    `comment`
]

export async function querySelectExamination(examination_id: string) {

    const response = await database.query(`
        select ${select_fields.join(',')}
        from examinations
        where examination_id = $1::uuid
    `, [examination_id]);

    return oneOrNull(response.rows, ExaminationY)
}

export const ExaminationFilterY = object({}).defined();

export async function querySelectExaminations(
    query: AppQueryFilter<InferType<typeof ExaminationFilterY>>
): Promise<AppQueryResult<ExaminationT>> {

    const response = await database.query(`
        select ${select_fields.join(',')},
            count(*) over() as _full_count
        from examinations
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    return {
        totalCount: parseInt(response.rows[0]?._full_count ?? "0"),
        rows: await yupMap(response.rows, ExaminationY),
        query
    };
}

export async function queryCreateExamination(
    examination: ExaminationT
): Promise<[id: string, examination: ExaminationT]> {

    const response = await database.query(`
        insert into examinations (
            personel_id, hospitalization_id,
            pulse, temperature, 
            blood_pressure, stool, urine, mass, comment
        )
        values (
            $1::uuid, $2::uuid,
            current_timestamp(), 
            $3::numeric(4), 
            $4::numeric(4,2), 
            $5::text,
            $6::numeric(6,4), 
            $7::numeric(6,4), 
            $8::numeric(6,3), 
            $9::text
        )
        returning ${select_fields.join(',')};
    `, [
        examination.personel_id,
        examination.hospitalization_id,
        examination.pulse,
        examination.temperature,
        examination.blood_pressure,
        examination.stool,
        examination.urine,
        examination.mass,
        examination.comment
    ]);

    const examinations_db = await oneOrDbErr(response.rows, ExaminationY);
    return [examinations_db.id, examinations_db];
}


export async function queryUpdateExamination(
    examination_id: string, examination: ExaminationT
): Promise<ExaminationT> {

    const response = await database.query(`
        update examinations
        set 
            pulse = $1::numeric(4),
            temperature = $2::numeric(4),
            blood_pressure = $3::text,
            stool = $4::numeric(6,3),
            urine = $5::numeric(6,3),
            mass = $6::numeric(6,3),
            comment = $7::text
        where examinations_id = $8
        returning ${select_fields.join(',')};
    `, [
        examination.pulse,
        examination.temperature,
        examination.blood_pressure,
        examination.stool,
        examination.urine,
        examination.mass,
        examination.comment,
        examination_id
    ]);

    return await oneOrDbErr(response.rows, HospitalizationY);
}