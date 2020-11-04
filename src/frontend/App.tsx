import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PatientEditPage from "./page/PatientEditPage";
import PatientListPage from "./page/PatientListPage";
import AppLayout from "./components/app/AppLayout";
import Navigation from "./Navigation";
import PersonelListPage from "./page/PersonelListPage";

export default function App() {
    return <>
        <AppWhenLogged/>
    </>
}

function AppWhenLogged() {
    return <Switch>
        <AppLayout
            appName={"TELM Dashboard"}
            navigation={<Navigation/>}
        >

            <Route path="/patients/" exact render={() => <PatientListPage/>}/>
            <Route path="/patients/:id" render={() => <PatientEditPage/>}/>
            <Route path="/personel/" exact render={() => <PersonelListPage/>}/>
            <Route path="/personel/:id" render={() => <PersonelEditPage/>}/>

        </AppLayout>
    </Switch>
}