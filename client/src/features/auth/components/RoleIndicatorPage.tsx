import { Navigate } from "react-router-dom";
import { clearAuthUser, getAuthUser } from "../lib/authStorage";
import type { UserRole } from "../types";

interface RoleIndicatorPageProps {
  expectedRole: UserRole;
  title: string;
}

const RoleIndicatorPage: React.FC<RoleIndicatorPageProps> = ({
  expectedRole,
  title,
}) => {
  const user = getAuthUser();

  if (!user || user.role !== expectedRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-6 py-12 font-display">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Logged In Role
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              {user.firstName} {user.lastName} is currently signed in as{" "}
              <span className="font-semibold text-primary">{user.role}</span>.
            </p>
          </div>

          <button
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              clearAuthUser();
              window.location.href = "/login";
            }}
            type="button"
          >
            Log Out
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Role indicator
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {user.role}
          </p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            ID Number: {user.idNumber}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Email: {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleIndicatorPage;
