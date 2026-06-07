export const profile = {
  name: "IDOHOU Babatoundé Ulrich Merveil",
  shortName: "Ulrich Merveil",
  title: "Développeur Full Stack",
  location: "Cotonou, Bénin",
  email: "ulrichidohou5@gmail.com",
  whatsapp: "0191831317",
  whatsappUrl: "https://wa.me/2290191831317",
  github: "https://github.com/projet-sit",
  tagline:
    "Développeur Full Stack basé à Cotonou, je conçois des applications web modernes, performantes et adaptées aux besoins réels des utilisateurs.",
};

export const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
];

export const skillGroups = [
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

export const services = [
  {
    title: "Développement Full Stack",
    description: "Conception d'applications web complètes de l'architecture base de données à l'interface utilisateur.",
    iconName: "Code2",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-500",
  },
  {
    title: "Intégration IA & Automatisation",
    description: "Optimisation de vos flux de travail grâce à l'intégration d'agents intelligents et d'outils d'IA.",
    iconName: "Cpu",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    title: "Solutions Web Modernes",
    description: "Création de sites rapides, responsifs et optimisés pour le SEO avec les dernières technologies.",
    iconName: "Globe2",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Conseil & Amélioration",
    description: "Audit technique et amélioration de projets existants pour de meilleures performances.",
    iconName: "Sparkles",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
];

export const projects = [
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
