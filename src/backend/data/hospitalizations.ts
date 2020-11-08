import database, {knex} from "../database";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yup-utils";
import {HospitalizationT, HospitalizationY} from "../../data/hospitalizations";
import {InferType, object, string} from "yup";
import clock = jasmine.clock;


export async function querySelectHospitalization(hospitalization_id: string) {

    const response = await database.query(`
        select 
            hospitalization_id as "id",
            patient_id,
            time_start::text, time_end::text,
            personel_id_start, personel_id_end,
            comment_start, comment_end
        from hospitalizations
        where hospitalization_id = $1::uuid
    `, [hospitalization_id]);

    return oneOrNull(response.rows, HospitalizationY)
}

export const HospitalizationFilterY = object({
    time_start: string(),
    patient_id: string().uuid(),
}).defined().default({});

export async function querySelectHospitalizations(
    query: AppQueryFilter<InferType<typeof HospitalizationFilterY>>
): Promise<AppQueryResult<HospitalizationT>> {

    const builder = knex.from({hospitalization: "hospitalizations"}).select({
        id: "hospitalization.hospitalization_id",
        patient_id: "hospitalization.patient_id",
        time_start: "hospitalization.time_start",
        time_end: "hospitalization.time_end",
        personel_id_start: "hospitalization.personel_id_start",
        personel_id_end: "hospitalization.personel_id_end",
        comment_start: "hospitalization.comment_start",
        comment_end: "hospitalization.comment_end",
    }).select(knex.raw("count(*) over() as _full_count"));

    if (query.filter) {
        const {
            patient_id,
        } = query.filter;

        patient_id && builder.innerJoin({pat: "patients"},
            "pat.patient_id", "hospitalization.patient_id");

    }

    builder.offset(query.offset);
    builder.limit(query.limit);
    builder.orderBy("hospitalization." + query.sortField, query.sortOrder);

    const rows = await builder.then();

    return {
        totalCount: parseInt(rows[0]?._full_count ?? "0"),
        rows: await yupMap(rows, HospitalizationY),
        query
    };
}

export async function queryCreateHospitalization(
    hospitalization: HospitalizationT
): Promise<[hospitalization_id: string, hospitalization: HospitalizationT]> {
    console.log("HERE");
    const response = await database.query(`
        insert into hospitalizations (
            patient_id,
            time_start, time_end,
            personel_id_start, personel_id_end,
            comment_start, comment_end
        )
        values (
            $1::uuid, 
            $2::timestamp, $3::timestamp, 
            $4::uuid, $5::uuid, 
            $6::text, $7::text
        )
        returning 
            hospitalization_id as "id",
            patient_id,
            time_start::text, time_end::text,
            personel_id_start, personel_id_end,
            comment_start, comment_end
    `, [
        hospitalization.patient_id,
        hospitalization.time_start, hospitalization.time_end,
        hospitalization.personel_id_start, hospitalization.personel_id_end,
        hospitalization.comment_start, hospitalization.comment_end,
    ]);

    console.log(response.rows);

    const hospitalization_db = await oneOrDbErr(response.rows, HospitalizationY);
    return [hospitalization_db.id, hospitalization_db];
}

export async function queryUpdateHospitalization(hospitalization_id: string, hospitalization: HospitalizationT) {
    const response = await database.query(`
        update hospitalizations
        set 
            time_start = $1::timestamp,
            time_end = $2::timestamp,
            personel_id_start = $3::text,
            personel_id_end = $4::text,
            comment_start = $5::text,
            comment_end = $6::text
        where personel_id = $7
        returning
            hospitalization_id as "id",
            patient_id,
            time_start::text, time_end::text,
            personel_id_start, personel_id_end,
            comment_start, comment_end;
    `, [
        hospitalization.time_start, hospitalization.time_end,
        hospitalization.personel_id_start, hospitalization.personel_id_end,
        hospitalization.comment_start, hospitalization.comment_end,
        hospitalization_id
    ]);

    return await oneOrDbErr(response.rows, HospitalizationY);
}