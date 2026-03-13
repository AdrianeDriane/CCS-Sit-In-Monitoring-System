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
    })
    .returning(columns);

  return user as UserRecord;
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
