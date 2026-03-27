import { db } from "../db/knex";
import type { UserRecord } from "../types/auth";

const USERS_TABLE = "users";
const RECORDS_TABLE = "sit_in_records";

export type SitInStatus = "ACTIVE" | "COMPLETED";

export interface StudentLookupResult {
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

export interface SitInRecord {
  id: number;
  studentId: number;
  studentIdNumber: string;
  studentName: string;
  course: string | null;
  yearLevel: string | null;
  laboratory: string;
  purpose: string | null;
  status: SitInStatus;
  timeIn: Date;
  timeOut: Date | null;
}

const studentColumns = [
  "id",
  "id_number as idNumber",
  "email",
  "first_name as firstName",
  "last_name as lastName",
  "middle_name as middleName",
  "course",
  "year_level as yearLevel",
  "address",
  "remaining_sessions as remainingSessions",
];

const baseRecordSelect = [
  "r.id as id",
  "r.student_id as studentId",
  "u.id_number as studentIdNumber",
  db.raw(
    "concat_ws(' ', u.first_name, nullif(u.middle_name, ''), u.last_name) as \"studentName\"",
  ),
  "u.course as course",
  "u.year_level as yearLevel",
  "r.laboratory as laboratory",
  "r.purpose as purpose",
  "r.status as status",
  "r.time_in as timeIn",
  "r.time_out as timeOut",
];

export const findStudentByIdNumber = async (idNumber: string) => {
  const student = await db(USERS_TABLE)
    .select(studentColumns)
    .whereRaw("upper(trim(id_number)) = upper(trim(?))", [idNumber])
    .andWhere("role", "STUDENT")
    .first();

  return (student ?? null) as StudentLookupResult | null;
};

export const countSitInRecordsByStudentId = async (studentId: number) => {
  const result = await db(RECORDS_TABLE)
    .count<{ count: string }>("id as count")
    .where({ student_id: studentId })
    .first();

  return Number(result?.count ?? 0);
};

export const findActiveSitInRecordByStudentId = async (studentId: number) => {
  const record = await db(RECORDS_TABLE)
    .select(baseRecordSelect)
    .from({ r: RECORDS_TABLE })
    .join({ u: USERS_TABLE }, "u.id", "r.student_id")
    .where("r.student_id", studentId)
    .andWhere("r.status", "ACTIVE")
    .orderBy("r.time_in", "desc")
    .first();

  return (record ?? null) as SitInRecord | null;
};

export const createActiveSitInRecord = async (input: {
  studentId: number;
  laboratory: string;
  purpose?: string | null;
}) => {
  return db.transaction(async (trx) => {
    const student = await trx(USERS_TABLE)
      .select(["id", "remaining_sessions as remainingSessions"])
      .where({ id: input.studentId, role: "STUDENT" })
      .first();

    if (!student) {
      throw new Error("Student account not found.");
    }

    if (Number(student.remainingSessions) <= 0) {
      throw new Error("This student has no remaining sessions.");
    }

    const existingActiveRecord = await trx(RECORDS_TABLE)
      .select("id")
      .where({ student_id: input.studentId, status: "ACTIVE" })
      .first();

    if (existingActiveRecord) {
      throw new Error("This student already has an active sit-in session.");
    }

    await trx(USERS_TABLE)
      .where({ id: input.studentId })
      .decrement("remaining_sessions", 1);

    const [record] = await trx(RECORDS_TABLE)
      .insert({
        student_id: input.studentId,
        laboratory: input.laboratory,
        purpose: input.purpose ?? null,
        status: "ACTIVE",
        time_in: trx.fn.now(),
      })
      .returning("id");

    const recordId = (record as { id: number }).id;

    const createdRecord = await trx(RECORDS_TABLE)
      .select(baseRecordSelect)
      .from({ r: RECORDS_TABLE })
      .join({ u: USERS_TABLE }, "u.id", "r.student_id")
      .where("r.id", recordId)
      .first();

    return (createdRecord ?? null) as SitInRecord | null;
  });
};

export const listActiveSitInRecords = async () => {
  const records = await db(RECORDS_TABLE)
    .select(baseRecordSelect)
    .from({ r: RECORDS_TABLE })
    .join({ u: USERS_TABLE }, "u.id", "r.student_id")
    .where("r.status", "ACTIVE")
    .orderBy("r.time_in", "desc");

  return records as SitInRecord[];
};

export const listAllSitInRecords = async () => {
  const records = await db(RECORDS_TABLE)
    .select(baseRecordSelect)
    .from({ r: RECORDS_TABLE })
    .join({ u: USERS_TABLE }, "u.id", "r.student_id")
    .orderBy("r.time_in", "desc");

  return records as SitInRecord[];
};

export const markSitInRecordAsCompleted = async (recordId: number) => {
  const [record] = await db(RECORDS_TABLE)
    .update({
      status: "COMPLETED",
      time_out: db.fn.now(),
      updated_at: db.fn.now(),
    })
    .where({ id: recordId, status: "ACTIVE" })
    .returning("id");

  if (!record) {
    return null;
  }

  const updatedRecord = await db(RECORDS_TABLE)
    .select(baseRecordSelect)
    .from({ r: RECORDS_TABLE })
    .join({ u: USERS_TABLE }, "u.id", "r.student_id")
    .where("r.id", recordId)
    .first();

  return (updatedRecord ?? null) as SitInRecord | null;
};
