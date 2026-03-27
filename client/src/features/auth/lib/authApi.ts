import type { AuthUser, UserRole } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

interface ApiResponse {
  message: string;
  user: AuthUser;
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

