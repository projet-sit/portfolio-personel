import { useEffect, useMemo, useState } from "react";

const profile = {
  name: "IDOHOU Babatoundé Ulrich Merveil",
  shortName: "Ulrich Merveil",
  title: "Développeur Full Stack",
  location: "Cotonou, Bénin",
  email: "ulrichidohou5@gmail.com",
  whatsapp: "0191831317",
  whatsappUrl: "https://wa.me/2290191831317",
  linkedin: "https://linkedin.com/in/ulrich-idohou",
  github: "https://github.com/ulrich-idohou",
  tagline:
    "Développeur Full Stack basé à Cotonou, je conçois des applications web modernes, performantes et adaptées aux besoins réels des utilisateurs.",
};

const skillGroups = [
  {
    title: "Web",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "API REST", "Logique serveur"],
  },
  {
    title: "Bases de données",
    skills: ["MySQL", "SQL"],
  },
  {
    title: "Approche IA",
    skills: [
      "Résolution de problèmes",
      "Amélioration de projets",
      "Optimisation du travail",
    ],
  },
];

const projects = [
  {
    name: "Portfolio Développeur Full Stack",
    description:
      "Site personnel responsive présentant mon profil, mes compétences, mes projets et mes informations de contact.",
    technologies: ["React", "Tailwind CSS", "Node.js", "JavaScript"],
  },
  {
    name: "Application de Gestion de Tâches",
    description:
      "Application web permettant de créer, modifier, supprimer et suivre des tâches avec une interface simple et efficace.",
    technologies: ["React", "Tailwind CSS", "Node.js", "MySQL", "SQL"],
  },
  {
    name: "Dashboard de Gestion",
    description:
      "Tableau de bord web pensé pour visualiser des données, gérer des utilisateurs et suivre des statistiques importantes.",
    technologies: ["React", "JavaScript", "Node.js", "SQL"],
  },
  {
    name: "API Backend avec Node.js",
    description:
      "API REST conçue pour connecter une application front-end moderne à une base de données MySQL.",
    technologies: ["Node.js", "MySQL", "SQL", "JavaScript"],
  },
];

const navigation = [
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Gestion de l'affichage du bouton retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active le thème clair/sombre et garde le choix dans le navigateur.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Animation légère au scroll : chaque élément .reveal apparaît quand il entre dans l'écran.
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 antialiased transition-colors duration-300 dark:bg-[#08111f] dark:text-white">
      {/* Navigation principale */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#08111f]/85">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-cyan-300/60"
            aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
          >
            {isDark ? "Clair" : "Sombre"}
          </button>
        </nav>
      </header>

      <main>
        {/* Section Hero */}
        <section id="accueil" className="relative pt-28 sm:pt-32">
          <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="reveal max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 dark:text-cyan-200">
                {profile.title} · {profile.location}
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Je transforme des idées en applications web utiles et modernes.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {profile.tagline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projets"
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400"
                >
                  Voir mes projets
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:text-white dark:hover:border-cyan-300"
                >
                  Télécharger mon CV
                </a>
              </div>

              <div className="mt-6 flex items-center gap-5">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs font-bold uppercase tracking-widest text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  Email
                </a>
              </div>
            </div>

            <div className="reveal relative" style={{ transitionDelay: '200ms' }}>
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30">
                <img
                  src="/profile.jpg"
                  alt={`Portrait de ${profile.name}`}
                  className="h-72 w-full object-cover sm:h-96"
                />
                <div className="p-5 text-center">
                  <p className="text-lg font-bold text-slate-950 dark:text-white">
                    {profile.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section À propos */}
        <section id="apropos" className="scroll-mt-24 border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <SectionHeading eyebrow="À propos" title="Un profil technique orienté solutions" />
            <div className="reveal space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300" style={{ transitionDelay: '150ms' }}>
              <p>
                Je suis {profile.name}, {profile.title.toLowerCase()} basé à {profile.location}.
                Je travaille avec les technologies web modernes pour créer des interfaces claires,
                rapides et faciles à utiliser.
              </p>
              <p>
                Mon approche consiste à comprendre le besoin, structurer une solution simple, puis
                utiliser le code et l'IA comme leviers pour résoudre les problèmes plus efficacement.
              </p>
            </div>
          </div>
        </section>

        {/* Section Compétences */}
        <section id="competences" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Compétences"
              title="Les outils que j'utilise pour construire"
              centered
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="reveal rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-cyan-300/60"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="scroll-mt-24 border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Projets" title="Réalisations à personnaliser avec tes vrais liens" centered />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project.name}
                  className="reveal group rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-[#0d1a2e] dark:hover:border-cyan-300/60"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-cyan-500/10 text-sm font-extrabold text-cyan-700 dark:text-cyan-200">
                      0{index + 1}
                    </span>
                    <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Projet temporaire
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="reveal">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
                Discutons de ton prochain projet web.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                Tu peux me contacter par email ou WhatsApp pour parler d'une application, d'un site
                web ou d'une amélioration technique.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:text-white dark:hover:border-cyan-300"
                >
                  WhatsApp : {profile.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pied de page */}
      <footer className="border-t border-slate-200 py-8 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <p>© {currentYear}. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Bouton Retour en haut */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-[60] grid size-12 place-items-center rounded-full bg-cyan-500 text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:bg-cyan-400 ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
        aria-label="Retour en haut de la page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <p className="text-lg font-extrabold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, centered = false }) {
  return (
    <div className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
    </div>
  );
}

export default App;
