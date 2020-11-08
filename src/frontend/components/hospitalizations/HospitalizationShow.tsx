import React from "react";
import {Show, SimpleShowLayout, useGetList, CreateButton, Loading, useQueryWithStore} from 'react-admin';
import TimestampField from "../lib/TimestampField";
import {HospitalizationT} from "../../../data/hospitalizations";
import ExaminationChart from "../examinations/ExaminationsChart";
import {Box, Grid, Tabs, Tab, Divider, useTheme} from "@material-ui/core";
import {RaFieldProps} from "../../lib/ra-types";
import {WithId} from "../../../data/_";
import {ExaminationT} from "../../../data/examinations";
import {makeStyles} from "@material-ui/core/styles";
import ExaminationsTable from "../examinations/ExaminationsTable";

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

function HeaderField(props: RaFieldProps<HospitalizationT>) {
    const {record: hospitalization, ...ra} = props;

    return <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <TimestampField {...props} source="time_start"/>

        </Grid>
        <Grid item xs={12} md={6}>
            <TimestampField {...props} source="time_end"/>

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

