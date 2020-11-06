import React from "react";
import {PatientT} from "../../../data/patients";

export default function PatientsField(props: {
    record?: PatientT
}) {
    const {record: patient} = props;
    if (patient) {
        return <span>{patient.name1} {patient.name2}</span>
    } else {
        return <span>---</span>
    }
}