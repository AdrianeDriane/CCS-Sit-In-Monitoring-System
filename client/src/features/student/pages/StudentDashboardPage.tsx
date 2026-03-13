import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";
import type { StudentOutletContext } from "../components/StudentShell";

const destinationCards = [
  {
    title: "Student Information",
    description:
      "Review your account profile, course, year level, email, address, and session balance.",
    to: "/student/profile",
    action: "Open Profile",
    icon: "badge",
    accent: "from-primary to-[#0f5b8d]",
  },
  {
    title: "Reservation Form",
    description:
      "Prepare a new laboratory reservation request with your student details already filled in.",
    to: "/student/reservation",
    action: "Open Reservation",
    icon: "calendar_month",
    accent: "from-[#0f766e] to-[#14b8a6]",
  },
  {
    title: "Sit-in History",
    description:
      "Inspect previous laboratory sessions using the dedicated history table view.",
    to: "/student/history",
    action: "Open History",
    icon: "history",
    accent: "from-[#b45309] to-[#f59e0b]",
  },
  {
    title: "Rules and Regulation",
    description:
      "Read the complete laboratory rules and disciplinary actions in a dedicated policy page.",
    to: "/student/rules",
    action: "Open Rules",
    icon: "gavel",
    accent: "from-[#7c3aed] to-[#4338ca]",
  },
] as const;

const dashboardSteps = [
  {
    title: "Review your profile",
    detail: "Confirm your account details before requesting a laboratory slot.",
  },
  {
    title: "Prepare a reservation",
    detail: "Choose a lab, date, and time-in schedule from the reservation page.",
  },
  {
    title: "Track previous visits",
    detail: "Check completed sit-in sessions from the history page.",
  },
  {
    title: "Stay aligned with lab policy",
    detail: "Use the rules page as your reference before every session.",
  },
] as const;

const StudentDashboardPage: React.FC = () => {
  const { user, studentName } = useOutletContext<StudentOutletContext>();

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
            Student Dashboard
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            A clearer student workspace for laboratory sit-in tasks.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
            This dashboard now acts as a landing page. Each core function has
            its own dedicated page so you can focus on one task at a time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {studentName}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {user.course ?? "Course Pending"}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Year {user.yearLevel ?? "-"}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Remaining Session: 30
            </span>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Navigate Pages
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Open the page you need.
          </h3>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Each requested student function is now separated into its own
            screen instead of being compressed into a single bento-style layout.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {destinationCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group block rounded-[30px] border border-slate-200/80 bg-slate-50/90 p-6 transition hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 24 }}
                >
                  {card.icon}
                </span>
              </div>
              <h4 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                {card.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                {card.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {card.action}
                <span
                  className="material-symbols-outlined transition group-hover:translate-x-1"
                  style={{ fontSize: 18 }}
                >
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[34px] border border-white/70 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-8"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
            Workflow
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Recommended student flow
          </h3>
        </div>

        <div className="mt-8 grid gap-4">
          {dashboardSteps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-5 sm:flex-row sm:items-start"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white">
                0{index + 1}
              </div>
              <div>
                <h4 className="text-lg font-bold tracking-tight text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-500 sm:text-base">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default StudentDashboardPage;
