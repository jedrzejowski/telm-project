import React, {FC} from "react";
import Typography from "@material-ui/core/Typography";
import {RaFieldProps} from "../../lib/ra-types";
import {nullStr} from "./NullValue";
import get from "lodash/get";
import useDayFormat from "../../lib/useDayFormat";

interface TimestampField extends RaFieldProps {
    format?: string
}

const TimestampField: FC<TimestampField> = (props) => {
    const {
        source = "",
        format = "YYYY MMM D H:mm",
        record
    } = props;
    const dayFormat = useDayFormat();
    const value = get(record, source, record);

    return (
        <Typography
            variant="body2"
            component="span"
        >
            {value ? dayFormat(value, format) : nullStr}
        </Typography>
    )
}

export default TimestampField;