import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import type { StudentOutletContext } from "../components/StudentShell";

const StudentProfilePage: React.FC = () => {
  const { user, studentName } = useOutletContext<StudentOutletContext>();

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
            Course {user.course ?? "Not assigned"} | Year {user.yearLevel ?? "-"} |
            Session 30
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
    </motion.div>
  );
};

export default StudentProfilePage;
