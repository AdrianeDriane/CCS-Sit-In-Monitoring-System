import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import { updateStudentProfileRequest } from "../../auth/lib/authApi";
import { saveAuthUser } from "../../auth/lib/authStorage";
import type { StudentOutletContext } from "../components/StudentShell";

type ProfileFormState = {
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  yearLevel: string;
  email: string;
  address: string;
};

const toFormState = (user: StudentOutletContext["user"]): ProfileFormState => ({
  lastName: user.lastName,
  firstName: user.firstName,
  middleName: user.middleName ?? "",
  course: user.course ?? "",
  yearLevel: user.yearLevel ?? "",
  email: user.email,
  address: user.address ?? "",
});

const StudentProfilePage: React.FC = () => {
  const { user, studentName, onUserUpdated } =
    useOutletContext<StudentOutletContext>();
  const [form, setForm] = useState<ProfileFormState>(() => toFormState(user));
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setForm((previous) => ({
        ...previous,
        [field]: nextValue,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsError(false);
    setIsSaving(true);

    try {
      const { user: updatedUser, message } = await updateStudentProfileRequest(
        user.id,
        form,
      );

      saveAuthUser(updatedUser);
      onUserUpdated(updatedUser);
      setForm(toFormState(updatedUser));
      setFeedback(message);
      setIsError(false);
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to update profile.",
      );
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const profileItems = [
    { label: "Name", value: studentName },
    { label: "Course", value: user.course ?? "Not assigned" },
    { label: "Year", value: user.yearLevel ?? "Not assigned" },
    { label: "Email", value: user.email },
    { label: "Address", value: user.address ?? "Not provided" },
    { label: "Session", value: 30 },
  ] as const;

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Student Information
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            Student Profile
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-500">
            This page is dedicated to the logged-in student account and keeps
            the requested information in one focused profile view.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
      >
        <div className="bg-[linear-gradient(135deg,rgba(0,51,102,0.96),rgba(10,86,119,0.84))] px-7 py-8 text-white lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
            Profile Summary
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight">
            {studentName}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Course {user.course ?? "Not assigned"} | Year{" "}
            {user.yearLevel ?? "-"} | Session 30
          </p>
        </div>

        <div className="grid gap-5 px-7 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-4 text-lg font-bold leading-8 text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Edit Account
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Update your student profile
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            You can update your last name, first name, middle name, course,
            year, email, and address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
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
                Year
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

          {feedback ? (
            <p
              className={`text-sm font-medium ${
                isError ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {feedback}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5b8d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              save
            </span>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default StudentProfilePage;

