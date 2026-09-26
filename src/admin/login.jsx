import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { LockKeyhole, LogIn } from "lucide-react";
import "../index.css";

function csrfHeaders() {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("portfolio_admin_csrf="))
    ?.split("=")[1];
  return token ? { "X-CSRF-Token": token } : {};
}

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...csrfHeaders() },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.replace("/admin");
        return;
      }

      const payload = await response.json().catch(() => ({}));
      setStatus({
        type: "error",
        message: payload.message || "Connexion impossible. Réessayez plus tard.",
      });
    } catch {
      setStatus({ type: "error", message: "Erreur réseau. Vérifiez votre connexion." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#08111f] px-4 py-12 text-white">
      <section aria-labelledby="login-title" className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl sm:p-10">
        <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
          <LockKeyhole aria-hidden="true" size={24} />
        </div>
        <h1 id="login-title" className="text-2xl font-extrabold">Administration</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">Connectez-vous pour consulter les données privées du portfolio.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin-username" className="mb-2 block text-sm font-bold text-slate-200">Identifiant</label>
            <input id="admin-username" name="username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-bold text-slate-200">Mot de passe</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
          </div>
          <p aria-live="polite" className={status.type === "error" ? "min-h-5 text-sm text-rose-300" : "min-h-5 text-sm text-slate-400"}>{status.message}</p>
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
            <LogIn aria-hidden="true" size={18} /> {isSubmitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><LoginPage /></StrictMode>);
