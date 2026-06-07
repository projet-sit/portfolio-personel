import { motion } from "framer-motion";

const variants = {
  primary: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-lg",
  outline: "border-2 border-slate-200 text-slate-900 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400 dark:hover:text-cyan-400",
  ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
  cyan: "bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-500/20",
};

export default function Button({ children, variant = "primary", className = "", href, ...props }) {
  const Component = href ? motion.a : motion.button;
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-300";
  
  return (
    <Component
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
