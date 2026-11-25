import { useState } from "react";
import { Send } from "lucide-react";

const fieldClassName = "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const request = Object.fromEntries(new FormData(form).entries());

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("L’envoi du formulaire est momentanément indisponible. Contactez-moi directement par e-mail.");
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Le serveur a renvoyé une réponse invalide. Contactez-moi directement par e-mail.");
      }

      if (!response.ok) {
        throw new Error(result.error || "L’envoi a échoué. Réessayez dans un instant.");
      }

      form.reset();
      setStatus({ type: "success", message: "Merci ! Votre demande de devis a bien été envoyée. Je vous répondrai rapidement." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Impossible d’envoyer votre demande. Vérifiez votre connexion et réessayez." });
    } finally {
      setIsSubmitting(false);
    }
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
          <input className={fieldClassName} name="budget" inputMode="decimal" placeholder="Ex. 450 000 FCFA ou une fourchette" />
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

      <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-extrabold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-70">
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande de devis"} <Send size={17} aria-hidden="true" />
      </button>
      {status && (
        <p className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${status.type === "success" ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100" : "border-rose-400/30 bg-rose-400/10 text-rose-100"}`} role={status.type === "error" ? "alert" : "status"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
