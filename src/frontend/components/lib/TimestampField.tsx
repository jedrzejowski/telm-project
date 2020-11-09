import React from "react";
import dayjs from "dayjs";
import {Typography} from "@material-ui/core";
import {RaFieldProps} from "../../lib/ra-types";
import {nullValue} from "./NullValue";

export default function TimestampField<T extends object>(props: RaFieldProps<T>) {
    const {source, record} = props;
    const value = record?.[source];

    if (typeof value !== "string") {
        return <Typography variant="body2">{nullValue}</Typography>
    }

    return (
        <Typography
            variant="body2"
            component="span"
        >
            {dayjs(value).toString()}
        </Typography>
    )
}