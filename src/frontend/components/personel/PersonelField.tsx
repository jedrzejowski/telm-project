import React, {FC} from "react";
import type {RaFieldProps} from "../../lib/ra-types";
import type {RaRecord} from "../../../data/_";
import type {Variant as TypoVariant} from "@material-ui/core/styles/createTypography";
import type {PersonelT} from "../../../data/personel";
import NullValue from "../lib/NullValue";
import {personel2str} from "../../../data/personel";
import Typography from "@material-ui/core/Typography";


const PersonelField: FC<Partial<RaFieldProps<RaRecord<PersonelT>> & {
    className?: string;
    disabled?: boolean;
    variant?: TypoVariant;
}>> = ({
           record,
           variant = "body2"
       }) => {

    if (record) {
        return <Typography variant={variant}>{personel2str(record)}</Typography>
    } else {
        return <NullValue/>
    }
}

export default PersonelField;