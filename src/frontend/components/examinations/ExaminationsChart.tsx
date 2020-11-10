import React from "react";
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
    ScatterChart, Scatter, BarChart, Bar, ReferenceLine
} from "recharts";
import dayjs from "dayjs";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import colors from "@material-ui/core/colors";
import type {ExaminationT} from "../../../data/examinations";
import useTheme from "@material-ui/core/styles/useTheme";

interface PointDataRow {
    time: number;
    pulse: number | null;
    temperature: number | null;
    blood_pressure1: number | null;
    blood_pressure2: number | null;
}

interface DayDataRow {
    time: number;
    urine: number;
}

type onMouseMoveFunction = (mouseStatus: {
    chartX: number;
    chartY: number;
    xValue: number;
    yValue: number;
} | null, event: unknown) => void

function ExaminationsChart(props: {
    examinations: ExaminationT[]
}) {
    const {examinations} = props;
    const [showLines, setShowLines] = React.useState(false);
    const [refLineX, setRefLineX] = React.useState<number | null>(null);

    const [
        fullDayTicks,
        halfDayTicks,
        point_data,
        day_data,
    ] = React.useMemo<[
        number[],
        number[],
        PointDataRow[],
        DayDataRow[]
    ]>(() => {
        let min_time = Infinity, max_time = -Infinity;

        const day_data: Record<number, DayDataRow> = {}

        const point_data = examinations.map(examination => {
            const point_date = dayjs(examination.timestamp);
            const day_date = point_date.set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0);
            const point_time = point_date.valueOf(), day_time = day_date.valueOf();

            if (min_time > point_time) min_time = point_time;
            if (max_time < point_time) max_time = point_time;

            if (!day_data[day_time]) {
                day_data[day_time] = {
                    time: day_time,
                    urine: 0,
                }
            }

            day_data[day_time].urine += examination.urine ? parseFloat(examination.urine) : 0;

            return {
                time: point_time,
                pulse: parseFloat(examination.pulse ?? ""),
                temperature: parseFloat(examination.temperature ?? ""),
                blood_pressure1: parseFloat(examination.blood_pressure1 ?? ""),
                blood_pressure2: parseFloat(examination.blood_pressure2 ?? ""),
            }
        });

        // wytworzenie linii czasu

        let half_day_ticks: number[] = [];
        let full_day_ticks: number[] = [];

        let half_day = dayjs(min_time);
        half_day = half_day.set("hour", 20);
        half_day = half_day.set("minute", 0);
        half_day = half_day.set("second", 0);
        half_day = half_day.set("millisecond", 0);
        while (half_day.isAfter(min_time)) {
            half_day = half_day.subtract(12, "hour");
        }
        half_day = half_day.subtract(12, "hour");
        let full_day = half_day.set("hour", 0);
        while (half_day.isBefore(max_time)) {
            half_day_ticks.push(half_day.valueOf());
            half_day = half_day.add(12, "hour");
        }
        half_day_ticks.push(half_day.valueOf());
        while (full_day.isBefore(max_time)) {
            full_day_ticks.push(full_day.valueOf());
            full_day = full_day.add(1, "day");
        }
        full_day_ticks.push(full_day.valueOf());


        return [
            full_day_ticks,
            half_day_ticks,
            point_data,
            Object.values(day_data)
        ];
    }, [examinations]);

    const handleChartMouseOut: onMouseMoveFunction = (mouseStatus) => {
        // if (mouseStatus) {
        //     setRefLineX(mouseStatus.xValue);
        // } else {
        //     setRefLineX(null);
        // }
    }

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

    const referenceLine = (
        refLineX ? <ReferenceLine x={refLineX} stroke="black"/> : null
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
                data={point_data}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
                onMouseMove={handleChartMouseOut}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={halfDayTicks}
                    tick={<TimeTick/>}
                />

                <YAxis
                    domain={[35, 42]}
                    ticks={[36, 37, 38, 39, 40, 41]}
                    tick={<ValueTicks unit=" °C"/>}
                />

                <Tooltip/>

                <Scatter
                    isAnimationActive={false}
                    dataKey="temperature"
                    stroke={colors.red.A700}
                    line={showLines}
                    fill={colors.red.A100}
                />

                {referenceLine}

            </ScatterChart>

        </ResponsiveContainer>

        <Toolbar>

            <Typography variant="h6">
                Puls
            </Typography>

            <Box flexGrow={1}/>

            {lineSwitch}
        </Toolbar>

        <ResponsiveContainer height={500}>

            <ScatterChart
                data={point_data}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
                onMouseMove={handleChartMouseOut}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={halfDayTicks}
                    tick={<TimeTick/>}
                />

                <YAxis
                    domain={[0, 300]}
                    tick={<ValueTicks/>}
                />

                <Tooltip/>

                <Scatter
                    isAnimationActive={false}
                    dataKey="pulse"
                    stroke={colors.purple.A700}
                    line={showLines}
                    fill={colors.purple.A100}
                />

                {referenceLine}

            </ScatterChart>

        </ResponsiveContainer>

        <Toolbar>

            <Typography variant="h6">
                Ciśnienie krwi
            </Typography>

            <Box flexGrow={1}/>

            {lineSwitch}
        </Toolbar>

        <ResponsiveContainer height={500}>

            <ScatterChart
                data={point_data}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
                onMouseMove={handleChartMouseOut}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={halfDayTicks}
                    tick={<TimeTick/>}
                />

                <YAxis
                    domain={[0, 300]}
                    tick={<ValueTicks/>}
                />

                <Tooltip/>

                <Scatter
                    isAnimationActive={false}
                    dataKey="blood_pressure1"
                    stroke={colors.lightBlue.A700}
                    line={showLines}
                    fill={colors.lightBlue.A100}
                />

                <Scatter
                    isAnimationActive={false}
                    dataKey="blood_pressure2"
                    stroke={colors.green.A700}
                    line={showLines}
                    fill={colors.green.A100}
                />

                {referenceLine}

            </ScatterChart>

        </ResponsiveContainer>

        <Toolbar>

            <Typography variant="h6">
                Mocz
            </Typography>

            <Box flexGrow={1}/>
        </Toolbar>

        <ResponsiveContainer height={500}>

            <BarChart
                data={day_data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 40,
                }}
                onMouseMove={handleChartMouseOut}
            >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    dataKey="time"
                    ticks={fullDayTicks}
                    tick={<TimeTick showHours={false}/>}
                />

                <YAxis
                    domain={[0, dataMax => Math.ceil(dataMax / 100) * 100]}
                    tick={<ValueTicks/>}
                />

                <Tooltip content={<MyTooltip/>}/>

                <Bar
                    isAnimationActive={false}
                    dataKey="urine"
                    stroke={colors.amber.A700}
                    fill={colors.amber.A100}
                />

                {referenceLine}

            </BarChart>

        </ResponsiveContainer>

    </>
}

export default React.memo(ExaminationsChart);

function TimeTick(props: {
    showHours?: boolean;
}) {
    const theme = useTheme();
    const {
        showHours = true,
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
    unit?: string;
}) {

    const {
        unit = "",
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
            <tspan>{payload.value}{unit ? (" " + unit) : ""}</tspan>
        </text>
    </g>;
}

function MyTooltip(props: {}) {
    const {
        active,
        payload
    } = props as unknown as {
        active: boolean
        payload: { payload: any }[]
    }

    if (!active)
        return null;

    const row = payload[0].payload;

    return <ul>
        qweqwe
        {row.temperature}
    </ul>
}