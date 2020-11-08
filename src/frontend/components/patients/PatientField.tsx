import React from "react";
import {patient2str, PatientT} from "../../../data/patients";

export default function PatientField(props: {
    record?: PatientT
}) {
    const {record: patient} = props;

    if (patient) {
        return <span>{patient2str(patient)}</span>
    } else {
        return <span>{nullValue}</span>
    }
}