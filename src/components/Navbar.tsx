import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-x-0 border-t-0 rounded-none"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          aria-label="Home"
          className="flex items-center"
        >
          <span
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tight select-none"
            style={{ background: "var(--hero-gradient)" }}
          >
            RS
          </span>
        </a>

        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-primary after:transition-all ${
                    isActive
                      ? "text-primary after:w-full"
                      : "text-muted-foreground hover:text-primary after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`block px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
