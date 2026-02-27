import UserAvatarGroup from "./UserAvatarGroup";

interface LogoItem {
  src: string;
  alt: string;
}

const logos: LogoItem[] = [
  { src: "/uc_logo.png", alt: "University of Cebu Logo" },
  { src: "/ccs_logo.png", alt: "College of Computer Studies Logo" },
  { src: "/csps_logo.png", alt: "CSPS Logo" },
  { src: "/psits_logo.png", alt: "PSITS Logo" },
];

const HeroSection: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('/hero_background.png')` }}
        aria-label="Modern university computer laboratory with computers"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
        {/* Top: Logo Row */}
        <div className="flex items-center gap-4">
          {/* Organization Logos */}
          <div className="flex items-center gap-3">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/20" />

          {/* Title */}
          <span className="text-xl text-left font-bold tracking-tight">
            UC-Main CCS Sit-In Monitoring System
          </span>
        </div>

        {/* Main Text */}
        <div className="mb-12">
          <h1 className="text-5xl text-left font-black leading-tight tracking-tight mb-6">
            Centralized Sit-In Monitoring
            <br />
            Across All Computer Labs
          </h1>
          <p className="text-lg text-left text-white/80 max-w-md leading-relaxed">
            A centralized platform for UC-Main Faculty and Working Students to
            log and monitor sit-in activity across all rooms in real-time.
          </p>

          <UserAvatarGroup />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-white/40">
            © 2026 University of Cebu - Main | CCS. All rights reserved.
          </div>

          {/* Small logo strip in footer */}
          <div className="flex items-center gap-2">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="w-5 h-5 object-contain opacity-30 hover:opacity-60 transition-opacity duration-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
