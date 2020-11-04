import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {useHistory} from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PersonelList from "../components/personel/PersonelList";

export default function PersonelListPage() {
    const history = useHistory();

    function handleNewPersonel() {
        history.push("/personel/new");
    }

    return (
        <PageContainer>

            <Paper>

                <Toolbar>

                    <Typography variant="h4">
                        List pracowników
                    </Typography>

                    <Box flexGrow={1}/>

                    <Tooltip title="Dodaj pacjenta">
                        <IconButton onClick={handleNewPersonel}>
                            <AddIcon fontSize="large"/>
                        </IconButton>
                    </Tooltip>

                </Toolbar>

                <PersonelList/>

            </Paper>

        </PageContainer>
    )
}
