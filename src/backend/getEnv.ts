import {InferType, number, object, string} from "yup";

const envY = object({
    APP_SECRET: string().defined().required(),
    APP_PGHOST: string().defined().required(),
    APP_PGUSER: string().defined().required(),
    APP_PGPASSWD: string().defined().required(),
    APP_PGDATABASE: string().defined().required(),
    APP_PGPORT: number().defined().required(),
    APP_REDISURL: string().defined().required(),
}).defined().required()

type Env = InferType<typeof envY>;
let env: Env | undefined;

export default function (): Env {
    if (!env) {
        env = envY.validateSync(process.env, {
            stripUnknown: true
        });
    }

    return env;
}


