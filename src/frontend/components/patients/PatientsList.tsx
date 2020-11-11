import React from "react";
import {List, Datagrid, TextField, EditButton, Filter, TextInput} from "react-admin";

const ListFilter = (props: {}) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn/>
    </Filter>
);

export default function PatientsList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props} filters={<ListFilter/>} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="pesel"/>
                <TextField source="name1"/>
                <TextField source="name2"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
