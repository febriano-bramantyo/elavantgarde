import { useEffect, useRef, useState } from "react";

export const Reveal = ({ children, delay = 0, className = "", as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
};

export const SectionHeading = ({ eyebrow, title, sub, dark = false, className = "" }) => (
  <Reveal className={className}>
    <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}><span className="gold-line" />{eyebrow}</p>
    <h2 className={`font-display font-light mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight ${dark ? "text-[#FDFBF7]" : "text-[#121212]"}`}>
      {title}
    </h2>
    {sub && <p className={`mt-5 max-w-xl text-base md:text-lg ${dark ? "text-white/60" : "text-neutral-600"}`}>{sub}</p>}
  </Reveal>
);
