import { useEffect } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Lightbox, useLightbox } from "@/components/GalleryLightbox";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/data/images";
import { PORTFOLIO, SIGNATURE, PROCESS } from "@/data/portfolio";
import { waLink } from "@/data/site";

const IDHero = () => {
  const { t } = useLang();
  return (
    <section data-testid="interior-hero" className="relative min-h-[100svh] bg-[#121212] text-white overflow-hidden grain">
      <img src={IMG.dining} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-black/30" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 min-h-[100svh] flex flex-col justify-end pb-20">
        <p className="hero-in eyebrow eyebrow-dark" style={{ animationDelay: "150ms" }}><span className="gold-line" />{t("interior.eyebrow")}</p>
        <h1 data-testid="interior-title" className="hero-in font-display font-light mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight" style={{ animationDelay: "300ms" }}>{t("interior.title")}</h1>
        <p className="hero-in mt-7 max-w-2xl text-white/75 text-base md:text-lg" style={{ animationDelay: "500ms" }}>{t("interior.sub")}</p>
        <div className="hero-in mt-14 grid grid-cols-3 max-w-xl border-t border-white/15 pt-8" style={{ animationDelay: "700ms" }}>
          {[["120+", "stat1"], ["15", "stat2"], ["40", "stat3"]].map(([v, k]) => (
            <div key={k}><p className="font-display text-4xl md:text-5xl text-[#C5A059]">{v}</p><p className="text-[10px] tracking-[0.18em] uppercase text-white/60 mt-1">{t(`interior.${k}`)}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
};

const USP = () => {
  const { t } = useLang();
  return (
    <section className="py-24 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6"><SectionHeading eyebrow={t("interior.usp")} title={t("interior.uspTitle")} sub={t("interior.uspBody")} /></div>
        <Reveal delay={150} className="lg:col-span-6 grid grid-cols-2 gap-4">
          <img src={IMG.lounge} alt="" className="rounded-3xl aspect-[3/4] object-cover w-full translate-y-10" />
          <img src={IMG.bath} alt="" className="rounded-3xl aspect-[3/4] object-cover w-full" />
        </Reveal>
      </div>
    </section>
  );
};

const PortfolioItem = ({ p, i, onOpen }) => {
  const { t, tr } = useLang();
  const flip = i % 2 === 1;
  return (
    <article data-testid={`portfolio-item-${p.id}`} className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <button data-testid={`portfolio-open-${p.id}`} onClick={onOpen} className="group block w-full rounded-[2rem] overflow-hidden img-zoom relative">
          <img src={p.image} alt={p.title} className="w-full aspect-[4/3] object-cover" />
          <span className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 text-[#121212] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"><ArrowUpRight size={18} /></span>
        </button>
      </Reveal>
      <Reveal delay={150} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-display text-7xl text-[#C5A059]/40 leading-none">0{i + 1}</p>
        <p className="eyebrow mt-4">{tr(p.category)}</p>
        <h3 className="font-display text-4xl md:text-5xl font-light mt-3">{p.title}</h3>
        <p className="text-sm tracking-[0.12em] uppercase text-neutral-500 mt-2">{p.location}</p>
        <p className="mt-6 text-neutral-600 leading-relaxed">{tr(p.desc)}</p>
        <button onClick={onOpen} data-testid={`portfolio-view-${p.id}`} className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold border-b border-[#C5A059] pb-1 hover:text-[#B38F46] transition-colors">{t("interior.view")}<ArrowUpRight size={14} /></button>
      </Reveal>
    </article>
  );
};

const Portfolio = () => {
  const { t } = useLang();
  const items = PORTFOLIO.map((p) => ({ src: p.image }));
  const lb = useLightbox(items);
  return (
    <section data-testid="portfolio-section" className="py-24 md:py-36 bg-[#F4EFEA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow={t("interior.portfolio")} title={t("interior.portfolioTitle")} />
        <div className="mt-20 space-y-24 md:space-y-36">{PORTFOLIO.map((p, i) => <PortfolioItem key={p.id} p={p} i={i} onOpen={() => lb.open(i)} />)}</div>
      </div>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onNav={lb.nav} />
    </section>
  );
};

const Signature = () => {
  const { t, tr } = useLang();
  const lb = useLightbox(SIGNATURE);
  return (
    <section data-testid="signature-section" className="py-24 md:py-36 bg-[#121212] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading dark eyebrow={t("interior.signature")} title={t("interior.signatureTitle")} sub={t("interior.signatureNote")} />
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5">
          {SIGNATURE.map((s, i) => (
            <button key={s.src} data-testid={`signature-item-${i}`} onClick={() => lb.open(i)} className="group relative mb-5 block w-full break-inside-avoid rounded-2xl overflow-hidden img-zoom">
              <img src={s.src} alt={tr(s.title)} loading="lazy" className={`w-full object-cover ${s.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-5 left-5 font-display text-2xl">{tr(s.title)}</p>
            </button>
          ))}
        </div>
      </div>
      <Lightbox items={SIGNATURE} index={lb.index} onClose={lb.close} onNav={lb.nav} />
    </section>
  );
};

const Process = () => {
  const { t, tr } = useLang();
  return (
    <section className="py-24 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow={t("interior.process")} title={t("interior.processTitle")} />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="border-t border-[#C5A059]/40 pt-8">
              <p className="font-display text-5xl text-[#C5A059]">{p.n}</p>
              <h3 className="font-display text-2xl mt-4">{tr(p.title)}</h3>
              <p className="text-sm text-neutral-600 mt-2">{tr(p.desc)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-24 rounded-[2rem] bg-[#F4EFEA] p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <h3 className="font-display font-light text-4xl md:text-5xl max-w-2xl leading-tight">{t("interior.ctaTitle")}</h3>
          <a data-testid="interior-cta-wa-btn" href={waLink("Hello, I'm interested in Avantgarde Jouzujuro interior design services for EL AVANTGARDE.")} target="_blank" rel="noreferrer" className="btn-dark rounded-full px-8 py-4 text-[12px] tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 sm:whitespace-nowrap"><MessageCircle size={16} />{t("interior.ctaBtn")}</a>
        </Reveal>
      </div>
    </section>
  );
};

export default function InteriorDesign() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main data-testid="interior-page">
      <Navbar />
      <IDHero />
      <USP />
      <Portfolio />
      <Signature />
      <Process />
      <Footer />
    </main>
  );
}
