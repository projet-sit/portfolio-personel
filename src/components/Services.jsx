import { Code2, Cpu, Globe2, Sparkles } from "lucide-react";
import { services } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

// Importer uniquement les icônes utilisées évite d'inclure toute la bibliothèque dans le bundle.
const serviceIcons = { Code2, Cpu, Globe2, Sparkles };

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading>Comment je peux vous aider ?</SectionHeading>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.iconName];
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:border-cyan-500/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-500/30"
              >
                <div className={`absolute -right-4 -top-4 h-24 w-24 bg-gradient-to-br ${service.gradient} blur-2xl transition-transform group-hover:scale-150`} />
                
                <div className="relative z-10">
                  <div className={`mb-6 inline-flex rounded-2xl bg-slate-50 p-3 dark:bg-white/5 ${service.iconColor}`}>
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
