import { motion } from "framer-motion";
import { Code2, Cpu, Globe2, Sparkles } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Développement Full Stack",
      description: "Conception d'applications web complètes de l'architecture base de données à l'interface utilisateur.",
      icon: <Code2 className="text-cyan-500" size={32} />,
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Intégration IA & Automatisation",
      description: "Optimisation de vos flux de travail grâce à l'intégration d'agents intelligents et d'outils d'IA.",
      icon: <Cpu className="text-purple-500" size={32} />,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Solutions Web Modernes",
      description: "Création de sites rapides, responsifs et optimisés pour le SEO avec les dernières technologies.",
      icon: <Globe2 className="text-green-500" size={32} />,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Conseil & Amélioration",
      description: "Audit technique et amélioration de projets existants pour de meilleures performances.",
      icon: <Sparkles className="text-amber-500" size={32} />,
      gradient: "from-amber-500/20 to-orange-500/20",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white"
          >
            Comment je peux vous aider ?
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-colors hover:border-cyan-500/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-500/30"
            >
              <div className={`absolute -right-4 -top-4 h-24 w-24 bg-gradient-to-br ${service.gradient} blur-2xl transition-transform group-hover:scale-150`} />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
