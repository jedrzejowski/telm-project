import {combineReducers} from "redux";
import {TypedReducer} from "./createTypedReducerFactory";

interface TypedReducerMap {
    [name: string]: TypedReducer<any, any>
}

export default function <Map extends TypedReducerMap>(reducers: Map) {

    const new_map: any = {}

    for (const key of Object.keys(reducers)) {
        const reducer = reducers[key];
        reducer.ref.stateSelector = (state) => state[key];
        new_map[key] = reducer.myApp;
    }

    return combineReducers(new_map);
}