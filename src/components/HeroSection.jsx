import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/data/images";

export const HeroSection = () => {
  const { t } = useLang();
  const bg = useRef(null);
  useEffect(() => {
    const onScroll = () => { if (bg.current) bg.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0) scale(1.08)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section data-testid="hero-section" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#121212] grain">
      <div ref={bg} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.08)" }}>
        <img src={IMG.hero} alt="EL AVANTGARDE facade" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-20 md:pb-28">
        <div data-testid="hero-badge" className="hero-in inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/90" style={{ animationDelay: "150ms" }}>
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#C5A059] hotspot-ring" /><span className="relative h-2 w-2 rounded-full bg-[#C5A059]" /></span>
          {t("hero.badge")}
        </div>
        <h1 data-testid="hero-title" className="hero-in font-display font-light text-white mt-8 max-w-4xl text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight" style={{ animationDelay: "300ms" }}>
          {t("hero.title")}
        </h1>
        <p className="hero-in mt-7 max-w-xl text-white/75 text-base md:text-lg leading-relaxed" style={{ animationDelay: "500ms" }}>{t("hero.sub")}</p>
        <div className="hero-in mt-10 flex flex-wrap gap-4" style={{ animationDelay: "700ms" }}>
          <a href="#residence" data-testid="hero-explore-btn" className="btn-gold rounded-full px-8 py-4 text-[12px] tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3">
            {t("hero.explore")} <ArrowRight size={16} />
          </a>
          <a href="#contact" data-testid="hero-visit-btn" className="btn-ghost-light rounded-full px-8 py-4 text-[12px] tracking-[0.18em] uppercase font-semibold">
            {t("hero.visit")}
          </a>
        </div>
      </div>
      <div className="absolute right-8 bottom-10 z-10 hidden md:flex flex-col items-center gap-3 text-white/60 text-[10px] tracking-[0.3em] uppercase">
        <span className="[writing-mode:vertical-rl]">{t("hero.scroll")}</span>
        <span className="w-px h-10 bg-white/30 relative overflow-hidden"><span className="absolute top-0 left-0 w-px h-3 bg-[#C5A059] scroll-dot" /></span>
      </div>
    </section>
  );
};
