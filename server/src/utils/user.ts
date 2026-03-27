import type { SafeUser, UserRecord } from "../types/auth";

export const toSafeUser = (user: UserRecord): SafeUser => ({
  id: user.id,
  idNumber: user.idNumber,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  middleName: user.middleName,
  role: user.role,
  course: user.course,
  yearLevel: user.yearLevel,
  address: user.address,
  remainingSessions: user.remainingSessions,
});
