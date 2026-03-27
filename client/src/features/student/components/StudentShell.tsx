import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { containerVariants } from "../../../animations/variants";
import { clearAuthUser, getAuthUser } from "../../auth/lib/authStorage";
import { getRoleLabel, type AuthUser } from "../../auth/types";

const navigationItems = [
  { label: "Dashboard", to: "/student", icon: "dashboard" },
  { label: "Profile", to: "/student/profile", icon: "person" },
  { label: "Reservation", to: "/student/reservation", icon: "calendar_month" },
  { label: "History", to: "/student/history", icon: "history" },
  { label: "Rules", to: "/student/rules", icon: "gavel" },
] as const;

const notifications = [
  {
    title: "Lab 524 Updated",
    body: "Your preferred laboratory opens additional seats at 1:00 PM.",
    time: "5m ago",
  },
  {
    title: "Reservation Reminder",
    body: "Bring your ID before your next sit-in session.",
    time: "30m ago",
  },
  {
    title: "Policy Notice",
    body: "Review the latest laboratory rules before booking a slot.",
    time: "Today",
  },
] as const;

const buildStudentName = (user: AuthUser) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");

const getInitials = (user: AuthUser) =>
  `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

export type StudentOutletContext = {
  user: AuthUser;
  studentName: string;
  onUserUpdated: (user: AuthUser) => void;
};

const StudentShell: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user || user.role !== "STUDENT") {
    return <Navigate to="/login" replace />;
  }

  const studentName = buildStudentName(user);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eff4f8] font-display text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,51,102,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.14),_transparent_32%)]" />
      <div className="absolute left-[-8rem] top-20 h-56 w-56 rounded-full bg-[#cdddf0] blur-3xl" />
      <div className="absolute bottom-0 right-[-6rem] h-64 w-64 rounded-full bg-[#d7ecef] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.header
          className="rounded-[28px] border border-white/70 bg-white/78 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                <img
                  src="/uc_logo.png"
                  alt="University of Cebu Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
                  University of Cebu
                </p>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  CCS Sit-In Student Portal
                </h1>
                <p className="text-sm text-slate-500">
                  Navigate reservations, rules, and your laboratory profile.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <nav className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100/90 p-1.5">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/student"}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-primary shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`
                    }
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 18 }}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <div className="relative" ref={notificationRef}>
                  <button
                    type="button"
                    onClick={() => setIsNotificationOpen((prev) => !prev)}
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
                    aria-expanded={isNotificationOpen}
                    aria-label="Open notifications"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 22 }}
                    >
                      notifications
                    </span>
                    <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#0ea5a5]" />
                  </button>

                  {isNotificationOpen ? (
                    <motion.div
                      className="absolute right-0 top-16 z-20 w-[320px] rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Notifications
                          </p>
                          <p className="text-xs text-slate-500">
                            Latest student updates
                          </p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          3 new
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        {notifications.map((notification) => (
                          <div
                            key={notification.title}
                            className="rounded-2xl border border-slate-100 bg-slate-50/90 p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-800">
                                {notification.title}
                              </p>
                              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                                {notification.time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {notification.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0f5b8d] text-sm font-bold text-white">
                    {getInitials(user)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {studentName}
                    </p>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {getRoleLabel(user.role)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearAuthUser();
                    window.location.href = "/login";
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                  >
                    logout
                  </span>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.main className="flex-1 py-6">
          <motion.div
            key={location.pathname}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Outlet
              context={{
                user,
                studentName,
                onUserUpdated: (nextUser: AuthUser) => {
                  setUser(nextUser);
                },
              }}
            />
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default StudentShell;

