import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import MobileHeader from "../components/MobileHeader";
import DesktopNav from "../components/DesktopNav";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark w-full font-display min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 h-screen w-full relative">
        {/* Left Side: Hero Image / Branding */}
        <HeroSection />

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-slate-900 relative overflow-y-auto">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Login Container */}
          <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24">
            <div className="w-full max-w-[440px]">
              <div className="text-center mb-8 lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Please enter your details to sign in.
                </p>
              </div>

              <LoginForm />

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  New student?{" "}
                  <Link
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    to="/register"
                  >
                    Register for an account
                  </Link>
                </p>
              </div>

              {/* Footer Info (Mobile) */}
              <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 lg:hidden text-center">
                <p className="text-xs text-slate-400">
                  © 2026 CCS Monitoring System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
