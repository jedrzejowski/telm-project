import {string, object, boolean, InferType} from "yup";
import {username_regex} from "../regex";

export const PersonelY = object({
    username: string().matches(username_regex).defined().required(),
    name1: string().defined().required(),
    name2: string().defined().required(),
    name3: string().nullable().default(null).defined(),
    pwz: string().nullable().default(null).defined(),
    is_admin: boolean().default(false).defined()
}).defined().required();

export const PersonelRowY = object({
    personel_id: string().uuid().defined().required(),
}).concat(PersonelY).defined().required();

export const PersonelShortY = object({
    personel_id: string().uuid().defined().required(),
    name1: string().defined().required(),
    name2: string().defined().required(),
}).defined().required();

export type PersonelT = InferType<typeof PersonelY>;
export type PersonelRowT = InferType<typeof PersonelRowY>;
export type PersonelShortT = InferType<typeof PersonelShortY>;
