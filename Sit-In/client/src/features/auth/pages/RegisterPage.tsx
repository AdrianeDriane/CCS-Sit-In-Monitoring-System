import { Link } from "react-router-dom";
import RegisterHeroSection from "../components/RegisterHeroSection";
import RegisterForm from "../components/RegisterForm";
import MobileHeader from "../components/MobileHeader";
import DesktopNav from "../components/DesktopNav";

const RegisterPage: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark w-full font-display min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 h-screen w-full relative">
        {/* Left Side: Register Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-slate-900 relative overflow-y-auto">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Register Container */}
          <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 lg:px-20">
            <div className="w-full max-w-130">
              <div className="text-center mb-6 lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  Register Account
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Fill in your details to register for the CCS Sit-In Monitoring
                  System.
                </p>
              </div>

              <RegisterForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    to="/login"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>

              {/* Footer Info (Mobile) */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 lg:hidden text-center">
                <p className="text-xs text-slate-400">
                  © 2026 CCS Monitoring System
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Hero Image / Branding */}
        <RegisterHeroSection />
      </div>
    </div>
  );
};

export default RegisterPage;
