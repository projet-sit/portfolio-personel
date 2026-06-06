import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, MapPin, Phone } from "lucide-react";

export default function Contact({ profile }) {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 px-8 py-16 dark:bg-white/[0.03] sm:px-16 lg:py-24">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-5xl font-extrabold tracking-tight text-white"
              >
                Travaillons <span className="text-cyan-400">ensemble.</span>
              </motion.h2 >
              <p className="mt-8 text-xl leading-relaxed text-slate-400">
                Vous avez un projet en tête ? Je suis toujours ouvert à de nouvelles opportunités et collaborations créatives.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              <motion.a
                whileHover={{ y: -5, scale: 1.02 }}
                href={`mailto:${profile.email}`}
                className="flex flex-col items-center justify-center rounded-[2rem] bg-white/5 p-10 text-center transition-colors hover:bg-white/10"
              >
                <div className="mb-6 rounded-2xl bg-cyan-500/20 p-4 text-cyan-400">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">Email</h3>
                <p className="mt-2 text-sm text-slate-400">{profile.email}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-cyan-400">
                  Envoyer un message <Send size={14} />
                </div>
              </motion.a>

              <motion.a
                whileHover={{ y: -5, scale: 1.02 }}
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center rounded-[2rem] bg-white/5 p-10 text-center transition-colors hover:bg-white/10"
              >
                <div className="mb-6 rounded-2xl bg-green-500/20 p-4 text-green-400">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">WhatsApp</h3>
                <p className="mt-2 text-sm text-slate-400">{profile.whatsapp}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-green-400">
                  Démarrer la discussion <Send size={14} />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
