import React from "react";
import dayjs from "dayjs";
import {Typography} from "@material-ui/core";
import {RaFieldProps} from "../../lib/ra-types";

export default function <T extends object>(props: RaFieldProps<T>) {
    const {source, record} = props;
    const value = record?.[source];

    if (typeof value !== "string") {
        return <Typography variant="body2">---</Typography>
    }

    return (
        <Typography variant="body2">
            {dayjs(value).toString()}
        </Typography>
    )
}