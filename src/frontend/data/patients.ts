import {PatientShortT, PatientShortY, PatientT, PatientRowT} from "../../data/patient";
import axios from "axios";
import {QueryCache, QueryResult, useQuery} from "react-query";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";

export function usePatient(patient_id: string): QueryResult<PatientRowT>;
export function usePatient(patient_id: null): QueryResult<null>;
export function usePatient(patient_id: string | null): QueryResult<PatientRowT | null>;
export function usePatient(patient_id: string | null): QueryResult<PatientRowT | null> {
    return useQuery(["patients", patient_id], ($1, patient_id) => {
        if (typeof patient_id === "string") {
            return fetchSelectPatient(patient_id)
        } else {
            return null
        }
    });
}

export async function fetchSelectPatient(patient_id: string) {
    const response = await axios.get<{
        status: string
        patient: PatientRowT
    }>(`/api/patients/${patient_id}`);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.patient;
    }

    throw response;
}

export async function fetchSelectPatients(query: AppQueryFilter<PatientShortT>) {
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

export async function fetchInsertPatient(patient: PatientT): Promise<PatientRowT> {
    const response = await axios.post<{
        status: string
        patient: PatientRowT
    }>("/api/patients", patient);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.patient;
    }

    throw response;
}

export async function fetchUpdatePatient(patient_id: string, patient: PatientT, cache?: QueryCache): Promise<PatientRowT> {
    const response = await axios.put<{
        status: string
        patient: PatientRowT
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
