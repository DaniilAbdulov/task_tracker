export const development = {
    client: "postgresql",
    connection: {
        database: "task-tracker",
        user: "postgres",
        password: "0896",
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};
