import { CheckCircle2, Layers3, MessagesSquare, Sparkles } from "lucide-react";
import { approachPoints } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const icons = { Layers3, MessagesSquare, Sparkles };

export default function Approach() {
  return (
    <section id="approche" className="content-section content-section-elevated scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading subtitle="Des choix techniques utiles, une communication claire et une attention constante à l'expérience finale.">
            Un développeur qui relie <span className="text-cyan-400">produit</span> et technique.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {approachPoints.map((point, index) => {
            const Icon = icons[point.iconName];

            return (
              <Reveal key={point.title} delay={index * 100} className="h-full">
                <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                  <div className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-white">{point.title}</h3>
                  <p className="mt-4 leading-relaxed text-slate-400">{point.description}</p>
                  <p className="mt-6 flex items-start gap-2 text-sm font-semibold text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-400" size={17} aria-hidden="true" />
                    {point.outcome}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
