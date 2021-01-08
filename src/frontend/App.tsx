import React from "react";
import {Admin, Resource} from "react-admin";
import dataProvider from "./dataProvider";
import i18nProvider from "./i18nProvider";
import authProvider from "./authProvider";
import customRoutes from "./customRoutes";
import type {AppPermissions} from "../types";
// import {MyLayout} from "./myLayout";

import PatientsList from "./components/patients/PatientsList";
import PatientsEdit, {PatientCreate} from "./components/patients/PatientsEdit";
import PatientIcon from "@material-ui/icons/Accessibility";

import PersonelList from "./components/personel/PersonelList";
import PersonelEdit, {PersonelCreate} from "./components/personel/PersonelEditor";
import PersonelIcon from "@material-ui/icons/Person";

import HospitalizationIcon from "mdi-material-ui/HospitalBuilding";
import HospitalizationsEdit, {HospitalizationsCreate} from "./components/hospitalizations/HospitalizationsEdit";
import HospitalizationsList from "./components/hospitalizations/HospitalizationsList";
import HospitalizationShow from "./components/hospitalizations/HospitalizationShow";

import ExaminationIcon from "mdi-material-ui/Needle";
import ExaminationList from "./components/examinations/ExaminationList";
import ExaminationEdit, {ExaminationCreate} from "./components/examinations/ExaminationEdit";


export default function App() {
    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            customRoutes={customRoutes}
            // layout={MyLayout}
        >
            {(permissions: AppPermissions) => [

                permissions.patients ? (
                    <Resource
                        name="patients"
                        list={PatientsList}
                        edit={permissions.patients.edit ? PatientsEdit : undefined}
                        create={permissions.patients.edit ? PatientCreate : undefined}
                        icon={PatientIcon}
                    />
                ) : null,

                permissions.hospitalizations ? (
                    <Resource
                        name="hospitalizations"
                        list={HospitalizationsList}
                        edit={permissions.hospitalizations.edit ? HospitalizationsEdit : undefined}
                        create={permissions.hospitalizations.edit ? HospitalizationsCreate : undefined}
                        show={HospitalizationShow}
                        icon={HospitalizationIcon}
                    />
                ) : null,

                permissions.examinations ? (
                    <Resource
                        name="examinations"
                        list={ExaminationList}
                        edit={permissions.examinations.edit ? ExaminationEdit : undefined}
                        create={permissions.examinations.edit ? ExaminationCreate : undefined}
                        icon={ExaminationIcon}
                    />
                ) : null,

                permissions.personel ? (
                    <Resource
                        name="personel"
                        list={PersonelList}
                        edit={permissions.personel.edit ? PersonelEdit : undefined}
                        create={permissions.personel.edit ? PersonelCreate : undefined}
                        icon={PersonelIcon}
                    />
                ) : null

            ]}
        </Admin>
    )
}
