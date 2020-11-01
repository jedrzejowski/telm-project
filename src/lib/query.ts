import {InferType, number, object, ObjectSchemaDefinition, string} from "yup";
import {sort_order_regex} from "../regex";

export function createQueryFilterY<F extends object>(keys: (keyof F)[]) {
    const filter: any = {};

    for (const key of keys) {
        // filter[key] =
    }

    return object({
        offset: number().min(0).default(0).defined(),
        limit: number().positive().default(10).defined(),
        sortField: string().default(keys[0]).nullable().defined(),
        sortOrder: string<"asc" | "desc">().default("asc").matches(sort_order_regex).nullable().defined(),
        filter: object(filter).default({}).nullable().defined()
    }).defined();
}

export type AppQueryFilter<F extends object> = InferType<ReturnType<typeof createQueryFilterY>>;

export interface AppQueryResult<T extends object> {
    rows: T[];
    totalCount: number;
    query: AppQueryFilter<any>;
}