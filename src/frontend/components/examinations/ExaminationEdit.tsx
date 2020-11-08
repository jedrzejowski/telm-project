import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    Edit,
    useDataProvider,
    NullableBooleanInput,
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yupUtils";
import {HospitalizationT} from "../../../data/hospitalizations";
import {Grid, InputAdornment, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import {useField, useForm, useFormState} from "react-final-form";
import {WithId} from "../../../data/_";
import {ExaminationY} from "../../../data/examinations";
import {PatientReferenceInput} from "../patients/PatientReference";
import {makeStyles} from "@material-ui/core/styles";
import {PersonelReferenceInput} from "../personel/PersonelReference";

const validate = makeValidate(ExaminationY);
const required = makeRequired(ExaminationY);

const useStyles = makeStyles(theme => ({
    gridItem: {
        paddingTop: '0!important',
        paddingBottom: '0!important',
        "$ > *": {
            width: "99% !important"
        }
    },
    fullWidth: {
        width: "99% !important"
    }
}))


function HospitalizationByPatientField(
    props: Omit<Parameters<typeof PatientReferenceInput>[0], "source"> & {}
) {

    const {...ra} = props;
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
    const classes = useStyles();

    return <div>

        <Grid container spacing={2}>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <HospitalizationByPatientField {...ra} disabled={!isNew}/>
            </Grid>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <PersonelReferenceInput
                    {...ra}
                    disabled={!isNew}
                    fullWidth
                    source="personel_id"
                />
            </Grid>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="temperature"
                    required={required.temperature}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                    }}
                    className={classes.fullWidth}
                />
            </Grid>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="pulse"
                    required={required.pulse}
                    className={classes.fullWidth}
                />
            </Grid>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="blood_pressure1"
                    required={required.blood_pressure1}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                    }}
                    className={classes.fullWidth}
                />
            </Grid>

            <Grid item xs={12} sm={6} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="blood_pressure2"
                    required={required.blood_pressure2}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                    }}
                    className={classes.fullWidth}
                />
            </Grid>
            <Grid item xs={12} sm={5} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="mass"
                    required={required.mass}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    className={classes.fullWidth}
                />
            </Grid>

            <Grid item xs={12} sm={5} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="urine"
                    required={required.urine}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                    }}
                    className={classes.fullWidth}
                />
            </Grid>


            <Grid item xs={12} sm={2} classes={{root: classes.gridItem}}>
                <NullableBooleanInput
                    source="stool"
                    required={required.stool}
                    className={classes.fullWidth}
                />
            </Grid>


            <Grid item xs={12} classes={{root: classes.gridItem}}>
                <TextInput
                    {...ra}
                    source="comment"
                    required={required.comment}
                    multiline
                    className={classes.fullWidth}
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
    timestamp: "1970-01-01T00:00:00.000Z",
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
