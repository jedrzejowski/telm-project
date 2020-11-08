import React from "react";
import {List, Datagrid, EditButton, ReferenceField, DateField, ShowButton} from "react-admin";
import PatientField from "../patients/PatientField";

export default function HospitalizationsList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <ReferenceField source="patient_id" reference="patients">
                    <PatientField/>
                </ReferenceField>
                <DateField source="time_start"/>
                <DateField source="time_end"/>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
}
