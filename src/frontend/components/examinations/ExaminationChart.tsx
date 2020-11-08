import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
    ResponsiveContainer,
    AreaChart, Area,
    TooltipProps, TickGeneratorFunction, ScatterChart, Scatter
} from "recharts";
import {ExaminationT} from "../../../data/examinations";
import dayjs from "dayjs";
import {Box, FormControlLabel, Switch, Toolbar, Typography, useTheme} from "@material-ui/core";

interface DataRow {
    time: number;
    time_label: string;
    temperature: number | null;
}

function ExaminationChart(props: {
    examinations: ExaminationT[]
}) {
    const {examinations} = props;
    const [showLines, setShowLines] = React.useState(false);

    const [data, timeTicks] = React.useMemo<[DataRow[], number[]]>(() => {
        let min_time = Infinity, max_time = -Infinity;

        const data = examinations.map(examination => {
            const date = dayjs(examination.timestamp);
            const time = date.valueOf();

            if (min_time > time) min_time = time;
            if (max_time < time) max_time = time;

            return {
                time,
                time_label: date.toISOString(),
                temperature: examination.temperature ? parseFloat(examination.temperature) : null
            }
        });

        // wytworzenie linii czasu

        let time_ticks: number[] = [];

        let date = dayjs(min_time);
        date = date.set("hour", 20);
        date = date.set("minute", 0);
        date = date.set("second", 0);
        date = date.set("millisecond", 0);
        while (date.isAfter(min_time)) {
            date = date.subtract(12, "hour");
        }
        date = date.subtract(12, "hour");
        while (date.isBefore(max_time)) {
            time_ticks.push(date.valueOf());
            date = date.add(12, "hour");
        }
        time_ticks.push(date.valueOf());


        return [data, time_ticks];
    }, [examinations]);

    const lineSwitch = (
        <FormControlLabel
            control={
                <Switch
                    checked={showLines}
                    onChange={() => setShowLines(!showLines)}
                    color="secondary"
                />
            }
            labelPlacement="start"
            label="Połącz punkty"

        />
    )

    return <>
        <Toolbar>

            <Typography variant="h6">
                Temperatura
            </Typography>

            <Box flexGrow={1}/>

            {lineSwitch}
        </Toolbar>

        <ResponsiveContainer height={500}>

            <ScatterChart
                data={data}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={timeTicks}
                    tick={<TimeTick/>}
                />

                <YAxis
                    domain={[35, 42]}
                    ticks={[36, 37, 38, 39, 40, 41]}
                    tick={<ValueTicks unit=" °C"/>}
                />

                <Tooltip content={<MyTooltip/>}/>

                <Scatter
                    isAnimationActive={false}
                    dataKey="temperature"
                    stroke="#FF0000"
                    line={showLines}
                    fill="#FF0000"
                />

            </ScatterChart>

        </ResponsiveContainer>

        {/*1 90-140*/}
        <ResponsiveContainer height={500}>

            <ScatterChart
                data={data}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={timeTicks}
                    tick={<TimeTick/>}
                />

                <YAxis
                    domain={[35, 42]}
                    ticks={[36, 37, 38, 39, 40, 41]}
                    tick={<ValueTicks unit=" °C"/>}
                />

                <Tooltip content={<MyTooltip/>}/>

                <Scatter
                    isAnimationActive={false}
                    dataKey="temperature"
                    stroke="#FF0000"
                    line={showLines}
                    fill="#FF0000"
                />

            </ScatterChart>

        </ResponsiveContainer>

        {/*1 50-90*/}
    </>
}

export default React.memo(ExaminationChart);

function TimeTick(props: {}) {
    const theme = useTheme();
    const {
        x, y, payload,
    } = props as unknown as {
        x: number;
        y: number;
        height: number;
        payload: {
            value: number
        }
    };

    const typo = theme.typography.body2;
    const time = dayjs(payload.value);

    return <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={18} textAnchor="middle"
              fill={theme.palette.text.secondary}
              fontFamily={typo.fontFamily}
              fontSize={typo.fontSize}>
            <tspan>{time.format("MMM D")}</tspan>
        </text>
        <text x={0} y={theme.typography.fontSize * 1.43} dy={18} textAnchor="middle"
              fill={theme.palette.text.secondary}
              fontFamily={typo.fontFamily}
              fontSize={typo.fontSize}>
            <tspan>{time.format("H:mm")}</tspan>
        </text>
    </g>;
}

function ValueTicks(props: {
    unit: string;
}) {

    const {
        unit,
    } = props;

    const {
        x, y, payload,
    } = props as unknown as {
        x: number;
        y: number;
        height: number;
        payload: {
            value: number
        }
    };

    const theme = useTheme();
    const typo = theme.typography.body2;

    return <g>
        <text
            x={x - theme.typography.fontSize / 3}
            y={y + theme.typography.fontSize / 2}
            textAnchor="end"
            fill={theme.palette.text.secondary}
            fontFamily={typo.fontFamily}
            fontSize={typo.fontSize}
        >
            <tspan>{payload.value} {unit}</tspan>
        </text>
    </g>;
}

function MyTooltip(props: {}) {
    const {
        active,
        payload
    } = props as unknown as {
        active: boolean
        payload: { payload: DataRow }[]
    }

    if (!active)
        return null;

    const row = payload[0].payload;

    return <ul>
        qweqwe
        {row.temperature}
    </ul>
}