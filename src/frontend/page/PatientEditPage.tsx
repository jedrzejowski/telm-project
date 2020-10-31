import React from "react";
import {useParams} from "react-router-dom";
import PatientEditor from "../components/patient/PatientEditor";
import {PatientT} from "../../data/Patient";


export default function PatientEditPage(props: {
    new?: boolean
}) {
    const {id} = useParams<{ id: string }>();

    return <div>
        <PatientEditor patient={null}/>
    </div>
}
