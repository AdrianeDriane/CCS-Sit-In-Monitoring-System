import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import type { WsOutletContext } from "../components/WsShell";
import {
  completeSitInRecord,
  fetchActiveSitInRecords,
  type SitInRecord,
} from "../lib/sitInApi";

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const WsDashboardPage: React.FC = () => {
  const { adminName } = useOutletContext<WsOutletContext>();
  const [records, setRecords] = useState<SitInRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError("");
      const nextRecords = await fetchActiveSitInRecords();
      setRecords(nextRecords);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load active sit-in records.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRecords();
  }, []);

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.10)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero_background.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,51,102,0.96),rgba(9,62,97,0.88),rgba(15,118,110,0.68))]" />

        <div className="relative px-7 py-10 text-white lg:px-10 lg:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/70">
            Admin Dashboard
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Track active sit-ins and move students into the lab fast.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
            Search by student ID, open the sit-in form, and monitor who is
            currently inside from one workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {adminName}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Active Students: {records.length}
            </span>
            <Link
              to="/ws/sitin"
              className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-slate-100"
            >
              Search Student ID
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
              Current Students
            </p>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              Students actively sitting in
            </h3>
          </div>

          <button
            type="button"
            onClick={() => void loadRecords()}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
          >
            Refresh List
          </button>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-slate-50/90 px-5 py-8 text-sm text-slate-500">
            Loading active sit-in records...
          </div>
        ) : null}

        {!loading && records.length === 0 ? (
          <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-sm text-slate-500">
            No student is currently marked as active.
          </div>
        ) : null}

        {!loading && records.length > 0 ? (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {records.map((record) => (
              <article
                key={record.id}
                className="rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold tracking-tight text-slate-900">
                      {record.studentName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {record.studentIdNumber} · {record.course ?? "Course N/A"} ·
                      Year {record.yearLevel ?? "-"}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Active
                  </span>
                </div>

                <dl className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-900">Laboratory</dt>
                    <dd>{record.laboratory}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Time In</dt>
                    <dd>{formatDateTime(record.timeIn)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-slate-900">Purpose</dt>
                    <dd>{record.purpose || "Not specified"}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/ws/sitin/${encodeURIComponent(record.studentIdNumber)}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
                  >
                    View Student
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setCompletingId(record.id);
                        await completeSitInRecord(record.id);
                        await loadRecords();
                      } catch (completeError) {
                        setError(
                          completeError instanceof Error
                            ? completeError.message
                            : "Unable to complete sit-in session.",
                        );
                      } finally {
                        setCompletingId(null);
                      }
                    }}
                    disabled={completingId === record.id}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {completingId === record.id ? "Completing..." : "Time Out"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </motion.section>
    </motion.div>
  );
};

export default WsDashboardPage;
