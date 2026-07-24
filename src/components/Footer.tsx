import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>Built with React &amp; Tailwind CSS</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/RanvirSorrot"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-primary transition-colors"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/ranvir-sorrot-956239220/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-primary transition-colors"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
