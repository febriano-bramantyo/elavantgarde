import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { TESTIMONIALS } from "@/data/content";
import { SectionHeading, Reveal } from "./Reveal";

export const TestimonialCard = ({ item, index }) => {
  const { tr } = useLang();
  const initials = item.name.split(/\s|&/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");
  return (
    <figure data-testid={`testimonial-card-${index}`} className="bg-white rounded-2xl p-8 md:p-10 card-soft h-full flex flex-col">
      <Quote size={28} className="text-[#C5A059]" strokeWidth={1.2} />
      <div className="flex gap-1 mt-5" data-testid={`testimonial-rating-${index}`}>
        {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={14} className="fill-[#C5A059] text-[#C5A059]" />)}
      </div>
      <blockquote className="font-display text-2xl leading-snug mt-5 flex-1">"{tr(item.quote)}"</blockquote>
      <figcaption className="flex items-center gap-4 mt-8 pt-6 border-t border-black/5">
        <span className="w-12 h-12 rounded-full bg-[#121212] text-[#C5A059] font-display text-lg flex items-center justify-center">{initials}</span>
        <div><p className="font-medium">{item.name}</p><p className="text-xs text-neutral-500">{tr(item.role)}</p></div>
      </figcaption>
    </figure>
  );
};

export const Testimonials = () => {
  const { t } = useLang();
  return (
    <section data-testid="testimonials-section" className="py-24 md:py-36 bg-[#FDFBF7]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => <Reveal key={item.name} delay={i * 120} className={i === 1 ? "md:translate-y-10" : ""}><TestimonialCard item={item} index={i} /></Reveal>)}
        </div>
      </div>
    </section>
  );
};
