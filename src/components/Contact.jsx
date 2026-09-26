import { Mail, MessageCircle, Send } from "lucide-react";
import { profile } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import QuoteForm from "./QuoteForm";

export default function Contact() {
  return (
    <section id="contact" className="content-section scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 px-8 py-16 dark:bg-white/[0.03] sm:px-16 lg:py-24">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

          <Reveal className="relative z-10">
            <SectionHeading centered={true}>
              Travaillons <span className="text-cyan-400">ensemble.</span>
            </SectionHeading>
            
            <p className="mt-8 text-center text-xl leading-relaxed text-slate-400 max-w-2xl mx-auto">
              Une idée, une amélioration à réaliser ou un produit à construire ? Décrivez votre besoin et faisons le premier pas.
            </p>

            <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.35fr_0.65fr]">
              <QuoteForm />
              <aside className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.035] p-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-300">Un échange efficace</p>
                <h3 className="mt-4 text-2xl font-extrabold text-white">Allons à l'essentiel.</h3>
                <ol className="mt-7 space-y-5 text-sm leading-relaxed text-slate-400">
                  <li><span className="mr-3 font-extrabold text-cyan-300">01</span>Présentez votre objectif et vos priorités.</li>
                  <li><span className="mr-3 font-extrabold text-cyan-300">02</span>Le brief arrive prérempli dans votre e-mail.</li>
                  <li><span className="mr-3 font-extrabold text-cyan-300">03</span>Nous définissons ensemble la suite adaptée à votre projet.</li>
                </ol>
              </aside>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Écrire à ${profile.email}`}
                className="flex flex-row items-center justify-start gap-5 rounded-[2rem] bg-white/5 p-6 text-left transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="rounded-2xl bg-cyan-500/20 p-4 text-cyan-400">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-cyan-400">
                    Envoyer un message <Send size={14} />
                  </div>
                </div>
              </a>

              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Démarrer une discussion WhatsApp avec Ulrich Merveil"
                className="flex flex-row items-center justify-start gap-5 rounded-[2rem] bg-white/5 p-6 text-left transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                <div className="rounded-2xl bg-green-500/20 p-4 text-green-400">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">WhatsApp</h3>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-green-400">
                    Démarrer la discussion <Send size={14} />
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
