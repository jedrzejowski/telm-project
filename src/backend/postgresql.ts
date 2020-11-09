import pg from "pg";
import knexjs from "knex";
import getEnv from "./getEnv";

const env = getEnv();

const postgresql = new pg.Pool({
    host: env.APP_PGHOST,
    user: env.APP_PGUSER,
    database: env.APP_PGDATABASE,
    password: env.APP_PGPASSWD,
    port: env.APP_PGPORT,
    min: 0,
    max: 7
});

pg.types.setTypeParser(1082, str => str);

export const knex = knexjs({
    client: "pg",
    connection: {
        host: env.APP_PGHOST,
        user: env.APP_PGUSER,
        database: env.APP_PGDATABASE,
        password: env.APP_PGPASSWD,
        port: env.APP_PGPORT,
    },
    pool: {min: 0, max: 7}
});

export default postgresql;
