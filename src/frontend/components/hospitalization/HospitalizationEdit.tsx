import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Create,
    SimpleForm,
    TextInput,
    AutocompleteInput,
    DateTimeInput,
    ReferenceInput
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationY} from "../../../data/hospitalization";

const validate = makeValidate(HospitalizationY);
const required = makeRequired(HospitalizationY);


export default function HospitalizationEdit(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}>

                <ReferenceInput source="patient_id" reference="patients">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <ReferenceInput source="personel_id_start" reference="personel">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <ReferenceInput source="personel_id_end" reference="personel">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <DateTimeInput source="time_start" required={required.time_start}/>
                <DateTimeInput source="time_end" required={required.time_end}/>
                <TextInput source="comment_start" required={required.comment_start}/>
                <TextInput source="comment_end" required={required.comment_end}/>
            </SimpleForm>
        </Create>
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


export function HospitalizationCreate(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}
                        initialValues={new_hospitalization}>

                <ReferenceInput source="patient_id" reference="patients">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <ReferenceInput source="personel_id_start" reference="personel">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <ReferenceInput source="personel_id_end" reference="personel">
                    <AutocompleteInput optionText="name1" />
                </ReferenceInput>

                <DateTimeInput source="time_start" required={required.time_start}/>
                <DateTimeInput source="time_end" required={required.time_end}/>
                <TextInput source="comment_start" required={required.comment_start}/>
                <TextInput source="comment_end" required={required.comment_end}/>
            </SimpleForm>
        </Create>
    )
}
