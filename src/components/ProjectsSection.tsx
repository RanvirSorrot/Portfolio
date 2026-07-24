import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "AgentFlow",
    subtitle: "AI Agent Builder Platform",
    image: null,
    highlights: [
      "React frontend for building AI agents via prompt-driven workflows.",
      "Modular UI for wiring tools, APIs, and modules into agents.",
      "Redux for multi-step config state; Supabase auth end-to-end.",
    ],
    tags: ["React", "Redux", "Supabase"],
    code: "https://github.com/RanvirSorrot",
    demo: null,
  },
  {
    title: "Ylore",
    subtitle: "Travel App",
    image: null,
    highlights: [
      "Led frontend for a team of 4; responsive React UI.",
      "Firebase auth + Mapbox for real-time location & routes.",
      "TOTP 2FA admin login with QR code integration.",
    ],
    tags: ["React", "Firebase", "Mapbox"],
    code: "https://github.com/RanvirSorrot",
    demo: null,
  },
  {
    title: "Klaviss",
    subtitle: "Real Estate Transaction Platform",
    image: null,
    highlights: [
      "Scalable React UIs on a microservices platform.",
      "Displayed AI-extracted structured data from purchase agreements.",
      "Real-time document chat over WebSockets with Redux state.",
    ],
    tags: ["React", "WebSockets", "Redux"],
    code: "https://github.com/RanvirSorrot",
    demo: null,
  },
  {
    title: "ITC",
    subtitle: "Real-Time Traffic Management",
    image: null,
    highlights: [
      "Real-time dashboards for AI-driven traffic monitoring.",
      "Google Maps & Mapbox for congestion and navigation.",
      "Optimized rendering for high-frequency data streams.",
    ],
    tags: ["React", "Google Maps", "Mapbox"],
    code: "https://github.com/RanvirSorrot",
    demo: null,
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
              whileHover={{ scale: 1.02 }}
              className="rounded-xl bg-card/70 backdrop-blur-md border border-border/50 overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-[0_0_22px_hsl(var(--primary)/0.25)] flex flex-col"
            >
              <div className="w-full h-44 bg-muted/60 flex items-center justify-center border-b border-border/40 overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center opacity-20"
                    style={{ background: "var(--hero-gradient)" }}
                  >
                    <span className="text-4xl font-bold font-display text-white tracking-tight">
                      {p.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <h3 className="font-display font-semibold text-lg text-foreground">{p.title}</h3>
                  <p className="text-sm text-primary font-medium">{p.subtitle}</p>
                </div>

                <ul className="space-y-1.5 text-sm text-muted-foreground mb-4 list-disc pl-5 flex-1">
                  {p.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>

                <div className="flex gap-2 flex-wrap mb-4">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-muted/80 text-foreground/80 font-medium border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-muted/80 text-foreground hover:bg-muted border border-border/50 transition-colors"
                  >
                    <Code2 size={15} />
                    Code
                  </a>
                  <a
                    href={p.demo ?? "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    style={{ background: "var(--hero-gradient)" }}
                    onClick={p.demo ? undefined : (e) => e.preventDefault()}
                  >
                    <ExternalLink size={15} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
