import React from "react";
import {PatientT, PatientY} from "../../../data/Patient";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import noop from "../../../lib/noop";
import {Form} from "react-final-form";
import {Select, TextField, DatePicker, makeValidate, makeRequired} from "mui-rff";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import empty_uuid from "../../../lib/empty_uuid";

const validate = makeValidate(PatientY);
const required = makeRequired(PatientY);

// @ts-ignore
global.PatientY = PatientY;

export default function PatientEditor(props: {
    patient: PatientT | null
    onChange?: (patient: PatientT) => void
    onSave?: (patient: PatientT) => void
    onCancel?: () => void
}) {
    const {
        patient,
        onChange = noop
    } = props;

    console.log(patient ?? {patient_id: empty_uuid});

    return <Form
        initialValues={patient ?? {patient_id: empty_uuid}}
        onSubmit={(values, e) => console.log("submit", values)}
        subscription={{
            submitting: true
        }}
        render={({values, handleSubmit, submitting, errors}) => (
            <form onSubmit={handleSubmit}>

                <Box>
                    <Typography component="span" variant="h6">
                        Pacjent
                    </Typography>

                    <Typography component="span" variant="caption">
                        #
                    </Typography>
                </Box>

                <TextField
                    label="Nazwisko"
                    name="name1"
                    variant="outlined"
                    margin="dense"
                    size="small"
                />

                <Box>
                    <TextField
                        label="Imię"
                        name="name2"
                        variant="outlined"
                        margin="dense"
                        size="small"
                    />

                    <TextField
                        label="Drugie imię"
                        name="name3"
                        variant="outlined"
                        margin="dense"
                        size="small"
                    />
                </Box>

                <TextField
                    label="PESEL"
                    name="pesel"
                    variant="outlined"
                    margin="dense"
                    size="small"
                />

                <Select
                    name="sex"
                    label="Płeć"
                    formControlProps={{
                        margin: "dense",
                        variant: "outlined"
                    }}
                >
                    <MenuItem value="O">Inna</MenuItem>
                    <MenuItem value="M">Mężczyzna</MenuItem>
                    <MenuItem value="F">Kobieta</MenuItem>
                </Select>

                <DatePicker
                    label="Data urodzenia"
                    name="date_of_birth"
                    format={"yyyy-MM-dd"}
                    inputVariant="outlined"
                    margin="dense"
                    size="small"
                />

                <DatePicker
                    label="Data śmierci"
                    name="date_of_death"
                    format={"yyyy-MM-dd"}
                    clearable
                    inputVariant="outlined"
                    margin="dense"
                    size="small"
                />

                <pre>HERE:{JSON.stringify(values)}{console.log("qwe",values)}</pre>

                <Toolbar>
                    <Button type="button" variant="contained" disabled={submitting}>
                        Anuluj
                    </Button>
                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                        Zapisz
                    </Button>
                </Toolbar>
            </form>
        )}
    />
}