import { motion } from "framer-motion";

export default function Skills({ skillGroups }) {
  return (
    <section id="competences" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white"
          >
            Compétence
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
