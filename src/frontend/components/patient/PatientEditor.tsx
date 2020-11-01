import React from "react";
import {PatientT, PatientY} from "../../../data/patient";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import noop from "../../../lib/noop";
import {Form} from "react-final-form";
import {Select, TextField, DatePicker, makeValidate, makeRequired} from "mui-rff";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const validate = makeValidate(PatientY);
const required = makeRequired(PatientY);

export default function PatientEditor(props: {
    patient: PatientT
    onSave?: (patient: PatientT) => void
    onCancel?: () => void
}) {
    const {
        patient,
        onSave = noop
    } = props;

    return <Form
        initialValues={patient}
        onSubmit={(values) => {
            return PatientY.validate(values).then(patient => onSave(patient))
        }}
        validate={validate}
        render={({handleSubmit, submitting, errors}) => (
            <form onSubmit={handleSubmit} noValidate={true}>

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
                    required={required.name1}
                />

                <TextField
                    label="Imię"
                    name="name2"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    required={required.name2}
                />

                <TextField
                    label="Drugie imię"
                    name="name3"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    required={required.name3}
                />

                <TextField
                    label="PESEL"
                    name="pesel"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    required={required.pesel}
                />

                <Select
                    name="sex"
                    label="Płeć"
                    required={required.sex}
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
                    required={required.date_of_birth}
                    format={"yyyy-MM-dd"}
                    inputVariant="outlined"
                    margin="dense"
                    size="small"
                />

                <DatePicker
                    label="Data śmierci"
                    name="date_of_death"
                    required={required.date_of_death}
                    format={"yyyy-MM-dd"}
                    clearable
                    inputVariant="outlined"
                    margin="dense"
                    size="small"
                />

                <Toolbar>

                    <Box flexGrow={1}/>

                    <Box ml={2}>
                        <Button type="button" variant="contained" disabled={submitting}>
                            Anuluj
                        </Button>
                    </Box>

                    <Box ml={2}>
                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                            Zapisz
                        </Button>
                    </Box>

                </Toolbar>
            </form>
        )}
    />
}