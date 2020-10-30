import React from "react";
import TextField from "@material-ui/core/TextField";
import {PatientT} from "../../../data/Patient";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import dayjs from "dayjs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import noop from "../../../lib/noop";

export default function PatientEditor(props: {
    patient: PatientT | null
    onChange?: (patient: PatientT) => void
}) {
    const {
        patient,
        onChange = noop
    } = props;

    const [name1, setName1] = React.useState<string | null>(null);
    const [name2, setName2] = React.useState<string | null>(null);
    const [name3, setName3] = React.useState<string | null>(null);
    const [pesel, setPesel] = React.useState<string | null>(null);
    const [sex, setSex] = React.useState<PatientT["sex"] | null>("O");
    const [date_of_birth, setDateOfBirth] = React.useState<string | null>(null);
    const [date_of_death, setDateOfDeath] = React.useState<string | null>(null);

    React.useEffect(() => {
        setName1(patient?.name1 ?? null);
        setName1(patient?.name2 ?? null);
        setName1(patient?.name3 ?? null);
        setName1(patient?.pesel ?? null);
        setName1(patient?.sex ?? "O");
        setName1(patient?.date_of_birth ?? null);
        setName1(patient?.date_of_death ?? null);
    }, [patient]);

    React.useEffect(() => {
        if (name1 && name2 && sex && date_of_birth && (
            patient?.name1 !== name1 ||
            patient?.name2 !== name2 ||
            patient?.name3 !== name3 ||
            patient?.pesel !== pesel ||
            patient?.sex !== sex ||
            patient?.date_of_birth !== date_of_birth ||
            patient?.date_of_death !== date_of_death
        )) {
            onChange({...patient, name1, name2, name3, pesel, sex, date_of_birth, date_of_death});
        }

    }, [name1, name2, name3, pesel, sex, date_of_birth, date_of_death]);

    return <div>
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
            value={name1 ?? ""}
            onChange={event => setName1(event.target.value || null)}
            variant="outlined"
            margin="dense"
            size="small"
        />

        <Box>
            <TextField
                label="Imię"
                value={name2 ?? ""}
                onChange={event => setName2(event.target.value || null)}
                variant="outlined"
                margin="dense"
                size="small"
            />

            <TextField
                label="Drugie imię"
                value={name3 ?? ""}
                onChange={event => setName3(event.target.value || null)}
                variant="outlined"
                margin="dense"
                size="small"
            />
        </Box>

        <TextField
            label="PESEL"
            value={pesel ?? ""}
            onChange={event => setPesel(event.target.value || null)}
            variant="outlined"
            margin="dense"
            size="small"
        />

        <FormControl variant="outlined" margin="dense">
            <InputLabel id="select-sex-label">Age</InputLabel>
            <Select
                labelId="select-sex-label"
                id="select-sex"
                value={sex}
                onChange={event => setSex(event.target.value as string)}
                label="Age"
            >
                <MenuItem value="O">Inna</MenuItem>
                <MenuItem value="M">Mężczyzna</MenuItem>
                <MenuItem value="F">Kobieta</MenuItem>
            </Select>
        </FormControl>

        <DatePicker
            label="Data urodzenia"
            value={date_of_birth}
            format={"yyyy-MM-dd"}
            onChange={date => setDateOfBirth(dayjs(date).format("YYYY-MM-DD"))}
            inputVariant="outlined"
            margin="dense"
            size="small"
        />

        <DatePicker
            label="Data śmierci"
            value={date_of_death}
            format={"yyyy-MM-dd"}
            onChange={date => setDateOfDeath(dayjs(date).format("YYYY-MM-DD"))}
            clearable
            inputVariant="outlined"
            margin="dense"
            size="small"
        />
    </div>
}