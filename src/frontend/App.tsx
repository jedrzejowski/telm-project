import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PatientEditPage from "./page/PatientEditPage";
import PatientListPage from "./page/PatientListPage";

export default function App() {
    return <>
        <div>App</div>
        <AppWhenLogged/>
    </>
}

function AppWhenLogged() {
    return <Switch>
        <Route path="/patients/" render={() => <PatientListPage/>}/>
        <Route path="/patients/:id" render={() => <PatientEditPage/>}/>
    </Switch>
}