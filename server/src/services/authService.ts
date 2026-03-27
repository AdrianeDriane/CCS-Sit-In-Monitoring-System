import {
  createUser,
  findUserByEmailExcludingId,
  findUserById,
  findUserByIdNumberOrEmail,
  findUserByIdentifier,
  updateStudentProfileById,
} from "../repositories/userRepository";
import { USER_ROLES, type SafeUser, type UserRole } from "../types/auth";
import { hashPassword, verifyPassword } from "../utils/password";
import { toSafeUser } from "../utils/user";

export interface LoginInput {
  identifier: string;
  password: string;
  role?: UserRole;
}

export interface RegisterInput {
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  role: UserRole;
  password: string;
  course?: string;
  yearLevel?: string;
  address?: string;
}

export interface UpdateStudentProfileInput {
  userId: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  course?: string;
  yearLevel?: string;
  email: string;
  address?: string;
}

const normalize = (value: string) => value.trim();

const assertRole = (role: string): UserRole => {
  if (USER_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }

  throw new Error("Invalid role.");
};

export const loginUser = async (input: LoginInput): Promise<SafeUser> => {
  const identifier = normalize(input.identifier);

  if (!identifier || !input.password) {
    throw new Error("Identifier and password are required.");
  }

  const user = await findUserByIdentifier(identifier);

  if (!user || !verifyPassword(input.password, user.passwordHash)) {
    throw new Error("Invalid credentials.");
  }

  if (input.role && user.role !== input.role) {
    throw new Error(`This account is registered as ${user.role}.`);
  }

  return toSafeUser(user);
};

export const registerUser = async (input: RegisterInput): Promise<SafeUser> => {
  const role = assertRole(input.role);
  const idNumber = normalize(input.idNumber);
  const email = normalize(input.email).toLowerCase();
  const firstName = normalize(input.firstName);
  const lastName = normalize(input.lastName);
  const address = normalize(input.address ?? "");

  if (!idNumber || !email || !firstName || !lastName || !input.password) {
    throw new Error("Missing required registration fields.");
  }

  if (
    role === "STUDENT" &&
    (!normalize(input.course ?? "") || !normalize(input.yearLevel ?? ""))
  ) {
    throw new Error("Student accounts require course and year level.");
  }

  const existingUser = await findUserByIdNumberOrEmail(idNumber, email);

  if (existingUser) {
    throw new Error("An account with that ID number or email already exists.");
  }

  const isStudent = role === "STUDENT";
  const user = await createUser({
    idNumber,
    email,
    firstName,
    lastName,
    middleName: input.middleName ? normalize(input.middleName) : null,
    role,
    passwordHash: hashPassword(input.password),
    course: isStudent ? normalize(input.course ?? "") || null : null,
    yearLevel: isStudent ? normalize(input.yearLevel ?? "") || null : null,
    address: address || null,
    remainingSessions: isStudent ? 30 : 0,
  });

  return toSafeUser(user);
};

export const updateStudentProfile = async (
  input: UpdateStudentProfileInput,
): Promise<SafeUser> => {
  if (!Number.isInteger(input.userId) || input.userId <= 0) {
    throw new Error("Invalid user ID.");
  }

  const existingUser = await findUserById(input.userId);

  if (!existingUser) {
    throw new Error("Student account not found.");
  }

  if (existingUser.role !== "STUDENT") {
    throw new Error("Only student accounts can update this profile.");
  }

  const firstName = normalize(input.firstName);
  const lastName = normalize(input.lastName);
  const email = normalize(input.email).toLowerCase();
  const course = normalize(input.course ?? "");
  const yearLevel = normalize(input.yearLevel ?? "");
  const address = normalize(input.address ?? "");
  const middleName = normalize(input.middleName ?? "");

  if (!firstName || !lastName || !email || !course || !yearLevel || !address) {
    throw new Error("Missing required profile fields.");
  }

  const emailOwner = await findUserByEmailExcludingId(email, input.userId);

  if (emailOwner) {
    throw new Error("The email address is already in use.");
  }

  const updatedUser = await updateStudentProfileById(input.userId, {
    firstName,
    lastName,
    middleName: middleName || null,
    course,
    yearLevel,
    email,
    address,
  });

  if (!updatedUser) {
    throw new Error("Unable to update profile.");
  }

  return toSafeUser(updatedUser);
};
