import React from "react";
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import PatientList from "./components/patient/PatientList";
import PatientEdit, {PatientCreate} from "./components/patient/PatientEdit";
import PatientIcon from "@material-ui/icons/Accessibility";

import PersonelList from "./components/personel/PersonelList";
import PersonelEdit, {PersonelCreate} from "./components/personel/PersonelEditor";
import PersonelIcon from "@material-ui/icons/Person";

import HospitalizationIcon from "mdi-material-ui/HospitalBuilding";
import HospitalizationEdit, {HospitalizationCreate} from "./components/hospitalization/HospitalizationEdit";
import HospitalizationList from "./components/hospitalization/HospitalizationList";

export default function App() {
    return (
        <Admin dataProvider={simpleRestProvider("/api")}>

            <Resource
                name="patients"
                list={PatientList}
                edit={PatientEdit}
                create={PatientCreate}
                icon={PatientIcon}
            />

            <Resource
                name="hospitalizations"
                list={HospitalizationList}
                edit={HospitalizationEdit}
                create={HospitalizationCreate}
                icon={HospitalizationIcon}
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
