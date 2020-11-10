import React, {FC} from "react";
import {patient2str, PatientT} from "../../../data/patients";
import NullValue from "../lib/NullValue";
import {RaFieldProps} from "../../lib/ra-types";
import {Variant as TypoVariant} from "@material-ui/core/styles/createTypography";

interface Props extends Omit<RaFieldProps<PatientT>, "source"> {
    source?: string
    className?: string
    disabled?: boolean
    variant?: TypoVariant;
}

const PatientField: FC<Props> = ({
                                     record: patient
                                 }) => {

    if (patient) {
        return <span>{patient2str(patient)}</span>
    } else {
        return <NullValue/>
    }
}

export default PatientField;