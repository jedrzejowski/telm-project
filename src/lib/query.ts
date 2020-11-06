
export interface AppQueryFilter<F extends object> {
    offset: number,
    limit: number,
    sortField: string | null,
    sortOrder: "asc" | "desc" | null,
    filter?: F
}

export interface AppQueryResult<T extends object> {
    rows: T[];
    totalCount: number;
    query: AppQueryFilter<any>;
}