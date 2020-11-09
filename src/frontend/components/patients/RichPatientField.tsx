import React from "react";
import {PatientT} from "../../../data/patients";
import {Box, Typography} from "@material-ui/core";
import {Labeled} from "react-admin";
import {Variant as TypoVariant} from "@material-ui/core/styles/createTypography";
import {makeStyles} from "@material-ui/core/styles";
import GenderFemale from "mdi-material-ui/GenderFemale";
import GenderMale from "mdi-material-ui/GenderMale";
import HeadQuestionOutline from "mdi-material-ui/HeadQuestionOutline";

interface Props {
    basePath?: string
    className?: string
    disabled?: boolean
    // input: undefined
    record?: PatientT
    resource?: string
    translateChoice?: boolean
    variant?: TypoVariant;
}

const useStyles = makeStyles(theme => ({
    label: {
        marginRight: theme.spacing(1)
    }
}));

export default function RichPatientField(props: Props) {
    const {
        resource,
        record,
        variant
    } = props;
    const classes = useStyles();

    if (resource !== "patients" || !record) {
        throw new Error();
    }


    return <Box>

        <Labeled resource={resource} source="name1" className={classes.label}>
            <Typography variant={variant}>
                {record.name1}
            </Typography>
        </Labeled>

        {record.name3 ? (
            <Labeled resource={resource} source="name3" className={classes.label}>
                <Typography variant={variant}>
                    {record.name3}
                </Typography>
            </Labeled>
        ) : null}

        <Labeled resource={resource} source="name2" className={classes.label}>
            <Typography variant={variant}>
                {record.name2},
            </Typography>
        </Labeled>

        <Labeled resource={resource} source="sex" className={classes.label}>
            <Typography variant={variant}>
                {record.sex === "M" ? <GenderMale/> : null}
                {record.sex === "F" ? <GenderFemale/> : null}
                {record.sex === "O" ? <HeadQuestionOutline/> : null}
            </Typography>
        </Labeled>

        {record.pesel ? (
            <Labeled resource={resource} source="pesel" className={classes.label}>
                <Typography variant={variant}>
                    {record.pesel}
                </Typography>
            </Labeled>
        ) : (
            <Labeled resource={resource} source="date_of_birth" className={classes.label}>
                <Typography variant={variant}>
                    {record.date_of_birth}
                </Typography>
            </Labeled>
        )}

    </Box>;
}