import React, {FC} from "react";
import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    DateField,
    ShowButton,
    SimpleList,
} from "react-admin";
import PatientField from "../patients/PatientField";
import {Theme, useMediaQuery} from "@material-ui/core";
import {WithId} from "../../../data/_";
import {ExaminationT} from "../../../data/examinations";
import dayjs from "dayjs";

export default function HospitalizationsList(props: Parameters<typeof List>[0]) {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery<Theme>(theme => theme.breakpoints.up("md"));
    const isLarge = useMediaQuery<Theme>(theme => theme.breakpoints.up("lg"));
    const isXLarge = useMediaQuery<Theme>(theme => theme.breakpoints.up("xl"));

    return (
        <List {...props} bulkActionButtons={false}>
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
                    secondaryText={record => <SimpleField type="secondary" record={record as any}/>}
                    tertiaryText={record => <SimpleField type="tertiary" record={record as any}/>}
                    linkType="show"
                />
            ) : (
                <Datagrid>
                    <ReferenceField source="patient_id" reference="patients">
                        <PatientField/>
                    </ReferenceField>
                    <DateField source="time_start"/>
                    <DateField source="time_end"/>
                    <EditButton/>
                    <ShowButton/>
                </Datagrid>
            )}
        </List>
    )
}

const SimpleField: FC<{
    record: WithId<ExaminationT>;
    type: "secondary" | "tertiary"
}> = React.memo(({record: examination, type}) => {

    switch (type) {
        case "secondary":
            return (
                <>
                    {examination.temperature}&nbsp;°C,&nbsp;
                    {examination.pulse}&nbsp;,&nbsp;
                    {examination.blood_pressure1}/{examination.blood_pressure2}&nbsp;[mmHg],
                </>
            );
        case "tertiary":
            return <>{dayjs(examination.timestamp).toString()}</>
    }
});