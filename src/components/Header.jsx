import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download, Menu, X } from "lucide-react";

const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
];

export default function Header({ isDark, setIsDark, profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#08111f]/80"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item, index) => (
            <motion.a
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Changer de thème"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/cv-ulrich-idohou.pdf"
            download
            className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:flex"
          >
            <Download size={14} />
            CV
          </motion.a>

          <button
            className="md:hidden rounded-lg p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#08111f]"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-4 text-base font-bold text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="/cv-ulrich-idohou.pdf"
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-4 text-sm font-bold text-white"
                >
                  <Download size={18} /> Télécharger mon CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
