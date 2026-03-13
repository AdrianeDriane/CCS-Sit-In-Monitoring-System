import { ROLE_OPTIONS, type UserRole } from "../types";

interface TabSelectorProps {
  activeTab: UserRole;
  onChange: (role: UserRole) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onChange }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-8 flex relative">
      {ROLE_OPTIONS.map((role) => (
        <button
          key={role.value}
          onClick={() => onChange(role.value)}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 text-center ${
            activeTab === role.value
              ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
          type="button"
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
