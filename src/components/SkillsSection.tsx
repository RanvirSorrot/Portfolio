import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
  PanInfo,
} from "framer-motion";
import { Code2, Wrench, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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

const LAST_INDEX = groups.length - 1;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Swipe needs to travel at least this fraction of a card's slot before we
// commit to the next/prev card. Below it (or if released early), we
// spring back to where we started -- exactly how native carousels behave.
const SWIPE_DISTANCE_RATIO = 0.18;
const SWIPE_VELOCITY_PX_S = 500;
const SNAP_SPRING = { type: "spring", stiffness: 280, damping: 32, mass: 0.7 } as const;

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
  const [wrapRef, wrapWidth] = useContainerWidth();
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const minCardW = wrapWidth ? Math.min(380, wrapWidth * 0.74) : 300;
  const CARD_W = clamp(wrapWidth ? wrapWidth * 0.54 : 680, minCardW, 780);
  const SIDE_SCALE = 0.68;
  const GAP = clamp(CARD_W * 0.26, 56, 170);
  const SIDE_X = CARD_W / 2 + (CARD_W * SIDE_SCALE) / 2 + GAP;

  // The ONE value that drives every card. It moves two ways:
  //  - 1:1 with the finger while a drag is in progress (set() directly, no
  //    easing -- a swipe should feel exactly as fast as the hand moving it)
  //  - via a spring on release/click/arrow-press, snapping to whichever
  //    card is now the target
  const active = useMotionValue(0);
  const dragStartIndex = useRef(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const leftStringOpacity = useTransform(active, [0, 0.18, LAST_INDEX], [0, 1, 1]);
  const rightStringOpacity = useTransform(active, [0, LAST_INDEX - 0.18, LAST_INDEX], [1, 1, 0]);

  const leftEdgeOfCenter = -CARD_W / 2;
  const rightEdgeOfLeftSlot = -SIDE_X + (CARD_W * SIDE_SCALE) / 2;
  const rightEdgeOfCenter = CARD_W / 2;
  const leftEdgeOfRightSlot = SIDE_X - (CARD_W * SIDE_SCALE) / 2;

  const goTo = useCallback(
    (target: number) => {
      const clamped = clamp(target, 0, LAST_INDEX);
      setIndex(clamped);
      controlsRef.current?.stop();
      controlsRef.current = animate(active, clamped, SNAP_SPRING);
    },
    [active]
  );

  const handlePanStart = () => {
    controlsRef.current?.stop();
    dragStartIndex.current = index;
    setIsDragging(true);
  };

  const handlePan = (_event: unknown, info: PanInfo) => {
    // Rubber-band a little past the first/last card so it's obvious
    // there's nothing more to swipe to, instead of feeling stuck.
    const raw = dragStartIndex.current - info.offset.x / SIDE_X;
    active.set(clamp(raw, -0.4, LAST_INDEX + 0.4));
  };

  const handlePanEnd = (_event: unknown, info: PanInfo) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    let target = dragStartIndex.current;

    if (offset.x < -SIDE_X * SWIPE_DISTANCE_RATIO || velocity.x < -SWIPE_VELOCITY_PX_S) {
      target = dragStartIndex.current + 1;
    } else if (offset.x > SIDE_X * SWIPE_DISTANCE_RATIO || velocity.x > SWIPE_VELOCITY_PX_S) {
      target = dragStartIndex.current - 1;
    }
    goTo(target);
  };

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <style>{`
        @keyframes skillStringFlow {
          to { stroke-dashoffset: -30; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mx-auto">Technologies and tools I work with.</p>
        </motion.div>
    
      </div>

      <div
        ref={wrapRef}
        className="relative w-full max-w-7xl mx-auto flex items-center justify-center overflow-hidden select-none"
        style={{ height: CARD_W * 0.95, perspective: 1400 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-y" }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
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

     
    </section>
  );
};

export default SkillsSection;