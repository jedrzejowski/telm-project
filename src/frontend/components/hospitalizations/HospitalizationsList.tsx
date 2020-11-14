import React from "react";
import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    ShowButton,
    SimpleList,
    TextField,
    useTranslate,
} from "react-admin";
import PatientField from "../patients/PatientField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import type {Theme} from "@material-ui/core/styles";
import {HospitalizationRa} from "../../../data/hospitalizations";
import useDayFormat from "../../lib/useDayFormat";
import TimestampField from "../lib/TimestampField";

export default function HospitalizationsList(props: Parameters<typeof List>[0]) {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
    const isLarge = useMediaQuery<Theme>(theme => theme.breakpoints.up("lg"));
    const dayFormat = useDayFormat();
    const translate = useTranslate();

    return (
        <List
            {...props}
            bulkActionButtons={false}
            title={translate(`resources.${props.resource}.list_title`)}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={record => (
                        <ReferenceField
                            {...props}
                            record={record}
                            source="patient_id"
                            reference="patients"
                            link={false}
                        >
                            <PatientField/>
                        </ReferenceField>
                    )}
                    secondaryText={(examination: HospitalizationRa) => {
                        return [
                            "od",
                            dayFormat(examination.time_start, "YYYY MMM D H:mm"),
                            "do",
                            dayFormat(examination.time_end, "YYYY MMM D H:mm"),
                        ].join(" ")
                    }}
                    linkType="show"
                />
            ) : (
                <Datagrid>
                    <ReferenceField source="patient_id" reference="patients">
                        <PatientField/>
                    </ReferenceField>

                    <TimestampField source="time_start"/>
                    {isLarge ? <TextField source="comment_start"/> : null}

                    <TimestampField source="time_end"/>
                    {isLarge ? <TextField source="comment_end"/> : null}

                    {isLarge ? <EditButton/> : null}
                    <ShowButton/>
                </Datagrid>
            )}
        </List>
    )
}
