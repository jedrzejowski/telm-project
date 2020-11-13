import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    TextInput,
    SimpleList,
    ShowButton,
} from "react-admin";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Theme} from "@material-ui/core/styles";
import PatientField from "./PatientField";
import {PatientRa} from "../../../data/patients";
import useDayFormat from "../../lib/useDayFormat";

const ListFilter = (props: {}) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn/>
    </Filter>
);

export default function PatientsList(props: Parameters<typeof List>[0]) {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
    const dayFormat = useDayFormat();

    return (
        <List {...props} filters={<ListFilter/>} bulkActionButtons={false}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record: PatientRa) => (
                        <PatientField
                            {...props}
                            record={record}
                        />
                    )}
                    secondaryText={(patient: PatientRa) => {
                        return [
                            "ur. " + dayFormat(patient.date_of_birth, "YYYY MMM D")
                        ].join(", ")
                    }}
                    tertiaryText={(patient: PatientRa) => {
                        return patient.pesel ?? ""
                    }}
                    linkType="show"
                />
            ) : (

                <Datagrid>
                    <TextField source="pesel"/>
                    <TextField source="name1"/>
                    <TextField source="name2"/>

                    <EditButton/>
                    <ShowButton/>
                </Datagrid>
            )}
        </List>
    )
}
