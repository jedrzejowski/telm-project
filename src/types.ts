export type Dictionary<T> = { [key: string]: T | undefined }

declare global {
    const IS_PRODUCTION: boolean;
    const IS_DEVELOPMENT: boolean;
}

export interface WhoAmI {
    id: string;
    fullName: string;
    permissions: AppPermissions;
}

type ResourceId = "patients" | "hospitalizations" | "examinations" | "personel"

export type AppPermissions = Record<ResourceId, {
    edit: boolean
}>
