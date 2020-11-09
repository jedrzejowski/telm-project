import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import {ExaminationT} from "../../../data/examinations";
import dayjs from "dayjs";
import EmoticonPoop from "mdi-material-ui/EmoticonPoop";
import CloseIcon from "mdi-material-ui/Close";
import {nullValue} from "../lib/NullValue";

function ExaminationsTable(props: {
    examinations: ExaminationT[]
}) {
    const {
        examinations
    } = props;

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
                                {dayjs(row.timestamp).format("MMM DD, hh:mm")}
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