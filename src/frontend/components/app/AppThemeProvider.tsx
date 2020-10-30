import React, {useState} from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

const default_theme = createMuiTheme({});

const meta = document.createElement("meta");
meta.name = "theme-color"
document.head.append(meta);

export default function AppThemeProvider(props: {
    browserColor?: boolean
    children: React.ReactNode
}) {
    const [theme, setTheme] = useState(default_theme);

    meta.content = theme.palette.primary.main;

    return (
        <ThemeProvider theme={theme}>

            {props.children}
        </ThemeProvider>
    );
}