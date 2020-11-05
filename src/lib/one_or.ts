import {Schema} from "yup";
import {DatabaseError} from "./error";

export function oneOrNull<T extends object>(array: T[], schema: Schema<T>): Promise<T | null>;
export function oneOrNull<T extends object>(array: T[],): T | null;
export function oneOrNull<T extends object>(array: T[], schema?: Schema<T>) {
    const obj = array.length === 1 ? array[0] : null;

    return schema ? schema.validate(obj) : obj;
}

export function oneOrDbErr<T extends object>(array: T[], schema: Schema<T>): Promise<T>;
export function oneOrDbErr<T extends object>(array: T[],): T;
export function oneOrDbErr<T extends object>(array: T[], schema?: Schema<T>) {
    if (array.length !== 1) {
        throw new DatabaseError();
    }

    const obj = array[0];

    return schema ? schema.validate(obj) : obj;
}
