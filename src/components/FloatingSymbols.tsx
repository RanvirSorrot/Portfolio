import { motion } from "framer-motion";

const symbols = ["</>", "{}", "()", "=>", "//", "[]", "&&", "||", "++", "**"];

const FloatingSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/10 font-mono text-lg md:text-2xl font-bold select-none"
          style={{
            left: `${(i * 10) + 2}%`,
            top: `${(i * 8 + 5) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingSymbols;
