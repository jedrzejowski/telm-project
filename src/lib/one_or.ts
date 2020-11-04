import {DatabaseError} from "./error";

export function oneOrNull<T extends object>(array: T[]): T | null {
    return array.length === 1 ? array[0] : null;
}

export function oneOrDbErr<T extends object>(array: T[]): T | null {
    if (array.length !== 1) {
        throw new DatabaseError();
    }

    return array[0];
}
