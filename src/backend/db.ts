import knex from "knex";

const db = knex({
    client: "pg",
    connection: {
        host: process.env.NODE_PGHOST,
        user: process.env.NODE_PGUSER,
        database: process.env.NODE_PGDATABASE,
        password: process.env.NODE_PGPASSWD,
        port: process.env.NODE_PGPORT ? parseInt(process.env.NODE_PGPORT) : undefined,
    },
    searchPath: ["public"],
    pool: {
        min: 0, max: 7
    }
});

export default db;
