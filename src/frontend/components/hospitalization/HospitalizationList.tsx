import React from "react";
import {List, Datagrid, TextField, EditButton, ReferenceField} from "react-admin";
import PatientField from "../patient/PatientField";

export default function HospitalizationList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <ReferenceField source="patient_id" reference="patients">
                    <PatientField />
                </ReferenceField>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
