import { useState } from "react";
import axios from "axios";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/lib/i18n";
import { UNITS } from "@/data/units";
import { waLink } from "@/data/site";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

const API = "/api";
const BUDGETS = ["Rp 2 – 3 M", "Rp 3 – 4 M", "Rp 4 – 5 M", "> Rp 5 M"];
const TIMES = ["weekdayAM", "weekdayPM", "weekendAM", "weekendPM", "undecided"];
const EMPTY = { full_name: "", whatsapp: "", unit_type: "", budget: "", visit_time: "" };

const Field = ({ label, error, children, id }) => (
  <div>
    <label htmlFor={id} className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500 font-semibold mb-2">{label}</label>
    {children}
    {error && <p data-testid={`lead-error-${id}`} className="text-xs text-red-700 mt-1.5">{error}</p>}
  </div>
);

const inputCls = "w-full bg-transparent border-0 border-b border-black/15 rounded-none px-0 py-3 text-base focus:outline-none focus:border-[#C5A059] transition-colors";

const Picker = ({ id, value, onChange, options, placeholder }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger id={id} data-testid={`lead-${id}-select`} className="border-0 border-b border-black/15 rounded-none px-0 h-auto py-3 text-base shadow-none focus:ring-0 focus:border-[#C5A059] bg-transparent">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value} data-testid={`lead-${id}-option-${o.value.replace(/\W+/g, "-")}`}>{o.label}</SelectItem>)}</SelectContent>
  </Select>
);

export const LeadForm = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: typeof v === "string" ? v : v.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.full_name.trim().length < 2) e.full_name = t("contact.errName");
    if (!/^\+?[0-9][0-9\s-]{7,17}$/.test(form.whatsapp.trim())) e.whatsapp = t("contact.errWa");
    ["unit_type", "budget", "visit_time"].forEach((k) => { if (!form[k]) e[k] = t("contact.errSelect"); });
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    const payload = { ...form, full_name: form.full_name.trim(), whatsapp: form.whatsapp.trim(), lang };
    try {
      await axios.post(`${API}/leads`, payload);
      setStatus("success");
    } catch {
      try {
        const stored = JSON.parse(localStorage.getItem("ela_leads") || "[]");
        stored.unshift({ id: `lead-${Date.now()}`, created_at: new Date().toISOString(), ...payload });
        localStorage.setItem("ela_leads", JSON.stringify(stored));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
  };

  if (status === "success") {
    return (
      <div data-testid="lead-success" className="bg-white rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        <CheckCircle2 size={52} strokeWidth={1} className="mx-auto text-[#C5A059]" />
        <h3 className="font-display text-4xl mt-6">{t("contact.successTitle")}</h3>
        <p className="text-neutral-600 mt-4 max-w-md mx-auto">{t("contact.successBody")}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a data-testid="lead-success-wa-btn" href={waLink()} target="_blank" rel="noreferrer" className="btn-gold rounded-full px-7 py-3.5 text-[11px] tracking-[0.16em] uppercase font-semibold inline-flex items-center justify-center gap-2"><MessageCircle size={15} />{t("contact.waDirect")}</a>
          <button data-testid="lead-again-btn" onClick={() => { setForm(EMPTY); setStatus("idle"); }} className="rounded-full border border-black/15 px-7 py-3.5 text-[11px] tracking-[0.16em] uppercase font-semibold hover:border-[#C5A059]">{t("contact.again")}</button>
        </div>
      </div>
    );
  }

  return (
    <form data-testid="lead-form" onSubmit={submit} noValidate className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] grid sm:grid-cols-2 gap-x-8 gap-y-7">
      <div className="sm:col-span-2"><Field id="full_name" label={t("contact.name")} error={errors.full_name}><input id="full_name" data-testid="lead-name-input" value={form.full_name} onChange={set("full_name")} className={inputCls} placeholder="John Doe" /></Field></div>
      <div className="sm:col-span-2"><Field id="whatsapp" label={t("contact.wa")} error={errors.whatsapp}><input id="whatsapp" data-testid="lead-whatsapp-input" type="tel" value={form.whatsapp} onChange={set("whatsapp")} className={inputCls} placeholder="+62 812 0000 0000" /></Field></div>
      <Field id="unit_type" label={t("contact.unit")} error={errors.unit_type}><Picker id="unit_type" value={form.unit_type} onChange={set("unit_type")} placeholder={t("contact.select")} options={UNITS.map((u) => ({ value: u.name, label: u.name }))} /></Field>
      <Field id="budget" label={t("contact.budget")} error={errors.budget}><Picker id="budget" value={form.budget} onChange={set("budget")} placeholder={t("contact.select")} options={BUDGETS.map((b) => ({ value: b, label: b }))} /></Field>
      <div className="sm:col-span-2"><Field id="visit_time" label={t("contact.time")} error={errors.visit_time}><Picker id="visit_time" value={form.visit_time} onChange={set("visit_time")} placeholder={t("contact.select")} options={TIMES.map((k) => ({ value: k, label: t(`contact.${k}`) }))} /></Field></div>
      {status === "error" && <p data-testid="lead-submit-error" className="sm:col-span-2 text-sm text-red-700">{t("contact.errSubmit")}</p>}
      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
        <button data-testid="lead-submit-btn" type="submit" disabled={status === "loading"} className="flex-1 btn-dark rounded-full px-7 py-4 text-[12px] tracking-[0.16em] uppercase font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {status === "loading" ? <><Loader2 size={16} className="animate-spin" />{t("contact.sending")}</> : t("contact.submit")}
        </button>
        <a data-testid="lead-wa-direct-btn" href={waLink()} target="_blank" rel="noreferrer" className="flex-1 btn-gold rounded-full px-7 py-4 text-[12px] tracking-[0.16em] uppercase font-semibold inline-flex items-center justify-center gap-2"><MessageCircle size={16} />{t("contact.waDirect")}</a>
      </div>
    </form>
  );
};

export const ContactSection = () => {
  const { t } = useLang();
  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-36 bg-[#F4EFEA]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow"><span className="gold-line" />{t("contact.eyebrow")}</p></Reveal>
          <Reveal delay={100}><h2 className="font-display font-light mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">{t("contact.title")}</h2></Reveal>
          <Reveal delay={200}><p className="mt-7 text-neutral-600 leading-relaxed">{t("contact.body")}</p></Reveal>
          <Reveal delay={250}><p data-testid="contact-managed-by" className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#121212] text-[#FDFBF7] px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase"><span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />{t("contact.managed")}</p></Reveal>
          <Reveal delay={300} className="mt-10"><p className="eyebrow mb-5">{t("contact.connect")}</p><SocialLinks prefix="contact" /></Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-7"><LeadForm /></Reveal>
      </div>
    </section>
  );
};
