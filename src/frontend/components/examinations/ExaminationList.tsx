import React from "react";
import {List, Datagrid, EditButton, ReferenceField, DateField} from "react-admin";
import PatientField from "../patients/PatientField";

export default function ExaminationList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <ReferenceField source="patient_id" reference="patients">
                    <PatientField/>
                </ReferenceField>
                <DateField source="time_start"/>
                <DateField source="time_end"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
