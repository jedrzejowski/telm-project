import {Query, QueryResult} from "material-table";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";

export const materialTableLocalization = {
    header: {
        actions: "Akcje"
    },
    pagination: {
        labelDisplayedRows: "{from}-{to} z {count}"
    }
}

export function materialTableWrapFetch<RowData extends object>(
    fetchRows: (query: AppQueryFilter<RowData>) => Promise<AppQueryResult<RowData>>
) {
    return async (query: Query<RowData>): Promise<QueryResult<RowData>> => {
        let my_filter: any = {};

        for (const filter of query.filters) {
            if (filter.column.field) {
                my_filter[filter.column.field] = filter.value;
            }
        }

        const {rows, totalCount} = await fetchRows({
            offset: query.page * query.pageSize,
            filter: my_filter,
            limit: query.pageSize,
            // @ts-ignore
            sortField: query.orderBy?.field ?? null,
            sortOrder: query.orderBy ? query.orderDirection : null
        });

        return {totalCount, data: rows, page: query.page}
    }
}
