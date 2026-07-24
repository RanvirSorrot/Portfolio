import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FloatingSymbols from "./FloatingSymbols";
import heroImage from "@/assets/hero-student.png";

const HeroSection = () => {
  const fullText = "Frontend Developer · React · Next.js\nTypeScript";
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

  useEffect(() => {
    let i = 0;
    setTypingComplete(false);
    setTypedText("");
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (Math.abs(delta) < 2) {
        return;
      }

      const nextDirection = delta > 0 ? "down" : "up";

      if (scrollDirectionRef.current !== nextDirection) {
        scrollDirectionRef.current = nextDirection;
        setScrollDirection(nextDirection);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <FloatingSymbols />

      <div className="section-container relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-20">
        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-primary font-medium mb-3 text-sm tracking-widest uppercase"
          >
            Hello, I'm
          </motion.p>

          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight mb-4 whitespace-nowrap justify-center md:justify-start flex">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="gradient-text inline-block"
            >
              Ranvir Sorrot
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl text-muted-foreground font-light mb-8 min-h-[5.5rem] md:min-h-[6.5rem] leading-tight max-w-[34ch] whitespace-pre-line"
          >
            {typedText}
            <span className="animate-pulse text-primary">|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 12 }}
            className={`flex gap-4 justify-center md:justify-start flex-wrap transition-[margin-top] duration-300 ${
              typingComplete ? "mt-12" : "mt-8"
            }`}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-110" />
            <img src={heroImage} alt="Ranvir Sorrot - Frontend Developer" className="relative w-80 md:w-[28rem] animate-float" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href={scrollDirection === "up" ? "#home" : "#about"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <motion.div animate={{ rotate: scrollDirection === "up" ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
