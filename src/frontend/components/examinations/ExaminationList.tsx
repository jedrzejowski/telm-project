import React from "react";
import {List, Datagrid, EditButton, ReferenceField, NumberField} from "react-admin";
import PatientField from "../patients/PatientField";
import TimestampField from "../lib/TimestampField";

export default function ExaminationList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <TimestampField source="timestamp"/>
                <ReferenceField source="patient_id" reference="patients">
                    <PatientField/>
                </ReferenceField>
                <NumberField source="temperature"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
