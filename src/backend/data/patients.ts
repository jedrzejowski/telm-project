import {PatientT, PatientRowT} from "../../data/patient";
import database from "../database";
import {AppQueryFilter, AppQueryResult, createQueryFilterY} from "../../lib/query";
import {oneOrNull, oneOrDbErr} from "../../lib/one_or";

export async function querySelectPatient(patient_id: string) {
    const response = await database.query<PatientRowT>(`
        select * 
        from patients
        where patient_id = $1::uuid
    `, [patient_id]);

    return oneOrNull(response.rows)
}


export const patientQueryY = createQueryFilterY<PatientT>([
    "name1", "name2", "name3"
]);

export async function querySelectPatients(query: AppQueryFilter<{}>): Promise<AppQueryResult<PatientRowT>> {
    const response = await database.query(`
        select *, count(*) over() as _full_count
        from patients
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    let totalCount = parseInt(response.rows[0]?._full_count ?? "0");

    for (const row of response.rows) {
        delete row._full_count;
    }

    return {
        rows: response.rows,
        totalCount,
        query
    };
}

export async function queryInsertPatient(patient: PatientT) {
    const response = await database.query<PatientRowT>(`
        insert into patients(
            name1, name2, name3, 
            pesel, sex,
            date_of_birth, date_of_death
        )
        values (
            $1::text, $2::text, $3::text,
            $4::text, $5::char,
            $6::date, $7::date
        )
        returning *;
    `, [
        patient.name1, patient.name2, patient.name3,
        patient.pesel, patient.sex,
        patient.date_of_birth, patient.date_of_death,
    ]);

    return oneOrDbErr(response.rows);
}


export async function queryUpdatePatient(patient_id: string, patient: PatientT) {
    const response = await database.query<PatientRowT>(`
        update patients
        set 
            name1 = $1::text, name2 = $2::text, name3 = $3::text, 
            pesel = $4::text, sex = $5::char, 
            date_of_birth = $6::date, date_of_death = $7::date
        where patient_id = $8
        returning *;
    `, [
        patient.name1, patient.name2, patient.name3,
        patient.pesel, patient.sex,
        patient.date_of_birth, patient.date_of_death,
        patient_id
    ]);

    return oneOrDbErr(response.rows);
}