import React from "react";
import {Datagrid, EditButton, List, TextField, TextInput, Filter, usePermissions, ShowButton} from "react-admin";
import {AppPermissions} from "../../../types";

const ListFilter = (props: {}) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn/>
    </Filter>
);

export default function PersonelList(props: Parameters<typeof List>[0]) {
    const {permissions = {} as AppPermissions} = usePermissions();

    return (
        <List {...props} filters={<ListFilter/>}>
            <Datagrid>
                <TextField source="name1"/>
                <TextField source="name2"/>
                {permissions.personel?.edit ? <EditButton/> : null}
                <ShowButton/>
            </Datagrid>
        </List>
    )
}
