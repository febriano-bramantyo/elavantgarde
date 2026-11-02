import { IMG } from "./images";

export const PORTFOLIO = [
  {
    id: "mr-at-palu",
    title: "Mr. AT",
    location: "Palu, Sulawesi Tengah",
    image: "/portfolio/mr-at-palu.jpg",
    category: { en: "Private Residence", id: "Residensi Pribadi" },
    desc: {
      en: "A grand white neoclassical residence with fluted Corinthian columns, ornate cornices and a sculptural crown chandelier welcoming guests under the porte-cochère.",
      id: "Residensi neoklasik putih yang megah dengan kolom Korintia berulir, cornice ornamental, dan lampu gantung mahkota yang menyambut tamu di porte-cochère.",
    },
  },
  {
    id: "hotel-tara",
    title: "Hotel Tara",
    location: "Hospitality Project",
    image: "/portfolio/hotel-tara.jpg",
    category: { en: "Hospitality Interior", id: "Interior Hospitality" },
    desc: {
      en: "Lobby, guest rooms and restaurant composed with warm walnut coffers, layered cove lighting and polished stone — calm luxury for every guest.",
      id: "Lobi, kamar tamu, dan restoran dirancang dengan plafon kayu walnut, pencahayaan cove berlapis, dan lantai batu mengilap — kemewahan yang menenangkan.",
    },
  },
  {
    id: "rumah-adat",
    title: "Rumah Adat",
    location: "Contemporary Vernacular",
    image: "/portfolio/rumah-adat.jpg",
    category: { en: "Architecture", id: "Arsitektur" },
    desc: {
      en: "A crisp black gable roof over pure white walls, framed by a stone garden wall and terracotta breeze blocks — heritage reinterpreted for modern living.",
      id: "Atap pelana hitam di atas dinding putih bersih, dibingkai pagar batu dan roster terakota — warisan tradisi yang ditafsir ulang untuk hidup modern.",
    },
  },
  {
    id: "interior-kitchen",
    title: "Interior Design",
    location: "Kitchen & Living",
    image: "/portfolio/interior-kitchen.jpg",
    category: { en: "Residential Interior", id: "Interior Residensial" },
    desc: {
      en: "A waterfall marble island beneath woven rattan pendants, dark timber cabinetry and textured concrete walls — an open plan made for gathering.",
      id: "Island marmer waterfall di bawah lampu rotan anyaman, kabinet kayu gelap, dan dinding beton bertekstur — ruang terbuka untuk berkumpul.",
    },
  },
];

export const SIGNATURE = [
  { src: IMG.dining, title: { en: "The Grand Dining", id: "Ruang Makan Agung" }, tall: false },
  { src: IMG.lounge, title: { en: "Double-Height Lounge", id: "Lounge Dua Lantai" }, tall: true },
  { src: IMG.bath, title: { en: "Marble Sanctuary", id: "Kamar Mandi Marmer" }, tall: true },
  { src: IMG.study, title: { en: "The Private Library", id: "Perpustakaan Pribadi" }, tall: false },
  { src: IMG.foyer, title: { en: "Checkerboard Foyer", id: "Foyer Papan Catur" }, tall: false },
  { src: IMG.stairs, title: { en: "Sculpted Staircase", id: "Tangga Lengkung" }, tall: true },
];

export const PROCESS = [
  { n: "01", title: { en: "Discovery", id: "Konsultasi" }, desc: { en: "We listen to how you live, host and rest.", id: "Kami mendengar cara Anda hidup, menjamu, dan beristirahat." } },
  { n: "02", title: { en: "Concept & 3D", id: "Konsep & 3D" }, desc: { en: "Moodboards, layouts and photoreal renders.", id: "Moodboard, layout, dan render fotorealistis." } },
  { n: "03", title: { en: "Curation", id: "Kurasi Material" }, desc: { en: "Stone, timber, brass and fabric hand-selected.", id: "Batu, kayu, kuningan, dan kain dipilih langsung." } },
  { n: "04", title: { en: "Build & Style", id: "Eksekusi & Styling" }, desc: { en: "Craftsmen execute; we style to the last cushion.", id: "Pengrajin mengeksekusi; kami menata hingga detail terakhir." } },
];
