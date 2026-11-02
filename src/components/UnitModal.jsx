import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { StatusBadge, enquireLink } from "./UnitCard";

const FloorPlan = ({ t, lang }) => {
  const L = lang === "id"
    ? { living: "Ruang Keluarga", kitchen: "Dapur", bed: "K. Tidur", master: "K. Utama", bath: "KM", carport: "Carport", garden: "Taman" }
    : { living: "Living", kitchen: "Kitchen", bed: "Bedroom", master: "Master", bath: "Bath", carport: "Carport", garden: "Garden" };
  const room = (x, y, w, h, label) => (
    <g><rect x={x} y={y} width={w} height={h} fill="#FDFBF7" stroke="#121212" strokeWidth="1.5" />
      <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#555" letterSpacing="1">{label.toUpperCase()}</text></g>
  );
  return (
    <svg data-testid="unit-floor-plan" viewBox="0 0 320 200" className="w-full h-auto bg-[#F4EFEA] rounded-xl p-3">
      {room(10, 10, 80, 70, L.carport)}{room(90, 10, 130, 100, L.living)}{room(220, 10, 90, 60, L.kitchen)}
      {room(220, 70, 90, 40, L.bath)}{room(10, 80, 80, 110, L.garden)}{room(90, 110, 80, 80, L.master)}
      {room(170, 110, 70, 80, L.bed)}{room(240, 110, 70, 80, L.bed)}
      <rect x="10" y="10" width="300" height="180" fill="none" stroke="#C5A059" strokeWidth="2.5" />
    </svg>
  );
};

export const UnitModal = ({ unit, onClose }) => {
  const { t, tr, lang } = useLang();
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
  }, [unit]);
  if (!unit) return null;
  const specs = [
    [t("residence.building"), `${unit.building} m²`], [t("residence.land"), `${unit.land} m²`],
    [t("residence.beds"), unit.bedrooms], [t("residence.baths"), unit.bathrooms],
    [t("residence.floors"), unit.floors], [t("residence.carport"), "1"],
  ];
  return (
    <Dialog open={!!unit} onOpenChange={(o) => !o && onClose()}>
      <DialogContent data-testid="unit-modal" className="max-w-5xl p-0 overflow-hidden bg-[#FDFBF7] border-0 rounded-2xl max-h-[92vh] overflow-y-auto">
        <div className="grid md:grid-cols-2">
          <div className="bg-[#121212] p-3">
            <img data-testid="unit-modal-main-image" src={unit.gallery[active]} alt={unit.name} className="w-full aspect-[4/3] object-cover rounded-xl" />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {unit.gallery.map((g, i) => (
                <button key={g} data-testid={`unit-modal-thumb-${i}`} onClick={() => setActive(i)} className={`rounded-lg overflow-hidden border-2 transition-colors ${i === active ? "border-[#C5A059]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={g} alt="" className="w-full aspect-[4/3] object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-7 md:p-9">
            <StatusBadge status={unit.status} />
            <DialogTitle className="font-display font-light text-4xl md:text-5xl mt-4">{unit.name}</DialogTitle>
            <DialogDescription className="text-neutral-600 mt-2">{tr(unit.tagline)}</DialogDescription>
            <p className="eyebrow mt-8">{t("residence.specs")}</p>
            <dl className="grid grid-cols-3 gap-4 mt-4">
              {specs.map(([k, v]) => (
                <div key={k} className="border-t border-[#C5A059]/30 pt-3"><dt className="text-[10px] tracking-[0.16em] uppercase text-neutral-500">{k}</dt><dd className="font-display text-2xl mt-1">{v}</dd></div>
              ))}
            </dl>
            <p className="eyebrow mt-8 mb-3">{t("residence.plan")}</p>
            <FloorPlan t={t} lang={lang} />
            <a data-testid="unit-modal-wa-btn" href={enquireLink(unit)} target="_blank" rel="noreferrer" className="mt-7 w-full btn-gold rounded-full px-6 py-4 text-[12px] tracking-[0.16em] uppercase font-semibold inline-flex items-center justify-center gap-2">
              <MessageCircle size={16} />{t("residence.enquire")}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
