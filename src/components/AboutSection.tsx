import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-muted/50 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Frontend Developer with 1.5+ years of experience building scalable, high-performance web
            applications using React.js, TypeScript, and Next.js. Experienced in integrating REST APIs,
            building real-time user experiences, and developing AI-assisted frontend workflows. Proven
            ability to optimize performance, enhance user experience, and deliver secure,
            production-ready applications with clean architecture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -4 }}
            className="rounded-xl bg-card/60 backdrop-blur-md border border-border/50 p-6 shadow-sm transition-shadow hover:shadow-[0_12px_32px_-8px_hsl(var(--primary)/0.2)] hover:border-primary/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-primary" size={24} />
              <h3 className="font-display font-semibold text-xl">Education</h3>
            </div>
            <p className="font-medium text-foreground text-base">
              B.Tech in Computer Science Engineering
            </p>
            <p className="text-base text-muted-foreground">
              Jaypee University of Information Technology
            </p>
            <p className="text-sm text-primary font-medium mt-1 tracking-wider uppercase">
              2020 – 2024
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -4 }}
            className="rounded-xl bg-card/60 backdrop-blur-md border border-border/50 p-6 shadow-sm space-y-2 transition-shadow hover:shadow-[0_12px_32px_-8px_hsl(var(--primary)/0.2)] hover:border-primary/40"
          >
            <h3 className="font-display font-semibold text-xl mb-3">Quick Info</h3>
            <p className="flex items-center gap-2 text-base text-muted-foreground">
              <MapPin size={18} className="text-primary" /> Palwal, Haryana, India
            </p>
            <p className="flex items-center gap-2 text-base text-muted-foreground">
              <Mail size={18} className="text-primary" /> ranvirsorrot3005@gmail.com
            </p>
            <p className="flex items-center gap-2 text-base text-muted-foreground">
              <Phone size={18} className="text-primary" /> +91-7404817816
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;