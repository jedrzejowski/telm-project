import React from "react";
import {List, Datagrid, TextField, EditButton} from "react-admin";

export default function PatientList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="pesel"/>
                <TextField source="name1"/>
                <TextField source="name2"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
