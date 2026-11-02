export const SITE = {
  whatsappNumber: "6281228076685",
  whatsappDisplay: "+62 812-2807-6685",
  email: "jouzujuroavantgarde@gmail.com",
  instagram: "elavantgarde.design",
  tiktok: "avantgarde.property",
  office: "Marketing Gallery EL AVANTGARDE, Jl. Bintaro Utama (placeholder), Bintaro, Tangerang Selatan, Banten",
  officeCenter: "Jl. Perkici Raya Blok EB2 No.16 Jurang Mangu Timur, Pondok Aren, Tangerang Selatan 15222",
  branchOffice: "Citra Pesona Tembalang, B12, Jabungan Kec. Banyumanik, Kota Semarang Jawa Tengah 50266",
  mapEmbed: "https://www.google.com/maps?q=Bintaro%2C%20Tangerang%20Selatan&z=13&output=embed",
};

export const DEFAULT_WA_MESSAGE =
  "Hello, I'm interested in EL AVANTGARDE and would like to schedule a private tour.";

export const waLink = (message = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const SOCIALS = [
  { key: "instagram", label: "Instagram", handle: `@${SITE.instagram}`, href: `https://instagram.com/${SITE.instagram}` },
  { key: "tiktok", label: "TikTok", handle: `@${SITE.tiktok}`, href: `https://www.tiktok.com/@${SITE.tiktok}` },
  { key: "whatsapp", label: "WhatsApp", handle: SITE.whatsappDisplay, href: waLink() },
  { key: "email", label: "Email", handle: SITE.email, href: `mailto:${SITE.email}` },
];
