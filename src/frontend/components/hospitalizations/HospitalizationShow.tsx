import React from "react";
import {
    Show,
    RichTextField,
    ReferenceField,
    Loading,
    useQueryWithStore,
    SimpleShowLayout,
    ReferenceManyField,
} from "react-admin";
import TimestampField from "../lib/TimestampField";
import ExaminationChart from "../examinations/ExaminationsChart";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {RaFieldProps} from "../../lib/ra-types";
import {makeStyles} from "@material-ui/core/styles";
import ExaminationsTable from "../examinations/ExaminationsTable";
import RichPatientField from "../patients/RichPatientField";
import {PersonelReferenceField} from "../personel/PersonelReference";
import type {RaRecord} from "../../../data/_";
import type {HospitalizationRa, HospitalizationT} from "../../../data/hospitalizations";
import type {ExaminationT} from "../../../data/examinations";
import {ExaminationDataGrid} from "../examinations/ExaminationList";

const useStyles = makeStyles(theme => ({
    expand: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
    }
}))

export default function HospitalizationShow(props: {}) {

    return (
        <Show  {...props}>
            <SimpleShowLayout>

                <HeaderField/>
                <ExaminationsField/>

            </SimpleShowLayout>
        </Show>
    );
}

function HeaderField(props: Omit<RaFieldProps<HospitalizationRa>, "source">) {

    return <Grid container spacing={2}>

        <Grid item xs={12}>
            <ReferenceField {...props} source="patient_id" reference="patients" link={false}>
                <RichPatientField variant="h4"/>
            </ReferenceField>
        </Grid>

        <Grid item xs={12} md={6}>

            <Toolbar disableGutters>

                <Typography variant="h6">
                    Rozpoczęcie
                </Typography>

                <Box flexGrow={1}/>
                <TimestampField {...props} source="time_start"/>

            </Toolbar>

            <Box>
                <PersonelReferenceField
                    {...props}
                    fullWidth
                    source="personel_id_start"
                />
            </Box>

            <Box>
                <RichTextField {...props} source="comment_start"/>
            </Box>
        </Grid>

        <Grid item xs={12} md={6}>

            <Toolbar disableGutters>

                <Typography variant="h6">
                    Zakończenie
                </Typography>

                <Box flexGrow={1}/>

                <TimestampField {...props} source="time_end"/>

            </Toolbar>

            <Box>
                <PersonelReferenceField
                    {...props}
                    fullWidth
                    source="personel_id_end"
                />
            </Box>

            <Box>
                <RichTextField {...props} source="comment_end"/>
            </Box>

        </Grid>

    </Grid>
}

function ExaminationsField(props: Omit<RaFieldProps<HospitalizationT>, "source">) {
    const {record: hospitalization} = props;
    const [tab, setTab] = React.useState("charts");
    const classes = useStyles();

    if (!hospitalization) {
        throw new Error();
    }

    const {data, loading, error} = useQueryWithStore({
        type: "getList",
        resource: "examinations",
        payload: {
            pagination: {page: 1, perPage: 999},
            sort: {field: "timestamp", order: "asc"},
            filter: {hospitalization_id: hospitalization.id}
        }
    });

    const data_array = React.useMemo(() => {
        if (!data) {
            return [];
        }

        return Object.entries(data as RaRecord<ExaminationT>[])
            .map(entry => entry[1])
            .sort((a, b) => {
                if (a.timestamp < b.timestamp) {
                    return -1;
                }
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                return 0;
            })

    }, [data]);

    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <p>ERROR</p>;
    }

    return <Box>

        <Tabs
            value={tab}
            onChange={(event, value) => setTab(value)}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab value="charts" label="Wykresy"/>
            <Tab value="tables" label="Dane tabelaryczne"/>
        </Tabs>

        <Divider className={classes.expand}/>

        <Box display={tab === "charts" ? "block" : "none"}>
            <ExaminationChart examinations={data_array}/>
        </Box>

        <Box display={tab === "tables" ? "block" : "none"} className={classes.expand}>
            <ReferenceManyField
                basePath={props.basePath}
                reference="examinations"
                target="hospitalization_id"
                sort={{field: "timestamp", order: "desc"}}
            >
                <ExaminationDataGrid showPatient={false}/>
            </ReferenceManyField>
        </Box>

    </Box>;
}

