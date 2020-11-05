import React from "react";
import {Datagrid, EditButton, List, TextField} from "react-admin";

export default function PersonelList(props: Parameters<typeof List>[0]) {

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="name1"/>
                <TextField source="name2"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}
