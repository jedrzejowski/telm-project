import {PersonelShortT, PersonelShortY, PersonelT, PersonelRowT} from "../../data/personel";
import axios from "axios";
import {QueryCache, QueryResult, useQuery} from "react-query";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";

export function usePersonel(personel_id: string): QueryResult<PersonelRowT>;
export function usePersonel(personel_id: null): QueryResult<null>;
export function usePersonel(personel_id: string | null): QueryResult<PersonelRowT | null>;
export function usePersonel(personel_id: string | null): QueryResult<PersonelRowT | null> {
    return useQuery(["personel", personel_id], ($1, personel_id) => {
        if (typeof personel_id === "string") {
            return fetchSelectPersona(personel_id)
        } else {
            return null
        }
    });
}

export async function fetchSelectPersona(personel_id: string) {
    const response = await axios.get<{
        status: string
        personel: PersonelRowT
    }>(`/api/personel/${personel_id}`);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.personel;
    }

    throw response;
}

export async function fetchSelectPersonel(query: AppQueryFilter<PersonelShortT>) {
    const response = await axios.get<{
        status: string,
        result: AppQueryResult<PersonelShortT>
    }>(`/api/personel/`, {params: query});

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.result;
    }

    throw response;
}

export async function fetchInsertPersonel(personel: PersonelT): Promise<PersonelRowT> {
    const response = await axios.post<{
        status: string
        personel: PersonelRowT
    }>("/api/personel", personel);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        return response.data.personel;
    }

    throw response;
}

export async function fetchUpdatePersonel(personel_id: string, personel: PersonelT, cache?: QueryCache): Promise<PersonelRowT> {
    const response = await axios.put<{
        status: string
        personel: PersonelRowT
    }>(`/api/personel/${personel_id}`, personel);

    if (
        response.status == 200 &&
        response.data.status === "success"
    ) {
        const {personel} = response.data;

        if (cache) {
            cache.setQueryData(["personel", personel_id], personel)
        }

        return personel;
    }

    throw response;
}
