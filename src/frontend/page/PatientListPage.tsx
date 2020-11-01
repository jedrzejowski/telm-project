import React from "react";
import PatientList from "../components/patient/PatientList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {useHistory} from "react-router-dom";

export default function PatientListPage() {
    const history = useHistory();

    function handleNewPatient(){
        history.push("/patients/new");
    }

    return (
        <Container>

            <Paper>

                <Toolbar>

                    <Typography variant="h4">
                        List pacjentów
                    </Typography>

                    <Box flexGrow={1}/>

                    <Tooltip title="Dodaj pacjenta">
                        <IconButton onClick={handleNewPatient}>
                            <AddIcon fontSize="large"/>
                        </IconButton>
                    </Tooltip>

                </Toolbar>

                <PatientList/>

            </Paper>

        </Container>
    )
}
