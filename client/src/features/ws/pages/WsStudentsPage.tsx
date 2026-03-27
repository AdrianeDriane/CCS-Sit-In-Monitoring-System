import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/variants";
import {
  deleteStudentRequest,
  fetchStudentsRequest,
  updateStudentRequest,
  type AdminStudentUpdatePayload,
} from "../../auth/lib/authApi";
import type { AuthUser } from "../../auth/types";

type StudentFormState = AdminStudentUpdatePayload;

const toFormState = (student: AuthUser): StudentFormState => ({
  idNumber: student.idNumber,
  lastName: student.lastName,
  firstName: student.firstName,
  middleName: student.middleName ?? "",
  course: student.course ?? "",
  yearLevel: student.yearLevel ?? "",
  email: student.email,
  address: student.address ?? "",
  remainingSessions: student.remainingSessions,
});

const buildStudentName = (student: AuthUser) =>
  [student.firstName, student.middleName, student.lastName].filter(Boolean).join(" ");

const WsStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<AuthUser[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [form, setForm] = useState<StudentFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async (showRefreshState = false) => {
    try {
      if (showRefreshState) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);
      const nextStudents = await fetchStudentsRequest();
      setStudents(nextStudents);

      setSelectedStudentId((currentSelectedId) => {
        if (!nextStudents.length) {
          setForm(null);
          return null;
        }

        const matchedStudent = nextStudents.find(
          (student) => student.id === currentSelectedId,
        );
        const activeStudent = matchedStudent ?? nextStudents[0];
        setForm(toFormState(activeStudent));
        return activeStudent.id;
      });
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load students.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadStudents();
  }, []);

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? null;

  const handleFieldChange =
    (field: keyof StudentFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      setForm((previous) =>
        previous
          ? {
              ...previous,
              [field]:
                field === "remainingSessions" ? Number(nextValue || 0) : nextValue,
            }
          : previous,
      );
    };

  const handleEditStudent = (student: AuthUser) => {
    setSelectedStudentId(student.id);
    setForm(toFormState(student));
    setFeedback(null);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStudentId || !form) {
      return;
    }

    try {
      setSaving(true);
      setFeedback(null);
      setError(null);

      const { user, message } = await updateStudentRequest(selectedStudentId, form);

      setStudents((previous) =>
        previous.map((student) => (student.id === user.id ? user : student)),
      );
      setSelectedStudentId(user.id);
      setForm(toFormState(user));
      setFeedback(message);
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to update student.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (student: AuthUser) => {
    const shouldDelete = window.confirm(
      `Hard delete ${buildStudentName(student)} (${student.idNumber})? This also removes related sit-in records.`,
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingId(student.id);
      setFeedback(null);
      setError(null);

      const message = await deleteStudentRequest(student.id);
      const nextStudents = students.filter((item) => item.id !== student.id);
      setStudents(nextStudents);
      setFeedback(message);

      if (!nextStudents.length) {
        setSelectedStudentId(null);
        setForm(null);
        return;
      }

      const nextSelectedStudent =
        selectedStudentId === student.id
          ? nextStudents[0]
          : nextStudents.find((item) => item.id === selectedStudentId) ??
            nextStudents[0];

      setSelectedStudentId(nextSelectedStudent.id);
      setForm(toFormState(nextSelectedStudent));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete student.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
              Student Management
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              Review, edit, and hard delete student accounts
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              This admin page lists every student account. Use the action column
              to edit details or permanently remove a student from the system.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Students: {students.length}
            </span>
            <button
              type="button"
              onClick={() => void loadStudents(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshing ? "Refreshing..." : "Refresh Table"}
            </button>
          </div>
        </div>

        {feedback ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {feedback}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-4 py-4">Student</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Year</th>
                  <th className="px-4 py-4">Sessions</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {loading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm" colSpan={6}>
                      Loading students...
                    </td>
                  </tr>
                ) : null}

                {!loading && students.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm" colSpan={6}>
                      No student accounts found.
                    </td>
                  </tr>
                ) : null}

                {!loading
                  ? students.map((student) => {
                      const isSelected = student.id === selectedStudentId;

                      return (
                        <tr
                          key={student.id}
                          className={isSelected ? "bg-primary/5" : "align-top"}
                        >
                          <td className="px-4 py-4">
                            <p className="font-semibold text-slate-900">
                              {buildStudentName(student)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {student.idNumber}
                            </p>
                          </td>
                          <td className="px-4 py-4">{student.email}</td>
                          <td className="px-4 py-4">{student.course ?? "--"}</td>
                          <td className="px-4 py-4">{student.yearLevel ?? "--"}</td>
                          <td className="px-4 py-4">{student.remainingSessions}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditStudent(student)}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteStudent(student)}
                                disabled={deletingId === student.id}
                                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {deletingId === student.id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Edit Student
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            {selectedStudent
              ? `Update ${buildStudentName(selectedStudent)}`
              : "Select a student from the table"}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            Changes here update the selected student account directly. Hard
            delete is permanent and should only be used when the record must be
            removed from the system.
          </p>
        </div>

        {form ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  ID Number
                </span>
                <input
                  value={form.idNumber}
                  onChange={handleFieldChange("idNumber")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Last Name
                </span>
                <input
                  value={form.lastName}
                  onChange={handleFieldChange("lastName")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  First Name
                </span>
                <input
                  value={form.firstName}
                  onChange={handleFieldChange("firstName")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Middle Name
                </span>
                <input
                  value={form.middleName}
                  onChange={handleFieldChange("middleName")}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Course
                </span>
                <input
                  value={form.course}
                  onChange={handleFieldChange("course")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Year Level
                </span>
                <input
                  value={form.yearLevel}
                  onChange={handleFieldChange("yearLevel")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleFieldChange("email")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Remaining Sessions
                </span>
                <input
                  type="number"
                  min={0}
                  value={form.remainingSessions}
                  onChange={handleFieldChange("remainingSessions")}
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Address
              </span>
              <textarea
                rows={3}
                value={form.address}
                onChange={handleFieldChange("address")}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary/60"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5b8d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                save
              </span>
              {saving ? "Saving..." : "Save Student Changes"}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-sm text-slate-500">
            Select a student in the table to open the edit form.
          </div>
        )}
      </motion.section>
    </motion.div>
  );
};

export default WsStudentsPage;
