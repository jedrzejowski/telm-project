import React from "react";
import {Datagrid, EditButton, List, TextField, TextInput, Filter} from "react-admin";

const ListFilter = (props: {}) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn/>
    </Filter>
);

export default function PersonelList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props} filters={<ListFilter/>}>
            <Datagrid>
                <TextField source="name1"/>
                <TextField source="name2"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
