import dotenv from "dotenv";
dotenv.config({ path: "../backend/.env" });
export const development = {
    client: "postgresql",
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};
