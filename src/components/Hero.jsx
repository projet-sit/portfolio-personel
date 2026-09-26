import { ArrowRight } from "lucide-react";
import { profile } from "../data/portfolio";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section id="accueil" className="hero-section relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative z-10 max-w-4xl">
            <div>
              <p className="hero-reveal hero-delay-1 text-sm font-extrabold uppercase tracking-[0.24em] text-cyan-300 sm:text-base">
                {profile.title}
              </p>
              <h1 className="hero-reveal hero-delay-2 mt-6 text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                Bâtir des <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">solutions digitales</span> qui comptent.
              </h1>
              
              <p className="hero-reveal hero-delay-3 mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {profile.tagline} Spécialisé dans la création d'applications robustes et d'expériences utilisateurs fluides à l'aide de technologies modernes.
              </p>

              <div className="hero-reveal hero-delay-4 mt-10 flex flex-wrap justify-center gap-4">
                <Button href="#projets" variant="primary">
                  Mes réalisations
                  <ArrowRight size={18} />
                </Button>
                <Button href="/devis" variant="outline">
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
