import React from "react";
import {Show, SimpleShowLayout, RichTextField, ReferenceField, Loading, useQueryWithStore, Labeled} from "react-admin";
import TimestampField from "../lib/TimestampField";
import {HospitalizationT} from "../../../data/hospitalizations";
import ExaminationChart from "../examinations/ExaminationsChart";
import {Box, Grid, Tabs, Tab, Divider, Typography, Toolbar} from "@material-ui/core";
import {RaFieldProps} from "../../lib/ra-types";
import {WithId} from "../../../data/_";
import {ExaminationT} from "../../../data/examinations";
import {makeStyles} from "@material-ui/core/styles";
import ExaminationsTable from "../examinations/ExaminationsTable";
import RichPatientField from "../patients/RichPatientField";
import {PersonelReferenceField} from "../personel/PersonelReference";

const useStyles = makeStyles(theme => ({
    expand: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
    }
}))

export default function HospitalizationShow(props: {}) {


    return (
        <Show {...props}>
            <SimpleShowLayout>

                {/* @ts-ignore */}
                <HeaderField/>

                {/* @ts-ignore */}
                <ExaminationsField/>


            </SimpleShowLayout>
        </Show>
    );
}

function HeaderField(props: RaFieldProps<WithId<HospitalizationT>>) {
    const {record: hospitalization} = props;

    return <Grid container spacing={2}>

        <Grid item xs={12}>
            <ReferenceField {...props} source="patient_id" reference="patients" link={false}>
                <RichPatientField variant="h4"/>
            </ReferenceField>
        </Grid>

        <Grid item xs={12} md={6}>

            <Toolbar disableGutters>

                <Typography>
                    Rozpoczęcie
                </Typography>

                <Box flexGrow={1}/>
                <TimestampField {...props} source="time_start"/>

            </Toolbar>

            <Box>
                <RichTextField {...props} source="comment_start"/>
            </Box>

            <Box>
                <PersonelReferenceField
                    {...props}
                    fullWidth
                    source="personel_id_start"
                />
            </Box>
        </Grid>

        <Grid item xs={12} md={6}>

            <Toolbar disableGutters>

                <Typography>
                    Zakończenie
                </Typography>

                <Box flexGrow={1}/>

                <TimestampField {...props} source="time_end"/>

            </Toolbar>

            <Box>
                <RichTextField {...props} source="comment_end"/>
            </Box>

            <Box>
                <PersonelReferenceField
                    {...props}
                    fullWidth
                    source="personel_id_end"
                />
            </Box>

        </Grid>

    </Grid>
}

function ExaminationsField(props: RaFieldProps<HospitalizationT>) {
    const {record: hospitalization, ...ra} = props;
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

        return Object.entries(data as WithId<ExaminationT>[])
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
            <ExaminationsTable examinations={data_array}/>
        </Box>

    </Box>;
}

