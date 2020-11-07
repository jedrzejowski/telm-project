import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    AutocompleteInput,
    DateTimeInput,
    ReferenceInput,
    Edit,
    useDataProvider,
    NumberInput,
    useGetOne
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationT, HospitalizationY} from "../../../data/hospitalizations";
import {Grid, InputAdornment} from "@material-ui/core";
import {useField, useForm} from "react-final-form";
import {PatientT} from "../../../data/patients";
import {WithId} from "../../../data/_";
import {ExaminationY} from "../../../data/examinations";
import {PatientReferenceInput} from "../patients/PatientReference";

const validate = makeValidate(ExaminationY);
const required = makeRequired(ExaminationY);

function HospitalizationByPatientField(props: {}) {
    const {...ra} = {};
    const patient_id_field = useField("patient_id");
    const [hospitalization, setHospitalization] = React.useState<HospitalizationT | null>(null)
    const formApi = useForm();
    const dataProvider = useDataProvider();

    React.useEffect(() => {
        let cancel = false;
        setHospitalization(null);

        if (!patient_id_field.input.value) {
            return;
        }

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
        <PatientReferenceInput
            {...ra}
            source="patient_id"
            filter={{
                has_ongoing_hospitalization: true
            }}
        />
    )
}

function Forms(props: {
    isNew?: boolean
}) {
    const {isNew = false, ...ra} = props;

    return <div>

        <Grid container spacing={2}>

            <Grid item xs={12}>
                <HospitalizationByPatientField {...ra}/>
            </Grid>

            <Grid item xs={12} sm={6} md={4} spacing={1}>
                <NumberInput
                    {...ra}
                    source="pulse"
                    parse={(pulse: number) => Number.isFinite(pulse) ? pulse / 1000 : null}
                    format={(pulse: number) => Number.isFinite(pulse) ? pulse * 1000 : ""}
                    required={required.pulse}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                    }}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <NumberInput
                    {...ra}
                    source="temperature"
                    required={required.temperature}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                    }}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <TextInput
                    {...ra}
                    source="blood_pressure"
                    required={required.blood_pressure}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <NumberInput
                    {...ra}
                    source="stool"
                    parse={(stool: number) => Number.isFinite(stool) ? stool / 1000 : null}
                    format={(stool: number) => Number.isFinite(stool) ? stool * 1000 : ""}
                    required={required.stool}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mg</InputAdornment>,
                    }}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <NumberInput
                    {...ra}
                    source="urine"
                    parse={(urine: number) => Number.isFinite(urine) ? urine / 1000 : null}
                    format={(urine: number) => Number.isFinite(urine) ? urine * 1000 : ""}
                    required={required.urine}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                    }}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <NumberInput
                    {...ra}
                    source="mass"
                    parse={(mass: number) => Number.isFinite(mass) ? mass * 1000 : null}
                    format={(mass: number) => Number.isFinite(mass) ? mass / 1000 : ""}
                    required={required.mass}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    fullWidth
                    className="fixme"
                />
            </Grid>

            <Grid item xs={12}>
                <TextInput
                    {...ra}
                    source="comment"
                    required={required.comment}
                    multiline
                    fullWidth
                    className="fixme"
                />
            </Grid>

        </Grid>
    </div>
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

                <Forms isNew/>


            </SimpleForm>
        </Create>
    )
}
