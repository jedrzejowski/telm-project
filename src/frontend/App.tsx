import React from "react";
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import PatientsList from "./components/patients/PatientsList";
import PatientsEdit, {PatientCreate} from "./components/patients/PatientsEdit";
import PatientIcon from "@material-ui/icons/Accessibility";

import PersonelList from "./components/personel/PersonelList";
import PersonelEdit, {PersonelCreate} from "./components/personel/PersonelEditor";
import PersonelIcon from "@material-ui/icons/Person";

import HospitalizationIcon from "mdi-material-ui/HospitalBuilding";
import HospitalizationsEdit, {HospitalizationsCreate} from "./components/hospitalizations/HospitalizationsEdit";
import HospitalizationsList from "./components/hospitalizations/HospitalizationsList";

import ExaminationIcon from "mdi-material-ui/Needle";
import ExaminationList from "./components/examinations/ExaminationList";
import ExaminationEdit, {ExaminationCreate} from "./components/examinations/ExaminationEdit";

export default function App() {
    return (
        <Admin dataProvider={simpleRestProvider("/api")}>

            <Resource
                name="patients"
                list={PatientsList}
                edit={PatientsEdit}
                create={PatientCreate}
                icon={PatientIcon}
            />

            <Resource
                name="hospitalizations"
                list={HospitalizationsList}
                edit={HospitalizationsEdit}
                create={HospitalizationsCreate}
                icon={HospitalizationIcon}
            />

            <Resource
                name="examinations"
                list={ExaminationList}
                edit={ExaminationEdit}
                create={ExaminationCreate}
                icon={ExaminationIcon}
            />

            <Resource
                name="personel"
                list={PersonelList}
                edit={PersonelEdit}
                create={PersonelCreate}
                icon={PersonelIcon}
            />

        </Admin>
    )
}
