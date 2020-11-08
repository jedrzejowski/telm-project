export type RaFieldProps<Record extends object> = {
    source: keyof Record;
    basePath?: string;
    record?: Record;
    resource?: string;
}

