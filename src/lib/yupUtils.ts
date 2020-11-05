import {Schema as YupSchema} from 'yup';

export function yupMap<T>(array: any[], schema: YupSchema<T>): Promise<T[]> {
    return Promise.all(array.map(obj => schema.validate(obj, {stripUnknown: true})));
}
