import {string, object, boolean} from "yup";
import {username_regex, uuid_regex} from "../regex";

export interface PersonelT {
    personel_id: string;
    username: string;
    name1: string;
    name2: string;
    name3: string | null;
    pwz: string | null;
    password: string | null;
    is_admin: boolean;
}

export const PersonelY = object<PersonelT>({
    personel_id: string().matches(uuid_regex).required(),
    username: string().matches(username_regex).required(),
    name1: string().required(),
    name2: string().required(),
    name3: string().nullable(),
    pwz: string().nullable(),
    password: string().nullable(),
    is_admin: boolean().required()
});
