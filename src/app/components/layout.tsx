import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  ArrowUpRight,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import logoUrl from "../../imports/image-24.png";
import { C } from "../lib/theme";
import { NAV_LINKS, WHATSAPP, PHONE_HREF, PHONE_DISPLAY, EMAIL, SERVICES } from "../lib/data";

// ─── Scroll restore em troca de rota (instant — sem animação p/ vertigem) ────

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);
  return null;
}

// ─── Nav ────────────────────────────────────────────────────────────────────

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div
        className={`max-w-7xl mx-auto pl-6 pr-3 h-[64px] flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled || open
            ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,23,59,0.08)]"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex-none" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="Synapse Reabilitação Neurofuncional" className="h-7" />
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[0.85rem] font-medium transition-colors relative group ${
                  isActive ? "text-[#02173B]" : "text-[#02173B]/65 hover:text-[#02173B]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#52D4FF] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#02173B] text-white text-[0.85rem] font-medium px-5 py-2.5 rounded-full hover:bg-[#52D4FF] hover:text-[#02173B] transition-all duration-300"
          >
            Agende agora
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-[#02173B]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-white/85 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(2,23,59,0.16)] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[#02173B] text-base font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#02173B] text-white px-5 py-3 rounded-full text-sm font-medium text-center"
          >
            Agende agora
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-20 pb-10" style={{ backgroundColor: C.navy }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 mb-16">
          <div>
            <img
              src={logoUrl}
              alt="Synapse"
              className="h-7 mb-5"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Cuidado especializado em Fonoaudiologia para crianças, adultos e
              idosos em Maceió, AL.
            </p>
          </div>

          <div>
            <div className="text-white/25 text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4">
              Serviços
            </div>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <Link to="/servicos" className="text-white/50 text-sm hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white/25 text-[0.7rem] font-semibold uppercase tracking-[0.16em] mb-4">
              Contato
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href={PHONE_HREF} className="text-white/50 text-sm hover:text-white transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-white/40 text-sm leading-relaxed">
                Av. Gov. Osman Loureiro, 49, Sl 6
                <br />
                Mangabeiras, Maceió — AL
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-white/25 text-xs">
            © {year} Synapse Reabilitação Neurofuncional. Todos os direitos reservados.
          </div>
          <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────

export function FloatingCTA() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agende agora via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 text-white px-5 py-3.5 rounded-full font-medium text-[0.875rem] hover:-translate-y-0.5 transition-all"
      style={{ backgroundColor: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.4)" }}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Agende agora</span>
    </a>
  );
}
