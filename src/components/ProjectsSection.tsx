import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "AgentFlow",
    subtitle: "AI Agent Builder Platform",
    highlights: [
      "React frontend for building AI agents via prompt-driven workflows.",
      "Modular UI for wiring tools, APIs, and modules into agents.",
      "Redux for multi-step config state; Supabase auth end-to-end.",
    ],
    tags: ["React", "Redux", "Supabase"],
  },
  {
    title: "Ylore",
    subtitle: "Travel App",
    highlights: [
      "Led frontend for a team of 4; responsive React UI.",
      "Firebase auth + Mapbox for real-time location & routes.",
      "TOTP 2FA admin login with QR code integration.",
    ],
    tags: ["React", "Firebase", "Mapbox"],
  },
  {
    title: "Klaviss",
    subtitle: "Real Estate Transaction Platform",
    highlights: [
      "Scalable React UIs on a microservices platform.",
      "Displayed AI-extracted structured data from purchase agreements.",
      "Real-time document chat over WebSockets with Redux state.",
    ],
    tags: ["React", "WebSockets", "Redux"],
  },
  {
    title: "ITC",
    subtitle: "Real-Time Traffic Management",
    highlights: [
      "Real-time dashboards for AI-driven traffic monitoring.",
      "Google Maps & Mapbox for congestion and navigation.",
      "Optimized rendering for high-frequency data streams.",
    ],
    tags: ["React", "Google Maps", "Mapbox"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="bg-muted/50 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Selected work from my roles as a frontend engineer.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.06 }}
              className="rounded-xl bg-card/70 backdrop-blur-md border border-border/50 p-6 shadow-sm hover:border-primary/50 hover:shadow-[0_0_22px_hsl(var(--primary)/0.25)]"
            >
              <div className="mb-3">
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-primary font-medium">{p.subtitle}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground mb-4 list-disc pl-5">
                {p.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-muted/80 text-foreground/80 font-medium border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
