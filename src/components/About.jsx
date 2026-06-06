import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function About({ profile }) {
  return (
    <section id="apropos" className="scroll-mt-24 py-24 bg-white dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Photo de profil */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border-8 border-slate-100 bg-white shadow-2xl dark:border-white/5 dark:bg-slate-800">
              <img
                src="/profile.jpg"
                alt={profile.name}
                className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
            
            {/* Effet décoratif en arrière-plan */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-2xl bg-cyan-500/10 blur-2xl dark:bg-cyan-500/20" />
          </motion.div>

          {/* Contenu textuel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl dark:text-white">
              Passionné par la tech, <br /> tourné vers <span className="text-cyan-500">l'impact.</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                Je suis {profile.name}, un développeur passionné basé à {profile.location}. 
                Mon parcours est guidé par une curiosité insatiable pour les nouvelles technologies 
                et une volonté constante de créer de la valeur à travers le code.
              </p>
              <p>
                Au-delà de l'écriture de scripts, je m'efforce de comprendre les enjeux métier 
                pour proposer des solutions qui ne sont pas seulement élégantes techniquement, 
                mais aussi redoutablement efficaces pour l'utilisateur final.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
