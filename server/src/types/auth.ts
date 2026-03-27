export const USER_ROLES = ["STUDENT", "FACULTY", "WS"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface UserRecord {
  id: number;
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  role: UserRole;
  passwordHash: string;
  course: string | null;
  yearLevel: string | null;
  address: string | null;
  remainingSessions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser {
  id: number;
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  role: UserRole;
  course: string | null;
  yearLevel: string | null;
  address: string | null;
  remainingSessions: number;
}
