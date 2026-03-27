import { app } from "./app";
import { env } from "./config/env";
import { db } from "./db/knex";

const start = async () => {
  try {
    await db.raw("select 1");

    app.listen(env.port, env.host, () => {
      console.log(`Server listening on http://${env.host}:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL.", error);
    process.exit(1);
  }
};

void start();
