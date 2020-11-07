import {array, number, object, ObjectSchema, ObjectSchemaDefinition, string} from "yup";
import {sort_order_regex} from "../../regex";
import {AppQueryFilter} from "../../lib/query";


export default function <F extends object>(filter: ObjectSchema<F>): ObjectSchema<AppQueryFilter<F>> {
    const fields = Object.keys(filter.fields)
    const default_field = fields[0];

    const sortY = array<[string, string]>().of(string().defined()).min(2).max(2).default([default_field, "ASC"]).required();
    const rangeY = array<[number, number]>().of(number().defined()).min(2).max(2).default([0, 100]).required();

    return object().transform((value) => {
        const [field, direction] = sortY.validateSync(value.sort ? JSON.parse(value.sort) : undefined);
        const [from, to] = rangeY.validateSync(value.range ? JSON.parse(value.range) : undefined);

        return {
            filter: JSON.parse(value.filter),
            sortOrder: direction.toLowerCase(),
            sortField: field === "id" ? default_field : field,
            offset: from,
            limit: to - from + 1
        }
    }).shape<AppQueryFilter<F>>({
        offset: number().min(0).default(0).defined(),
        limit: number().positive().default(10).defined(),
        sortField: string().default(default_field).oneOf(fields).defined(),
        sortOrder: string<"asc" | "desc">().default("asc").matches(sort_order_regex).defined(),
        filter: filter
    }).defined().required()
}
