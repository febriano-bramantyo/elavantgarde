import { Trees, Baby, Footprints, ShieldCheck, Lamp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { FACILITIES } from "@/data/content";
import { SectionHeading, Reveal } from "./Reveal";

const ICONS = { Trees, Baby, Footprints, ShieldCheck, Lamp };

export const FacilityCard = ({ f }) => {
  const { tr } = useLang();
  const Icon = ICONS[f.icon];
  return (
    <div data-testid={`facility-card-${f.id}`} className="group relative h-full min-h-[280px] rounded-3xl overflow-hidden img-zoom">
      <img src={f.image} alt={tr(f.title)} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white"><Icon size={18} strokeWidth={1.5} /></div>
      <div className="absolute bottom-0 p-6 md:p-8">
        <h3 className="font-display text-3xl text-white">{tr(f.title)}</h3>
        <p className="text-sm text-white/75 mt-2 max-w-sm translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500">{tr(f.desc)}</p>
      </div>
    </div>
  );
};

export const FacilitiesSection = () => {
  const { t } = useLang();
  return (
    <section id="facilities" data-testid="facilities-section" className="py-24 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow={t("facilities.eyebrow")} title={t("facilities.title")} />
        <div className="mt-16 grid md:grid-cols-4 md:auto-rows-[300px] gap-5">
          {FACILITIES.map((f, i) => <Reveal key={f.id} delay={i * 90} className={f.span}><FacilityCard f={f} /></Reveal>)}
        </div>
      </div>
    </section>
  );
};
