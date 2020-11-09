import {knex} from "../postgresql";

export async function authBasic(username: string, password: string): Promise<string> {
    const rows = await knex({auth: "basic_auth"})
        .select({
            personel_id: "auth.personel_id"
        })
        .innerJoin({personel: "personel"}, "personel.personel_id", "auth.personel_id")
        .where("personel.username", username)
        .where("auth.password", password);

    if (rows.length !== 1) {
        throw new Error("wrong credentials");
    }

    return rows[0].personel_id;
}
