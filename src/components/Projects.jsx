import { Github } from "lucide-react";
import { projects } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import Reveal from "./ui/Reveal";

export default function Projects() {
  return (
    <section id="projets" className="content-section content-section-elevated scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><SectionHeading>Mes projets</SectionHeading></Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.name}
              as="article"
              delay={index * 100}
              className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50/95 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-[#0d1a2e]/95"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={`Aperçu du projet ${project.name}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 opacity-60 transition-opacity group-hover:opacity-40" />
                
                {project.category && (
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-md border border-cyan-500/30 shadow-md">
                      {project.category}
                    </span>
                  </div>
                )}

                <div className="absolute top-5 right-5 z-10">
                  <Badge variant={project.status === 'Terminé' ? 'success' : 'warning'}>
                    {project.status}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-5 right-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-slate-950 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                  {project.name}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-8 flex items-center justify-between gap-4">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 transition-colors hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-400"
                    >
                      <Github size={18} aria-hidden="true" /> Voir le dépôt
                    </a>
                  )}
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    {project.year}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
