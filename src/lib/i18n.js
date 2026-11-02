import { createContext, useContext, useEffect, useState, createElement } from "react";

const DICT = {
  nav: {
    overview: { en: "Overview", id: "Ikhtisar" },
    residence: { en: "Residence", id: "Hunian" },
    facilities: { en: "Facilities", id: "Fasilitas" },
    location: { en: "Location", id: "Lokasi" },
    gallery: { en: "Gallery", id: "Galeri" },
    interior: { en: "Interior Design", id: "Desain Interior" },
    contact: { en: "Contact", id: "Kontak" },
    cta: { en: "Book a Private Tour", id: "Jadwalkan Private Tour" },
  },
  hero: {
    badge: { en: "Now Open for Limited Units", id: "Kini Dibuka untuk Unit Terbatas" },
    title: { en: "Where Timeless Design Meets Modern Living", id: "Di Mana Desain Abadi Bertemu Hidup Modern" },
    sub: {
      en: "An exclusive cluster of modern classic residences in Bintaro, South Tangerang — crafted architecture, curated interiors and effortless connectivity.",
      id: "Cluster eksklusif hunian modern classic di Bintaro, Tangerang Selatan — arsitektur yang dirancang cermat, interior terkurasi, dan akses yang mudah.",
    },
    explore: { en: "Explore Residences", id: "Jelajahi Hunian" },
    visit: { en: "Schedule a Visit", id: "Jadwalkan Kunjungan" },
    scroll: { en: "Scroll", id: "Gulir" },
  },
  overview: {
    eyebrow: { en: "The Concept", id: "Konsep" },
    title: { en: "A private address shaped by proportion, light and craft.", id: "Alamat privat yang dibentuk oleh proporsi, cahaya, dan keahlian." },
    body: {
      en: "EL AVANTGARDE is a boutique cluster where neoclassical detailing meets clean contemporary living. Every facade, molding and window is drawn to age gracefully — homes designed not for a season, but for generations.",
      id: "EL AVANTGARDE adalah cluster butik tempat detail neoklasik bertemu gaya hidup kontemporer. Setiap fasad, molding, dan jendela dirancang untuk menua dengan anggun — rumah yang dibuat bukan untuk satu musim, melainkan untuk generasi.",
    },
    v1: { en: "Timeless Architecture", id: "Arsitektur Abadi" },
    v1d: { en: "Symmetry, cornices and tall windows that never go out of style.", id: "Simetri, cornice, dan jendela tinggi yang tak lekang waktu." },
    v2: { en: "Curated Interiors", id: "Interior Terkurasi" },
    v2d: { en: "Designed with our in-house interior studio, Avantgarde Jouzujuro.", id: "Dirancang bersama studio interior kami, Avantgarde Jouzujuro." },
    v3: { en: "Prime Connectivity", id: "Konektivitas Utama" },
    v3d: { en: "Minutes from malls, hospitals, universities and toll access.", id: "Hanya beberapa menit ke mal, rumah sakit, kampus, dan akses tol." },
    s1: { en: "Limited Exclusive Units", id: "Unit Eksklusif Terbatas" },
    s2: { en: "3 Bedrooms", id: "3 Kamar Tidur" },
    s3: { en: "Private Carport", id: "Carport Pribadi" },
    s4: { en: "Premium Garden", id: "Taman Premium" },
  },
  residence: {
    eyebrow: { en: "Residences", id: "Hunian" },
    title: { en: "Choose Your Signature Home", id: "Pilih Rumah Signature Anda" },
    sub: { en: "Four distinct characters. One uncompromising standard.", id: "Empat karakter berbeda. Satu standar tanpa kompromi." },
    all: { en: "All Units", id: "Semua Unit" },
    available: { en: "Available", id: "Tersedia" },
    bedrooms3: { en: "3 Bedrooms", id: "3 Kamar Tidur" },
    largest: { en: "Largest Land Area", id: "Tanah Terluas" },
    reserved: { en: "Reserved", id: "Dipesan" },
    sold: { en: "Sold", id: "Terjual" },
    building: { en: "Building", id: "Bangunan" },
    land: { en: "Land", id: "Tanah" },
    beds: { en: "Bedrooms", id: "Kamar Tidur" },
    baths: { en: "Bathrooms", id: "Kamar Mandi" },
    carport: { en: "Carport", id: "Carport" },
    floors: { en: "Floors", id: "Lantai" },
    details: { en: "View Details", id: "Lihat Detail" },
    enquire: { en: "Enquire via WhatsApp", id: "Tanya via WhatsApp" },
    specs: { en: "Specifications", id: "Spesifikasi" },
    plan: { en: "Floor Plan", id: "Denah" },
    status: { en: "Status", id: "Status" },
    empty: { en: "No units match this filter.", id: "Tidak ada unit yang sesuai filter." },
  },
  facilities: {
    eyebrow: { en: "Facilities", id: "Fasilitas" },
    title: { en: "Designed for Everyday Luxury", id: "Dirancang untuk Kemewahan Sehari-hari" },
  },
  location: {
    eyebrow: { en: "Location", id: "Lokasi" },
    title: { en: "Connected to What Matters", id: "Terhubung dengan yang Terpenting" },
    sub: { en: "Bintaro, South Tangerang — a mature, green township with everything within reach.", id: "Bintaro, Tangerang Selatan — kawasan hijau yang matang dengan semua kebutuhan dalam jangkauan." },
    all: { en: "All", id: "Semua" },
    education: { en: "Education", id: "Pendidikan" },
    lifestyle: { en: "Lifestyle", id: "Gaya Hidup" },
    healthcare: { en: "Healthcare", id: "Kesehatan" },
    minutes: { en: "minutes", id: "menit" },
  },
  tour: {
    eyebrow: { en: "Virtual Experience", id: "Pengalaman Virtual" },
    title: { en: "Step Inside Before You Visit", id: "Masuki Rumah Sebelum Berkunjung" },
    sub: { en: "Explore every room in 360°. Select a hotspot or launch the full experience.", id: "Jelajahi setiap ruangan dalam 360°. Pilih hotspot atau buka pengalaman penuh." },
    launch: { en: "Launch 360 Experience", id: "Buka Pengalaman 360" },
    drag: { en: "Drag to look around", id: "Geser untuk melihat sekeliling" },
  },
  gallery: {
    eyebrow: { en: "Gallery", id: "Galeri" },
    title: { en: "A Study in Light & Detail", id: "Studi Cahaya & Detail" },
    all: { en: "All", id: "Semua" },
    exterior: { en: "Exterior", id: "Eksterior" },
    interior: { en: "Interior", id: "Interior" },
    garden: { en: "Garden", id: "Taman" },
    architecture: { en: "Architecture", id: "Arsitektur" },
  },
  testimonials: {
    eyebrow: { en: "Testimonials", id: "Testimoni" },
    title: { en: "Words from Our Residents", id: "Kata Mereka" },
  },
  contact: {
    eyebrow: { en: "Private Tour", id: "Private Tour" },
    title: { en: "Reserve Your Place at Avantgarde Jouzujuro", id: "Amankan Tempat Anda di Avantgarde Jouzujuro" },
    body: {
      en: "EL AVANTGARDE is developed and managed by Avantgarde Jouzujuro — an architecture and interior design house devoted to timeless, livable luxury. Leave your details and our consultant will arrange a private viewing.",
      id: "EL AVANTGARDE dikembangkan dan dikelola oleh Avantgarde Jouzujuro — studio arsitektur dan desain interior yang berdedikasi pada kemewahan abadi yang nyaman ditinggali. Tinggalkan data Anda dan konsultan kami akan mengatur kunjungan privat.",
    },
    managed: { en: "Managed by Avantgarde Jouzujuro", id: "Dikelola oleh Avantgarde Jouzujuro" },
    name: { en: "Full Name", id: "Nama Lengkap" },
    wa: { en: "WhatsApp Number", id: "Nomor WhatsApp" },
    unit: { en: "Preferred Unit Type", id: "Tipe Unit Pilihan" },
    budget: { en: "Estimated Budget", id: "Estimasi Budget" },
    time: { en: "Preferred Visit Time", id: "Waktu Kunjungan" },
    select: { en: "Select", id: "Pilih" },
    submit: { en: "Request Private Tour", id: "Ajukan Private Tour" },
    sending: { en: "Sending...", id: "Mengirim..." },
    waDirect: { en: "Chat on WhatsApp", id: "Chat via WhatsApp" },
    errName: { en: "Please enter your full name.", id: "Mohon isi nama lengkap Anda." },
    errWa: { en: "Enter a valid WhatsApp number (8–15 digits).", id: "Masukkan nomor WhatsApp yang valid (8–15 digit)." },
    errSelect: { en: "Please choose an option.", id: "Mohon pilih salah satu." },
    errSubmit: { en: "Something went wrong. Please try again or contact us on WhatsApp.", id: "Terjadi kesalahan. Coba lagi atau hubungi kami via WhatsApp." },
    successTitle: { en: "Thank you, your place is noted.", id: "Terima kasih, tempat Anda telah kami catat." },
    successBody: { en: "Our private consultant will reach you on WhatsApp within 24 hours to confirm your visit.", id: "Konsultan kami akan menghubungi Anda via WhatsApp dalam 24 jam untuk konfirmasi kunjungan." },
    again: { en: "Submit another request", id: "Kirim permintaan lain" },
    connect: { en: "Connect with us", id: "Terhubung dengan kami" },
    weekdayAM: { en: "Weekday — Morning", id: "Hari kerja — Pagi" },
    weekdayPM: { en: "Weekday — Afternoon", id: "Hari kerja — Siang/Sore" },
    weekendAM: { en: "Weekend — Morning", id: "Akhir pekan — Pagi" },
    weekendPM: { en: "Weekend — Afternoon", id: "Akhir pekan — Siang/Sore" },
    undecided: { en: "Not sure yet", id: "Belum menentukan" },
  },
  footer: {
    tagline: { en: "Timeless modern classic residences in Bintaro.", id: "Hunian modern classic yang abadi di Bintaro." },
    office: { en: "Marketing Office", id: "Kantor Pemasaran" },
    explore: { en: "Explore", id: "Jelajahi" },
    follow: { en: "Contact & Social", id: "Kontak & Sosial" },
    disclaimer: {
      en: "All visuals, renders and images are artistic illustrations and may differ from the final product. Specifications are subject to change without prior notice.",
      id: "Seluruh visual, render, dan gambar bersifat ilustrasi artistik dan dapat berbeda dengan produk akhir. Spesifikasi dapat berubah sewaktu-waktu tanpa pemberitahuan.",
    },
    rights: { en: "All rights reserved.", id: "Hak cipta dilindungi." },
  },
  interior: {
    eyebrow: { en: "Avantgarde Jouzujuro Interior Studio", id: "Studio Interior Avantgarde Jouzujuro" },
    title: { en: "Interiors That Become Heirlooms", id: "Interior yang Menjadi Warisan" },
    sub: {
      en: "Our signature advantage: every EL AVANTGARDE home can be finished by the same studio behind private residences, hotels and heritage-inspired homes across Indonesia.",
      id: "Keunggulan utama kami: setiap rumah EL AVANTGARDE dapat diselesaikan oleh studio yang sama di balik residensi pribadi, hotel, dan rumah bernuansa warisan di seluruh Indonesia.",
    },
    usp: { en: "Why it matters", id: "Mengapa ini penting" },
    uspTitle: { en: "Architecture and interior, conceived as one.", id: "Arsitektur dan interior, dirancang sebagai satu kesatuan." },
    uspBody: {
      en: "Most developers hand you an empty shell. We deliver a composed home — moldings aligned with furniture, lighting designed with the ceiling, materials chosen with the facade.",
      id: "Banyak pengembang hanya menyerahkan bangunan kosong. Kami menghadirkan rumah yang utuh — molding selaras dengan furnitur, pencahayaan dirancang bersama plafon, material dipilih seiring fasad.",
    },
    portfolio: { en: "Selected Portfolio", id: "Portofolio Pilihan" },
    portfolioTitle: { en: "Projects We Are Proud Of", id: "Proyek yang Kami Banggakan" },
    signature: { en: "Signature Collection", id: "Koleksi Signature" },
    signatureTitle: { en: "Imagined for EL AVANTGARDE", id: "Dibayangkan untuk EL AVANTGARDE" },
    signatureNote: { en: "Concept visualisations for EL AVANTGARDE interiors.", id: "Visualisasi konsep interior EL AVANTGARDE." },
    process: { en: "Our Process", id: "Proses Kami" },
    processTitle: { en: "From first sketch to final cushion.", id: "Dari sketsa pertama hingga bantal terakhir." },
    ctaTitle: { en: "Let us design the home you'll never want to leave.", id: "Biarkan kami merancang rumah yang tak ingin Anda tinggalkan." },
    ctaBtn: { en: "Consult an Interior Designer", id: "Konsultasi Desainer Interior" },
    stat1: { en: "Projects delivered", id: "Proyek selesai" },
    stat2: { en: "Cities across Indonesia", id: "Kota di Indonesia" },
    stat3: { en: "In-house craftsmen", id: "Pengrajin internal" },
    view: { en: "View project", id: "Lihat proyek" },
  },
};

const LangContext = createContext({ lang: "id", setLang: () => {}, t: (k) => k, tr: (o) => o });

const lookup = (key) => key.split(".").reduce((o, k) => (o ? o[k] : undefined), DICT);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("ela_lang") || "id");
  useEffect(() => {
    localStorage.setItem("ela_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const tr = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.en : obj);
  const t = (key) => tr(lookup(key)) ?? key;
  return createElement(LangContext.Provider, { value: { lang, setLang, t, tr } }, children);
}

export const useLang = () => useContext(LangContext);
