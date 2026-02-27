import { useState, type FormEvent } from "react";
import TabSelector from "./TabSelector";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {/* Tabs */}
      <TabSelector />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="space-y-1.5 text-left">
          <label
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
            htmlFor="username"
          >
            Username
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                person
              </span>
            </div>
            <input
              className="block w-full rounded-lg border-0 py-3.5 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-500 transition-shadow duration-200"
              id="username"
              name="username"
              placeholder="Enter your ID number"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="text-xs font-semibold text-primary hover:text-primary/80"
              href="#"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                lock
              </span>
            </div>
            <input
              className="block w-full rounded-lg border-0 py-3.5 pl-10 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-500 transition-shadow duration-200"
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-primary to-[#0055aa] px-3.5 py-3.5 text-sm font-bold text-white shadow-sm hover:from-[#002244] hover:to-[#004488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform active:scale-[0.99]"
          type="submit"
        >
          Login to Account
        </button>
      </form>
    </>
  );
};

export default LoginForm;
