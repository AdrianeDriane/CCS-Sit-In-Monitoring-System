import { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import type { StudentOutletContext } from "../components/StudentShell";

const StudentReservationPage: React.FC = () => {
  const { user, studentName } = useOutletContext<StudentOutletContext>();
  const [reservation, setReservation] = useState({
    idNumber: user.idNumber,
    studentName,
    purpose: "",
    lab: "Lab 524",
    timeIn: "08:00",
    date: "",
  });

  return (
    <motion.div className="space-y-8" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Reservation Form
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            Reserve a Laboratory Slot
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-500">
            This page isolates the reservation workflow so the student can focus
            on entering one request at a time.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <form className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                ID Number
              </span>
              <input
                type="text"
                value={reservation.idNumber}
                readOnly
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Student Name
              </span>
              <input
                type="text"
                value={reservation.studentName}
                readOnly
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none"
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">
                Purpose
              </span>
              <textarea
                rows={5}
                value={reservation.purpose}
                onChange={(event) =>
                  setReservation((current) => ({
                    ...current,
                    purpose: event.target.value,
                  }))
                }
                placeholder="Describe the activity, class requirement, or academic task."
                className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Lab</span>
              <select
                value={reservation.lab}
                onChange={(event) =>
                  setReservation((current) => ({
                    ...current,
                    lab: event.target.value,
                  }))
                }
                className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              >
                <option>Lab 524</option>
                <option>Lab 526</option>
                <option>Lab 528</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Time In
              </span>
              <input
                type="time"
                value={reservation.timeIn}
                onChange={(event) =>
                  setReservation((current) => ({
                    ...current,
                    timeIn: event.target.value,
                  }))
                }
                className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Date</span>
              <input
                type="date"
                value={reservation.date}
                onChange={(event) =>
                  setReservation((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Remaining Session
              </span>
              <input
                type="text"
                value="30"
                readOnly
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[20px] bg-gradient-to-r from-primary to-[#0f5b8d] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:from-[#002851] hover:to-[#0b476c]"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                >
                  calendar_add_on
                </span>
                Submit Reservation
              </button>
            </div>
          </form>

          <div className="space-y-5">
            <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(0,51,102,0.96),rgba(10,86,119,0.84))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
                Remaining Session
              </p>
              <p className="mt-4 text-5xl font-black tracking-tight">30</p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Static value for now, ready for backend integration later.
              </p>
            </div>

            <div className="rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">
                Reservation Notes
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Use this page to draft the sit-in request UI only.</li>
                <li>Student details are prefilled from the logged-in account.</li>
                <li>Purpose, lab, date, and time remain editable placeholders.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default StudentReservationPage;
