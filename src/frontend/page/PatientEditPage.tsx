import React from "react";
import {useHistory, useParams} from "react-router-dom";
import PatientEditor from "../components/patient/PatientEditor";
import {PatientT} from "../../data/patient";
import {insertPatient, updatePatient, usePatient} from "../data/patients";
import {useQueryCache} from "react-query";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function PatientEditPage() {
    const {id: patient_id} = useParams<{ id: string }>();
    const cache = useQueryCache();
    const history = useHistory();

    const is_new = patient_id === "new";

    const [patient, setPatient] = React.useState<PatientT | null>(null);
    const {status, data} = usePatient(patient_id === "new" ? null : patient_id);

    async function handleSave(patient: PatientT) {
        try {
            if (is_new) {
                const {patient_id} = await insertPatient(patient);
                history.push(`/patients/${patient_id}`);

            } else {
                await updatePatient(patient_id, patient, cache);
            }
        } catch (e) {
            // TODO
        }
    }

    React.useEffect(() => {
        if (is_new) {
            setPatient(new_patient);
            return;
        }

        if (status === "success" && data) {
            setPatient(data);
            return;
        }

    }, [patient_id, status]);

    if (patient === null) {
        return null;
    }

    return (

        <Container>

            <Paper>

                <Toolbar>

                    <Typography variant="h4">
                        {is_new ? "NowyPacjent" : "Edycja pacjenta"}
                    </Typography>

                    <Box flexGrow={1}/>
                </Toolbar>

                <Container>
                    <PatientEditor patient={patient} onSave={handleSave}/>

                </Container>
            </Paper>

        </Container>
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
