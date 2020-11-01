import {PatientShortT, PatientShortY, PatientT, PatientWithIdT} from "../../data/patient";
import axios from "axios";
import {QueryCache, QueryResult, useQuery} from "react-query";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";

export function usePatient(patient_id: string): QueryResult<PatientWithIdT>;
export function usePatient(patient_id: null): QueryResult<null>;
export function usePatient(patient_id: string | null): QueryResult<PatientWithIdT | null>;
export function usePatient(patient_id: string | null): QueryResult<PatientWithIdT | null> {
    return useQuery(["patients", patient_id], ($1, patient_id) => {
        if (typeof patient_id === "string") {
            return fetchPatient(patient_id)
        } else {
            return null
        }
    });
}

export async function fetchPatient(patient_id: string) {
    const response = await axios.get<{
        status: string
        patient: PatientWithIdT
    }>(`/api/patients/${patient_id}`);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.patient;
    }

    throw response;
}

export async function fetchPatients(query: AppQueryFilter<PatientShortT>) {
    const response = await axios.get<{
        status: string,
        result: AppQueryResult<PatientShortT>
    }>(`/api/patients/`, {params: query});

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.result;
    }

    throw response;
}

export async function insertPatient(patient: PatientT): Promise<PatientWithIdT> {
    const response = await axios.post<{
        status: string
        patient: PatientWithIdT
    }>("/api/patients", patient);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.patient;
    }

    throw response;
}

export async function updatePatient(patient_id: string, patient: PatientT, cache?: QueryCache): Promise<PatientWithIdT> {
    const response = await axios.put<{
        status: string
        patient: PatientWithIdT
    }>(`/api/patients/${patient_id}`, patient);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        const {patient} = response.data;

        if (cache) {
            cache.setQueryData(["patients", patient_id], patient)
        }

        return patient;
    }

    throw response;
}
