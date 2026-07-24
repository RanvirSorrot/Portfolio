import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import NetworkLines from "@/components/NetworkLines";
import SectionDivider from "@/components/SectionDivider";

const Index = () => (
  <>
    <ScrollProgress />
    <NetworkLines />
    <Navbar />
    <HeroSection />
    <SectionDivider />
    <AboutSection />
    <SectionDivider />
    <ExperienceSection />
    <SectionDivider />
    <SkillsSection />
    <SectionDivider />
    <ProjectsSection />
    <SectionDivider />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
