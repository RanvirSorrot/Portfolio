import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-2">
      <motion.div
        className="h-px rounded-full"
        style={{ background: "var(--hero-gradient)" }}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "60%", opacity: 0.3 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
};

export default SectionDivider;
