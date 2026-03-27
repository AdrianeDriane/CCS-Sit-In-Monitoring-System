import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/variants";
import {
  completeSitInRecord,
  fetchAllSitInRecords,
  type SitInRecord,
} from "../lib/sitInApi";

const formatDateTime = (value: string | null) =>
  value
    ? new Date(value).toLocaleString("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "--";

const WsRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<SitInRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState<number | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError("");
      setRecords(await fetchAllSitInRecords());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load sit-in records.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRecords();
  }, []);

  const activeCount = records.filter((record) => record.status === "ACTIVE").length;

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
              Sit-In Records
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              Full sit-in history and current activity
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Review all sit-in entries and close active sessions directly from
              the records table.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Total Records: {records.length}
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Active: {activeCount}
            </span>
            <button
              type="button"
              onClick={() => void loadRecords()}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
            >
              Refresh Table
            </button>
          </div>
        </div>

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
                  <th className="px-4 py-4">Laboratory</th>
                  <th className="px-4 py-4">Purpose</th>
                  <th className="px-4 py-4">Time In</th>
                  <th className="px-4 py-4">Time Out</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {loading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm" colSpan={7}>
                      Loading sit-in records...
                    </td>
                  </tr>
                ) : null}

                {!loading && records.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm" colSpan={7}>
                      No sit-in records found.
                    </td>
                  </tr>
                ) : null}

                {!loading
                  ? records.map((record) => (
                      <tr key={record.id} className="align-top">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">
                            {record.studentName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {record.studentIdNumber} · {record.course ?? "N/A"} ·
                            Year {record.yearLevel ?? "-"}
                          </p>
                        </td>
                        <td className="px-4 py-4">{record.laboratory}</td>
                        <td className="px-4 py-4">{record.purpose || "--"}</td>
                        <td className="px-4 py-4">{formatDateTime(record.timeIn)}</td>
                        <td className="px-4 py-4">
                          {formatDateTime(record.timeOut)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                              record.status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {record.status === "ACTIVE" ? (
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
                              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {completingId === record.id
                                ? "Completing..."
                                : "Time Out"}
                            </button>
                          ) : (
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Closed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default WsRecordsPage;
