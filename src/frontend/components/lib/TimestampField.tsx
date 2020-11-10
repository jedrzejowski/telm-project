import React, {FC} from "react";
import dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";
import {RaFieldProps} from "../../lib/ra-types";
import {nullValue} from "./NullValue";
import get from "lodash/get";

interface TimestampField extends RaFieldProps {

}

const TimestampField: FC<TimestampField> = (props) => {
    const {
        source = "",
        record
    } = props;

    const value = get(record, source, record);

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

export default TimestampField;