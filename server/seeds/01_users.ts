import type { Knex } from "knex";
import { hashPassword } from "../src/utils/password";

const password = "password123";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    {
      id_number: "FAC-1001",
      email: "faculty.dev@uc.edu.ph",
      first_name: "Felisa",
      last_name: "Teacher",
      middle_name: "C",
      role: "FACULTY",
      password_hash: hashPassword(password),
      address: "Cebu City",
      remaining_sessions: 0,
    },
    {
      id_number: "WS-1001",
      email: "ws.dev@uc.edu.ph",
      first_name: "Warren",
      last_name: "Scholar",
      middle_name: "S",
      role: "WS",
      password_hash: hashPassword(password),
      address: "Cebu City",
      remaining_sessions: 0,
    },
    {
      id_number: "STU-1001",
      email: "student.dev@uc.edu.ph",
      first_name: "Sofia",
      last_name: "Student",
      middle_name: "M",
      role: "STUDENT",
      password_hash: hashPassword(password),
      course: "BSIT",
      year_level: "3",
      address: "Cebu City",
      remaining_sessions: 30,
    },
  ]);
}
