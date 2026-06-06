import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }) {
  return (
    <section id="projets" className="scroll-mt-24 bg-white py-12 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white"
          >
            Mes projets
          </motion.h2>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-[#0d1a2e]"
            >
              <div className="relative aspect-[3/1] overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-full items-center justify-center text-slate-400 transition-transform duration-500 group-hover:scale-110">
                   <span className="text-4xl font-black opacity-20">{project.name.charAt(0)}</span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${project.status === 'Terminé' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
                    {project.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-slate-900 backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-2xl font-bold text-slate-950 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                  {project.name}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    Voir sur github
                    <ExternalLink size={16} />
                  </a>
                  <span className="text-xs font-black uppercase tracking-tighter text-slate-300 dark:text-slate-700">
                    {project.year}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
