import { useState, type FormEvent } from "react";

interface RegisterFormData {
  idNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  course: string;
  yearLevel: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    idNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    course: "",
    yearLevel: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Register attempt:", formData);
  };

  const inputClasses =
    "block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-500 transition-shadow duration-200";

  const selectClasses =
    "block w-full rounded-lg border-0 py-3 pl-10 pr-8 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-500 transition-shadow duration-200 appearance-none";

  const labelClasses = "text-sm font-medium text-slate-700 dark:text-slate-300";

  const iconClasses =
    "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors";

  return (
    <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
      {/* ID Number */}
      <div className="space-y-1.5 text-left">
        <label className={labelClasses} htmlFor="idNumber">
          ID Number
        </label>
        <div className="relative group">
          <div className={iconClasses}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              badge
            </span>
          </div>
          <input
            className={inputClasses}
            id="idNumber"
            name="idNumber"
            placeholder="e.g., 21-0001-123"
            type="text"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Last Name & First Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="lastName">
            Last Name
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                person
              </span>
            </div>
            <input
              className={inputClasses}
              id="lastName"
              name="lastName"
              placeholder="Dela Cruz"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="firstName">
            First Name
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                person
              </span>
            </div>
            <input
              className={inputClasses}
              id="firstName"
              name="firstName"
              placeholder="Juan"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Middle Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="middleName">
            Middle Name{" "}
            <span className="text-xs text-slate-400 font-normal">
              (optional)
            </span>
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                person
              </span>
            </div>
            <input
              className={inputClasses}
              id="middleName"
              name="middleName"
              placeholder="Santos"
              type="text"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                mail
              </span>
            </div>
            <input
              className={inputClasses}
              id="email"
              name="email"
              placeholder="juan@uc.edu.ph"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Course & Year Level Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="course">
            Course
          </label>
          <div className="relative group">
            <div className={`${iconClasses} z-10`}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                school
              </span>
            </div>
            <select
              className={selectClasses}
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select course
              </option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="ACT">ACT</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                expand_more
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="yearLevel">
            Year Level
          </label>
          <div className="relative group">
            <div className={`${iconClasses} z-10`}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                calendar_today
              </span>
            </div>
            <select
              className={selectClasses}
              id="yearLevel"
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select year
              </option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5 text-left">
        <label className={labelClasses} htmlFor="address">
          Address
        </label>
        <div className="relative group">
          <div className="absolute top-0 left-0 pl-3.5 pt-3 flex items-start pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              location_on
            </span>
          </div>
          <textarea
            className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary/50 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-500 transition-shadow duration-200 resize-none"
            id="address"
            name="address"
            placeholder="Street, Barangay, City, Province"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Password & Confirm Password Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="password">
            Password
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                lock
              </span>
            </div>
            <input
              className={`${inputClasses} pr-10`}
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
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

        <div className="space-y-1.5 text-left">
          <label className={labelClasses} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative group">
            <div className={iconClasses}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                lock
              </span>
            </div>
            <input
              className={`${inputClasses} pr-10`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20 }}
              >
                {showConfirmPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2 mt-1">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/50 dark:border-slate-600 dark:bg-slate-800"
          required
        />
        <label
          htmlFor="terms"
          className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          I agree to the{" "}
          <a
            href="#"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Lab Usage Policy
          </a>
        </label>
      </div>

      {/* Register Button */}
      <button
        className="mt-2 w-full rounded-lg bg-gradient-to-r from-primary to-[#0055aa] px-3.5 py-3.5 text-sm font-bold text-white shadow-sm hover:from-[#002244] hover:to-[#004488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform active:scale-[0.99]"
        type="submit"
      >
        Register Account
      </button>
    </form>
  );
};

export default RegisterForm;
