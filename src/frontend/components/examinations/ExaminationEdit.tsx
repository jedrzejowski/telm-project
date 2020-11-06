import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    AutocompleteInput,
    DateTimeInput,
    ReferenceInput,
    Edit,
    useDataProvider
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationT, HospitalizationY} from "../../../data/hospitalizations";
import {Grid} from "@material-ui/core";
import {useField, useForm} from "react-final-form";
import {PatientT} from "../../../data/patients";
import {WithId} from "../../../data/_";

const validate = makeValidate(HospitalizationY);
const required = makeRequired(HospitalizationY);

function HospitalizationByPatientField(props: {}) {
    const {...ra} = {};
    const patient_id_field = useField("patient_id");
    const [hospitalization, setHospitalization] = React.useState<HospitalizationT | null>(null)
    const formApi = useForm();
    const dataProvider = useDataProvider();

    React.useEffect(() => {
        let cancel = false;
        setHospitalization(null);

        dataProvider
            .getList<WithId<HospitalizationT>>("hospitalizations", {
                pagination: {page: 1, perPage: 1},
                sort: {field: "time_start", order: "desc"},
                filter: {
                    patient_id: patient_id_field.input.value,
                    is_ongoing: true,
                }
            })
            .then(response => {
                const hospitalization = response.data[0];
                if (!cancel && hospitalization) {
                    setHospitalization(hospitalization);
                    formApi.change("hospitalization_id", hospitalization.id);
                }
            })

        return () => {
            cancel = true;
        }
    }, [patient_id_field.input.value]);

    return (
        <ReferenceInput
            {...ra}
            source="patient_id"
            reference="patients"
            filter={{
                has_ongoing_hospitalization: true
            }}
        >
            <AutocompleteInput optionText="name1"/>
        </ReferenceInput>
    )
}

function Forms(props: {
    isNew?: boolean
}) {
    const {isNew = false, ...ra} = props;

    return <>

        <Grid container spacing={2}>

        </Grid>
    </>
}


export default function ExaminationEdit(props: Parameters<typeof Create>[0]) {

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


export function ExaminationCreate(props: Parameters<typeof Create>[0]) {

    return (
        <Create {...props} >
            <SimpleForm validate={validate}
                        initialValues={new_hospitalization}>

                <HospitalizationByPatientField/>

                <Forms isNew/>
            </SimpleForm>
        </Create>
    )
}
