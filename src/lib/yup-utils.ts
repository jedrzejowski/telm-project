import {Schema as YupSchema, string} from 'yup';

export function yupMap<T>(array: any[], schema: YupSchema<T>): Promise<T[]> {
    return Promise.all(array.map(obj => schema.validate(obj, {stripUnknown: true})));
}

export function numeric(length: number, precision = 0) {
    return string().matches(new RegExp(`^\\d{0,${length - precision}}(\\.\\d{0,${precision}})?$`));
}