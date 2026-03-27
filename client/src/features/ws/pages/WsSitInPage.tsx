import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import type { WsOutletContext } from "../components/WsShell";
import {
  createSitInRecord,
  lookupStudentByIdNumber,
  type SitInLookupStudent,
  type SitInRecord,
} from "../lib/sitInApi";

const laboratoryOptions = ["Lab 524", "Lab 526", "Lab 528", "Lab 530"];

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const buildStudentName = (student: SitInLookupStudent) =>
  [student.firstName, student.middleName, student.lastName]
    .filter(Boolean)
    .join(" ");

const WsSitInPage: React.FC = () => {
  const { adminName } = useOutletContext<WsOutletContext>();
  const { idNumber } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(idNumber ?? "");
  const [student, setStudent] = useState<SitInLookupStudent | null>(null);
  const [activeRecord, setActiveRecord] = useState<SitInRecord | null>(null);
  const [laboratory, setLaboratory] = useState(laboratoryOptions[0]);
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formSectionRef = useRef<HTMLElement | null>(null);

  const applyLookupResult = async (lookupIdNumber: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await lookupStudentByIdNumber(lookupIdNumber);
      setStudent(result.student);
      setActiveRecord(result.activeRecord);
      return true;
    } catch (loadError) {
      setStudent(null);
      setActiveRecord(null);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to fetch student details.",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchValue(idNumber ?? "");

    if (!idNumber) {
      setStudent(null);
      setActiveRecord(null);
      setMessage("");
      setError("");
      return;
    }

    const loadStudent = async () => {
      await applyLookupResult(idNumber);
    };

    void loadStudent();
  }, [idNumber]);

  useEffect(() => {
    if (!student || loading) {
      return;
    }

    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [student, loading]);

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Sit-In Search
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Search a student by ID and open the sit-in form
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Signed in as {adminName}. Search the student first, then continue
            directly to the sit-in form for that account.
          </p>
        </div>

        <form
          className="mt-8 flex flex-col gap-4 lg:flex-row"
          onSubmit={async (event) => {
            event.preventDefault();
            const nextId = searchValue.trim();

            if (!nextId) {
              setError("Student ID is required.");
              return;
            }

            const found = await applyLookupResult(nextId);

            if (found) {
              navigate(`/ws/sitin/${encodeURIComponent(nextId)}`);
            }
          }}
        >
          <label className="flex-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Student ID Number
            </span>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Enter student ID number"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
            />
          </label>

          <button
            type="submit"
            className="mt-auto inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary"
          >
            Search Student
          </button>
        </form>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
      </motion.section>

      {loading ? (
        <section className="rounded-[34px] border border-white/70 bg-white p-7 text-sm text-slate-500 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8">
          Loading student details...
        </section>
      ) : null}

      {student ? (
        <section
          ref={formSectionRef}
          className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
              Sit-In Form
            </p>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              Student sit-in details
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Only the `Purpose` and `Lab` fields are editable after a successful student lookup.
            </p>
          </div>

          {activeRecord ? (
            <div className="mt-6 rounded-[28px] border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">
                This student already has an active sit-in session.
              </p>
              <p className="mt-2 text-sm text-amber-800">
                {activeRecord.laboratory} | Time in {formatDateTime(activeRecord.timeIn)}
              </p>
            </div>
          ) : null}

          <form
            className="mt-8 grid gap-5 lg:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();

              if (!student) {
                return;
              }

              try {
                setSubmitting(true);
                setError("");
                const result = await createSitInRecord({
                  studentId: student.id,
                  laboratory,
                  purpose,
                });

                if (result.student) {
                  setStudent(result.student);
                }

                setActiveRecord(result.record);
                setMessage(result.message);
                setPurpose("");
              } catch (submitError) {
                setError(
                  submitError instanceof Error
                    ? submitError.message
                    : "Unable to start sit-in session.",
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                ID Number
              </span>
              <input
                value={student.idNumber}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Student Name
              </span>
              <input
                value={buildStudentName(student)}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Purpose
              </span>
              <textarea
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                rows={4}
                placeholder="Enter sit-in purpose"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Lab
              </span>
              <select
                value={laboratory}
                onChange={(event) => setLaboratory(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
              >
                {laboratoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Remaining Sessions
              </span>
              <input
                value={String(student.remainingSessions)}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
              />
            </label>

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={
                  submitting ||
                  student.remainingSessions <= 0 ||
                  Boolean(activeRecord)
                }
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Starting Session..." : "Start Sit-In"}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </motion.div>
  );
};

export default WsSitInPage;
