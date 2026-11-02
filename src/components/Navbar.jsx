import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/data/site";

const LINKS = ["overview", "residence", "facilities", "location", "gallery", "interior", "contact"];

export const LangToggle = ({ light }) => {
  const { lang, setLang } = useLang();
  return (
    <div data-testid="lang-toggle" className={`flex items-center rounded-full border text-[11px] font-semibold tracking-widest ${light ? "border-white/30" : "border-black/15"}`}>
      {["id", "en"].map((l) => (
        <button key={l} data-testid={`lang-${l}-btn`} onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-full uppercase transition-colors duration-300 ${lang === l ? "bg-[#C5A059] text-[#121212]" : light ? "text-white/70 hover:text-white" : "text-neutral-500 hover:text-black"}`}>
          {l}
        </button>
      ))}
    </div>
  );
};

const linkHref = (key, onHome) => (key === "interior" ? "/interior-design" : onHome ? `#${key}` : `/#${key}`);

export const Navbar = () => {
  const { t } = useLang();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const NavLink = ({ k, mobile }) => {
    const cls = mobile ? "block py-3 font-display text-3xl text-[#121212]" :
      `text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${solid ? "text-neutral-700 hover:text-[#B38F46]" : "text-white/80 hover:text-white"} ${pathname === "/interior-design" && k === "interior" ? "!text-[#C5A059]" : ""}`;
    const href = linkHref(k, onHome);
    const props = { "data-testid": `nav-${k}-link${mobile ? "-mobile" : ""}`, className: cls, onClick: () => setOpen(false) };
    return href.startsWith("#") ? <a href={href} {...props}>{t(`nav.${k}`)}</a> : <Link to={href} {...props}>{t(`nav.${k}`)}</Link>;
  };

  return (
    <header data-testid="navbar" className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${solid ? "bg-[#FDFBF7]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-0.5" : "bg-transparent py-1"}`}>
      <div className="max-w-[1600px] mx-auto px-1 sm:px-2 lg:px-4 flex items-center justify-between gap-3 sm:gap-6">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/logo.png" 
            alt="EL AVANTGARDE Logo" 
            className="h-12 sm:h-14 md:h-16 w-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className={`min-w-0 truncate font-display text-base sm:text-2xl tracking-[0.14em] sm:tracking-[0.28em] font-medium whitespace-nowrap ${solid ? "text-[#121212]" : "text-white"}`}>
            EL AVANTGARDE
          </span>
        </Link>
        <nav className="hidden xl:flex items-center gap-7">{LINKS.map((k) => <NavLink key={k} k={k} />)}</nav>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LangToggle light={!solid} />
          <a href={waLink()} target="_blank" rel="noreferrer" data-testid="nav-cta-btn"
            className={`hidden md:inline-flex rounded-full px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase font-semibold ${solid ? "btn-dark" : "btn-gold"}`}>
            {t("nav.cta")}
          </a>
          <button data-testid="nav-mobile-toggle" onClick={() => setOpen(!open)} className={`xl:hidden p-2 ${solid ? "text-[#121212]" : "text-white"}`} aria-label="menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div data-testid="nav-mobile-menu" className="xl:hidden px-6 pt-6 pb-10 bg-[#FDFBF7] border-t border-black/5">
          {LINKS.map((k) => <NavLink key={k} k={k} mobile />)}
          <a href={waLink()} target="_blank" rel="noreferrer" className="mt-6 inline-flex btn-dark rounded-full px-6 py-3 text-xs tracking-[0.14em] uppercase" data-testid="nav-cta-btn-mobile">{t("nav.cta")}</a>
        </div>
      )}
    </header>
  );
};
