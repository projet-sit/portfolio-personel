import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, ArrowRight } from "lucide-react";

export default function Hero({ profile }) {
  return (
    <section id="accueil" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/20" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                Bâtir des <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">solutions digitales</span> qui comptent.
              </h1>
              
              <p className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {profile.tagline} Spécialisé dans la création d'applications robustes et d'expériences utilisateurs fluides à l'aide de technologies modernes.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projets"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-8 py-4 text-sm font-bold text-white shadow-2xl transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  Mes réalisations
                  <ArrowRight size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-400"
                >
                  Me contacter
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
