import {
  createActiveSitInRecord,
  findActiveSitInRecordByStudentId,
  findStudentByIdNumber,
  listActiveSitInRecords,
  listAllSitInRecords,
  markSitInRecordAsCompleted,
} from "../repositories/sitInRepository";

const normalize = (value: string) => value.trim();

export const lookupStudentForSitIn = async (idNumber: string) => {
  const normalizedIdNumber = normalize(idNumber);

  if (!normalizedIdNumber) {
    throw new Error("Student ID is required.");
  }

  const student = await findStudentByIdNumber(normalizedIdNumber);

  if (!student) {
    throw new Error("Student account not found.");
  }

  const activeRecord = await findActiveSitInRecordByStudentId(student.id);

  return {
    student,
    activeRecord,
  };
};

export const createSitIn = async (input: {
  studentId: number;
  laboratory: string;
  purpose?: string;
}) => {
  const laboratory = normalize(input.laboratory);
  const purpose = normalize(input.purpose ?? "");

  if (!Number.isInteger(input.studentId) || input.studentId <= 0) {
    throw new Error("Invalid student ID.");
  }

  if (!laboratory) {
    throw new Error("Laboratory is required.");
  }

  const record = await createActiveSitInRecord({
    studentId: input.studentId,
    laboratory,
    purpose: purpose || null,
  });

  if (!record) {
    throw new Error("Unable to start the sit-in session.");
  }

  const refreshedStudent = await findStudentByIdNumber(record.studentIdNumber);

  return {
    record,
    student: refreshedStudent,
  };
};

export const completeSitIn = async (recordId: number) => {
  if (!Number.isInteger(recordId) || recordId <= 0) {
    throw new Error("Invalid sit-in record ID.");
  }

  const record = await markSitInRecordAsCompleted(recordId);

  if (!record) {
    throw new Error("Active sit-in record not found.");
  }

  return record;
};

export const getActiveSitIns = async () => listActiveSitInRecords();

export const getAllSitInRecords = async () => listAllSitInRecords();
