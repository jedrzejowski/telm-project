import database from "../database";
import {PersonelT, PersonelY} from "../../data/personel";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {ParameterError} from "../../lib/error";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yupUtils";
import {InferType, object} from "yup";


export async function querySelectPersona(selector: string, field: "username" | "id" = "id") {
    switch (field) {
        case "id": {

            const response = await database.query(`
                select 
                    personel_id as "id", username,
                    name1, name2,
                    pwz, is_admin
                from personel
                where personel_id = $1::uuid
            `, [selector]);

            return oneOrNull(response.rows, PersonelY)
        }
        case "username": {

            const response = await database.query(`
                select 
                    personel_id as "id", username,
                    name1, name2,
                    pwz, is_admin
                from personel
                where username = $1::uuid
            `, [selector]);

            return oneOrNull(response.rows, PersonelY)
        }

        default:
            throw new ParameterError(querySelectPersonel, "field", field)
    }
}

export const PersonelFilterY = object({}).defined().default({});

export async function querySelectPersonel(
    query: AppQueryFilter<InferType<typeof PersonelFilterY>>
): Promise<AppQueryResult<PersonelT>> {

    const response = await database.query(`
        select 
            personel_id as "id", username,
            name1, name2,
            pwz, is_admin,
            count(*) over() as _full_count
        from personel
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    return {
        totalCount: parseInt(response.rows[0]?._full_count ?? "0"),
        rows: await yupMap(response.rows, PersonelY),
        query
    };
}

export async function queryCreatePersonel(personel: PersonelT): Promise<[id: string, personel: PersonelT]> {
    const response = await database.query(`
        insert into personel(
            username,
            name1, name2, name3, 
            pwz, is_admin
        )
        values (
            $1::text, 
            $2::text, $3::text, $4::text, 
            $5::char, $6::date
        )
        returning 
            personel_id as id,
            username,
            name1, name2, name3, 
            pwz, is_admin;
    `, [
        personel.username,
        personel.name1, personel.name2, personel.name3,
        personel.pwz, personel.is_admin
    ]);

    const personel_db = await oneOrDbErr(response.rows, PersonelY);
    return [personel_db.id, personel_db];
}


export async function queryUpdatePersonel(personel_id: string, personel: PersonelT) {
    const response = await database.query(`
        update personel
        set 
            username = $1::text,
            name1 = $2::text, name2 = $3::text, name3 = $4::text, 
            pwz = $5::text, is_admin = $6::bool
        where personel_id = $7
        returning
            personel_id as id,
            username,
            name1, name2, name3, 
            pwz, is_admin;
    `, [
        personel.username,
        personel.name1, personel.name2, personel.name3,
        personel.pwz, personel.is_admin,
        personel_id
    ]);

    return await oneOrDbErr(response.rows, PersonelY);
}