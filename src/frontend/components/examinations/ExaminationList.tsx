import React from "react";
import {List, Datagrid, EditButton, ReferenceField, DateField} from "react-admin";
import PatientsField from "../patients/PatientsField";

export default function ExaminationList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <ReferenceField source="patient_id" reference="patients">
                    <PatientsField/>
                </ReferenceField>
                <DateField source="time_start"/>
                <DateField source="time_end"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
