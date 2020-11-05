import {PatientShortT, PatientShortY, PatientT, PatientY} from "../../data/patient";
import database from "../database";
import {AppQueryFilter, AppQueryResult, createQueryFilterY} from "../../lib/query";
import {oneOrNull, oneOrDbErr} from "../../lib/one_or";
import {yupMap} from "../../lib/yupUtils";

export async function querySelectPatient(patient_id: string) {
    const response = await database.query(`
        select 
            patient_id as id, 
            name1, name2, name3,
            pesel, sex,
            date_of_birth, date_of_death
        from patients
        where patient_id = $1::uuid
    `, [patient_id]);

    return await oneOrNull(response.rows, PatientY);
}


export async function querySelectPatients(query: AppQueryFilter<{}>): Promise<AppQueryResult<PatientShortT>> {
    const response = await database.query(`
        select 
            patient_id as id, 
            name1, name2,
            pesel, date_of_birth,
            count(*) over() as _full_count
        from patients
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    return {
        totalCount: parseInt(response.rows[0]?._full_count ?? "0"),
        rows: await yupMap(response.rows, PatientShortY),
        query
    };
}

export async function queryCreatePatient(patient: PatientT): Promise<[id: string, patient: PatientT]> {
    const response = await database.query(`
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
        returning patient_id as id, 
            name1, name2, name3, 
            pesel, sex,
            date_of_birth, date_of_death;
    `, [
        patient.name1, patient.name2, patient.name3,
        patient.pesel, patient.sex,
        patient.date_of_birth, patient.date_of_death,
    ]);

    const patient_db = oneOrDbErr(response.rows);
    return [patient_db.id, await PatientY.validate(patient_db, {stripUnknown: true})];
}


export async function queryUpdatePatient(patient_id: string, patient: PatientT) {
    const response = await database.query(`
        update patients
        set 
            name1 = $1::text, name2 = $2::text, name3 = $3::text, 
            pesel = $4::text, sex = $5::char, 
            date_of_birth = $6::date, date_of_death = $7::date
        where patient_id = $8
        returning patient_id as id, 
            name1, name2, name3, 
            pesel, sex,
            date_of_birth, date_of_death;
    `, [
        patient.name1, patient.name2, patient.name3,
        patient.pesel, patient.sex,
        patient.date_of_birth, patient.date_of_death,
        patient_id
    ]);

    return await oneOrDbErr(response.rows, PatientY);
}