export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-amber-500/10 text-amber-500",
    outline: "border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400",
    tech: "bg-white/90 text-slate-900 backdrop-blur-md dark:bg-slate-800/90 dark:text-white",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
