import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { navigation, profile } from "../data/portfolio";

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
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-controls="navigation-mobile"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
          <div
            id="navigation-mobile"
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
              <a
                href={profile.cvUrl}
                download
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3 py-4 text-base font-bold text-white transition-colors hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <Download size={18} aria-hidden="true" /> Télécharger mon CV
              </a>
            </div>
          </div>
      )}
    </header>
  );
}
