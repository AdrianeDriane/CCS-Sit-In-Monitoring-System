import { useState } from "react";

type TabType = "student" | "faculty";

const TabSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("student");

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-8 flex relative">
      <button
        onClick={() => setActiveTab("student")}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 text-center ${
          activeTab === "student"
            ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        }`}
      >
        Student
      </button>
      <button
        onClick={() => setActiveTab("faculty")}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 text-center ${
          activeTab === "faculty"
            ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        }`}
      >
        Faculty
      </button>
    </div>
  );
};

export default TabSelector;
