import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const PaperPlane = ({ size = 22 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#0f172a"
    stroke="#0f172a"
    strokeWidth="1"
    strokeLinejoin="round"
    strokeLinecap="round"
    aria-hidden="true"
    style={{ transform: "rotate(-45deg)" }}
  >
    <path d="M21.5 2.5 2.5 10.5l7 2.5 2.5 7 9.5-17.5z" />
    <path d="m9.5 13 4-4" stroke="#0f172a" fill="none" />
  </svg>
);

type Item = {
  kind: "education" | "work";
  title: string;
  org: string;
  period: string;
  summary?: string;
  points?: string[];
};

const items: Item[] = [
  {
    kind: "education",
    title: "B.Tech in Computer Science",
    org: "Jaypee University of Information Technology",
    period: "2020 – 2024",
    summary:
      "Graduated with a strong foundation in computer science, algorithms, and modern web development.",
  },
  {
    kind: "work",
    title: "Software Developer Intern",
    org: "Genboot Pvt Ltd, Mohali",
    period: "Apr 2024 – Oct 2024",
    summary:
      "Contributed to production React codebases; learned modern frontend architecture, state management, and API integration patterns.",
  },
  {
    kind: "work",
    title: "Software Engineer, Frontend",
    org: "Genboot Private Ltd, Mohali",
    period: "Oct 2024 – Present",
    summary: "Built React frontends across multiple production products:",
    points: [
      "AgentFlow — AI agent builder platform (React + Redux + Supabase).",
      "Ylore — Travel app with Firebase auth, Mapbox and TOTP 2FA.",
      "Klaviss — Real estate platform with WebSocket document chat.",
      "ITC — Real-time AI traffic dashboards with Google Maps & Mapbox.",
    ],
  },
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 });
  const airplaneY = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const lineScale = useTransform(smooth, [0, 1], [0, 1]);
  const tilt = useTransform(smooth, [0, 0.5, 1], [-6, 4, -2]);

  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">My academic and professional journey so far.</p>
        </div>

        <div ref={containerRef} className="relative pl-10 md:pl-0">
          {/* Center line - base */}
          <div
            className="absolute top-0 bottom-0 w-px left-4 md:left-1/2 md:-translate-x-1/2 border-l border-dashed border-border"
            aria-hidden
          />
          {/* Center line - progress fill */}
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top", background: "var(--hero-gradient)" }}
            className="absolute top-0 bottom-0 w-[2px] left-4 md:left-1/2 md:-translate-x-1/2 rounded-full shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
          />

          {/* Airplane - truly centered on the line */}
          <motion.div
            style={{ top: airplaneY, rotate: tilt, x: "-50%", y: "-50%" }}
            className="absolute left-4 md:left-1/2 z-20 pointer-events-none"
            aria-hidden
          >
            <motion.div
              animate={{ y: [0, -3, 0, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_0_24px_hsl(var(--primary)/0.55)]"
              style={{ background: "var(--hero-gradient)" }}
            >
              <PaperPlane size={20} />
            </motion.div>
          </motion.div>

          {/* Items */}
          <div className="space-y-12">
            {items.map((it, i) => {
              const leftSide = i % 2 === 0;
              const Icon = it.kind === "education" ? GraduationCap : Briefcase;
              return (
                <motion.div
                  key={it.title + it.period}
                  initial={{ opacity: 0, x: leftSide ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative flex ${leftSide ? "md:flex-row" : "md:flex-row-reverse"} flex-row items-start`}
                >
                  {/* connector dot on the center line */}
                  <span
                    aria-hidden
                    className="absolute top-8 left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)] z-10"
                  />

                  {/* content half */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      leftSide ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="rounded-xl bg-card/70 backdrop-blur-md border border-border/50 p-6 shadow-sm">
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          leftSide ? "md:justify-end" : ""
                        }`}
                      >
                        <Icon size={16} className="text-primary" />
                        <span className="text-xs font-medium text-primary tracking-wider uppercase">
                          {it.period}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        {it.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{it.org}</p>
                      {it.summary && (
                        <p className="text-sm text-muted-foreground">{it.summary}</p>
                      )}
                      {it.points && (
                        <ul className="list-disc mt-3 space-y-1 text-sm text-muted-foreground pl-5 text-left">
                          {it.points.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* empty spacer for the other half (desktop) */}
                  <div className="hidden md:block md:w-1/2" aria-hidden />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
