import React, {FC} from "react";
import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    NumberField,
    BooleanField,
    SimpleList,
    ShowButton,
} from "react-admin";
import PatientField from "../patients/PatientField";
import TimestampField from "../lib/TimestampField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {nullStr, nullValue} from "../lib/NullValue";
import {NumberFieldProps} from "ra-ui-materialui/lib/field/NumberField";
import {ExaminationRa, ExaminationT} from "../../../data/examinations";
import {WithId} from "../../../data/_";
import dayjs from "dayjs";
import type {Theme} from "@material-ui/core/styles";

export default function ExaminationList(props: Parameters<typeof List>[0]) {
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
                    secondaryText={(examination: ExaminationRa) => {
                        return [
                            examination.temperature + " °C",
                            examination.pulse,
                            `${examination.blood_pressure1 ?? nullStr}/${examination.blood_pressure2} [mmHg]`,
                        ].join(", ")
                    }}
                    tertiaryText={(examination: ExaminationRa) => dayjs(examination.timestamp).toString()}
                    linkType="show"
                />
            ) : (

                <Datagrid>
                    <TimestampField source="timestamp"/>
                    <ReferenceField source="patient_id" reference="patients">
                        <PatientField/>
                    </ReferenceField>

                    <NumberField source="temperature"/>

                    {isMedium ? <NumberField source="pulse"/> : null}
                    {isLarge ? <BloodPressureField textAlign="right" source="blood_pressure"/> : null}
                    {isXLarge ? <NumberField textAlign="right" source="mass"/> : null}
                    {isXLarge ? <NumberField textAlign="right" source="urine"/> : null}
                    {isXLarge ? <BooleanField source="stool"/> : null}

                    {isMedium ? <EditButton/> : null}
                    <ShowButton/>
                </Datagrid>
            )}
        </List>
    )
}

const BloodPressureField: FC<NumberFieldProps> = props => {
    const record = props.record as ExaminationT;

    return (
        <span>{record.blood_pressure1 ?? nullValue}/{record.blood_pressure2 ?? nullValue}</span>
    )
}