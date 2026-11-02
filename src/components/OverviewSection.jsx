import { Landmark, Sofa, MapPin, Crown, BedDouble, Car, Flower2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/data/images";
import { Reveal } from "./Reveal";

const VALUES = [{ k: "v1", Icon: Landmark }, { k: "v2", Icon: Sofa }, { k: "v3", Icon: MapPin }];
const STATS = [{ k: "s1", Icon: Crown, v: "24" }, { k: "s2", Icon: BedDouble, v: "3" }, { k: "s3", Icon: Car, v: "1" }, { k: "s4", Icon: Flower2, v: "✓" }];

export const OverviewSection = () => {
  const { t } = useLang();
  return (
    <section id="overview" data-testid="overview-section" className="py-24 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <Reveal className="lg:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden aspect-[4/5] img-zoom">
            <img src={IMG.overviewDetail} alt="Architectural detail" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-10 bg-[#121212] text-[#FDFBF7] rounded-2xl px-7 py-6 max-w-[240px] shadow-2xl">
            <p className="font-display text-4xl text-[#C5A059]">Bintaro</p>
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 mt-1">Tangerang Selatan</p>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow"><span className="gold-line" />{t("overview.eyebrow")}</p></Reveal>
          <Reveal delay={100}><h2 className="font-display font-light mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">{t("overview.title")}</h2></Reveal>
          <Reveal delay={200}><p className="mt-7 text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl">{t("overview.body")}</p></Reveal>
          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            {VALUES.map(({ k, Icon }, i) => (
              <Reveal key={k} delay={250 + i * 120} data-testid={`overview-value-${k}`}>
                <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#B38F46]"><Icon size={20} strokeWidth={1.4} /></div>
                <h3 className="font-display text-2xl mt-5">{t(`overview.${k}`)}</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{t(`overview.${k}d`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-24 md:mt-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-[#C5A059]/25">
          {STATS.map(({ k, Icon, v }, i) => (
            <Reveal key={k} delay={i * 100} data-testid={`overview-stat-${k}`} className={`py-10 px-4 md:px-8 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "border-l" : ""} border-[#C5A059]/25`}>
              <Icon size={18} strokeWidth={1.4} className="text-[#B38F46]" />
              <p className="font-display text-5xl md:text-6xl font-light mt-4">{v}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mt-2">{t(`overview.${k}`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
