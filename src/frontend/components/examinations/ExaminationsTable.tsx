import React from "react";
import dayjs from "dayjs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EmoticonPoop from "mdi-material-ui/EmoticonPoop";
import CloseIcon from "mdi-material-ui/Close";
import {nullValue} from "../lib/NullValue";
import type {ExaminationT} from "../../../data/examinations";
import useDayFormat from "../../lib/useDayFormat";

function ExaminationsTable(props: {
    examinations: ExaminationT[]
}) {
    const {
        examinations
    } = props;

    const dayFormat = useDayFormat();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Czas</TableCell>
                        <TableCell align="right">Puls</TableCell>
                        <TableCell align="right">Temperatura [°C]</TableCell>
                        <TableCell align="right">
                            Ciśnienie krwi<br/>[mmHg/mmHg]
                        </TableCell>
                        <TableCell align="right">Stolec</TableCell>
                        <TableCell align="right">Mocz [mm]</TableCell>
                        <TableCell align="right">Masa [kg]</TableCell>
                        <TableCell align="left">Komentarz</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {examinations.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {dayFormat(row.timestamp, "MMM DD, hh:mm")}
                            </TableCell>
                            <TableCell align="right">{row.pulse ?? nullValue}</TableCell>
                            <TableCell align="right">{row.temperature ?? nullValue}</TableCell>
                            <TableCell
                                align="right">{row.blood_pressure1 ?? nullValue}/{row.blood_pressure2 ?? nullValue}</TableCell>

                            <TableCell align="right">
                                {row.stool === true ? <EmoticonPoop/> :
                                    (row.stool === false ? <CloseIcon/> : nullValue)}
                            </TableCell>

                            <TableCell align="right">{row.urine ?? nullValue}</TableCell>
                            <TableCell align="right">{row.mass ?? nullValue}</TableCell>
                            <TableCell align="left">{row.comment ?? nullValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default React.memo(ExaminationsTable);