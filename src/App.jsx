import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Approach from "./components/Approach";
import Contact from "./components/Contact";
import Background from "./components/Background";
import { profile } from "./data/portfolio";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="app-shell min-h-screen text-white antialiased dark:text-white">
      <Background />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Approach />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-[#07101c]/60 py-12 backdrop-blur-sm dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm font-bold text-slate-400 dark:text-slate-400">
              © {new Date().getFullYear()} {profile.name} — Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
