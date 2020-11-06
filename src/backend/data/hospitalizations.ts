import database from "../database";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yupUtils";
import {HospitalizationT, HospitalizationY} from "../../data/hospitalizations";
import {InferType, object} from "yup";


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

export const HospitalizationFilterY = object({}).defined().default({});

export async function querySelectHospitalizations(
    query: AppQueryFilter<InferType<typeof HospitalizationFilterY>>
): Promise<AppQueryResult<HospitalizationT>> {

    const response = await database.query(`
        select
            hospitalization_id as "id",
            patient_id,
            time_start::text, time_end::text,
            personel_id_start, personel_id_end,
            comment_start, comment_end,
            count(*) over() as _full_count
        from hospitalizations
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    return {
        totalCount: parseInt(response.rows[0]?._full_count ?? "0"),
        rows: await yupMap(response.rows, HospitalizationY),
        query
    };
}

export async function queryCreateHospitalization(hospitalization: HospitalizationT): Promise<[id: string, hospitalization: HospitalizationT]> {
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