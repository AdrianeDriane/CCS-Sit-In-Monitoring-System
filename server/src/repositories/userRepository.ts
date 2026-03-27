import { db } from "../db/knex";
import type { UserRecord, UserRole } from "../types/auth";

const USERS_TABLE = "users";

export interface CreateUserInput {
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  role: UserRole;
  passwordHash: string;
  course?: string | null;
  yearLevel?: string | null;
  address?: string | null;
  remainingSessions?: number;
}

export interface UpdateStudentProfileInput {
  lastName: string;
  firstName: string;
  middleName?: string | null;
  course?: string | null;
  yearLevel?: string | null;
  email: string;
  address?: string | null;
}

const columns = [
  "id",
  "id_number as idNumber",
  "email",
  "first_name as firstName",
  "last_name as lastName",
  "middle_name as middleName",
  "role",
  "password_hash as passwordHash",
  "course",
  "year_level as yearLevel",
  "address",
  "remaining_sessions as remainingSessions",
  "created_at as createdAt",
  "updated_at as updatedAt",
];

export const findUserByIdentifier = async (identifier: string) => {
  const user = await db(USERS_TABLE)
    .select(columns)
    .whereILike("id_number", identifier)
    .orWhereILike("email", identifier)
    .first();

  return (user ?? null) as UserRecord | null;
};

export const findUserById = async (id: number) => {
  const user = await db(USERS_TABLE).select(columns).where({ id }).first();

  return (user ?? null) as UserRecord | null;
};

export const createUser = async (input: CreateUserInput) => {
  const [user] = await db(USERS_TABLE)
    .insert({
      id_number: input.idNumber,
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      middle_name: input.middleName ?? null,
      role: input.role,
      password_hash: input.passwordHash,
      course: input.course ?? null,
      year_level: input.yearLevel ?? null,
      address: input.address ?? null,
      remaining_sessions: input.remainingSessions ?? 30,
    })
    .returning(columns);

  return user as UserRecord;
};

export const decrementRemainingSessionsById = async (id: number) => {
  const [user] = await db(USERS_TABLE)
    .where({ id, role: "STUDENT" })
    .where("remaining_sessions", ">", 0)
    .decrement("remaining_sessions", 1)
    .returning(columns);

  return (user ?? null) as UserRecord | null;
};

export const findUserByIdNumberOrEmail = async (
  idNumber: string,
  email: string,
) => {
  const user = await db(USERS_TABLE)
    .select(columns)
    .whereILike("id_number", idNumber)
    .orWhereILike("email", email)
    .first();

  return (user ?? null) as UserRecord | null;
};

export const findUserByEmailExcludingId = async (email: string, id: number) => {
  const user = await db(USERS_TABLE)
    .select(columns)
    .whereILike("email", email)
    .whereNot({ id })
    .first();

  return (user ?? null) as UserRecord | null;
};

export const updateStudentProfileById = async (
  id: number,
  input: UpdateStudentProfileInput,
) => {
  const [user] = await db(USERS_TABLE)
    .update({
      last_name: input.lastName,
      first_name: input.firstName,
      middle_name: input.middleName ?? null,
      course: input.course ?? null,
      year_level: input.yearLevel ?? null,
      email: input.email,
      address: input.address ?? null,
      updated_at: db.fn.now(),
    })
    .where({ id })
    .returning(columns);

  return (user ?? null) as UserRecord | null;
};
