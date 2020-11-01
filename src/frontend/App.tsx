import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PatientEditPage from "./page/PatientEditPage";
import PatientListPage from "./page/PatientListPage";
import AppLayout from "./components/app/AppLayout";

export default function App() {
    return <>
        <div>App</div>
        <AppWhenLogged/>
    </>
}

function AppWhenLogged() {
    return <Switch>
        <AppLayout
            appName={"TELM Dashboard"}>

            <Route path="/patients/" exact render={() => <PatientListPage/>}/>
            <Route path="/patients/:id" render={() => <PatientEditPage/>}/>

        </AppLayout>
    </Switch>
}