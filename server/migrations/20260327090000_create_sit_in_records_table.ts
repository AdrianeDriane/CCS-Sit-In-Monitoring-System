import type { Knex } from "knex";

const TABLE_NAME = "sit_in_records";
const STATUS_CHECK = "status IN ('ACTIVE', 'COMPLETED')";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary();
    table
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("laboratory", 100).notNullable();
    table.string("purpose", 255).nullable();
    table.string("status", 20).notNullable().defaultTo("ACTIVE");
    table
      .timestamp("time_in", { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp("time_out", { useTz: false }).nullable();
    table.timestamps(true, true);

    table.index(["student_id"], "sit_in_records_student_id_idx");
    table.index(["status"], "sit_in_records_status_idx");
  });

  await knex.schema.raw(
    `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT sit_in_records_status_check CHECK (${STATUS_CHECK})`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}
