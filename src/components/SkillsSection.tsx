import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Wrench, Sparkles } from "lucide-react";

const groups = [
  {
    label: "Frontend",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Redux Toolkit",
      "RTK Query",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    label: "Tools",
    icon: Wrench,
    skills: ["CI/CD", "GitHub Actions", "Git", "Postman"],
  },
  {
    label: "Others",
    icon: Sparkles,
    skills: ["REST APIs", "WebSockets", "Authentication (Firebase, Supabase)"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.06 }}
                className="rounded-xl bg-card/70 backdrop-blur-md border border-border/50 p-6 shadow-sm hover:border-primary/50 hover:shadow-[0_0_22px_hsl(var(--primary)/0.25)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-foreground">
                    {g.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted/80 text-foreground/80 font-medium border border-border/40"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
