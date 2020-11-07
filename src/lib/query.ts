
export interface AppQueryFilter<F extends object> {
    offset: number,
    limit: number,
    sortField: string,
    sortOrder: "asc" | "desc",
    filter?: F
}

export interface AppQueryResult<T extends object> {
    rows: T[];
    totalCount: number;
    query: AppQueryFilter<any>;
}