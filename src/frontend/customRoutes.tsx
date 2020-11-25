import React from "react";
import {Route} from 'react-router-dom';
import UserProfile from "./components/profile/UserProfile";

export default [
    <Route exact path="/profile" component={UserProfile}/>
];