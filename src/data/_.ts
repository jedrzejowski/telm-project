import dayjs from "dayjs";

export function dayjs_yup_helper(value: any) {
    const date = dayjs(value);
    return date.isValid() ? date.format("YYYY-MM-DD") : null
}