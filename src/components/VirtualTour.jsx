import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Rotate3d, Move } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { HOTSPOTS, VIRTUAL_TOUR_IFRAME } from "@/data/content";
import { SectionHeading, Reveal } from "./Reveal";

const Panorama = ({ image }) => {
  const [pos, setPos] = useState(50);
  const drag = useRef(null);
  const start = (x) => { drag.current = { x, pos }; };
  const move = (x) => { if (drag.current) setPos(Math.min(100, Math.max(0, drag.current.pos - (x - drag.current.x) / 8))); };
  return (
    <div data-testid="tour-panorama" className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "max(130%, 180vh) auto", backgroundRepeat: "no-repeat", backgroundColor: "#000", backgroundPosition: `${pos}% 50%`, transition: drag.current ? "none" : "background-position .4s" }}
      onMouseDown={(e) => start(e.clientX)} onMouseMove={(e) => move(e.clientX)} onMouseUp={() => (drag.current = null)} onMouseLeave={() => (drag.current = null)}
      onTouchStart={(e) => start(e.touches[0].clientX)} onTouchMove={(e) => move(e.touches[0].clientX)} onTouchEnd={() => (drag.current = null)} />
  );
};

export const VirtualTour = () => {
  const { t, tr } = useLang();
  const [active, setActive] = useState(HOTSPOTS[0]);
  const [open, setOpen] = useState(false);
  return (
    <section id="tour" data-testid="virtual-tour-section" className="relative py-24 md:py-36 bg-[#121212] text-white grain overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <SectionHeading dark eyebrow={t("tour.eyebrow")} title={t("tour.title")} sub={t("tour.sub")} />
          <Reveal delay={150}>
            <button data-testid="tour-launch-btn" onClick={() => setOpen(true)} className="btn-gold rounded-full px-8 py-4 text-[12px] tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3">
              <Rotate3d size={18} />{t("tour.launch")}
            </button>
          </Reveal>
        </div>
        <Reveal delay={200} className="mt-14">
          <div data-testid="tour-viewer" className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] border border-white/10">
            <div key={active.id} className="absolute inset-0 slow-pan" style={{ backgroundImage: `url(${active.image})`, backgroundSize: "cover", animationName: "slow-pan" }} />
            <div className="absolute inset-0 bg-black/30" />
            {HOTSPOTS.map((h) => (
              <button key={h.id} data-testid={`tour-hotspot-${h.id}`} onClick={() => setActive(h)} style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2">
                <span className="relative flex w-5 h-5">
                  <span className="absolute inset-0 rounded-full bg-[#C5A059] hotspot-ring" />
                  <span className={`relative w-5 h-5 rounded-full border-2 border-white ${active.id === h.id ? "bg-[#C5A059]" : "bg-white/30 backdrop-blur"}`} />
                </span>
                <span className={`hidden sm:inline rounded-full px-3 py-1 text-[10px] tracking-[0.16em] uppercase backdrop-blur-md transition-opacity ${active.id === h.id ? "bg-white text-[#121212]" : "bg-black/50 opacity-0 group-hover:opacity-100"}`}>{tr(h.label)}</span>
              </button>
            ))}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-wrap gap-2">
              {HOTSPOTS.map((h) => (
                <button key={h.id} data-testid={`tour-tab-${h.id}`} onClick={() => setActive(h)}
                  className={`rounded-full px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase border transition-colors duration-300 ${active.id === h.id ? "bg-[#C5A059] border-[#C5A059] text-[#121212]" : "border-white/25 text-white/80 hover:bg-white/10"}`}>
                  {tr(h.label)}
                </button>
              ))}
            </div>
            <div className="absolute top-5 left-5 rounded-full bg-black/50 backdrop-blur-md px-4 py-2 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"><Rotate3d size={14} className="text-[#C5A059]" />360° · {tr(active.label)}</div>
          </div>
        </Reveal>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="tour-modal" className="max-w-[95vw] w-[95vw] h-[85vh] p-0 bg-black border-white/10 overflow-hidden">
          <DialogTitle className="sr-only">{t("tour.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("tour.drag")}</DialogDescription>
          {VIRTUAL_TOUR_IFRAME ? <iframe title="360 tour" src={VIRTUAL_TOUR_IFRAME} className="w-full h-full" allowFullScreen /> : <Panorama image={active.image} />}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 px-4">
            {HOTSPOTS.map((h) => (
              <button key={h.id} data-testid={`tour-modal-tab-${h.id}`} onClick={() => setActive(h)} className={`rounded-full px-4 py-2 text-[10px] tracking-[0.16em] uppercase border backdrop-blur-md ${active.id === h.id ? "bg-[#C5A059] border-[#C5A059] text-[#121212]" : "border-white/25 text-white bg-black/40"}`}>{tr(h.label)}</button>
            ))}
          </div>
          <div className="absolute top-5 left-5 text-white/80 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 bg-black/50 rounded-full px-4 py-2"><Move size={14} />{t("tour.drag")}</div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
