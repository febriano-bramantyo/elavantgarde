import { BedDouble, Bath, Car, Maximize, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/data/site";

const STATUS_STYLE = {
  available: "bg-emerald-50 text-emerald-800 border-emerald-200",
  reserved: "bg-amber-50 text-amber-800 border-amber-200",
  sold: "bg-neutral-900 text-white border-neutral-900",
};

export const StatusBadge = ({ status }) => {
  const { t } = useLang();
  return (
    <span data-testid={`unit-status-${status}`} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] tracking-[0.18em] uppercase font-semibold ${STATUS_STYLE[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />{t(`residence.${status}`)}
    </span>
  );
};

export const enquireLink = (unit) => waLink(`Hello, I'm interested in EL AVANTGARDE — ${unit.name} and would like to schedule a private tour.`);

export const UnitCard = ({ unit, onDetails }) => {
  const { t, tr } = useLang();
  return (
    <article data-testid={`unit-card-${unit.id}`} className="group bg-white rounded-2xl overflow-hidden card-soft flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden img-zoom">
        <img src={unit.image} alt={unit.name} className={`w-full h-full object-cover ${unit.status === "sold" ? "grayscale-[40%]" : ""}`} />
        <div className="absolute top-4 left-4"><StatusBadge status={unit.status} /></div>
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h3 className="font-display text-3xl">{unit.name}</h3>
        <p className="text-sm text-neutral-500 mt-1">{tr(unit.tagline)}</p>
        <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-neutral-700">
          <span className="flex items-center gap-2"><Maximize size={15} className="text-[#B38F46]" />LB {unit.building} m²</span>
          <span className="flex items-center gap-2"><Maximize size={15} className="text-[#B38F46] rotate-45" />LT {unit.land} m²</span>
          <span className="flex items-center gap-2"><BedDouble size={15} className="text-[#B38F46]" />{unit.bedrooms} {t("residence.beds")}</span>
          <span className="flex items-center gap-2"><Bath size={15} className="text-[#B38F46]" />{unit.bathrooms} {t("residence.baths")}</span>
          <span className="flex items-center gap-2"><Car size={15} className="text-[#B38F46]" />{t("residence.carport")}</span>
        </div>
        <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
          <button data-testid={`unit-details-btn-${unit.id}`} onClick={() => onDetails(unit)} className="flex-1 btn-dark rounded-full px-5 py-3 text-[11px] tracking-[0.16em] uppercase font-semibold">
            {t("residence.details")}
          </button>
          <a data-testid={`unit-wa-btn-${unit.id}`} href={enquireLink(unit)} target="_blank" rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#121212]/15 px-5 py-3 text-[11px] tracking-[0.12em] uppercase font-semibold hover:border-[#C5A059] hover:text-[#B38F46] transition-colors duration-300">
            <MessageCircle size={14} />{t("residence.enquire")}
          </a>
        </div>
      </div>
    </article>
  );
};
