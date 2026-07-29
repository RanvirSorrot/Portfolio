import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/RanvirSorrot" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ranvir-sorrot-956239220/" },
  { icon: Mail, label: "Email", href: "mailto:ranvirsorrot3005@gmail.com" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a question or want to work together? Drop me a message.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-5"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-base font-medium text-foreground mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/80 backdrop-blur-sm text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder={`Your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
            <div>
              <label className="block text-base font-medium text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background/80 backdrop-blur-sm text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
            >
              {submitted ? <>✓ Sent!</> : <><Send size={16} /> Send Message</>}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-base text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <a href="mailto:ranvirsorrot3005@gmail.com" className="hover:text-primary transition-colors">
                  ranvirsorrot3005@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3 text-base text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <a href="tel:+917404817816" className="hover:text-primary transition-colors">
                  +91-7404817816
                </a>
              </p>
              <p className="flex items-center gap-3 text-base text-muted-foreground">
                <MapPin size={18} className="text-primary" /> Palwal, Haryana, India
              </p>
            </div>

            <div className="flex gap-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    aria-label={s.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;