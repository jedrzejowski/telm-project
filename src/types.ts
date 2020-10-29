
export type Dictionary<T> = { [key: string]: T | undefined }

declare global {
    const IS_PRODUCTION: boolean;
    const IS_DEVELOPMENT: boolean;
}

