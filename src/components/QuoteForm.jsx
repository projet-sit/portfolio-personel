import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "../data/portfolio";

const fieldClassName = "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

export default function QuoteForm() {
  const [isPrepared, setIsPrepared] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (name) => formData.get(name)?.toString().trim() || "Non précisé";
    const subject = encodeURIComponent(`Demande de devis — ${value("company")}`);
    const body = encodeURIComponent([
      "Bonjour Ulrich,",
      "",
      "Je souhaite échanger au sujet du projet suivant :",
      `Nom : ${value("name")}`,
      `Email : ${value("email")}`,
      `Entreprise / projet : ${value("company")}`,
      `Budget envisagé : ${value("budget")}`,
      `Échéance souhaitée : ${value("deadline")}`,
      "",
      "Besoin :",
      value("details"),
    ].join("\n"));

    setIsPrepared(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form id="devis" className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-300">Demander un devis</p>
        <h3 className="mt-3 text-2xl font-extrabold text-white">Parlons de votre projet.</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">Quelques informations suffisent pour préparer un premier échange utile.</p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-200">
          Votre nom
          <input className={fieldClassName} name="name" autoComplete="name" required placeholder="Votre nom" />
        </label>
        <label className="text-sm font-bold text-slate-200">
          Email professionnel
          <input className={fieldClassName} name="email" type="email" autoComplete="email" required placeholder="vous@entreprise.com" />
        </label>
        <label className="text-sm font-bold text-slate-200">
          Entreprise ou projet
          <input className={fieldClassName} name="company" required placeholder="Nom du projet" />
        </label>
        <label className="text-sm font-bold text-slate-200">
          Budget indicatif
          <select className={fieldClassName} name="budget" defaultValue="À définir">
            <option>À définir</option>
            <option>Moins de 500 000 FCFA</option>
            <option>500 000 à 1 000 000 FCFA</option>
            <option>Plus de 1 000 000 FCFA</option>
          </select>
        </label>
        <label className="text-sm font-bold text-slate-200 sm:col-span-2">
          Échéance souhaitée
          <input className={fieldClassName} name="deadline" placeholder="Ex. dans les 2 prochains mois" />
        </label>
        <label className="text-sm font-bold text-slate-200 sm:col-span-2">
          Décrivez le besoin
          <textarea className={`${fieldClassName} min-h-32 resize-y`} name="details" required placeholder="Objectif, utilisateurs, fonctionnalités importantes…" />
        </label>
      </div>

      <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-extrabold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
        Préparer ma demande de devis <Send size={17} aria-hidden="true" />
      </button>
      {isPrepared && <p className="mt-4 text-center text-sm text-cyan-200" role="status">Votre application e-mail va s’ouvrir avec le brief prérempli.</p>}
    </form>
  );
}
