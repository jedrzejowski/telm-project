import React from "react";
import {patient2str, PatientT} from "../../../data/patients";
import NullValue from "../lib/NullValue";
import {Typography} from "@material-ui/core";

interface Props {
    basePath: string
    className: string
    disabled: boolean
    // input: undefined
    record: PatientT
    resource: string
    translateChoice: boolean
}

export default function PatientField(props: {
    record?: PatientT
}) {
    const {record: patient} = props as Props;
    console.log(props);

    if (patient) {
        return <span>{patient2str(patient)}</span>
    } else {
        return <NullValue/>
    }
}