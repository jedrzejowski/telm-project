import React from "react";
import {Show, SimpleShowLayout, useGetList, CreateButton, Loading} from 'react-admin';
import TimestampField from "../lib/TimestampField";
import {HospitalizationT} from "../../../data/hospitalizations";
import ExaminationChart from "../examinations/ExaminationChart";
import {Grid} from "@material-ui/core";
import {RaFieldProps} from "../../lib/ra-types";
import {WithId} from "../../../data/_";
import {ExaminationT} from "../../../data/examinations";


export default function HospitalizationShow(props: {}) {


    return (
        <Show {...props}>
            <SimpleShowLayout>

                {/* @ts-ignore */}
                <HeaderField/>
                {/* @ts-ignore */}
                <ExaminationsField/>

                <CreateButton/>

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

    const {data, loading, error} = useGetList<WithId<ExaminationT>>("examinations",
        {page: 1, perPage: 999},
        {field: "timestamp", order: "asc"},
        {hospitalization_id: hospitalization.id}
    );

    const data_array = React.useMemo(() => {
        if (!data) {
            return [];
        }

        return Object.entries(data)
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

    return <ExaminationChart examinations={data_array}/>;
}

