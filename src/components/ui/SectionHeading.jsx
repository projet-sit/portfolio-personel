import { motion } from "framer-motion";

export default function SectionHeading({ children, subtitle, centered = true }) {
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"}`}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
