import crypto from "crypto";
import {knex} from "../postgresql";

export async function authBasic(username: string, password: string): Promise<string> {
    const rows = await knex({auth: "basic_auth"})
        .select({
            personel_id: "auth.personel_id",
            password: "auth.password"
        })
        .innerJoin({personel: "personel"}, "personel.personel_id", "auth.personel_id")
        .where("personel.username", username);
    // .where("auth.password", password);

    if (
        rows.length !== 1 &&
        await verifyPassword(rows[0].password, password)
    ) {
        throw new Error("wrong credentials");
    }

    return rows[0].personel_id;
}

// https://dev.to/farnabaz/hash-your-passwords-with-scrypt-using-nodejs-crypto-module-316k

export async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString("hex"))
        });
    })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString("hex"))
        });
    })
}