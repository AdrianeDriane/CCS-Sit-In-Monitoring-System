const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export interface SitInRecord {
  id: number;
  studentId: number;
  studentIdNumber: string;
  studentName: string;
  course: string | null;
  yearLevel: string | null;
  laboratory: string;
  purpose: string | null;
  status: "ACTIVE" | "COMPLETED";
  timeIn: string;
  timeOut: string | null;
}

export interface SitInLookupStudent {
  id: number;
  idNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  course: string | null;
  yearLevel: string | null;
  address: string | null;
  remainingSessions: number;
}

export interface StudentLookupResponse {
  student: SitInLookupStudent;
  activeRecord: SitInRecord | null;
}

const parseJson = async <T>(response: Response): Promise<T> => {
  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message ?? "Request failed.");
  }

  return payload;
};

export const lookupStudentByIdNumber = async (idNumber: string) => {
  const response = await fetch(
    `${API_URL}/sit-in/students/${encodeURIComponent(idNumber)}`,
    {
      cache: "no-store",
    },
  );

  return parseJson<StudentLookupResponse>(response);
};

export const fetchActiveSitInRecords = async () => {
  const response = await fetch(`${API_URL}/sit-in/active`);
  const payload = await parseJson<{ records: SitInRecord[] }>(response);
  return payload.records;
};

export const fetchAllSitInRecords = async () => {
  const response = await fetch(`${API_URL}/sit-in/records`);
  const payload = await parseJson<{ records: SitInRecord[] }>(response);
  return payload.records;
};

export const createSitInRecord = async (payload: {
  studentId: number;
  laboratory: string;
  purpose: string;
}) => {
  const response = await fetch(`${API_URL}/sit-in/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{
    message: string;
    record: SitInRecord;
    student: SitInLookupStudent | null;
  }>(response);
};

export const completeSitInRecord = async (recordId: number) => {
  const response = await fetch(`${API_URL}/sit-in/records/${recordId}/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseJson<{
    message: string;
    record: SitInRecord;
  }>(response);
};
