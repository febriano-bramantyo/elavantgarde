import { IMG } from "./images";

export const FACILITIES = [
  { id: "garden", icon: "Trees", image: IMG.centralGarden, span: "md:col-span-2 md:row-span-2",
    title: { en: "Central Garden", id: "Taman Sentral" },
    desc: { en: "A sculpted green heart for slow mornings and evening gatherings.", id: "Jantung hijau yang tertata untuk pagi santai dan kumpul sore." } },
  { id: "play", icon: "Baby", image: IMG.playground, span: "",
    title: { en: "Children's Play Area", id: "Area Bermain Anak" },
    desc: { en: "Safe, natural-material play for little ones.", id: "Area bermain aman berbahan alami untuk si kecil." } },
  { id: "path", icon: "Footprints", image: IMG.walkingPath, span: "",
    title: { en: "Walking Path", id: "Jalur Pejalan Kaki" },
    desc: { en: "Shaded stone paths woven through the cluster.", id: "Jalur batu teduh yang menyatu dengan cluster." } },
  { id: "secure", icon: "ShieldCheck", image: IMG.secureGate, span: "",
    title: { en: "Secure Cluster Access", id: "Akses Cluster Aman" },
    desc: { en: "One-gate system, 24/7 security and CCTV.", id: "Sistem satu gerbang, keamanan 24 jam dan CCTV." } },
  { id: "street", icon: "Lamp", image: IMG.streetscape, span: "md:col-span-2",
    title: { en: "Premium Streetscape", id: "Streetscape Premium" },
    desc: { en: "Tree-lined boulevards with classic lamp posts and hidden utilities.", id: "Jalan rindang dengan lampu klasik dan utilitas tersembunyi." } },
];

export const NEARBY = [
  { name: "Living Mall Bintaro", minutes: 5, category: "lifestyle" },
  { name: "Premier Bintaro Hospital", minutes: 10, category: "healthcare" },
  { name: "Pembangunan Jaya University", minutes: 10, category: "education" },
  { name: "Lotte Mart Bintaro", minutes: 10, category: "lifestyle" },
  { name: "Bintaro Plaza", minutes: 15, category: "lifestyle" },
  { name: "AEON Mall BSD", minutes: 15, category: "lifestyle" },
];

export const NEARBY_CATEGORIES = ["all", "education", "lifestyle", "healthcare"];

export const HOTSPOTS = [
  { id: "facade", image: IMG.hero, x: 30, y: 55, label: { en: "Facade", id: "Fasad" } },
  { id: "living", image: IMG.living, x: 55, y: 40, label: { en: "Living Room", id: "Ruang Keluarga" } },
  { id: "kitchen", image: IMG.kitchen, x: 72, y: 62, label: { en: "Kitchen", id: "Dapur" } },
  { id: "master", image: IMG.bedroom, x: 45, y: 70, label: { en: "Master Bedroom", id: "Kamar Utama" } },
  { id: "garden", image: IMG.terrace, x: 18, y: 35, label: { en: "Garden", id: "Taman" } },
];

// Replace with a virtual tour iframe URL (e.g. Matterport / Kuula) to embed a real 360 tour.
export const VIRTUAL_TOUR_IFRAME = "";

export const GALLERY = [
  { src: IMG.hero, category: "exterior", tall: false },
  { src: IMG.kitchen, category: "interior", tall: true },
  { src: IMG.column, category: "architecture", tall: true },
  { src: IMG.garden, category: "garden", tall: true },
  { src: IMG.night, category: "exterior", tall: false },
  { src: IMG.living, category: "interior", tall: false },
  { src: IMG.window, category: "architecture", tall: false },
  { src: IMG.terrace, category: "garden", tall: false },
  { src: IMG.stairs, category: "interior", tall: true },
  { src: IMG.gate, category: "architecture", tall: false },
  { src: IMG.champagne, category: "exterior", tall: false },
  { src: IMG.centralGarden, category: "garden", tall: false },
  { src: IMG.bedroom, category: "interior", tall: false },
  { src: IMG.overviewDetail, category: "architecture", tall: true },
];

export const GALLERY_FILTERS = ["all", "exterior", "interior", "garden", "architecture"];

export const TESTIMONIALS = [
  { name: "Rina Hartono", role: { en: "Future homeowner, The Ivory", id: "Calon pemilik, The Ivory" }, rating: 5,
    quote: { en: "The proportions, the light, the quiet street — it felt like home the moment we walked in.", id: "Proporsinya, cahayanya, jalannya yang tenang — langsung terasa seperti rumah sejak pertama masuk." } },
  { name: "Daniel Pratama", role: { en: "Homeowner, The Champagne", id: "Pemilik, The Champagne" }, rating: 5,
    quote: { en: "Detailing you rarely see at this scale. The interior team understood our taste perfectly.", id: "Detail yang jarang ditemui di skala ini. Tim interiornya sangat memahami selera kami." } },
  { name: "Maya & Arif", role: { en: "Young family, The Onyx", id: "Keluarga muda, The Onyx" }, rating: 5,
    quote: { en: "Close to everything in Bintaro, yet completely private. Our kids love the central garden.", id: "Dekat ke mana saja di Bintaro, namun tetap privat. Anak-anak kami suka taman sentralnya." } },
];
