import React from "react";
import {useParams} from "react-router-dom";
import PatientEditor from "../components/patient/PatientEditor";

export default function PatientEditPage(props: {
    new?: boolean
}) {
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient]


    return <div>
        <PatientEditor patient={null}/>
    </div>
}