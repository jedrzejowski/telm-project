import {string, object, boolean, InferType} from "yup";
import {username_regex} from "../regex";

export const PersonelY = object({
    id: string().uuid(),
    username: string().matches(username_regex).defined().required(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    name3: string().nullable().default(null).defined(),
    pwz: string().nullable().default(null).defined(),
    is_admin: boolean().default(false).defined()
}).defined().required();

export type PersonelT = InferType<typeof PersonelY>;

export function personel2str(personel: PersonelT) {
    return personel.name1 + " " + personel.name2;
}
