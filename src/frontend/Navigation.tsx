import React from "react";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import PeopleIcon from "@material-ui/icons/People";
import HospitalBuilding from "mdi-material-ui/HospitalBuilding"
import Logout from "mdi-material-ui/Logout"
import Needle from "mdi-material-ui/Needle"
import Person from "@material-ui/icons/Person";
import AppNavigation, {AppNavItemI} from "./components/app/AppNavigation";

const navigation: AppNavItemI[] = [{
    label: 'Pacjenci',
    to: "/patients",
    icon: AccessibilityIcon
}, {
    label: 'Hospitalizacje',
    to: "/hospitalization",
    icon: HospitalBuilding
}, {
    label: "Badania",
    to: "/examinations",
    icon: Needle
}, "---", {
    label: 'Pracownicy',
    to: "/personel",
    icon: PeopleIcon
}, {
    label: 'Profil',
    to: "/profile",
    icon: Person
}, {
    label: 'Wyloguj się',
    to: "/logout",
    icon: Logout
}]

export default function Navigation() {
    return (
        <AppNavigation items={navigation}/>
    )
}