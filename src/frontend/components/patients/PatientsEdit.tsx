import React, {FC} from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    Create,
    SaveButton,
    Toolbar
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yup-frm-utils";
import {PatientT, PatientY} from "../../../data/patients";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});


const validate = makeValidate(PatientY);
const required = makeRequired(PatientY);


export default function PatientsEdit(props: Parameters<typeof Edit>[0]) {

    return (
        <Edit {...props}>
            <SimpleForm validate={validate} toolbar={<CustomEditToolbar />}>
                <TextInput source="name1" required={required.name1}/>
                <TextInput source="name2" required={required.name2}/>
                <TextInput source="name3" required={required.name3}/>
                <TextInput source="pesel" required={required.pesel}/>
                <SelectInput source="sex" choices={[
                    {id: 'O', name: 'Inna'},
                    {id: 'M', name: 'Mężczyzna'},
                    {id: 'F', name: 'Kobieta'},
                ]} required={required.sex}/>
                <DateInput source="date_of_birth" required={required.date_of_birth}/>
                <DateInput source="date_of_death" required={required.date_of_death}/>
            </SimpleForm>
        </Edit>
    )
}

const new_patient: PatientT = {
    name1: "",
    name2: "",
    name3: null,
    pesel: null,
    sex: "O",
    date_of_birth: "",
    date_of_death: null,
}

export function PatientCreate(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}
                        initialValues={new_patient}>
                <TextInput source="name1" required={required.name1}/>
                <TextInput source="name2" required={required.name2}/>
                <TextInput source="name3" required={required.name3}/>
                <TextInput source="pesel" required={required.pesel}/>
                <SelectInput source="sex" choices={[
                    {id: 'O', name: 'Inna'},
                    {id: 'M', name: 'Mężczyzna'},
                    {id: 'F', name: 'Kobieta'},
                ]} required={required.sex}/>
                <DateInput source="date_of_birth" required={required.date_of_birth}/>
                <DateInput source="date_of_death" required={required.date_of_death}/>
            </SimpleForm>
        </Create>
    )
}

const CustomEditToolbar: FC<any> = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton/>
    </Toolbar>
);
