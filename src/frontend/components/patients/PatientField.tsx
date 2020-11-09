import React, {FC} from "react";
import {patient2str, PatientT} from "../../../data/patients";
import NullValue from "../lib/NullValue";
import {RaFieldProps} from "../../lib/ra-types";
import {WithId} from "../../../data/_";
import {Variant as TypoVariant} from "@material-ui/core/styles/createTypography";

interface Props extends RaFieldProps<WithId<PatientT>> {
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