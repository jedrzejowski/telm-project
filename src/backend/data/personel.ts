import database from "../database";
import {PersonelRowT, PersonelT} from "../../data/personel";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {ParameterError} from "../../lib/error";
import {AppQueryFilter, AppQueryResult, createQueryFilterY} from "../../lib/query";


export async function querySelectPersona(selector: string, field: "username" | "id" = "id") {
    switch (field) {
        case "id": {

            const response = await database.query<PersonelRowT>(`
                select * 
                from personel
                where personel_id = $1::uuid
            `, [selector]);

            return oneOrNull(response.rows)
        }
        case "username": {

            const response = await database.query<PersonelRowT>(`
                select * 
                from personel
                where username = $1::uuid
            `, [selector]);

            return oneOrNull(response.rows)
        }

        default:
            throw new ParameterError(querySelectPersonel, "field", field)
    }
}

export const personelQueryY = createQueryFilterY<PersonelT>([
    "name1", "name2", "name3"
]);

export async function querySelectPersonel(query: AppQueryFilter<{}>): Promise<AppQueryResult<PersonelRowT>> {
    const response = await database.query(`
        select *, count(*) over() as _full_count
        from personel
        where true
        limit $1::bigint OFFSET $2::bigint
    `, [
        query.limit, query.offset
    ]);

    let totalCount = parseInt(response.rows[0]?._full_count ?? "0");

    for (const row of response.rows) {
        // @ts-ignore
        delete row._full_count;
    }

    return {
        rows: response.rows,
        totalCount,
        query
    };
}

export async function queryInsertPersonel(personel: PersonelT) {
    const response = await database.query<PersonelRowT>(`
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
        returning *;
    `, [
        personel.username,
        personel.name1, personel.name2, personel.name3,
        personel.pwz, personel.is_admin
    ]);

    return oneOrDbErr(response.rows);
}


export async function queryUpdatePersonel(personel_id: string, personel: PersonelT) {
    const response = await database.query<PersonelRowT>(`
        update personel
        set 
            username = $1::text,
            name1 = $2::text, name2 = $3::text, name3 = $4::text, 
            pwz = $5::text, is_admin = $6::char, 
        where personel_id = $7
        returning *;
    `, [
        personel.username,
        personel.name1, personel.name2, personel.name3,
        personel.pwz, personel.is_admin,
        personel_id
    ]);

    return oneOrDbErr(response.rows);
}