import {PatientT} from "../../data/Patient";
import Dict = NodeJS.Dict;

export interface AppStore {
    session_state: null
    patients: Dict<PatientT>
}

export interface AppActions {
    PATIENT_COMMIT: PatientT
}

export interface AppAction<T extends keyof AppActions> {
    type: T
    data: AppActions[T]
}
