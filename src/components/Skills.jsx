import { skillGroups } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

export default function Skills() {
  return (
    <section id="competences" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>Compétences</SectionHeading>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-transform hover:scale-105 dark:bg-white/10 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
