import pg from "pg";
import knexjs from "knex";

const database = new pg.Pool({
    host: process.env.NODE_PGHOST,
    user: process.env.NODE_PGUSER,
    database: process.env.NODE_PGDATABASE,
    password: process.env.NODE_PGPASSWD,
    port: process.env.NODE_PGPORT ? parseInt(process.env.NODE_PGPORT) : undefined,
    min: 0,
    max: 7
});

pg.types.setTypeParser(1082, str => str);

export const knex = knexjs({
    client: "pg",
    connection: {
        host: process.env.NODE_PGHOST,
        user: process.env.NODE_PGUSER,
        database: process.env.NODE_PGDATABASE,
        password: process.env.NODE_PGPASSWD,
        port: process.env.NODE_PGPORT ? parseInt(process.env.NODE_PGPORT) : undefined,
    },
    pool: {min: 0, max: 7}
});

export default database;
