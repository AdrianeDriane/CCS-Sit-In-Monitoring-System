import { app } from "./app";
import { env } from "./config/env";
import { db } from "./db/knex";

const start = async () => {
  try {
    await db.raw("select 1");

    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL.", error);
    process.exit(1);
  }
};

void start();
