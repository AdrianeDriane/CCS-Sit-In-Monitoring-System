export const ROLE_OPTIONS = [
  { value: "STUDENT", label: "Student", routePrefix: "student" },
  { value: "FACULTY", label: "Faculty", routePrefix: "faculty" },
  { value: "WS", label: "WS", routePrefix: "ws" },
] as const;

export type UserRole = (typeof ROLE_OPTIONS)[number]["value"];

export interface AuthUser {
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
}
