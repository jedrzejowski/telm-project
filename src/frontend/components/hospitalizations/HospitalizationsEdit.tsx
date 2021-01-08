import React, {FC} from "react";
import {
    Create,
    TextInput,
    DateTimeInput,
    Edit,
    SimpleForm, Toolbar, SaveButton
} from "react-admin";
import {makeRequired, makeValidate} from "../../lib/yup-frm-utils";
import {HospitalizationY} from "../../../data/hospitalizations";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {PatientReferenceInput} from "../patients/PatientReference";
import {PersonelReferenceInput} from "../personel/PersonelReference";
import {makeStyles} from "@material-ui/core/styles";

const validate = makeValidate(HospitalizationY);
const required = makeRequired(HospitalizationY);

const useStyles = makeStyles(theme => ({
    gridItem: {
        paddingTop: '0!important',
        paddingBottom: '0!important',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

function Forms(props: {
    isNew?: boolean
}) {
    const {isNew = false, ...ra} = props;
    const classes = useStyles();

    return <>

        <Grid container spacing={2}>

            <Grid item xs={12} classes={{root: classes.gridItem}}>
                <PatientReferenceInput
                    {...ra}
                    fullWidth
                    source="patient_id"
                />
            </Grid>

            <Grid item xs={12} md={6} classes={{root: classes.gridItem}}>
                <Typography>
                    Rozpoczęcie
                </Typography>

                <PersonelReferenceInput
                    {...ra}
                    fullWidth
                    source="personel_id_start"
                />
                <DateTimeInput
                    {...ra}
                    source="time_start"
                    required={required.time_start}
                    style={{width: "100%"}}
                />
                <TextInput
                    source="comment_start"
                    required={required.comment_start}
                    multiline
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} classes={{root: classes.gridItem}}>
                <Typography>
                    Zakończenie
                </Typography>

                <PersonelReferenceInput
                    {...ra}
                    fullWidth
                    source="personel_id_end"
                />
                <DateTimeInput
                    {...ra}
                    source="time_end"
                    required={required.time_end}
                    style={{width: "100%"}}
                />
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
            <SimpleForm validate={validate} toolbar={<CustomEditToolbar />}>
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
            <SimpleForm validate={validate} initialValues={new_hospitalization}>
                <Forms isNew/>
            </SimpleForm>
        </Create>
    )
}

const CustomEditToolbar: FC<any> = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton/>
    </Toolbar>
);

