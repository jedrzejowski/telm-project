import React, {FC} from "react";
import PropTypes from "prop-types";
import {PatientT} from "../../../data/patients";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Labeled, linkToRecord, Link} from "react-admin";
import type {Variant as TypoVariant} from "@material-ui/core/styles/createTypography";
import {makeStyles} from "@material-ui/core/styles";
import GenderFemale from "mdi-material-ui/GenderFemale";
import GenderMale from "mdi-material-ui/GenderMale";
import HeadQuestionOutline from "mdi-material-ui/HeadQuestionOutline";
import type {RaFieldProps} from "../../lib/ra-types";
import type {WithId} from "../../../data/_";

interface Props extends RaFieldProps<WithId<PatientT>> {
    className?: string
    disabled?: boolean
    // input: undefined
    translateChoice?: boolean
    variant?: TypoVariant;
}

const useStyles = makeStyles(theme => ({
    label: {
        marginRight: theme.spacing(1)
    }
}));

const RichPatientField: FC<Omit<Props, "source">> = (props: Props) => {
    const {
        resource,
        record,
        variant
    } = props;
    const classes = useStyles();

    if (resource !== "patients" || !record) {
        throw new Error();
    }

    const basePath = `/${resource}`


    return <Box>
        <Link to={`${linkToRecord(basePath, record && record.id)}/show`}>

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

        </Link>
    </Box>
}

export default RichPatientField;

RichPatientField.propTypes = {
    resource: PropTypes.string,
    record: PropTypes.any
};
