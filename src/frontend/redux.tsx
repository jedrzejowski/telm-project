import React from "react"
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux"
import {AppAction, AppStore} from "./data/_types";
import {reduxCommits} from "./data/_commit";
import {applyMiddleware, createStore} from "redux";

const initial_state: AppStore = {
    patients: {},
    session_state: null
}

function myApp(state: AppStore = initial_state, action: AppAction<any>): AppStore {

    // @ts-ignore
    const commit = reduxCommits[action.type];

    if (commit) {
        // @ts-ignore
        state = commit(state, action.data);
    }

    return state;
}

function* mySaga() {

}

export function createReduxStore() {
    let middlewares = [];

    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    // @ts-ignore
    const store = createStoreWithMiddleware(myApp);

    sagaMiddleware.run(mySaga);

    return store;
}

export default function AppStoreProvider(props: { children: React.ReactNode }) {
    const store = React.useMemo(createReduxStore, []);
    return <Provider store={store}>{props.children}</Provider>;
}