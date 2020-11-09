import postgresql, {knex} from "../postgresql";
import {PersonelT, PersonelY} from "../../data/personel";
import {oneOrDbErr, oneOrNull} from "../../lib/one_or";
import {ParameterError} from "../../lib/error";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import {yupMap} from "../../lib/yup-utils";
import {InferType, number, object, string} from "yup";

export async function querySelectPersona(selector: string, field: "username" | "id" = "id") {
    switch (field) {
        case "id": {

            const response = await postgresql.query(`
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

            const response = await postgresql.query(`
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

export const PersonelFilterY = object({
    name1: string(),
    name2: string(),
    name3: string(),
    name: string(),
    pwz: string(),
}).defined().default({});

export async function querySelectPersonel(
    query: AppQueryFilter<InferType<typeof PersonelFilterY>>
): Promise<AppQueryResult<PersonelT>> {

    const builder = knex.from({personel: "personel"}).select({
        id: "personel.personel_id",
        username: "personel.username",
        name1: "personel.name1",
        name2: "personel.name2",
        name3: "personel.name3",
        pwz: "personel.pwz",
        is_admin: "personel.is_admin",
    }).select(knex.raw("count(*) over() as _full_count"));

    if (query.filter) {
        const {
            name, name1, name2, name3,
            pwz
        } = query.filter;

        name && builder.whereRaw(
            `lower(array_to_string(array [
                    personel.name1, personel.name2, personel.name3
                  ], ' ', '')) like concat('%', ?::text, '%')`,
            [name.toLowerCase()]
        );

        name1 && builder.whereRaw(`personel.name1 like concat('%', ?::text, '%')`, [name1]);
        name2 && builder.whereRaw(`personel.name1 like concat('%', ?::text, '%')`, [name2]);
        name3 && builder.whereRaw(`personel.name3 like concat('%', ?::text, '%')`, [name3]);
        pwz && builder.whereRaw(`personel.pwz like concat('%', ?::text, '%')`, [pwz]);
    }

    builder.offset(query.offset);
    builder.limit(query.limit);
    builder.orderBy("personel." + query.sortField, query.sortOrder);

    const rows = await builder.then();

    return {
        totalCount: parseInt(rows[0]?._full_count ?? "0"),
        rows: await yupMap(rows, PersonelY),
        query
    };
}

export async function queryCreatePersonel(personel: PersonelT): Promise<[id: string, personel: PersonelT]> {
    const response = await postgresql.query(`
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
    const response = await postgresql.query(`
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