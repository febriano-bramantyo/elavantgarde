import { Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import { SOCIALS } from "@/data/site";

const ICONS = { instagram: Instagram, tiktok: Music2, whatsapp: MessageCircle, email: Mail };

export const SocialLinks = ({ dark = false, prefix }) => (
  <ul className="space-y-3">
    {SOCIALS.map((s) => {
      const Icon = ICONS[s.key];
      return (
        <li key={s.key}>
          <a data-testid={`${prefix}-${s.key}-link`} href={s.href} target="_blank" rel="noreferrer"
            className={`group inline-flex items-center gap-3 text-sm transition-colors duration-300 ${dark ? "text-white/70 hover:text-[#C5A059]" : "text-neutral-700 hover:text-[#B38F46]"}`}>
            <span className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${dark ? "border-white/15 group-hover:border-[#C5A059]" : "border-black/10 group-hover:border-[#C5A059]"}`}><Icon size={15} strokeWidth={1.5} /></span>
            <span><span className="block text-[10px] tracking-[0.2em] uppercase opacity-60">{s.label}</span>{s.handle}</span>
          </a>
        </li>
      );
    })}
  </ul>
);
