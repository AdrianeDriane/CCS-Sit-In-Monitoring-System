import type { Knex } from "knex";

const TABLE_NAME = "users";
const ROLE_CHECK = "role IN ('STUDENT', 'FACULTY', 'WS')";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary();
    table.string("id_number", 50).notNullable().unique();
    table.string("email", 255).notNullable().unique();
    table.string("first_name", 100).notNullable();
    table.string("last_name", 100).notNullable();
    table.string("middle_name", 100).nullable();
    table.string("role", 20).notNullable();
    table.string("password_hash", 255).notNullable();
    table.string("course", 50).nullable();
    table.string("year_level", 20).nullable();
    table.text("address").nullable();
    table.timestamps(true, true);
  });

  await knex.schema.raw(
    `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT users_role_check CHECK (${ROLE_CHECK})`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
