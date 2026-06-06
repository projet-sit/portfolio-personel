import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { motion } from "framer-motion";

const profile = {
  name: "IDOHOU Babatoundé Ulrich Merveil",
  shortName: "Ulrich Merveil",
  title: "Développeur Full Stack",
  location: "Cotonou, Bénin",
  email: "ulrichidohou5@gmail.com",
  whatsapp: "0191831317",
  whatsappUrl: "https://wa.me/2290191831317",
  github: "https://github.com/ulrich-idohou",
  tagline:
    "Développeur Full Stack basé à Cotonou, je conçois des applications web modernes, performantes et adaptées aux besoins réels des utilisateurs.",
};

const skillGroups = [
  {
    title: "Web Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    title: "Backend & API",
    skills: ["Node.js", "Express", "REST API", "Auth JWT"],
  },
  {
    title: "Bases de données",
    skills: ["MySQL", "PostgreSQL", "Supabase", "SQLite"],
  },
  {
    title: "Soft Skills & IA",
    skills: ["Prompt Engineering", "Agile", "Architecture UI/UX", "Problem Solving"],
  },
];

const projects = [
  {
    name: "Portfolio",
    description:
      "Version améliorée avec un design premium, des animations fluides et une architecture modulaire.",
    technologies: ["React", "Framer Motion", "Lucide React", "Tailwind CSS"],
    repository: "https://github.com/ulrich-idohou/portfolio-ulrich-idohou",
    status: "Terminé",
    year: "2026",
  },
  {
    name: "Alerte229",
    description:
      "Plateforme web de surveillance citoyenne permettant de signaler des incidents urbains avec photos, description, localisation et suivi par les autorités.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    repository: "https://github.com/projet-sit/alerte229",
    status: "En cours",
    year: "2026",
  },
  {
    name: "Expo d'Art",
    description:
      "Application de mise en relation entre artistes peintres ou dessinateurs béninois et le public, avec galerie interactive, profils artistes et espace admin.",
    technologies: ["React", "Node.js", "Express", "SQLite"],
    repository: "https://github.com/projet-sit/expo-d-art",
    status: "En cours",
    year: "2026",
  },
];

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 antialiased transition-colors duration-500 dark:bg-[#08111f] dark:text-white">
      <Header isDark={isDark} setIsDark={setIsDark} profile={profile} />
      
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skillGroups={skillGroups} />
        <Services />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>

      <footer className="border-t border-slate-200 py-12 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
