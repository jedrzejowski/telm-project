import React, {FC, ReactElement} from "react";
import Typography from "@material-ui/core/Typography";
import {RaFieldProps} from "../../lib/ra-types";
import {nullStr} from "./NullValue";
import get from "lodash/get";
import useDayFormat from "../../lib/useDayFormat";
import {RaRecord} from "../../../data/_";

interface CustomFieldProps<Record extends RaRecord = any> extends RaFieldProps {
    display: (args: { source: keyof Record, record: Record, value: any }) => React.ReactNode
}

const CustomField: FC<CustomFieldProps> = (props) => {
    const {
        source = "",
        record,
        display,
    } = props;
    const value = get(record, source, record);

    const content = display({record, source, value});

    switch (typeof content) {
        case "number":
        case "string":
            return (
                <Typography variant="body2" component="span">
                    {content}
                </Typography>
            )
        default:
            return content as ReactElement;
    }
}

export default CustomField;