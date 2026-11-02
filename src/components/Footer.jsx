import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { SocialLinks } from "./SocialLinks";

const LINKS = ["overview", "residence", "facilities", "location", "gallery", "contact"];

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer data-testid="footer" className="bg-[#121212] text-white pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-5">
            <p data-testid="footer-logo" className="font-display text-3xl md:text-4xl tracking-[0.28em]">EL AVANTGARDE</p>
            <p className="mt-4 text-white/60 max-w-sm">{t("footer.tagline")}</p>
            
            <div className="mt-10 space-y-6">
              <div>
                <p className="eyebrow eyebrow-dark">OFFICE CENTER</p>
                <p data-testid="footer-office-center" className="mt-3 text-white/70 text-sm max-w-sm leading-relaxed">{SITE.officeCenter}</p>
              </div>
              
              <div>
                <p className="eyebrow eyebrow-dark">BRANCH OFFICE</p>
                <p data-testid="footer-branch-office" className="mt-3 text-white/70 text-sm max-w-sm leading-relaxed">{SITE.branchOffice}</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow eyebrow-dark mb-5">{t("footer.explore")}</p>
            <ul className="space-y-3 text-sm">
              {LINKS.map((k) => <li key={k}><a href={`/#${k}`} data-testid={`footer-${k}-link`} className="text-white/70 hover:text-[#C5A059] transition-colors">{t(`nav.${k}`)}</a></li>)}
              <li><Link to="/interior-design" data-testid="footer-interior-link" className="text-white/70 hover:text-[#C5A059] transition-colors">{t("nav.interior")}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow eyebrow-dark mb-5">{t("footer.follow")}</p>
            <SocialLinks dark prefix="footer" />
          </div>
        </div>
        <p data-testid="footer-disclaimer" className="mt-10 text-[11px] text-white/40 leading-relaxed max-w-3xl">{t("footer.disclaimer")}</p>
        <p className="mt-4 text-xs text-white/50">© {new Date().getFullYear()} EL AVANTGARDE · {t("contact.managed")}. {t("footer.rights")}</p>
      </div>
    </footer>
  );
};
