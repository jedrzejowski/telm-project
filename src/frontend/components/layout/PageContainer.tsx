import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const useClasses = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}))


export default function PageContainer(props: {
    children: React.ReactNode
}) {
    const classes = useClasses();

    return (
        <Container classes={{root: classes.root}}>
            {props.children}
        </Container>
    )
}