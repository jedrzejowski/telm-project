import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    BooleanInput,
    SelectInput,
    Create
} from 'react-admin';
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {PersonelT, PersonelY} from "../../../data/personel";

const validate = makeValidate(PersonelY);
const required = makeRequired(PersonelY);

export default function PersonelEdit(props: Parameters<typeof Edit>[0]) {

    return (
        <Edit {...props}>
            <SimpleForm validate={validate}>
                <TextInput source="username" required={required.username}/>
                <TextInput source="name1" required={required.name1}/>
                <TextInput source="name2" required={required.name2}/>
                <TextInput source="name3" required={required.name3}/>
                <TextInput source="pwz" required={required.pwz}/>
                <BooleanInput source="is_admin" required={required.is_admin}/>
            </SimpleForm>
        </Edit>
    )
}

const new_personel: PersonelT = {
    username: "",
    name1: "",
    name2: "",
    name3: null,
    pwz: "",
    is_admin: false,
}


export function PersonelCreate(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}
                        initialValues={new_personel}>
                <TextInput source="username" required={required.username}/>
                <TextInput source="name1" required={required.name1}/>
                <TextInput source="name2" required={required.name2}/>
                <TextInput source="name3" required={required.name3}/>
                <TextInput source="pwz" required={required.pwz}/>
                <BooleanInput source="is_admin" required={required.is_admin}/>
            </SimpleForm>
        </Create>
    )
}
