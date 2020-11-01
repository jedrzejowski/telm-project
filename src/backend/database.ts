import pg from "pg";

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

export default database;
