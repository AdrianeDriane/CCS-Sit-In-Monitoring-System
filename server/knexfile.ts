import type { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const migrationsDirectory = path.join(__dirname, "migrations");
const seedsDirectory = path.join(__dirname, "seeds");

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: migrationsDirectory,
    extension: "ts",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: seedsDirectory,
    extension: "ts",
  },
  pool: {
    min: 0,
    max: 10,
  },
} satisfies Partial<Knex.Config>;

const config: Record<string, Knex.Config> = {
  development: {
    ...sharedConfig,
    connection: {
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT ?? 5432),
      database: process.env.DB_NAME ?? "ccs_sitin_monitoring",
      user: process.env.DB_USER ?? "postgres",
      password: process.env.DB_PASSWORD ?? "postgres",
      ssl:
        process.env.DB_SSL === "true"
          ? {
              rejectUnauthorized: false,
            }
          : false,
    },
  },
};

export default config;
module.exports = config;
