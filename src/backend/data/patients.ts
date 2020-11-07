import {PatientT, PatientY} from "../../data/patients";
import database, {knex} from "../database";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {oneOrNull, oneOrDbErr} from "../../lib/one_or";
import {yupMap} from "../../lib/yupUtils";
import {array, boolean, InferType, object, string} from "yup";

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

export const PatientFilterY = object({
    name1: string(),
    name2: string(),
    name3: string(),
    name: string(),
    id: array().of(string().uuid().defined()),
    pesel: string().matches(/^\d{1,11}$/),
    has_ongoing_hospitalization: boolean()
}).defined().default({});

export async function querySelectPatients(
    query: AppQueryFilter<InferType<typeof PatientFilterY>>
): Promise<AppQueryResult<PatientT>> {

    const builder = knex.from({patient: "patients"}).select({
        id: "patient.patient_id",
        name1: "patient.name1",
        name2: "patient.name2",
        name3: "patient.name3",
        pesel: "patient.pesel",
        sex: "patient.sex",
        date_of_birth: "patient.date_of_birth",
        date_of_death: "patient.date_of_death",
    }).select(knex.raw("count(*) over() as _full_count"));

    if (query.filter) {
        const {
            id,
            name, name1, name2, name3,
            has_ongoing_hospitalization,
            pesel,
        } = query.filter;

        id && builder.whereRaw(id.map(id => `patient.patient_id = '${id}'::uuid`).join(" or "));

        name && builder.whereRaw(
            `lower(array_to_string(array [
                    patient.pesel,
                    patient.name1, patient.name2, patient.name3
                  ], ' ', '')) like concat('%', ?::text, '%')`,
            [name.toLowerCase()]
        );

        name1 && builder.whereRaw(`patient.name1 like concat('%', ?::text, '%')`, [name1]);
        name2 && builder.whereRaw(`patient.name1 like concat('%', ?::text, '%')`, [name2]);
        name3 && builder.whereRaw(`patient.name3 like concat('%', ?::text, '%')`, [name3]);
        pesel && builder.whereRaw(`patient.pesel like concat('%', ?::text, '%')`, [pesel]);

        typeof has_ongoing_hospitalization === "boolean" &&
        builder.innerJoin({oh: "hospitalizations"}, "oh.patient_id", "patient.patient_id");
    }

    builder.offset(query.offset);
    builder.limit(query.limit);
    builder.orderBy("patient." + query.sortField, query.sortOrder);

    const rows = await builder.then();

    return {
        totalCount: parseInt(rows[0]?._full_count ?? "0"),
        rows: await yupMap(rows, PatientY),
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