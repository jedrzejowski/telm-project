import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    AutocompleteInput,
    DateTimeInput,
    ReferenceInput,
    Edit
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationY} from "../../../data/hospitalization";
import {Grid} from "@material-ui/core";

const validate = makeValidate(HospitalizationY);
const required = makeRequired(HospitalizationY);

function Forms(props: {
    isNew?: boolean
}) {
    const {isNew = false, ...ra} = props;

    return <>

        <Grid container spacing={3}>

            <Grid item xs={12}>
                <ReferenceInput {...ra} source="patient_id" reference="patients">
                    <AutocompleteInput optionText="name1"/>
                </ReferenceInput>
            </Grid>

            <Grid item xs={12} md={6}>
                <ReferenceInput {...ra} source="personel_id_start" reference="personel">
                    <AutocompleteInput optionText="name1"/>
                </ReferenceInput>
            </Grid>

            <Grid item xs={12} md={6}>
                <ReferenceInput {...ra} source="personel_id_end" reference="personel"
                                style={{width: "100%"}}
                                formClassName={"HUJU"}
                                className={"HUJU"}>
                    <AutocompleteInput
                        optionText="name1"
                        fullWidth
                        style={{width: "100%"}}
                    />
                </ReferenceInput>
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
