import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../animations/variants";

const historyRows = [
  {
    date: "March 10, 2026",
    lab: "Lab 524",
    purpose: "Programming Practice",
    timeIn: "08:00 AM",
    timeOut: "10:00 AM",
    status: "Completed",
  },
  {
    date: "March 08, 2026",
    lab: "Lab 526",
    purpose: "Database Project",
    timeIn: "01:00 PM",
    timeOut: "03:00 PM",
    status: "Completed",
  },
  {
    date: "March 05, 2026",
    lab: "Lab 528",
    purpose: "Research and Documentation",
    timeIn: "09:30 AM",
    timeOut: "11:00 AM",
    status: "Completed",
  },
  {
    date: "March 02, 2026",
    lab: "Lab 530",
    purpose: "Laboratory Exercise",
    timeIn: "02:00 PM",
    timeOut: "04:00 PM",
    status: "Completed",
  },
] as const;

const StudentHistoryPage: React.FC = () => {
  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Sit-in History
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            Laboratory Session History
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-500">
            A dedicated page for previous sit-in records using the requested
            table layout and static placeholder data.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
              Records
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Recent Sessions
            </h3>
          </div>

          <div className="rounded-[20px] bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">
            Total Records: {historyRows.length}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {["Date", "Lab", "Purpose", "Time In", "Time Out", "Status"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {historyRows.map((row) => (
                  <tr
                    key={`${row.date}-${row.lab}`}
                    className="hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {row.date}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {row.lab}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {row.purpose}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {row.timeIn}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {row.timeOut}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default StudentHistoryPage;
