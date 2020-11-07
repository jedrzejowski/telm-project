import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    DateTimeInput,
    Edit
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationY} from "../../../data/hospitalizations";
import {Grid} from "@material-ui/core";
import {PatientReferenceInput} from "../patients/PatientReference";
import {PersonelReferenceInput} from "../personel/PersonelReference";

const validate = makeValidate(HospitalizationY);
const required = makeRequired(HospitalizationY);

function Forms(props: {
    isNew?: boolean
}) {
    const {isNew = false, ...ra} = props;

    return <>

        <Grid container spacing={2}>

            <Grid item xs={12}>
                <PatientReferenceInput
                    {...ra}
                    fullWidth
                    source="patient_id"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <PersonelReferenceInput
                    {...ra}
                    fullWidth
                    source="personel_id_start"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <PersonelReferenceInput
                    {...ra}
                    fullWidth
                    source="personel_id_end"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DateTimeInput
                    {...ra}
                    source="time_start"
                    required={required.time_start}
                    style={{width: "100%"}}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <DateTimeInput
                    {...ra}
                    source="time_end"
                    required={required.time_end}
                    style={{width: "100%"}}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextInput
                    source="comment_start"
                    required={required.comment_start}
                    multiline
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextInput
                    {...ra}
                    source="comment_end"
                    required={required.comment_end}
                    multiline
                    style={{width: "100%"}}
                />
            </Grid>
        </Grid>
    </>
}


export default function HospitalizationsEdit(props: Parameters<typeof Create>[0]) {

    return (
        <Edit {...props} >
            <SimpleForm validate={validate}>
                <Forms/>
            </SimpleForm>
        </Edit>
    )
}

const new_hospitalization = {
    patient_id: "",
    time_start: null,
    time_end: null,
    personel_id_start: null,
    personel_id_end: null,
    comment_start: null,
    comment_end: null
}


export function HospitalizationsCreate(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}
                        initialValues={new_hospitalization}>
                <Forms isNew/>
            </SimpleForm>
        </Create>
    )
}
