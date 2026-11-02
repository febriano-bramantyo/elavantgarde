import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { GALLERY, GALLERY_FILTERS } from "@/data/content";
import { SectionHeading, Reveal } from "./Reveal";
import { PillFilter } from "./UnitFilter";

export const Lightbox = ({ items, index, onClose, onNav }) => {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onNav(1); if (e.key === "ArrowLeft") onNav(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNav]);
  if (index === null) return null;
  return (
    <div data-testid="lightbox" className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12" onClick={onClose}>
      <img data-testid="lightbox-image" src={items[index].src} alt="" className="max-h-full max-w-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <button data-testid="lightbox-close-btn" onClick={onClose} className="absolute top-5 right-5 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"><X size={20} /></button>
      <button data-testid="lightbox-prev-btn" onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-3 md:left-8 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronLeft size={20} /></button>
      <button data-testid="lightbox-next-btn" onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-3 md:right-8 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronRight size={20} /></button>
      <p data-testid="lightbox-counter" className="absolute bottom-6 text-white/60 text-xs tracking-[0.3em]">{index + 1} / {items.length}</p>
    </div>
  );
};

export const useLightbox = (items) => {
  const [index, setIndex] = useState(null);
  const nav = (d) => setIndex((i) => (i + d + items.length) % items.length);
  return { index, open: setIndex, close: () => setIndex(null), nav };
};

export const GalleryLightbox = () => {
  const { t } = useLang();
  const [cat, setCat] = useState("all");
  const items = cat === "all" ? GALLERY : GALLERY.filter((g) => g.category === cat);
  const lb = useLightbox(items);
  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 md:py-36 bg-[#1A1A1A] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <SectionHeading dark eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />
          <Reveal delay={150}><PillFilter dark options={GALLERY_FILTERS} value={cat} onChange={setCat} label={(o) => t(`gallery.${o}`)} testPrefix="gallery-filter" /></Reveal>
        </div>
        <div data-testid="gallery-grid" className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((g, i) => (
            <button key={g.src} data-testid={`gallery-item-${i}`} onClick={() => lb.open(i)} className="group relative mb-5 block w-full break-inside-avoid rounded-2xl overflow-hidden img-zoom">
              <img src={g.src} alt={g.category} loading="lazy" className={`w-full object-cover ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end justify-between p-5">
                <span className="text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">{t(`gallery.${g.category}`)}</span>
                <Expand size={18} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#C5A059]" />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onNav={lb.nav} />
    </section>
  );
};
