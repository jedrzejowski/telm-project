import dayjs from "dayjs";

export function yup_date_transform(value: any) {
    const date = dayjs(value);
    return date.isValid() ? date.format("YYYY-MM-DD") : null
}

export function yup_timestamp_transform(value: any) {
    const date = dayjs(value);
    return date.isValid() ? date.toISOString() : null
}
