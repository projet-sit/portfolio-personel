import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navigation } from "../data/portfolio";
import Button from "./ui/Button";

export default function Header() {
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
          ? "border-b border-white/10 bg-[#08111f]/80 backdrop-blur-xl"
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
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            href="/cv-ulrich-idohou.pdf"
            download
            variant="primary"
            className="hidden sm:flex px-5 py-2 text-xs"
          >
            <Download size={14} />
            CV
          </Button>

          <button
            className="md:hidden rounded-lg p-2 text-slate-300"
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
            className="md:hidden border-t border-white/10 bg-[#08111f]"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-4 text-base font-bold text-white hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button
                  href="/cv-ulrich-idohou.pdf"
                  download
                  variant="cyan"
                  className="w-full"
                >
                  <Download size={18} /> Télécharger mon CV
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
