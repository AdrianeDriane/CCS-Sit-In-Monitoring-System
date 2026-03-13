import path from "path";
import { db } from "../db/knex";

const migrateDirectory = path.resolve(__dirname, "../../migrations");
const seedDirectory = path.resolve(__dirname, "../../seeds");

const bootstrap = async () => {
  try {
    console.log("Running database migrations...");
    await db.migrate.latest({ directory: migrateDirectory });

    const hasUsersTable = await db.schema.hasTable("users");

    if (!hasUsersTable) {
      throw new Error("Users table was not created.");
    }

    const result = await db("users").count<{ count: string }>("id as count").first();
    const userCount = Number(result?.count ?? 0);

    if (userCount === 0) {
      console.log("Seeding development users...");
      await db.seed.run({ directory: seedDirectory });
    } else {
      console.log(`Users table already contains ${userCount} record(s). Skipping seed.`);
    }

    console.log("Database bootstrap complete.");
  } finally {
    await db.destroy();
  }
};

void bootstrap().catch((error) => {
  console.error("Database bootstrap failed.", error);
  process.exit(1);
});
