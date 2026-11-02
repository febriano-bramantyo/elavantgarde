import { useState } from "react";
import { GraduationCap, ShoppingBag, HeartPulse, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { NEARBY, NEARBY_CATEGORIES } from "@/data/content";
import { SITE } from "@/data/site";
import { SectionHeading, Reveal } from "./Reveal";
import { PillFilter } from "./UnitFilter";

const CAT_ICON = { education: GraduationCap, lifestyle: ShoppingBag, healthcare: HeartPulse };

export const LocationMap = () => {
  const { t } = useLang();
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? NEARBY : NEARBY.filter((n) => n.category === cat);
  return (
    <section id="location" data-testid="location-section" className="py-24 md:py-36 bg-[#F4EFEA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t("location.eyebrow")} title={t("location.title")} sub={t("location.sub")} />
          <Reveal delay={120} className="mt-10"><PillFilter options={NEARBY_CATEGORIES} value={cat} onChange={setCat} label={(o) => t(`location.${o}`)} testPrefix="location-filter" /></Reveal>
          <ul className="mt-8 divide-y divide-[#C5A059]/25 border-y border-[#C5A059]/25">
            {list.map((n) => {
              const Icon = CAT_ICON[n.category];
              return (
                <li key={n.name} data-testid={`nearby-${n.name.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center justify-between py-5 gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#B38F46] transition-colors duration-300 group-hover:bg-[#121212] group-hover:text-[#C5A059]"><Icon size={16} strokeWidth={1.5} /></span>
                    <div><p className="font-medium">{n.name}</p><p className="text-[10px] tracking-[0.18em] uppercase text-neutral-500">{t(`location.${n.category}`)}</p></div>
                  </div>
                  <span className="flex items-center gap-1.5 font-display text-2xl whitespace-nowrap"><Clock size={14} className="text-[#B38F46]" />{n.minutes}<span className="text-xs font-sans text-neutral-500">{t("location.minutes")}</span></span>
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal delay={200} className="lg:col-span-7">
          <div className="rounded-3xl overflow-hidden h-[420px] lg:h-full min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-8 border-white">
            <iframe data-testid="location-map-iframe" title="Map Bintaro" src={SITE.mapEmbed} className="w-full h-full grayscale-[60%] contrast-[1.05]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
