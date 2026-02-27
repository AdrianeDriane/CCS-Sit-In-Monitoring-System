interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Lab Rules", href: "#" },
  { label: "Schedule", href: "#" },
  { label: "Contact Admin", href: "#" },
];

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden lg:flex justify-end items-center p-8 gap-8">
      {navLinks.map((link) => (
        <a
          key={link.label}
          className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default DesktopNav;
