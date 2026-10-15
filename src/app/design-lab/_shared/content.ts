/**
 * Single source of truth for the three Design Lab concepts.
 * Every fact, stat, and testimonial here comes from the existing
 * production content in src/content/site.ts — nothing is invented.
 */

export type LabImage = { src: string; alt: string; width: number; height: number };

export const img = {
  planning: {
    src: "/design-lab/concierge-planning.jpg",
    alt: "Concierge planning session with packaging samples, print proofs, and a navy gift box on a marble table",
    width: 768,
    height: 512,
  },
  navyBox: {
    src: "/design-lab/navy-gift-box.jpg",
    alt: "Premium navy corporate gift box with champagne ribbon, tumbler, candle, and notebook",
    width: 768,
    height: 512,
  },
  fulfillment: {
    src: "/design-lab/fulfillment-studio.jpg",
    alt: "Organized fulfillment studio with staged gift boxes, shelving, and packing stations",
    width: 768,
    height: 512,
  },
  gaming: {
    src: "/design-lab/vip-gaming-kit.jpg",
    alt: "Dark VIP gaming gift kit with headphones, premium accessories, and a controller on a desk",
    width: 768,
    height: 512,
  },
  wineCrates: {
    src: "/legacy-images/website-picture-3.png",
    alt: "Rows of wooden gift crates packed with rosé bottles, candles, and gold-dotted boxes",
    width: 767,
    height: 512,
  },
  wineBox: {
    src: "/legacy-images/zoom-scaled.jpg",
    alt: "Wooden presentation box with a wine bottle, etched glasses, and a corkscrew",
    width: 656,
    height: 1024,
  },
  explosion: {
    src: "/legacy-images/Explosion-box-1.jpg",
    alt: "Opened surprise explosion gift box with treats and celebration confetti",
    width: 753,
    height: 512,
  },
  birthday: {
    src: "/legacy-images/Birthday-Presents-box.jpg",
    alt: "Colorful ribbon-wrapped gift boxes stacked together",
    width: 753,
    height: 512,
  },
  wooden: {
    src: "/legacy-images/Wooden-box.jpg",
    alt: "Rustic wooden gift crates holding soaps and preserves",
    width: 753,
    height: 512,
  },
} satisfies Record<string, LabImage>;

export const hero = {
  eyebrow: "Turnkey gifting, concierge, and fulfillment",
  title: "Custom corporate gifting handled from idea to doorstep.",
  text: "MorePower2You designs and delivers premium gifting experiences, from branded gift boxes and seasonal campaigns to fully managed concierge projects, with sourcing, packaging, warehousing, fulfillment, delivery, and support all under one roof.",
  primaryCta: { label: "Start a Custom Gifting Project", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
};

export const proof = [
  { stat: "5,000+", label: "gifts in select projects", detail: "Built for high-volume campaigns while still supporting carefully scoped smaller projects." },
  { stat: "National + International", label: "delivery reach", detail: "Project planning accounts for domestic and international destination needs." },
  { stat: "Edibles to electronics", label: "and anything in between", detail: "Product mixes are built around the audience, occasion, and budgeted scope." },
];

export const offerings = [
  {
    title: "Corporate gifting campaigns",
    text: "Client appreciation, employee recognition, launch kits, event gifts, and seasonal programs.",
    href: "/corporate-gifting",
  },
  {
    title: "Custom branded boxes",
    text: "Packaging, inserts, product mix, personalization, and branded presentation.",
    href: "/custom-gift-boxes",
  },
  {
    title: "VIP and loyalty gifting",
    text: "High-touch gifts for top-tier customers, VIP players, milestone moments, and retention programs.",
    href: "/gaming-vip-player-gifting",
  },
  {
    title: "Fulfillment and mass mailings",
    text: "Warehousing, kit assembly, destination coordination, and shipment support.",
    href: "/fulfillment-warehousing-distribution",
  },
];

export const processSeven = [
  { title: "Discover", text: "Clarify audience, occasion, recipient scale, destinations, timing, and customization needs." },
  { title: "Curate", text: "Develop thoughtful product and packaging options aligned with the brand and the moment." },
  { title: "Customize", text: "Coordinate branded items, printed inserts, packaging, personalization, and presentation details." },
  { title: "Package", text: "Assemble gift boxes, kits, and mailing-ready units with a polished recipient experience." },
  { title: "Store & Fulfill", text: "Support warehousing, inventory staging, mass mailings, and recurring shipment needs." },
  { title: "Deliver", text: "Prepare projects for national or international delivery with organized destination handling." },
  { title: "Support", text: "Keep the project moving with responsive concierge coordination from start to finish." },
];

/** The same seven steps grouped into four homepage-friendly stages. */
export const processFour = [
  {
    stage: "Concept",
    title: "Start with the goal",
    text: "Clarify audience, occasion, recipient scale, destinations, timing, and customization needs before anything is sourced.",
    image: img.planning,
  },
  {
    stage: "Curate",
    title: "Build the right mix",
    text: "Develop product and packaging options aligned with the brand and the moment, then coordinate branded items, inserts, and personalization.",
    image: img.navyBox,
  },
  {
    stage: "Create",
    title: "Assemble every unit",
    text: "Gift boxes, kits, and mailing-ready units come together with a polished recipient experience in mind.",
    image: img.wineCrates,
  },
  {
    stage: "Deliver",
    title: "Fulfill at any scale",
    text: "Warehousing, staged inventory, mass mailings, and organized national or international destination handling — with concierge support throughout.",
    image: img.fulfillment,
  },
];

export const gaming = {
  eyebrow: "Gaming & VIP player gifting",
  title: "Loyalty moments that travel beyond the screen.",
  text: "For casino apps, RPGs, action/adventure, strategy games, and VIP customer programs, MorePower2You designs top-tier gifting for player milestones, seasonal drops, loyalty recognition, and high-value client appreciation.",
  points: [
    { title: "VIP players", text: "Milestone gifts, status recognition, retention campaigns, and surprise-and-delight drops." },
    { title: "Gaming brands", text: "Gift strategies that feel collectible, premium, and brand-safe." },
  ],
};

export const logistics = {
  eyebrow: "Fulfillment, warehousing, and distribution",
  title: "The quiet logistics layer behind a polished gift.",
  text: "Secure storage, staged inventory, recurring shipments, large destination lists, mass mailings, and coordinated distribution for projects that need more than a gift idea.",
  capabilities: [
    "Warehousing and secure storage",
    "Kit assembly and staging",
    "Individual recipient distribution",
    "Mass mailings",
    "National shipping",
    "International coordination",
    "Recurring shipment programs",
    "Concierge project support",
  ],
};

export const industries = [
  "Gaming companies and casino apps",
  "Tech companies",
  "Real estate firms",
  "Finance companies",
  "Hospitality groups",
  "Healthcare organizations",
  "Event companies",
  "Marketing, HR, and operations teams",
];

export const occasions = [
  "Holiday gifting",
  "Christmas gifting",
  "Birthday gifting",
  "Client appreciation",
  "VIP player appreciation",
  "Employee appreciation",
  "Event gifting",
  "Product launch gifting",
  "Milestone gifting",
  "Loyalty program gifting",
];

export const testimonials = [
  {
    quote:
      "We needed our products stored and sent out on a monthly schedule. MorePower2You made the process feel effortless, with secure storage and dependable fulfillment whenever we needed shipments prepared.",
    name: "Dani L.",
    context: "Storage and recurring fulfillment",
  },
  {
    quote:
      "MorePower2You took a detailed software onboarding project from scheduling through completion confirmation. Their patience, accuracy, and understanding of our needs made the project run smoothly, and we have continued working with them on additional projects.",
    name: "Tyler M.",
    context: "Complex project coordination",
  },
];

export const finalCta = {
  title: "Let's make something worth opening.",
  text: "Share the project type, audience, scale, destination needs, and timeline. MorePower2You will review the details and follow up with next steps.",
  primaryCta: { label: "Start a Custom Gifting Project", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Gaming & VIP", href: "/gaming-vip-player-gifting" },
  { label: "Process", href: "/process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
