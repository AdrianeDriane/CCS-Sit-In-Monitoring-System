import type { AuthUser, UserRole } from "../types";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL =
  configuredApiUrl ||
  `${window.location.protocol}//${window.location.hostname}:4000/api`;

interface ApiResponse {
  message: string;
  user: AuthUser;
}

export interface AdminStudentUpdatePayload {
  idNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  yearLevel: string;
  email: string;
  address: string;
  remainingSessions: number;
}

const parseResponse = async (response: Response): Promise<ApiResponse> => {
  const payload = (await response.json()) as Partial<ApiResponse> & {
    message?: string;
  };

  if (!response.ok || !payload.user) {
    throw new Error(payload.message ?? "Request failed.");
  }

  return payload as ApiResponse;
};

export const loginRequest = async (payload: {
  identifier: string;
  password: string;
  role: UserRole;
}) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const registerRequest = async (payload: {
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: UserRole;
  password: string;
  course: string;
  yearLevel: string;
  address: string;
}) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const updateStudentProfileRequest = async (
  userId: number,
  payload: {
    lastName: string;
    firstName: string;
    middleName: string;
    course: string;
    yearLevel: string;
    email: string;
    address: string;
  },
) => {
  const response = await fetch(`${API_URL}/auth/students/${userId}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const fetchStudentsRequest = async () => {
  const response = await fetch(`${API_URL}/auth/students`);
  const payload = (await response.json()) as {
    message?: string;
    students?: AuthUser[];
  };

  if (!response.ok || !payload.students) {
    throw new Error(payload.message ?? "Unable to fetch students.");
  }

  return payload.students;
};

export const updateStudentRequest = async (
  userId: number,
  payload: AdminStudentUpdatePayload,
) => {
  const response = await fetch(`${API_URL}/auth/students/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const deleteStudentRequest = async (userId: number) => {
  const response = await fetch(`${API_URL}/auth/students/${userId}`, {
    method: "DELETE",
  });

  const payload = (await response.json()) as { message?: string };

  if (!response.ok) {
    throw new Error(payload.message ?? "Unable to delete student.");
  }

  return payload.message ?? "Student deleted successfully.";
};
