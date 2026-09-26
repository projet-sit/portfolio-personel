import { skillGroups } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Skills() {
  return (
    <section id="competences" className="content-section scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><SectionHeading>Compétences</SectionHeading></Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 90}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/20 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-cyan-50 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-cyan-400/15"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
