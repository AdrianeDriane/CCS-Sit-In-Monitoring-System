import ucLogo from "/uc_logo.png";

const MobileHeader: React.FC = () => {
  return (
    <div className="lg:hidden p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 flex items-center justify-center overflow-hidden">
          <img
            src={ucLogo}
            alt={"University of Cebu Logo"}
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>

        <span className="font-bold text-lg">CCS Sit-In</span>
      </div>
      <a
        className="text-sm font-medium text-slate-500 hover:text-primary"
        href="#"
      >
        Help
      </a>
    </div>
  );
};

export default MobileHeader;
