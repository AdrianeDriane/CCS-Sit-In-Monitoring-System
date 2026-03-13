import knex from "knex";
import { env } from "../config/env";

export const db = knex({
  client: "pg",
  connection: {
    host: env.database.host,
    port: env.database.port,
    database: env.database.database,
    user: env.database.user,
    password: env.database.password,
    ssl: env.database.ssl
      ? {
          rejectUnauthorized: false,
        }
      : false,
  },
  pool: {
    min: 0,
    max: 10,
  },
});
