import {WithId} from "../../data/_";

export type RaFieldProps<Record extends object, RecordWithId = WithId<Record>> = {
    source?: keyof Record | string;
    basePath?: string;
    record?: Record;
    resource?: string;
}
