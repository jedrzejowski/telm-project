import * as yup from "yup";

export const sort_order_regex = /^(asc|desc)$/;

export const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
export const username_yup = yup.string().matches(username_regex);

export const uuid_regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const uuid_yup = yup.string().matches(uuid_regex);
