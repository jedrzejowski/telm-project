import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import {HashRouter as Router} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import App from "./App";
import AppThemeProvider from "./components/app/AppThemeProvider";
import {AppTitleProvider} from "./components/app/AppTitle";

const app = document.createElement("div");
app.id = "app";
document.body.append(app);

ReactDOM.render(
    <Router>
        <AppThemeProvider>
            <AppTitleProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <CssBaseline/>
                        <App/>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </AppTitleProvider>
        </AppThemeProvider>
    </Router>,
    app);
