import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  host: process.env.HOST ?? "0.0.0.0",
  port: toNumber(process.env.PORT, 4000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "*",
  database: {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: toNumber(process.env.DB_PORT, 5432),
    database: process.env.DB_NAME ?? "ccs_sitin_monitoring",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    ssl: process.env.DB_SSL === "true",
  },
};
