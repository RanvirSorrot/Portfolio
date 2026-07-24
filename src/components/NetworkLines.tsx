import { motion } from "framer-motion";
import { useMemo } from "react";

const NetworkLines = () => {
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      pts.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
      });
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const l: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < 25) {
          l.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, delay: Math.random() * 3 });
        }
      }
    }
    return l;
  }, [nodes]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, i) => (
          <motion.line
            key={`l-${i}`}
            x1={`${line.x1}%`} y1={`${line.y1}%`}
            x2={`${line.x2}%`} y2={`${line.y2}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: line.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <motion.div
          key={`n-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: node.duration, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default NetworkLines;
