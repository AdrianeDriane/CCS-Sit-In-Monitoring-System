import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants } from "../../../animations/variants";

const ruleItems = [
  "Maintain silence, proper decorum, and discipline inside the laboratory. Mobile phones, walkmans and other personal pieces of equipment must be switched off.",
  "Games are not allowed inside the lab. This includes computer-related games, card games and other games that may disturb the operation of the lab.",
  "Surfing the Internet is allowed only with the permission of the instructor. Downloading and installing of software are strictly prohibited.",
  "Getting access to other websites not related to the course (especially pornographic and illicit sites) is strictly prohibited.",
  "Deleting computer files and changing the set-up of the computer is a major offense.",
  'Observe computer time usage carefully. A fifteen-minute allowance is given for each use. Otherwise, the unit will be given to those who wish to "sit-in".',
  "Observe proper decorum while inside the laboratory.",
  "Do not get inside the lab unless the instructor is present.",
  "All bags, knapsacks, and the likes must be deposited at the counter.",
  "Follow the seating arrangement of your instructor.",
  "At the end of class, all software programs must be closed.",
  "Return all chairs to their proper places after using.",
  "Chewing gum, eating, drinking, smoking, and other forms of vandalism are prohibited inside the lab.",
  "Anyone causing a continual disturbance will be asked to leave the lab. Acts or gestures offensive to the members of the community, including public display of physical intimacy, are not tolerated.",
  "Persons exhibiting hostile or threatening behavior such as yelling, swearing, or disregarding requests made by lab personnel will be asked to leave the lab.",
  "For serious offense, the lab personnel may call the Civil Security Office (CSU) for assistance.",
  "Any technical problem or difficulty must be addressed to the laboratory supervisor, student assistant or instructor immediately.",
] as const;

const StudentRulesPage: React.FC = () => {
  return (
    <motion.div className="space-y-6" variants={containerVariants}>
      <motion.section
        variants={itemVariants}
        className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] lg:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary/70">
              Rules and Regulation
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              University of Cebu
            </h2>
            <p className="mt-3 text-base font-semibold uppercase tracking-[0.26em] text-slate-500">
              COLLEGE OF INFORMATION & COMPUTER STUDIES
            </p>
            <p className="mt-6 text-lg font-bold uppercase tracking-[0.18em] text-primary">
              LABORATORY RULES AND REGULATIONS
            </p>
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              To avoid embarrassment and maintain camaraderie with your friends
              and superiors at our laboratories, please observe the following:
            </p>
          </div>

          <Link
            to="/student"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              arrow_back
            </span>
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {ruleItems.map((rule, index) => (
            <div
              key={rule}
              className="flex gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-7 text-slate-700 sm:text-base">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.10)] lg:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary/70">
          DISCIPLINARY ACTION
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
              First Offense
            </p>
            <p className="mt-3 text-sm leading-7 text-amber-900 sm:text-base">
              The Head or the Dean or OIC recommends to the Guidance Center for
              a suspension from classes for each offender.
            </p>
          </div>

          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-800">
              Second and Subsequent Offenses
            </p>
            <p className="mt-3 text-sm leading-7 text-rose-900 sm:text-base">
              A recommendation for a heavier sanction will be endorsed to the
              Guidance Center.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default StudentRulesPage;
