import { config } from "./config";

export const site = {
  name: "Maison Noor",
  short: "Noor",
  arabic: "نور",
  tagline: "Interior architecture & custom furniture · Riyadh",
  founded: 2017,
  email: config.email,
  phone: config.phone,
  whatsapp: config.whatsapp,
  whatsappDisplay: config.whatsappDisplay,
  address: config.address,
  hours: "Sun–Thu · 9:00–18:00",
  location: "Riyadh · Jeddah · Dubai",
  mapsUrl: config.mapsUrl,
  instagram: config.instagram,
  linkedin: config.linkedin,
  booking: "Now booking design starts for Q1 2027",
};

export type Category = "All" | "Residential" | "Hospitality" | "Retail" | "Furniture";

export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  category: Exclude<Category, "All">;
  image: string;
  thumb: string;
  blurb: string;
  area: string;
  duration: string;
  scope: string;
  materials: string[];
  story: string;
  credit: string;
};

/** Every photo ID below was checked to return HTTP 200 from images.unsplash.com. */
const u = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }&q=72`;

export const heroImage = u("1618221195710-dd6b41faaea6", 1800);
export const heroImageMobile = `${u("1618221195710-dd6b41faaea6", 900, 1300)}&crop=focalpoint&fp-x=0.55&fp-y=0.6`;
export const studioImage = u("1600210492486-724fe5c67fb0", 1100, 880);
export const founderImage = u("1573496359142-b8d87734a5a2", 160, 160);

export const categories: Category[] = [
  "All",
  "Residential",
  "Hospitality",
  "Retail",
  "Furniture",
];

const p = (
  id: string,
  photo: string,
  rest: Omit<Project, "id" | "image" | "thumb">
): Project => ({
  id,
  image: u(photo, 1100, 740),
  thumb: u(photo, 640, 480),
  ...rest,
});

export const projects: Project[] = [
  p("al-safarat-villa", "1600585154340-be6161a56a0c", {
    title: "Al Safarat Villa",
    location: "Diplomatic Quarter, Riyadh",
    year: "2025",
    category: "Residential",
    area: "820 m²",
    duration: "14 months",
    scope: "Full interior architecture, joinery, lighting, FF&E",
    materials: ["Riyadh limestone", "Smoked cedar", "Unlacquered brass"],
    blurb:
      "A family of six, three generations, one courtyard. We re-planned the ground floor so the majlis and family kitchen share the same shaded garden.",
    story:
      "The brief was practical: a men’s majlis that could host forty without feeling like a hall, and a family wing that stayed private on busy evenings. We moved the kitchen to the courtyard edge, added deep limestone reveals to every south window, and specified cedar screens that close in under ten seconds. Summer cooling load dropped by roughly 18% against the original layout.",
    credit: "Contractor: Al Rowad Fit-out · Photography: studio",
  }),
  p("wadi-suite", "1578683010236-d716f9a3f461", {
    title: "Wadi Guest Suite",
    location: "AlUla",
    year: "2024",
    category: "Hospitality",
    area: "340 m² · 6 keys",
    duration: "9 months",
    scope: "Guest suites, bespoke beds, lighting scheme",
    materials: ["Travertine", "Raw linen", "Hand-loomed wool"],
    blurb:
      "Six suites facing the sandstone. Low beds, no headboard clutter, and windows sized to the canyon rather than the room.",
    story:
      "The operator wanted guests to wake up to the view, not to a TV wall. We dropped bed heights to 38 cm, set every window sill at mattress level, and kept lighting below eye line after sunset. Furniture was made in Riyadh and shipped in two flat-pack runs to suit the site road.",
    credit: "Operator: private · Joinery: Noor workshop",
  }),
  p("obhur-beach-house", "1631679706909-1844bbd07221", {
    title: "Obhur Beach House",
    location: "North Obhur, Jeddah",
    year: "2025",
    category: "Residential",
    area: "460 m²",
    duration: "10 months",
    scope: "Renovation, kitchen, outdoor living",
    materials: ["Lime plaster", "Rattan", "Bleached oak"],
    blurb:
      "A weekend house that survives salt air and sandy feet. Washable linen, rattan that ages well, and a kitchen open to the sea terrace.",
    story:
      "Everything here had to be cleaned with a hose or a cloth. Floors are honed limestone with a 3% fall to the terrace drains, upholstery is removable solution-dyed linen, and all hardware is marine-grade brass. The family uses it every weekend from October to April.",
    credit: "Contractor: Red Sea Interiors",
  }),
  p("nakheel-family-home", "1600607687939-ce8a6c25118c", {
    title: "Al Nakheel Family Home",
    location: "Al Nakheel, Riyadh",
    year: "2024",
    category: "Residential",
    area: "540 m²",
    duration: "11 months",
    scope: "Open-plan living, fireplace wall, storage",
    materials: ["Oak veneer", "Microcement", "Bouclé"],
    blurb:
      "One large living space for four kids and a lot of guests. 22 metres of concealed storage so the room stays calm after dinner.",
    story:
      "We counted everything the family owned before we drew a single elevation — 340 board games, toys and books included. The oak wall hides a TV, a gas fireplace, and two full-height cupboards. Sofas are performance bouclé rated for 100,000 rubs.",
    credit: "Joinery: Noor workshop · Upholstery: Atelier Haddad",
  }),
  p("olaya-penthouse", "1615873968403-89e068629265", {
    title: "Olaya Penthouse Study",
    location: "Al Olaya, Riyadh",
    year: "2023",
    category: "Residential",
    area: "48 m²",
    duration: "4 months",
    scope: "Study & library, art lighting",
    materials: ["Sage lime paint", "Cognac leather", "Walnut"],
    blurb:
      "A study for a collector who reads at night. Deep green walls, a leather sofa that will patina, and picture lights on dimmers.",
    story:
      "The client owns more art than wall space, so we designed a picture rail system that lets him rotate works monthly without new holes. Lighting is 2700K throughout with individually dimmable picture lights.",
    credit: "Art handling: Athr Gallery partners",
  }),
  p("knightsbridge-flat", "1616594039964-ae9021a400a0", {
    title: "Knightsbridge Flat",
    location: "London, UK",
    year: "2024",
    category: "Residential",
    area: "185 m²",
    duration: "7 months, managed remotely",
    scope: "Bedrooms, lighting, furnishing",
    materials: ["Wool bouclé", "Antique brass", "Grey oak"],
    blurb:
      "A London base for a Riyadh family that visits four times a year. Ready on arrival — linen, kitchen, and lights all set.",
    story:
      "We ran the project from Riyadh with a local site manager and weekly video walkthroughs. Blackout lining in every bedroom, a padded tall headboard for reading, and a full arrival kit so the family never has to shop on day one.",
    credit: "Site partner: London-based PM",
  }),
  p("palm-court-resort", "1551882547-ff40c63fe5fa", {
    title: "Palm Court Resort",
    location: "Jeddah Waterfront",
    year: "2025",
    category: "Hospitality",
    area: "Lobby, pool deck + 42 keys",
    duration: "18 months, phased",
    scope: "Public areas, pool deck, room prototype",
    materials: ["Travertine", "Teak", "Champagne metal"],
    blurb:
      "Arrival as a living room. The pool deck reads as one long evening terrace — lit low so the palms carry the night.",
    story:
      "We built one full-scale room prototype in month four and changed eleven details before the remaining rooms were ordered. Outdoor furniture is teak with quick-dry cushions; lighting avoids glare toward the sea for neighbouring villas.",
    credit: "Operator: Palm Court Hospitality",
  }),
  p("diriyah-suites", "1582719478250-c89cae4dc85b", {
    title: "Diriyah Guest Suites",
    location: "Diriyah",
    year: "2023",
    category: "Hospitality",
    area: "1,100 m² · 14 keys",
    duration: "12 months",
    scope: "Suites, timber panelling, linen spec",
    materials: ["Dark oak panelling", "Cotton percale", "Mud plaster"],
    blurb:
      "Mud-brick memory in a modern frame. Timber-panelled rooms that open straight onto shaded balconies.",
    story:
      "Inspired by the Najdi tradition of thick, cool walls, we used deep window reveals and full-height timber doors to balconies. Linen is 300-thread percale; every room has a reading chair placed for morning light.",
    credit: "Contractor: Tameer Projects",
  }),
  p("souk-atelier", "1441984904996-e0b6ba687e04", {
    title: "Souk Atelier Flagship",
    location: "Riyadh Boulevard",
    year: "2024",
    category: "Retail",
    area: "420 m²",
    duration: "5 months",
    scope: "Store design, fixtures, fitting lounge",
    materials: ["Blackened steel", "Reclaimed timber", "Raw linen"],
    blurb:
      "A slow-fashion boutique: blackened steel rails, timber ceiling, and a fitting lounge where friends can sit and wait.",
    story:
      "Average dwell time rose from 11 to 26 minutes in the first quarter after opening. Rails are modular so the brand can re-merchandise weekly without a contractor.",
    credit: "Client: Souk Atelier",
  }),
  p("gallery-line", "1441986300917-64674bd600d8", {
    title: "Gallery Line Store",
    location: "Dubai Design District",
    year: "2025",
    category: "Retail",
    area: "310 m²",
    duration: "4 months",
    scope: "Concept store, display joinery",
    materials: ["Oak", "Powder-coated steel", "Lime wash"],
    blurb:
      "One long display table, open shelving, and a colour wall the brand repaints each season.",
    story:
      "Built in 16 weeks including a two-week landlord approval. The central table splits into four sections for events; shelving runs on a 600 mm grid so product heights can change in minutes.",
    credit: "Client: Gallery Line",
  }),
  p("noor-collection", "1618219908412-a29a1bb7b86e", {
    title: "Noor Collection 01",
    location: "Studio workshop, Riyadh",
    year: "2025",
    category: "Furniture",
    area: "9 pieces",
    duration: "8–10 weeks per commission",
    scope: "Sideboards, mirrors, lounge chairs",
    materials: ["Natural cane", "Solid ash", "Brass inlay"],
    blurb:
      "Our first furniture line: a cane sideboard, a round brass-rimmed mirror, and a low lounge chair. Made to order.",
    story:
      "Each piece is made in our partner workshop in Riyadh’s 2nd Industrial City. Cane is hand-woven; finishes are hard-wax oil so they can be refreshed at home. Lead time is 8–10 weeks; delivery across KSA included.",
    credit: "Made with: Riyadh partner workshop",
  }),
  p("majlis-sofa", "1618220179428-22790b461013", {
    title: "Majlis Lounge Set",
    location: "Commission · Khobar",
    year: "2024",
    category: "Furniture",
    area: "14-seat set",
    duration: "12 weeks",
    scope: "Custom seating, side tables",
    materials: ["Saffron velvet", "Walnut", "Brass feet"],
    blurb:
      "A modern majlis for a family that wanted colour. Modular seats that rearrange from formal to family in minutes.",
    story:
      "Seat depth is 62 cm — deep enough to sit cross-legged, shallow enough for elders to stand easily. Each module locks with a concealed brass clip.",
    credit: "Upholstery: Atelier Haddad",
  }),
];

export const services = [
  {
    num: "01",
    title: "Interior architecture",
    text: "Layouts, sections, ceilings, lighting and joinery drawn to construction level. We coordinate with your architect and MEP engineer.",
    from: "Design fee from SAR 380 / m²",
  },
  {
    num: "02",
    title: "Custom furniture",
    text: "Sofas, beds, tables and storage made for your room in our Riyadh partner workshop. 8–12 week lead time.",
    from: "Commissions from SAR 9,500",
  },
  {
    num: "03",
    title: "Hospitality & retail",
    text: "Hotels, lounges and stores — with full-scale prototypes before rollout, so mistakes are cheap.",
    from: "Fixed-fee proposals",
  },
  {
    num: "04",
    title: "Styling & FF&E",
    text: "Furniture, rugs, art and accessories sourced, delivered and placed. You arrive to a finished home.",
    from: "From SAR 45,000",
  },
];

export const process = [
  {
    step: "01",
    title: "Listen",
    time: "Week 1–2",
    text: "A site visit, a measured survey and a long conversation about how you actually live — morning to midnight.",
    deliverable: "Written brief + fee proposal",
  },
  {
    step: "02",
    title: "Compose",
    time: "Week 3–8",
    text: "Layouts, sun studies and material boards. You see real samples on your site in your light — not just renders.",
    deliverable: "Concept pack + 3D views",
  },
  {
    step: "03",
    title: "Detail",
    time: "Week 9–16",
    text: "Construction drawings, joinery details and a line-by-line budget. Furniture is drawn and quoted in parallel.",
    deliverable: "Tender set + priced FF&E",
  },
  {
    step: "04",
    title: "Realize",
    time: "Site phase",
    text: "Weekly site visits, contractor coordination and snagging. We install, style and hand you the keys.",
    deliverable: "Handover + care manual",
  },
];

export const materials = [
  {
    name: "Riyadh limestone",
    note: "Honed, sourced from Al Kharj",
    tone: "#D8C9AE",
    texture:
      "radial-gradient(circle at 30% 30%, rgba(255,255,255,.4) 0 1.2px, transparent 2px) 0 0 / 13px 13px, radial-gradient(circle at 60% 70%, rgba(120,95,60,.22) 0 1px, transparent 1.8px) 0 0 / 9px 11px, linear-gradient(135deg, #e3d6bd, #cdbb9b)",
  },
  {
    name: "Unlacquered brass",
    note: "Patinas with every touch",
    tone: "#B08D57",
    texture:
      "linear-gradient(115deg, #8f6d3d 0%, #d2b07a 38%, #a9844f 55%, #e2c690 72%, #9a7745 100%)",
  },
  {
    name: "Raw linen",
    note: "Belgian, stonewashed",
    tone: "#E8DFD0",
    texture:
      "repeating-linear-gradient(0deg, rgba(120,100,70,.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(120,100,70,.08) 0 1px, transparent 1px 3px), #e9e0cf",
  },
  {
    name: "Smoked cedar",
    note: "Oiled, never lacquered",
    tone: "#5C4033",
    texture:
      "repeating-linear-gradient(92deg, rgba(0,0,0,.18) 0 2px, transparent 2px 9px, rgba(255,255,255,.05) 9px 11px, transparent 11px 18px), linear-gradient(180deg, #6a4a39, #4a3226)",
  },
  {
    name: "Sage lime paint",
    note: "Breathable, matte",
    tone: "#8A9A7B",
    texture:
      "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.22), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,.12), transparent 55%), #8a9a7b",
  },
  {
    name: "Travertine",
    note: "Filled, honed finish",
    tone: "#C9B8A0",
    texture:
      "repeating-linear-gradient(170deg, rgba(150,120,85,.22) 0 1px, transparent 1px 14px), linear-gradient(160deg, #d8c8ae, #bfa98b)",
  },
];

export const awards = [
  { year: "2025", title: "Shortlist — Residential Interior", org: "Identity Design Awards" },
  { year: "2024", title: "Commended — Hospitality, Small Project", org: "Design Middle East Awards" },
  { year: "2023", title: "Featured studio", org: "Saudi Design Week" },
  { year: "2022", title: "Finalist — Material use", org: "AIDIA Awards" },
];

export const testimonials = [
  {
    quote:
      "We asked for a house that could host forty and still feel like home for six. They delivered both — and they answered every WhatsApp, even during Ramadan.",
    name: "Sara A.",
    role: "Homeowner · Diplomatic Quarter",
    project: "Al Safarat Villa",
  },
  {
    quote:
      "The room prototype saved us. We changed eleven details before ordering 41 more rooms. That alone paid the design fee.",
    name: "Omar H.",
    role: "General Manager · Palm Court Resort",
    project: "Palm Court Resort",
  },
  {
    quote:
      "Honest about budget from day one. When a marble we loved was over, they showed us three alternatives the same week.",
    name: "Reem & Faisal K.",
    role: "Homeowners · Al Nakheel",
    project: "Al Nakheel Family Home",
  },
  {
    quote:
      "Fixtures we can move ourselves every Thursday night. The store feels new each week without calling a contractor.",
    name: "Lina M.",
    role: "Founder · Souk Atelier",
    project: "Souk Atelier Flagship",
  },
];

export const faqs = [
  {
    q: "How much does a full home project cost?",
    a: "Design fees for full residential projects start at SAR 380 per m². Build and furniture are separate and depend on your choices — a typical 500 m² villa interior lands between SAR 1.2M and 2.5M all-in. We give you a line-by-line budget before you commit to anything.",
  },
  {
    q: "Where do you work?",
    a: "Our studio is on Al Takhassusi Road in Riyadh. We work across Saudi Arabia and the UAE, and take one or two London projects a year for Gulf families.",
  },
  {
    q: "How long does it take?",
    a: "Design takes 12–16 weeks. Site work for a full villa usually runs 6–10 months depending on the contractor and scope. Furniture lead time is 8–12 weeks and runs in parallel.",
  },
  {
    q: "Can you work with my contractor?",
    a: "Yes. About half our projects use the client’s contractor. We can also recommend three vetted fit-out partners in Riyadh and two in Jeddah.",
  },
  {
    q: "Do you take small projects?",
    a: "We take a few single-room projects each year (a majlis, a master suite, a study) from SAR 60,000 design fee. Ask — the answer is often yes.",
  },
];

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const press = [
  "Saudi Design Week",
  "Identity",
  "Design Middle East",
  "Arab News Lifestyle",
  "Commercial Interior Design",
];

export const team = [
  { k: "14", v: "people in studio" },
  { k: "63", v: "projects handed over" },
  { k: "48h", v: "reply on new enquiries" },
];
