import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, PanInfo } from "framer-motion";
import { Code2, Wrench, Sparkles } from "lucide-react";

const groups = [
  {
    label: "Frontend",
    icon: Code2,
    skills: [
      "React.js", "Next.js", "TypeScript", "JavaScript",
      "Redux", "Redux Toolkit", "RTK Query", "HTML5", "CSS3", "Tailwind CSS",
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

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// ---- responsive container width -------------------------------------------------
function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}

// ---- connector string, drawn once in the fixed gap between two slots ------------
function ConnectorString({
  x1,
  x2,
  opacity,
}: {
  x1: number;
  x2: number;
  opacity: MotionValue<number>;
}) {
  const width = Math.max(1, x2 - x1);
  const height = 90;
  const gradId = `string-grad-${Math.round(x1)}-${Math.round(x2)}`;

  return (
    <motion.div
      style={{
        opacity,
        position: "absolute",
        top: "50%",
        left: `calc(50% + ${x1}px)`,
        width,
        height,
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`M 6 ${height / 2 - 14} Q ${width / 2} ${height / 2 + 22} ${width - 6} ${height / 2 - 14}`}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 7"
          style={{ animation: "skillStringFlow 1.6s linear infinite" }}
        />
        <circle cx="6" cy={height / 2 - 14} r="4.5" fill="hsl(var(--primary))" opacity="0.55" />
        <circle cx={width - 6} cy={height / 2 - 14} r="4.5" fill="hsl(var(--primary))" opacity="0.55" />
      </svg>
    </motion.div>
  );
}

// ---- a single skill card, fully self-contained animation logic -----------------
function SkillCard({
  group,
  index,
  active,
  cardW,
  sideScale,
  sideX,
}: {
  group: (typeof groups)[0];
  index: number;
  active: MotionValue<number>;
  cardW: number;
  sideScale: number;
  sideX: number;
}) {
  const Icon = group.icon;

  const dist = useTransform(active, (a) => Math.abs(index - a));
  const x = useTransform(active, (a) => (index - a) * sideX);

  const scale = useTransform(dist, (d) => (d < 1 ? 1 - d * (1 - sideScale) : sideScale));
  const opacity = useTransform(dist, (d) => clamp(1 - d * 0.72, 0, 1));
  const blur = useTransform(dist, (d) => `blur(${clamp(d * 4, 0, 6)}px)`);
  const rotateY = useTransform(active, (a) => clamp((index - a) * -20, -26, 26));
  const z = useTransform(dist, (d) => -clamp(d * 110, 0, 220));
  const zIndex = useTransform(dist, (d) => Math.round(100 - d * 30));
  const shadowOpacity = useTransform(dist, (d) => clamp(0.35 - d * 0.3, 0.05, 0.35));

  return (
    <motion.div
      style={{
        x,
        scale,
        opacity,
        rotateY,
        z,
        zIndex,
        filter: blur,
        transformPerspective: 1400,
        position: "absolute",
        width: cardW,
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        boxShadow: useTransform(shadowOpacity, (s) => `0 30px 60px -20px hsl(var(--primary) / ${s})`),
      }}
      className="rounded-[28px] bg-card/95 backdrop-blur-md border border-border/60 flex flex-col"
    >
      <div
        className="flex items-center gap-5"
        style={{ padding: cardW * 0.075 }}
      >
        <div
          className="rounded-2xl flex items-center justify-center shrink-0"
          style={{
            width: cardW * 0.16,
            height: cardW * 0.16,
            background: "var(--hero-gradient)",
          }}
        >
          <Icon size={cardW * 0.08} className="text-white" />
        </div>
        <div>
          <span className="text-xs tracking-widest uppercase text-muted-foreground/50 font-medium">
            0{index + 1}
          </span>
          <h3
            className="font-display font-bold text-foreground leading-tight"
            style={{ fontSize: cardW * 0.065 }}
          >
            {group.label}
          </h3>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2.5"
        style={{ padding: `0 ${cardW * 0.075}px ${cardW * 0.08}px` }}
      >
        {group.skills.map((s) => (
          <span
            key={s}
            className="rounded-xl bg-primary/10 text-primary font-medium border border-primary/20"
            style={{
              fontSize: cardW * 0.032,
              padding: `${cardW * 0.018}px ${cardW * 0.03}px`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const SkillsSection = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [wrapRef, wrapWidth] = useContainerWidth();
  const [isDragging, setIsDragging] = useState(false);

  const CARD_W = clamp(wrapWidth ? wrapWidth * 0.54 : 680, 380, 780);
  const SIDE_SCALE = 0.68;
  const GAP = clamp(CARD_W * 0.26, 56, 170);
  const SIDE_X = CARD_W / 2 + (CARD_W * SIDE_SCALE) / 2 + GAP;

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  // single spring -> every other value is a pure transform of it, so nothing lags
  // or double-smooths, and reverse scroll is a perfect mirror of forward scroll.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const active = useTransform(smooth, (v) => v * (groups.length - 1));

  const leftStringOpacity = useTransform(smooth, [0, 0.06, 1], [0, 1, 1]);
  const rightStringOpacity = useTransform(smooth, [0, 0.94, 1], [1, 1, 0]);

  const leftEdgeOfCenter = -CARD_W / 2;
  const rightEdgeOfLeftSlot = -SIDE_X + (CARD_W * SIDE_SCALE) / 2;
  const rightEdgeOfCenter = CARD_W / 2;
  const leftEdgeOfRightSlot = SIDE_X - (CARD_W * SIDE_SCALE) / 2;

  // Dragging the card row horizontally scrolls the page vertically by the
  // matching amount, so drag and native scroll drive the exact same value:
  // no separate state, no conflict, both stay in sync at all times. Dragging
  // a distance of SIDE_X moves through exactly one card, matching the feel
  // of a normal scroll-driven step.
  const handlePan = (_event: unknown, info: PanInfo) => {
    const sensitivity = window.innerHeight / SIDE_X;
    window.scrollBy({ top: -info.delta.x * sensitivity, left: 0 });
  };

  return (
    <section id="skills" className="relative">
      <style>{`
        @keyframes skillStringFlow {
          to { stroke-dashoffset: -30; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mx-auto">Technologies and tools I work with.</p>
        </motion.div>
        <p className="text-xs text-muted-foreground/40 mt-3 tracking-widest uppercase">
          scroll or drag to explore
        </p>
      </div>

      <div ref={stickyRef} style={{ height: `${groups.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            ref={wrapRef}
            className="relative w-full max-w-7xl"
            style={{
              height: CARD_W * 0.95,
              perspective: 1400,
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
            }}
            onPan={handlePan}
            onPanStart={() => setIsDragging(true)}
            onPanEnd={() => setIsDragging(false)}
          >
            <ConnectorString
              x1={rightEdgeOfLeftSlot}
              x2={leftEdgeOfCenter}
              opacity={leftStringOpacity}
            />
            <ConnectorString
              x1={rightEdgeOfCenter}
              x2={leftEdgeOfRightSlot}
              opacity={rightStringOpacity}
            />

            {groups.map((g, i) => (
              <SkillCard
                key={g.label}
                group={g}
                index={i}
                active={active}
                cardW={CARD_W}
                sideScale={SIDE_SCALE}
                sideX={SIDE_X}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;