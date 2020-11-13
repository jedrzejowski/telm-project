import React from "react";
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    Filter,
    usePermissions,
    ShowButton,
    SimpleList
} from "react-admin";
import {AppPermissions} from "../../../types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Theme} from "@material-ui/core/styles";
import useDayFormat from "../../lib/useDayFormat";
import PersonelField from "./PersonelField";
import {PersonelRa} from "../../../data/personel";

const ListFilter = (props: {}) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn/>
    </Filter>
);

export default function PersonelList(props: Parameters<typeof List>[0]) {
    const {permissions = {} as AppPermissions} = usePermissions();
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
    const dayFormat = useDayFormat();


    return (
        <List {...props} filters={<ListFilter/>} bulkActionButtons={false}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record: PersonelRa) => (
                        <PersonelField
                            {...props}
                            record={record}
                        />
                    )}
                    secondaryText={(personel: PersonelRa) => {
                        return [
                            personel.username
                        ].join(", ")
                    }}
                    tertiaryText={(personel: PersonelRa) => {
                        return personel.pwz ?? ""
                    }}
                    linkType="show"
                />
            ) : (
                <Datagrid>
                    <TextField source="name1"/>
                    <TextField source="name2"/>
                    <TextField source="pwz"/>

                    {permissions.personel?.edit ? <EditButton/> : null}
                    <ShowButton/>
                </Datagrid>
            )}
        </List>
    )
}
