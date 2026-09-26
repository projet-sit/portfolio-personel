import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CheckCircle2, FolderKanban, LogOut, TimerReset } from "lucide-react";
import "../index.css";

function csrfHeaders() {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("portfolio_admin_csrf="))
    ?.split("=")[1];
  return token ? { "X-CSRF-Token": token } : {};
}

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/overview", { credentials: "same-origin" })
      .then(async (response) => {
        if (response.status === 401) {
          window.location.replace("/admin/login");
          return null;
        }
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((payload) => payload && setOverview(payload))
      .catch(() => setError("Les données privées sont temporairement indisponibles."));
  }, []);

  async function logout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", headers: csrfHeaders(), credentials: "same-origin" });
    } finally {
      window.location.replace("/admin/login");
    }
  }

  const stats = overview ? [
    { label: "Projets", value: overview.stats.totalProjects, icon: FolderKanban },
    { label: "Terminés", value: overview.stats.completedProjects, icon: CheckCircle2 },
    { label: "En cours", value: overview.stats.inProgressProjects, icon: TimerReset },
  ] : [];

  return (
    <main className="min-h-screen bg-[#08111f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Espace privé</p>
            <h1 className="mt-2 text-3xl font-extrabold">Tableau de bord</h1>
            <p className="mt-2 text-slate-400">Vue d’ensemble des projets publiés sur le portfolio.</p>
          </div>
          <button type="button" onClick={logout} disabled={isLoggingOut} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold transition hover:border-rose-400 hover:text-rose-300 disabled:opacity-60">
            <LogOut aria-hidden="true" size={18} /> {isLoggingOut ? "Déconnexion…" : "Se déconnecter"}
          </button>
        </header>

        {error && <p role="alert" className="mt-8 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">{error}</p>}
        {!overview && !error && <p aria-live="polite" className="mt-8 text-slate-400">Chargement des données…</p>}

        {overview && <>
          <section aria-label="Statistiques des projets" className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><Icon aria-hidden="true" className="text-cyan-400" size={22} /><p className="mt-6 text-3xl font-extrabold">{value}</p><p className="mt-1 text-sm text-slate-400">{label}</p></article>)}
          </section>
          <section aria-labelledby="projects-heading" className="mt-10">
            <h2 id="projects-heading" className="text-xl font-extrabold">Projets publiés</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-white/[0.04] text-slate-300"><tr><th scope="col" className="px-5 py-4 font-bold">Projet</th><th scope="col" className="px-5 py-4 font-bold">Statut</th><th scope="col" className="px-5 py-4 font-bold">Année</th><th scope="col" className="px-5 py-4 font-bold">Technologies</th></tr></thead><tbody className="divide-y divide-white/10">{overview.projects.map((project) => <tr key={project.name}><td className="px-5 py-4 font-bold">{project.name}</td><td className="px-5 py-4 text-slate-300">{project.status}</td><td className="px-5 py-4 text-slate-400">{project.year}</td><td className="px-5 py-4 text-slate-400">{project.technologies.join(", ")}</td></tr>)}</tbody></table></div>
            </div>
          </section>
        </>}
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><Dashboard /></StrictMode>);
