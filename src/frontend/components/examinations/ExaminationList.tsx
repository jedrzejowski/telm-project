import React, {FC} from "react";
import {
    List,
    Datagrid,
    EditButton,
    ReferenceField,
    NumberField,
    BooleanField,
    SimpleList,
    ShowButton
} from "react-admin";
import PatientField from "../patients/PatientField";
import TimestampField from "../lib/TimestampField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {nullStr, nullValue} from "../lib/NullValue";
import type {ExaminationRa, ExaminationT} from "../../../data/examinations";
import type {Theme} from "@material-ui/core/styles";
import type {SimpleListProps} from "ra-ui-materialui/lib/list/SimpleList";
import type {DatagridProps} from "ra-ui-materialui/lib/list/datagrid/Datagrid";
import useDayFormat from "../../lib/useDayFormat";
import EmoticonPoop from "mdi-material-ui/EmoticonPoop";
import CloseIcon from "mdi-material-ui/Close";
import {TextFieldProps} from "ra-ui-materialui/lib/field/TextField";

export default function ExaminationList(props: Parameters<typeof List>[0]) {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

    return (
        <List {...props} bulkActionButtons={false}>
            {isSmall ? (
                <ExaminationSimpleList/>
            ) : (
                <ExaminationDataGrid/>
            )}
        </List>
    )
}

const ExaminationSimpleList: FC<SimpleListProps> = props => {
    const dayFormat = useDayFormat();

    return (
        <SimpleList
            {...props}
            primaryText={record => (
                <ReferenceField
                    // @ts-ignore
                    basePath={props.basePath}
                    resource={props.resource}
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
            tertiaryText={(examination: ExaminationRa) => dayFormat(examination.timestamp, "YYYY MMM DD, HH:mm")}
            linkType="show"
        />
    )
}

export const ExaminationDataGrid: FC<DatagridProps & {
    showPatient?: boolean
}> = (props) => {
    const {
        showPatient = true,
        ...ra
    } = props;

    const isMedium = useMediaQuery<Theme>(theme => theme.breakpoints.up("md"));
    const isLarge = useMediaQuery<Theme>(theme => theme.breakpoints.up("lg"));
    const isXLarge = useMediaQuery<Theme>(theme => theme.breakpoints.up("xl"));

    return (
        <Datagrid {...ra}>
            <TimestampField source="timestamp"/>

            {showPatient ? (
                <ReferenceField source="patient_id" reference="patients">
                    <PatientField/>
                </ReferenceField>
            ) : null}

            <NumberField source="temperature"/>

            {isMedium ? <NumberField source="pulse"/> : null}
            {isLarge ? <BloodPressureField textAlign="right" source="blood_pressure"/> : null}

            {isXLarge ? <NumberField textAlign="right" source="mass"/> : null}

            {isXLarge ? <NumberField textAlign="right" source="urine"/> : null}

            {isXLarge ? (
                <BooleanField
                    source="stool"
                    // @ts-ignore
                    TrueIcon={EmoticonPoop} FalseIcon={CloseIcon}
                    sortable={false}
                />
            ) : null}

            {isMedium ? <EditButton/> : null}
            <ShowButton/>
        </Datagrid>
    )
}

const BloodPressureField: FC<TextFieldProps> = props => {
    const record = props.record as ExaminationT;

    return (
        <span>{record.blood_pressure1 ?? nullValue}/{record.blood_pressure2 ?? nullValue}</span>
    )
}