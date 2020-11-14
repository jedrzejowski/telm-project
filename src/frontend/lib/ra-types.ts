import {RaRecord} from "../../data/_";
import {PropTypes} from "@material-ui/core";

export type RaFieldProps<Record extends object = any, RecordWithId = RaRecord<Record>> = {
    source: keyof Record | string;
    basePath?: string;
    record?: Record;
    resource?: string;
    label?: string;
    align?: PropTypes.Alignment;
}
