export const PillFilter = ({ options, value, onChange, label, dark = false, testPrefix }) => (
  <div className="flex flex-wrap gap-2" role="tablist">
    {options.map((o) => {
      const active = o === value;
      return (
        <button key={o} role="tab" aria-selected={active} data-testid={`${testPrefix}-${o}`} onClick={() => onChange(o)}
          className={`rounded-full px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase font-semibold border transition-colors duration-300 ${
            active ? "bg-[#C5A059] border-[#C5A059] text-[#121212]"
              : dark ? "border-white/15 text-white/70 hover:border-white/40 hover:text-white" : "border-black/10 text-neutral-600 hover:border-[#C5A059] hover:text-[#121212]"}`}>
          {label(o)}
        </button>
      );
    })}
  </div>
);

export const UnitFilter = ({ value, onChange, options, t }) => (
  <PillFilter options={options} value={value} onChange={onChange} label={(o) => t(`residence.${o}`)} testPrefix="unit-filter" />
);
