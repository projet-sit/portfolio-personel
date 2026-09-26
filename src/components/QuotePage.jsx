import { ArrowLeft, CheckCircle2 } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function QuotePage() {
  return (
    <main className="relative z-10 min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-300 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
          <ArrowLeft size={17} aria-hidden="true" /> Retour au portfolio
        </a>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-300">Demande de devis</p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Donnez vie à votre prochain projet.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">Décrivez votre besoin en quelques minutes. Votre message sera préparé avec toutes les informations utiles pour démarrer la conversation.</p>

            <ul className="mt-10 space-y-4 text-sm leading-relaxed text-slate-300">
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-cyan-400" size={19} aria-hidden="true" />Projet web, application métier ou amélioration d'un produit existant.</li>
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-cyan-400" size={19} aria-hidden="true" />Brief structuré pour éviter les échanges imprécis.</li>
              <li className="flex gap-3"><CheckCircle2 className="shrink-0 text-cyan-400" size={19} aria-hidden="true" />Aucune donnée enregistrée par le site.</li>
            </ul>
          </div>

          <QuoteForm />
        </div>
      </div>
    </main>
  );
}
