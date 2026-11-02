import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { UNITS, UNIT_FILTERS, applyUnitFilter } from "@/data/units";
import { SectionHeading, Reveal } from "./Reveal";
import { UnitCard } from "./UnitCard";
import { UnitFilter } from "./UnitFilter";
import { UnitModal } from "./UnitModal";

export const ResidenceSection = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const list = applyUnitFilter(UNITS, filter);
  return (
    <section id="residence" data-testid="residence-section" className="py-24 md:py-36 bg-[#F4EFEA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <SectionHeading eyebrow={t("residence.eyebrow")} title={t("residence.title")} sub={t("residence.sub")} />
          <Reveal delay={150}><UnitFilter value={filter} onChange={setFilter} options={UNIT_FILTERS} t={t} /></Reveal>
        </div>
        <div data-testid="unit-grid" className="mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {list.map((u, i) => <Reveal key={`${filter}-${u.id}`} delay={i * 90}><UnitCard unit={u} onDetails={setSelected} /></Reveal>)}
        </div>
        {list.length === 0 && <p data-testid="unit-empty" className="mt-10 text-neutral-500">{t("residence.empty")}</p>}
      </div>
      <UnitModal unit={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
