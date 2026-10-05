import { config } from "./config";

export const site = {
  name: "Maison Noor",
  short: "Noor",
  arabic: "نور",
  tagline: "Interiors shaped by Gulf light",
  founded: 2017,
  email: config.email,
  phone: config.phone,
  whatsapp: config.whatsapp,
  whatsappDisplay: config.whatsappDisplay,
  address: config.address,
  location: "Riyadh · Jeddah · Dubai",
  mapsUrl: config.mapsUrl,
  instagram: config.instagram,
  linkedin: config.linkedin,
};

export type Category = "All" | "Residential" | "Hospitality" | "Retail" | "Furniture";

export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  category: Exclude<Category, "All">;
  image: string;
  blurb: string;
  area?: string;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImage = u("1618221195710-dd6b41faaea6", 2200);
export const studioImage = u("1600210492486-724fe5c67fb0", 1400);
export const founderImage = u("1573496359142-b8d87734a5a2", 900);

export const categories: Category[] = [
  "All",
  "Residential",
  "Hospitality",
  "Retail",
  "Furniture",
];

export const projects: Project[] = [
  {
    id: "bayt-al-noor",
    title: "Bayt Al Noor",
    location: "Diplomatic Quarter, Riyadh",
    year: "2025",
    category: "Residential",
    area: "820 m²",
    image: u("1600585154340-be6161a56a0c"),
    blurb:
      "A courtyard villa where limestone walls cool the day and brass lanterns hold the evening. Family rooms open to a shaded garden; joinery is cedar, quiet, and built to last.",
  },
  {
    id: "wadi-suite",
    title: "Wadi Suite",
    location: "AlUla, KSA",
    year: "2024",
    category: "Residential",
    area: "340 m²",
    image: u("1600607687939-ce8a6c25118c"),
    blurb:
      "A cliffside retreat in travertine and raw linen. Rooms frame the canyon; evenings settle into amber light and hand-loomed rugs underfoot.",
  },
  {
    id: "corniche-residence",
    title: "Corniche Residence",
    location: "Jeddah, KSA",
    year: "2025",
    category: "Residential",
    area: "610 m²",
    image: u("1616486338812-3dadae4b4ace"),
    blurb:
      "Sea air, pale oak, and a kitchen designed as daily ceremony. Sliding screens temper Red Sea light without closing the horizon.",
  },
  {
    id: "holland-park-flat",
    title: "Holland Park Flat",
    location: "London, UK",
    year: "2024",
    category: "Residential",
    area: "185 m²",
    image: u("1616594039964-ae9021a400a0"),
    blurb:
      "A pied-à-terre for a Riyadh family — smoked oak floors, soft brass hardware, and rooms that feel settled rather than staged for Instagram.",
  },
  {
    id: "palm-court-hotel",
    title: "Palm Court Hotel",
    location: "Jeddah Waterfront",
    year: "2025",
    category: "Hospitality",
    area: "Lobby + 42 keys",
    image: u("1578683010236-d716f9a3f461"),
    blurb:
      "Arrival as a living room: travertine floors, low seating, and a champagne-metal desk that catches late afternoon sun. Guests linger before they check in.",
  },
  {
    id: "oud-lounge",
    title: "Oud Lounge",
    location: "Downtown Dubai",
    year: "2024",
    category: "Hospitality",
    area: "280 m²",
    image: u("1514933651103-005eec06c04b"),
    blurb:
      "A private members lounge in textured timber and velvet. Mood lighting for late conversation; a bar that feels like a club, not a lobby annex.",
  },
  {
    id: "desert-spa",
    title: "Desert Spa Pavilion",
    location: "Diriyah, KSA",
    year: "2023",
    category: "Hospitality",
    area: "1,100 m²",
    image: u("1582719478250-c89cae4dc85b"),
    blurb:
      "Mud-brick memory translated into cool plaster, water courts, and treatment rooms that smell of frankincense and fresh linen.",
  },
  {
    id: "souk-atelier",
    title: "Souk Atelier Flagship",
    location: "Riyadh Boulevard",
    year: "2024",
    category: "Retail",
    area: "420 m²",
    image: u("1441986300917-64674bd600d8"),
    blurb:
      "A retail gallery for slow fashion — arched niches, champagne rails, and a fitting lounge wrapped in raw linen. Clothes hold the room; fixtures disappear.",
  },
  {
    id: "gallery-line",
    title: "Gallery Line Store",
    location: "Dubai Design District",
    year: "2025",
    category: "Retail",
    area: "310 m²",
    image: u("1441984904996-e0b6ba687e04"),
    blurb:
      "White walls, smoked oak, and a single long table. A store that feels like a well-lit studio — not a showroom shouting for attention.",
  },
  {
    id: "noor-collection",
    title: "Noor Collection",
    location: "Studio · Riyadh",
    year: "2025",
    category: "Furniture",
    area: "Bespoke line",
    image: u("1618220179428-22790b461013"),
    blurb:
      "Custom seating, tables, and lighting designed in-house — cedar, brass, and hand-finished stone. Made for our projects; available by commission.",
  },
];


export const services = [
  {
    num: "01",
    title: "Interior architecture",
    text: "Full spatial design from concept through site — plans, sections, and atmospheres calibrated to Gulf light and how you live.",
  },
  {
    num: "02",
    title: "Custom furniture",
    text: "Pieces designed and fabricated for the room: seating, tables, storage, and lighting that belong only to your project.",
  },
  {
    num: "03",
    title: "Hospitality & retail",
    text: "Hotels, lounges, and flagships where arrival, linger, and memory are choreographed with the same care as a private home.",
  },
  {
    num: "04",
    title: "FF&E curation",
    text: "A single composition — not a catalogue. We source, sample, and style until every object earns its place.",
  },
];

export const process = [
  {
    step: "01",
    title: "Listen",
    text: "Brief, site visit, sun path, and the life each room must hold at 7am and at dusk. No moodboards before we understand you.",
  },
  {
    step: "02",
    title: "Compose",
    text: "Plans, material boards, and atmosphere studies. You see daylight, joinery, and proportion before a single wall moves.",
  },
  {
    step: "03",
    title: "Detail",
    text: "Samples, mock-ups, and junctions refined until every edge feels quiet. Custom furniture drawings lock in parallel.",
  },
  {
    step: "04",
    title: "Realize",
    text: "On-site direction through build and install. We stay until the lights are on and the rooms feel settled — not staged.",
  },
];

export const materials = [
  { name: "Riyadh limestone", tone: "#D4C4A8", image: u("1600585154340-be6161a56a0c", 900) },
  { name: "Soft brass", tone: "#B08D57", image: u("1618220179428-22790b461013", 900) },
  { name: "Raw linen", tone: "#E8DFD0", image: u("1618219908412-a29a1bb7b86e", 900) },
  { name: "Smoked cedar", tone: "#5C4033", image: u("1600566753190-17f0baa2a6c3", 900) },
  { name: "Sage plaster", tone: "#8A9A7B", image: u("1615873968403-89e068629265", 900) },
  { name: "Travertine", tone: "#C9B8A0", image: u("1631679706909-1844bbd07221", 900) },
];

export const awards = [
  { year: "2025", title: "Best Residential Interior — Gulf", org: "Identity Design Awards" },
  { year: "2024", title: "Hospitality Space of the Year", org: "Design Middle East" },
  { year: "2023", title: "Emerging Studio", org: "Frame Awards" },
  { year: "2022", title: "Material Innovation", org: "AIDIA" },
];

export const testimonials = [
  {
    quote:
      "Maison Noor gave our villa a calm we did not know we were missing. Every morning the courtyard light feels intentional — not accidental.",
    name: "Sara Al-Rashid",
    role: "Homeowner, Diplomatic Quarter",
  },
  {
    quote:
      "They understand Gulf hospitality without the clichés. Guests comment on the lobby before they comment on the rooms — that is rare.",
    name: "Omar Haddad",
    role: "General Manager, Palm Court Hotel",
  },
  {
    quote:
      "The custom dining table alone justified the collaboration. Their furniture feels like architecture you can touch.",
    name: "Elena Moretti",
    role: "Creative Director, Gallery Line",
  },
];

export const faqs = [
  {
    q: "Where do you work?",
    a: "Our studio is in Riyadh. We deliver across Saudi Arabia, the UAE, and select projects in Europe — including London pieds-à-terre for Gulf families.",
  },
  {
    q: "Do you design custom furniture?",
    a: "Yes. The Noor Collection is designed in-house and fabricated with trusted makers. Most pieces begin life inside a project; some are available by commission.",
  },
  {
    q: "What is a typical timeline?",
    a: "A full residential interior usually runs 6–14 months from brief to install, depending on scope and build. Hospitality programmes are planned in phases.",
  },
  {
    q: "How do engagements start?",
    a: "Send a brief or book a discovery call. We reply within two business days with fit, next steps, and a clear fee structure before any design begins.",
  },
];

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#materials", label: "Materials" },
  { href: "#contact", label: "Contact" },
];

export const press = [
  "Monocle",
  "Design Anthology",
  "Identity",
  "Frame",
  "Architectural Digest Middle East",
];
