import { IMG } from "./images";

export const UNITS = [
  {
    id: "ivory",
    name: "The Ivory",
    image: IMG.ivory,
    gallery: [IMG.ivory, IMG.living, IMG.kitchen],
    building: 128,
    land: 96,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    status: "available",
    tagline: { en: "Pure, luminous and quietly confident.", id: "Bersih, terang, dan tenang berwibawa." },
  },
  {
    id: "onyx",
    name: "The Onyx",
    image: IMG.onyx,
    gallery: [IMG.onyx, IMG.bedroom, IMG.stairs],
    building: 142,
    land: 112,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    status: "reserved",
    tagline: { en: "Bold contrast for the modern connoisseur.", id: "Kontras tegas untuk penikmat desain modern." },
  },
  {
    id: "champagne",
    name: "The Champagne",
    image: IMG.champagne,
    gallery: [IMG.champagne, IMG.dining, IMG.terrace],
    building: 156,
    land: 128,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    status: "available",
    tagline: { en: "Warm arches, graceful proportions.", id: "Lengkung hangat dengan proporsi anggun." },
  },
  {
    id: "monarch",
    name: "The Monarch",
    image: IMG.monarch,
    gallery: [IMG.monarch, IMG.foyer, IMG.garden],
    building: 184,
    land: 165,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    status: "sold",
    tagline: { en: "The grand corner residence.", id: "Hunian sudut paling megah." },
  },
];

export const UNIT_FILTERS = ["all", "available", "bedrooms3", "largest"];

export const applyUnitFilter = (units, filter) => {
  if (filter === "available") return units.filter((u) => u.status === "available");
  if (filter === "bedrooms3") return units.filter((u) => u.bedrooms === 3);
  if (filter === "largest") return [...units].sort((a, b) => b.land - a.land);
  return units;
};
