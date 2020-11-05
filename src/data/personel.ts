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

export const PersonelShortY = object({
    id: string().uuid(),
    name1: string().defined().required(),
    name2: string().defined().required(),
}).defined().required();

export type PersonelT = InferType<typeof PersonelY>;
export type PersonelShortT = InferType<typeof PersonelShortY>;
