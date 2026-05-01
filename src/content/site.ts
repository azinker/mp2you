export type Locale = "en" | "he";

export type Seo = {
  title: string;
  description: string;
  keywords: string[];
};

export type Cta = {
  label: string;
  href: string;
};

export type BasicItem = {
  title: string;
  text: string;
};

export type PageBlock = {
  eyebrow?: string;
  title: string;
  text: string;
  items?: BasicItem[];
};

export type MarketingPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  seo: Seo;
  blocks: PageBlock[];
};

export type Service = MarketingPage & {
  order: number;
  summary: string;
  occasions: string[];
};

export type Testimonial = {
  name: string;
  quote: string;
  context: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type GalleryItem = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  seo: Seo;
};

export type BlogPost = {
  slug: string;
  title: string;
  status: "published" | "draft";
  date: string;
  excerpt: string;
  seo: Seo;
  sections: BasicItem[];
};

export type Resource = {
  slug: string;
  title: string;
  summary: string;
  seo: Seo;
  sections: BasicItem[];
};

export type SiteContent = {
  locale: Locale;
  direction: "ltr" | "rtl";
  settings: {
    siteName: string;
    tagline: string;
    contactNote: string;
    serviceArea: string;
    legacyPrivateAddressNote: string;
  };
  nav: { label: string; href: string }[];
  footer: {
    description: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
  };
  home: {
    seo: Seo;
    hero: {
      eyebrow: string;
      title: string;
      text: string;
      proof: string[];
      primaryCta: Cta;
      secondaryCta: Cta;
    };
    proof: BasicItem[];
    whatWeDo: PageBlock;
    process: BasicItem[];
    featured: PageBlock[];
    occasions: string[];
    finalCta: PageBlock;
  };
  pages: MarketingPage[];
  services: Service[];
  industries: BasicItem[];
  futureIndustries: string[];
  testimonials: Testimonial[];
  faqs: Faq[];
  gallery: GalleryItem[];
  caseStudies: CaseStudy[];
  posts: BlogPost[];
  resources: Resource[];
  legal: MarketingPage[];
};

const en: SiteContent = {
  locale: "en",
  direction: "ltr",
  settings: {
    siteName: "MorePower2You",
    tagline: "The magnificent power of gifting, rebuilt for modern corporate programs.",
    contactNote: "Project inquiries are handled through the secure form.",
    serviceArea: "Supporting national and international gifting, concierge, fulfillment, and mass mailing projects.",
    legacyPrivateAddressNote:
      "Legacy WordPress contact page displayed 4745 N. 7th St. Ste. 215 Phoenix, Arizona 85014. Do not publish a physical address unless approved.",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Gaming & VIP", href: "/gaming-vip-player-gifting" },
    { label: "Process", href: "/process" },
    { label: "Gallery", href: "/gallery" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    description:
      "MorePower2You plans, sources, customizes, packages, stores, fulfills, and delivers gifting and concierge projects for companies that need every detail handled with care.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Who We Serve", href: "/who-we-serve" },
          { label: "Testimonials", href: "/testimonials" },
          { label: "FAQs", href: "/faqs" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Corporate Gifting", href: "/corporate-gifting" },
          { label: "Custom Gift Boxes", href: "/custom-gift-boxes" },
          { label: "Concierge Services", href: "/concierge-services" },
          { label: "Fulfillment", href: "/fulfillment-warehousing-distribution" },
        ],
      },
      {
        title: "Planning",
        links: [
          { label: "Case Studies", href: "/case-studies" },
          { label: "Resources", href: "/resources/corporate-gifting-planning-checklist" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms", href: "/terms-and-conditions" },
        ],
      },
    ],
  },
  home: {
    seo: {
      title: "Corporate Gifting, VIP Gifting & Fulfillment | MorePower2You",
      description:
        "Premium turnkey corporate gifting, custom branded gift boxes, concierge sourcing, warehousing, fulfillment, and VIP gifting programs for companies of many sizes.",
      keywords: [
        "corporate gifting",
        "custom gift boxes",
        "VIP gifting",
        "gaming player gifting",
        "gift fulfillment",
      ],
    },
    hero: {
      eyebrow: "Turnkey gifting, concierge, and fulfillment",
      title: "Custom corporate gifting handled from idea to doorstep.",
      text:
        "MorePower2You creates premium gifting programs, branded gift boxes, VIP drops, seasonal campaigns, and complex concierge projects with sourcing, packaging, warehousing, fulfillment, delivery, and support under one roof.",
      proof: [
        "Select projects exceeding 5,000 gifts",
        "National and international reach",
        "From edibles to electronics and anything in between",
      ],
      primaryCta: { label: "Start a Custom Gifting Project", href: "/contact" },
      secondaryCta: { label: "See How It Works", href: "/process" },
    },
    proof: [
      {
        title: "Turnkey",
        text: "Concept, sourcing, customization, packaging, storage, fulfillment, delivery, and project support.",
      },
      {
        title: "Flexible Scale",
        text: "Built for high-volume campaigns while still able to support carefully scoped smaller projects.",
      },
      {
        title: "Premium Fit",
        text: "A polished partner for marketing, HR, operations, executive teams, events, and VIP customer programs.",
      },
    ],
    whatWeDo: {
      eyebrow: "What MorePower2You does",
      title: "Specialty gifting and concierge services under one roof.",
      text:
        "The work starts with a gifting goal and ends with a finished program people are happy to receive. MorePower2You can shape the concept, source the right products, coordinate branded packaging, manage storage, assemble shipments, and support the mailing details for national and international destinations.",
      items: [
        { title: "Corporate gifting campaigns", text: "Client appreciation, employee recognition, launch kits, event gifts, and seasonal programs." },
        { title: "VIP and loyalty gifting", text: "High-touch gifts for top-tier customers, VIP players, milestone moments, and retention programs." },
        { title: "Custom branded boxes", text: "Packaging, inserts, product mix, personalization, and branded presentation." },
        { title: "Fulfillment and mass mailings", text: "Warehousing, kit assembly, destination coordination, and shipment support." },
      ],
    },
    process: [
      { title: "Discover", text: "Clarify audience, occasion, recipient scale, destinations, timing, and customization needs." },
      { title: "Curate", text: "Develop thoughtful product and packaging options aligned with the brand and the moment." },
      { title: "Customize", text: "Coordinate branded items, printed inserts, packaging, personalization, and presentation details." },
      { title: "Package", text: "Assemble gift boxes, kits, and mailing-ready units with a polished recipient experience." },
      { title: "Store & Fulfill", text: "Support warehousing, inventory staging, mass mailings, and recurring shipment needs." },
      { title: "Deliver", text: "Prepare projects for national or international delivery with organized destination handling." },
      { title: "Support", text: "Keep the project moving with responsive concierge coordination from start to finish." },
    ],
    featured: [
      {
        eyebrow: "Gaming & VIP player gifting",
        title: "Loyalty moments that travel beyond the screen.",
        text:
          "For casino apps, RPGs, action/adventure, strategy games, and VIP customer programs, MorePower2You can help design top-tier gifting for player milestones, seasonal drops, loyalty recognition, and high-value client appreciation.",
        items: [
          { title: "VIP players", text: "Milestone gifts, status recognition, retention campaigns, and surprise-and-delight drops." },
          { title: "Gaming brands", text: "Gift strategies that feel collectible, premium, and brand-safe without using protected characters or fake logos." },
        ],
      },
      {
        eyebrow: "Custom gift boxes",
        title: "A branded unboxing experience without the operational lift.",
        text:
          "From premium snacks and wellness items to electronics, printed pieces, apparel, desk goods, and fully custom concepts, each box can be built around the audience, occasion, and budgeted scope.",
        items: [
          { title: "Flexible starting points", text: "VIP appreciation, holiday gifting, welcome boxes, event kits, employee appreciation, and custom concierge projects." },
          { title: "No fixed public pricing", text: "Each project is quoted based on recipient count, products, customization, packaging, logistics, and timeline." },
        ],
      },
      {
        eyebrow: "Fulfillment, warehousing, and distribution",
        title: "The quiet logistics layer behind a polished gift.",
        text:
          "MorePower2You can support secure storage, staged inventory, recurring shipments, large destination lists, mass mailings, and coordinated distribution for projects that need more than a gift idea.",
        items: [
          { title: "National and international", text: "Project planning can account for domestic and international destination needs." },
          { title: "High-volume ready", text: "Select projects have exceeded 5,000 gifts, with smaller scopes also welcome when the fit is right." },
        ],
      },
    ],
    occasions: [
      "Holiday gifting",
      "Christmas gifting",
      "Birthday gifting",
      "Easter and seasonal gifting",
      "Client appreciation",
      "VIP player and customer appreciation",
      "Employee appreciation",
      "Event gifting",
      "Product launch gifting",
      "Milestone gifting",
      "Loyalty program gifting",
    ],
    finalCta: {
      title: "Bring the idea. We will help shape the program.",
      text:
        "Share the project type, audience, scale, destination needs, and timeline. MorePower2You will review the details and follow up with next steps.",
      items: [
        { title: "Primary CTA", text: "Start a Custom Gifting Project" },
        { title: "Secondary CTA", text: "Explore Services" },
      ],
    },
  },
  pages: [
    {
      slug: "about",
      title: "About MorePower2You",
      eyebrow: "Boutique attention, enterprise-ready coordination",
      intro:
        "MorePower2You is a specialty gifting, concierge, and fulfillment partner built for companies that want a polished recipient experience without managing every detail themselves.",
      primaryCta: { label: "Start a Project", href: "/contact" },
      secondaryCta: { label: "Explore Services", href: "/services" },
      seo: {
        title: "About MorePower2You | Corporate Gifting Concierge",
        description:
          "Learn how MorePower2You supports corporate gifting, custom gift boxes, concierge projects, warehousing, and fulfillment for national and international programs.",
        keywords: ["about MorePower2You", "gifting concierge", "corporate gifting partner"],
      },
      blocks: [
        {
          title: "A modern partner for projects that need care and coordination.",
          text:
            "The original MorePower2You message was simple: specialty gifting and concierge services together, so a project can become turnkey. The new site carries that idea forward with a more refined focus on corporate gifting, branded gift boxes, VIP customer programs, storage, fulfillment, and mass mailing support.",
          items: [
            { title: "From small to high-volume", text: "The team can support projects of many sizes, with strong emphasis on larger corporate campaigns." },
            { title: "Custom by nature", text: "Gift concepts can include goods ranging from edibles to electronics and anything in between." },
            { title: "Service-area language", text: "The business supports national and international work without publishing a public physical address." },
          ],
        },
      ],
    },
    {
      slug: "services",
      title: "Services",
      eyebrow: "Gifting strategy, packaging, concierge, and logistics",
      intro:
        "MorePower2You brings the creative and operational sides of gifting together, helping companies move from a rough idea to a finished program.",
      primaryCta: { label: "Start a Custom Gifting Project", href: "/contact" },
      secondaryCta: { label: "See the Process", href: "/process" },
      seo: {
        title: "Corporate Gifting Services | Custom Gift Boxes & Fulfillment",
        description:
          "Explore MorePower2You services: corporate gifting campaigns, custom branded gift boxes, concierge sourcing, warehousing, fulfillment, distribution, and mass mailings.",
        keywords: ["corporate gifting services", "custom branded gift boxes", "gift fulfillment"],
      },
      blocks: [
        {
          title: "Four ways to make the project easier.",
          text:
            "Services can be used individually or combined into a fully managed project. Large-scale corporate gifting is the primary emphasis, while smaller custom projects can still be supported when scope and timing align.",
        },
      ],
    },
    {
      slug: "who-we-serve",
      title: "Who We Serve",
      eyebrow: "Built for teams that need gifting to feel considered",
      intro:
        "The site publishes a dedicated Gaming & VIP Player Gifting page now, while keeping the content model ready for future industry pages.",
      primaryCta: { label: "Start a Project", href: "/contact" },
      secondaryCta: { label: "Gaming & VIP Player Gifting", href: "/gaming-vip-player-gifting" },
      seo: {
        title: "Corporate Gifting for Gaming, Tech, Finance & More",
        description:
          "MorePower2You supports gifting programs for gaming brands, tech companies, real estate firms, finance teams, hospitality groups, healthcare organizations, events, HR, and marketing teams.",
        keywords: ["industry gifting", "gaming gifting", "client appreciation gifts"],
      },
      blocks: [
        {
          title: "A flexible gifting partner for many teams.",
          text:
            "Whether the audience is a VIP player community, a sales prospect list, employees across regions, executive clients, or event attendees, the project can be shaped around audience, occasion, brand tone, and operational complexity.",
        },
      ],
    },
    {
      slug: "process",
      title: "Process",
      eyebrow: "How it works",
      intro:
        "A thoughtful gifting project needs both taste and follow-through. MorePower2You keeps the path clear from discovery to delivery.",
      primaryCta: { label: "Start a Custom Gifting Project", href: "/contact" },
      secondaryCta: { label: "Explore Services", href: "/services" },
      seo: {
        title: "How Corporate Gifting Projects Work | MorePower2You",
        description:
          "See the MorePower2You process for discovery, curation, customization, packaging, warehousing, fulfillment, delivery, and project support.",
        keywords: ["corporate gifting process", "gift fulfillment process", "custom gifting project"],
      },
      blocks: [
        {
          title: "A clear workflow for custom work.",
          text:
            "Every engagement is quoted and planned around scope. The process is structured enough for large programs, but flexible enough for concierge-style problem solving.",
        },
      ],
    },
    {
      slug: "gallery",
      title: "Gallery",
      eyebrow: "Visual direction and gifting context",
      intro:
        "The gallery preserves the current site’s gift-box context while pointing the new brand toward cleaner, more premium editorial imagery.",
      seo: {
        title: "Gifting Gallery | MorePower2You",
        description:
          "Explore MorePower2You gallery context for custom gift boxes, specialty gifting, corporate programs, packaging, and fulfillment-ready gift concepts.",
        keywords: ["gift box gallery", "corporate gifting examples", "custom gifts"],
      },
      blocks: [
        {
          title: "Gallery images are placeholders until premium production images are generated.",
          text:
            "The image prompt pack documents the intended replacement direction: warm neutral backgrounds, high-end packaging, no fake logos, no protected brands, and no low-quality gift basket styling.",
        },
      ],
    },
    {
      slug: "case-studies",
      title: "Case Studies",
      eyebrow: "Anonymous project profiles and example project types",
      intro:
        "These are clearly labeled planning profiles, not named-client claims. They show the kinds of needs MorePower2You is structured to support.",
      seo: {
        title: "Corporate Gifting Case Studies | Example Project Types",
        description:
          "Review anonymous example project profiles for VIP player gifting, holiday corporate gifting, fulfillment programs, and branded launch kits.",
        keywords: ["corporate gifting case studies", "VIP gifting examples", "gift fulfillment examples"],
      },
      blocks: [
        {
          title: "Use these profiles to start a smarter conversation.",
          text:
            "Each profile highlights a common gifting challenge, likely approach, and outcome language without inventing client names, awards, or unsupported statistics.",
        },
      ],
    },
    {
      slug: "testimonials",
      title: "Testimonials",
      eyebrow: "What clients valued on the current site",
      intro:
        "The meaning of the current testimonials has been preserved and professionally rewritten for clarity, warmth, and credibility.",
      seo: {
        title: "Client Testimonials | MorePower2You",
        description:
          "Read rewritten testimonials preserving the meaning of current MorePower2You reviews about storage, fulfillment, gifting ideas, and project coordination.",
        keywords: ["MorePower2You testimonials", "corporate gifting reviews", "gift fulfillment testimonial"],
      },
      blocks: [],
    },
    {
      slug: "faqs",
      title: "FAQs",
      eyebrow: "Planning answers",
      intro:
        "Clear answers for companies planning corporate gifting, custom boxes, VIP programs, fulfillment, warehousing, and mass mailing projects.",
      seo: {
        title: "Corporate Gifting FAQs | MorePower2You",
        description:
          "Answers to common questions about custom corporate gifting, VIP gifting, branded gift boxes, fulfillment, warehousing, timelines, and international shipping.",
        keywords: ["corporate gifting FAQ", "gift fulfillment FAQ", "custom gift boxes FAQ"],
      },
      blocks: [],
    },
    {
      slug: "contact",
      title: "Project Inquiry",
      eyebrow: "Start a custom gifting project",
      intro:
        "Tell MorePower2You what you are planning. The form asks for project scale, timeline, destinations, and customization needs instead of a public budget field.",
      seo: {
        title: "Start a Custom Gifting Project | MorePower2You",
        description:
          "Contact MorePower2You for corporate gifting, VIP player gifting, branded gift boxes, fulfillment, warehousing, distribution, and concierge project support.",
        keywords: ["custom gifting project inquiry", "corporate gifting contact", "VIP gifting quote"],
      },
      blocks: [
        {
          title: "What happens next",
          text:
            "Your gifting project request has been received. We’ll review the details and follow up with next steps.",
          items: [
            { title: "No ecommerce checkout", text: "Every project is scoped and quoted based on needs." },
            { title: "No public phone CTA", text: "The form is the primary intake path for project details." },
            { title: "No file upload", text: "Attachments can be coordinated later if needed." },
          ],
        },
      ],
    },
    {
      slug: "data-cookies-notice",
      title: "Data & Form Notice",
      eyebrow: "Simple data disclosure",
      intro:
        "This site uses a project inquiry form, CMS-backed content, email delivery, and spam protection. It does not include separate measurement scripts.",
      seo: {
        title: "Data & Form Notice | MorePower2You",
        description: "Data and form notice for the MorePower2You website.",
        keywords: ["data notice", "form notice", "MorePower2You"],
      },
      blocks: [
        {
          title: "Form and service data",
          text:
            "The project inquiry form collects the contact and project details a visitor submits. The site also uses Sanity CMS, Resend email delivery, Cloudflare Turnstile spam protection, and Vercel hosting.",
        },
      ],
    },
  ],
  services: [
    {
      order: 1,
      slug: "corporate-gifting",
      title: "Corporate Gifting Campaigns",
      eyebrow: "Primary service",
      summary: "Large-scale and boutique corporate gifting programs for client, employee, executive, and event audiences.",
      intro:
        "MorePower2You helps companies design and execute corporate gifting campaigns that feel personal, polished, and operationally organized.",
      primaryCta: { label: "Start a Corporate Gifting Project", href: "/contact" },
      secondaryCta: { label: "See Custom Gift Boxes", href: "/custom-gift-boxes" },
      seo: {
        title: "Corporate Gifting Campaigns | MorePower2You",
        description:
          "Premium corporate gifting campaigns for client appreciation, employee appreciation, VIP customers, holidays, events, launches, and milestone gifting.",
        keywords: ["corporate gifting campaigns", "client appreciation gifts", "employee appreciation gifts"],
      },
      blocks: [
        {
          title: "Strategy, products, packaging, and execution in one place.",
          text:
            "Campaigns can support holiday gifting, Christmas gifting, birthdays, Easter and seasonal moments, client appreciation, VIP customer appreciation, employee recognition, product launches, milestone gifting, and loyalty programs.",
          items: [
            { title: "Audience fit", text: "Build gift concepts around executives, customers, employees, VIPs, event attendees, or high-value accounts." },
            { title: "Scale fit", text: "Support small projects through high-volume campaigns, including select projects exceeding 5,000 gifts." },
            { title: "Brand fit", text: "Coordinate products, packaging, inserts, and messaging so the gift feels aligned with your company." },
          ],
        },
      ],
      occasions: ["Holiday gifting", "Client appreciation", "Employee appreciation", "Product launch gifting", "Milestone gifting"],
    },
    {
      order: 2,
      slug: "custom-gift-boxes",
      title: "Custom Branded Gift Boxes",
      eyebrow: "Premium packaging and presentation",
      summary: "Customizable gift boxes and branded kits stocked with goods ranging from edibles to electronics.",
      intro:
        "A gift box should feel curated, not assembled by accident. MorePower2You can help shape the product mix, branded packaging, printed inserts, and recipient experience.",
      primaryCta: { label: "Build a Custom Gift Box", href: "/contact" },
      secondaryCta: { label: "View Gallery", href: "/gallery" },
      seo: {
        title: "Custom Branded Gift Boxes | MorePower2You",
        description:
          "Create premium custom branded gift boxes for corporate clients, VIP customers, employees, events, holidays, launches, and loyalty programs.",
        keywords: ["custom gift boxes", "branded gift boxes", "corporate gift boxes"],
      },
      blocks: [
        {
          title: "Flexible starting points, fully custom execution.",
          text:
            "The product mix may include premium treats, wellness goods, lifestyle items, printed materials, apparel, tech accessories, electronics, and other sourced goods based on scope and availability.",
          items: [
            { title: "VIP Client Appreciation", text: "Elevated gifts for executive relationships and high-value customer moments." },
            { title: "Seasonal and Holiday Gifting", text: "Christmas, holiday, Easter, birthday, and year-end gift programs." },
            { title: "Branded Welcome Boxes", text: "Onboarding and welcome kits for employees, customers, partners, or members." },
            { title: "Event and Launch Kits", text: "Mail-ready gifts for product launches, conferences, activations, and remote events." },
          ],
        },
      ],
      occasions: ["VIP appreciation", "Seasonal gifting", "Welcome boxes", "Event kits", "Employee appreciation"],
    },
    {
      order: 3,
      slug: "concierge-services",
      title: "Concierge Services",
      eyebrow: "Custom project support",
      summary: "White-glove problem solving for specialty gifting and custom projects that do not fit a standard catalog.",
      intro:
        "Some projects need a partner who can connect the dots, source unusual items, coordinate details, and keep the work moving. That is where concierge support fits.",
      primaryCta: { label: "Plan a Concierge Project", href: "/contact" },
      secondaryCta: { label: "See the Process", href: "/process" },
      seo: {
        title: "Custom Concierge Gifting Services | MorePower2You",
        description:
          "White-glove concierge gifting support for custom sourcing, VIP projects, specialty gifting, branded packaging, logistics coordination, and turnkey programs.",
        keywords: ["concierge gifting", "custom gifting concierge", "specialty gifting"],
      },
      blocks: [
        {
          title: "For the project that needs more than a product list.",
          text:
            "Concierge services can support special requests, custom recipient needs, product sourcing, packaging direction, destination coordination, and ongoing project communication.",
          items: [
            { title: "VIP details", text: "Personalized, high-touch support for top clients, VIP players, executives, and special recipients." },
            { title: "Complex coordination", text: "A single partner to help organize moving parts across sourcing, presentation, and fulfillment." },
            { title: "Custom by quote", text: "Scope, timing, product availability, and logistics define the final plan." },
          ],
        },
      ],
      occasions: ["VIP gifting", "Custom requests", "Executive gifts", "Special occasions", "Complex projects"],
    },
    {
      order: 4,
      slug: "fulfillment-warehousing-distribution",
      title: "Fulfillment, Warehousing & Distribution",
      eyebrow: "Storage and shipment support",
      summary: "Warehousing, storage, gift assembly, mass mailings, and distribution support for national and international projects.",
      intro:
        "Gift programs succeed when the logistics are as considered as the gift itself. MorePower2You can support storage, staged inventory, fulfillment, and mass mailings.",
      primaryCta: { label: "Plan Fulfillment Support", href: "/contact" },
      secondaryCta: { label: "View Case Studies", href: "/case-studies" },
      seo: {
        title: "Gift Fulfillment, Warehousing & Distribution | MorePower2You",
        description:
          "Warehousing, storage, gift assembly, mass mailings, distribution, and national or international fulfillment support for corporate gifting projects.",
        keywords: ["gift fulfillment", "gift warehousing", "mass mailings", "gift distribution"],
      },
      blocks: [
        {
          title: "The operational layer behind high-touch gifting.",
          text:
            "Projects may include product storage, climate-conscious planning when appropriate, inventory staging, kit assembly, recurring shipments, destination coordination, and mailing support.",
          items: [
            { title: "Storage", text: "Support for products that need to be held and sent out over time." },
            { title: "Mass mailings", text: "Gift and content fulfillment for national and international destinations." },
            { title: "Recurring programs", text: "Monthly, seasonal, milestone, loyalty, or campaign-based shipment support." },
          ],
        },
      ],
      occasions: ["High-volume programs", "Recurring shipments", "Mass mailings", "International projects", "Warehouse support"],
    },
    {
      order: 5,
      slug: "gaming-vip-player-gifting",
      title: "Gaming & VIP Player Gifting",
      eyebrow: "Dedicated industry page",
      summary:
        "Premium gifting programs for gaming companies, casino apps, VIP players, top-tier customers, loyalty programs, and milestone drops.",
      intro:
        "Gaming brands have unusually engaged audiences. MorePower2You helps turn loyalty, milestones, seasons, and VIP status into tangible gifting moments that feel premium and brand-safe.",
      primaryCta: { label: "Plan a VIP Player Gift", href: "/contact" },
      secondaryCta: { label: "Explore Corporate Gifting", href: "/corporate-gifting" },
      seo: {
        title: "Gaming & VIP Player Gifting | MorePower2You",
        description:
          "Custom VIP player gifting for casino apps, RPGs, action/adventure games, strategy games, loyalty programs, milestone gifting, seasonal drops, and high-value customer appreciation.",
        keywords: ["gaming gifting", "VIP player gifting", "casino app gifting", "loyalty program gifts"],
      },
      blocks: [
        {
          title: "Gifting for VIP players, top-tier customers, and loyalty communities.",
          text:
            "Programs can support casino app brands, RPGs, action/adventure games, strategy titles, VIP player segments, high-value customers, loyalty programs, milestone gifting, seasonal drops, and appreciation campaigns.",
          items: [
            { title: "Milestone drops", text: "Recognize player anniversaries, spend tiers, rank milestones, tournament moments, or loyalty achievements." },
            { title: "Seasonal campaigns", text: "Create holiday, birthday, launch, or limited-time gifts that feel collectible and intentional." },
            { title: "Brand-safe creativity", text: "Use premium generic packaging and custom direction without fake client logos, copyrighted characters, or unsupported claims." },
          ],
        },
        {
          title: "Built for marketing, loyalty, VIP, and operations teams.",
          text:
            "MorePower2You can coordinate concepting, product curation, branded packaging, warehousing, fulfillment, destination handling, and ongoing support so internal teams do not have to assemble the program from scattered vendors.",
        },
      ],
      occasions: ["VIP player gifting", "Casino app gifting", "Milestone gifting", "Loyalty gifting", "Seasonal drops"],
    },
  ],
  industries: [
    { title: "Gaming companies and casino apps", text: "VIP player gifting, milestone recognition, loyalty programs, seasonal drops, and high-value customer appreciation." },
    { title: "Tech companies", text: "Client success gifting, employee appreciation, launch kits, onboarding boxes, and event gifting." },
    { title: "Real estate firms", text: "Closing gifts, referral appreciation, developer campaigns, and VIP client relationship gifts." },
    { title: "Finance companies", text: "Premium client appreciation, executive gifting, milestone recognition, and compliant gifting workflows." },
    { title: "Hospitality groups", text: "Guest appreciation, VIP welcome amenities, event gifts, seasonal programs, and branded experiences." },
    { title: "Healthcare organizations", text: "Employee appreciation, donor or partner recognition, wellness-oriented gift boxes, and event programs." },
    { title: "Event companies", text: "Launch kits, attendee gifts, sponsor boxes, virtual event mailers, and post-event appreciation." },
    { title: "Marketing, HR, and operations teams", text: "A practical partner for teams that need gifting handled with taste and structure." },
  ],
  futureIndustries: [
    "Real Estate Gifting",
    "Tech Client Gifting",
    "Finance Client Gifting",
    "Hospitality Gifting",
    "Healthcare Appreciation Gifting",
    "Event Gifting",
  ],
  testimonials: [
    {
      name: "Dani L.",
      context: "Storage and recurring fulfillment",
      quote:
        "We needed our products stored and sent out on a monthly schedule. MorePower2You made the process feel effortless, with secure storage and dependable fulfillment whenever we needed shipments prepared.",
    },
    {
      name: "Tyler M.",
      context: "Complex project coordination",
      quote:
        "MorePower2You took a detailed software onboarding project from scheduling through completion confirmation. Their patience, accuracy, and understanding of our needs made the project run smoothly, and we have continued working with them on additional projects.",
    },
    {
      name: "Brandi E.",
      context: "Client gifting",
      quote:
        "The gifts for our clients were amazing. They brought thoughtful suggestions, helped us create exactly what we wanted, presented everything professionally, and sent the gifts out on time. The feedback we received was entirely positive.",
    },
    {
      name: "Charlene R.",
      context: "Creative gifting for a diverse audience",
      quote:
        "We needed gift ideas for a large and diverse client group. MorePower2You brought creative, thoughtful options, and our staff could see how much care went into the recommendations.",
    },
  ],
  faqs: [
    { question: "What types of gifting projects can MorePower2You support?", answer: "Corporate gifting campaigns, custom branded gift boxes, VIP client and player gifting, employee appreciation, seasonal gifting, event kits, product launch gifts, milestone programs, fulfillment, warehousing, distribution, mass mailings, and custom concierge projects." },
    { question: "Can you handle large-volume gifting?", answer: "Yes. The new positioning emphasizes large-scale corporate gifting, and the site may truthfully state that select projects have exceeded 5,000 gifts. Smaller projects can also be supported when the scope is a good fit." },
    { question: "Do you publish fixed package prices?", answer: "No. Projects are quoted based on recipient count, product mix, customization, packaging, storage, fulfillment needs, destination count, and timeline." },
    { question: "Can gifts be branded or customized?", answer: "Yes. Gift boxes, inserts, packaging, and selected goods can be customized or branded based on timeline, quantities, and product availability." },
    { question: "Do you support national and international shipping?", answer: "MorePower2You can support national and international project planning and mass mailings. Details depend on destination list, products, timing, and shipping requirements." },
    { question: "Do you ask for budget in the inquiry form?", answer: "No. The form asks for project scale instead, so the first conversation can focus on audience, timing, customization, and logistics." },
    { question: "Can you store products and ship them over time?", answer: "Yes. Warehousing and storage support can be part of the scope, including recurring or staged fulfillment when appropriate." },
    { question: "Can you support gaming and VIP player gifting?", answer: "Yes. Gaming and VIP player gifting has a dedicated page for casino apps, RPGs, action/adventure, strategy games, VIP player segments, loyalty programs, milestone gifts, and seasonal drops." },
    { question: "Do you offer ecommerce checkout?", answer: "No. The site is built for lead generation and custom project inquiry, not public ecommerce checkout." },
    { question: "Do you display a public phone number or physical address?", answer: "No. The new site uses service-area language and a project inquiry form as the primary CTA." },
  ],
  gallery: [
    { title: "Custom box presentation", text: "A gift-box context from the current site, reframed for a more premium editorial gallery.", image: "/legacy-images/Wooden-box.jpg", alt: "Custom wooden gift box presentation" },
    { title: "Seasonal gifting", text: "Holiday and occasion gifting can be adapted for corporate, VIP, employee, and client audiences.", image: "/legacy-images/Birthday-Presents-box.jpg", alt: "Gift boxes for seasonal and birthday gifting" },
    { title: "Unboxing experience", text: "Custom packaging can turn a simple gift into a more memorable recipient moment.", image: "/legacy-images/Explosion-box-1.jpg", alt: "Creative gift box unboxing concept" },
    { title: "Branded gift context", text: "The current site shows gift-box and presentation references that should be replaced with generated premium imagery.", image: "/legacy-images/website-picture-3.png", alt: "Gift packaging reference from current site" },
    { title: "Mass mailing support", text: "Fulfillment and mailing support can sit behind a polished gifting campaign.", image: "/legacy-images/zoom-scaled.jpg", alt: "Gift fulfillment and mailing reference" },
    { title: "Concierge curation", text: "A custom project can combine products, packaging, inserts, and logistics into a single experience.", image: "/legacy-images/website-picture-2-1.png", alt: "Concierge gifting product arrangement" },
    { title: "AI-generated premium imagery direction", text: "A ChatGPT image-model concept sheet created to guide the new premium visual system alongside the legacy public-site source photos.", image: "/generated-assets/image-contact-sheet-gifting.png", alt: "Generated premium corporate gifting imagery direction sheet" },
  ],
  caseStudies: [
    {
      slug: "vip-player-milestone-drop",
      label: "Example Project Type",
      title: "VIP Player Milestone Drop",
      summary: "A gaming brand wants a premium physical gift for top-tier players reaching a loyalty milestone.",
      challenge: "The internal team needs a gift that feels special without using protected characters, fake logos, or a generic gift basket approach.",
      approach: "MorePower2You could curate premium lifestyle goods, design generic but brand-aligned packaging, add a milestone insert, stage inventory, and coordinate mailing to approved destinations.",
      outcome: "A tangible appreciation moment that supports loyalty, VIP recognition, and high-value customer care.",
      seo: {
        title: "VIP Player Milestone Gift Example | MorePower2You",
        description: "Anonymous example project type for gaming VIP player milestone gifting and loyalty recognition.",
        keywords: ["VIP player milestone gifting", "gaming loyalty gifts", "casino app VIP gifts"],
      },
    },
    {
      slug: "holiday-corporate-gifting-program",
      label: "Example Project Type",
      title: "Holiday Corporate Gifting Program",
      summary: "A company needs holiday gifts for clients, employees, and partners across many destinations.",
      challenge: "The audience is large and varied, and the company needs gifts that feel thoughtful while staying organized operationally.",
      approach: "MorePower2You could create recipient tiers, source flexible gift options, coordinate branded packaging, stage fulfillment, and support national or international mailing needs.",
      outcome: "A polished holiday gifting program with less internal coordination burden.",
      seo: {
        title: "Holiday Corporate Gifting Example | MorePower2You",
        description: "Anonymous holiday corporate gifting example for clients, employees, partners, fulfillment, and mass mailing support.",
        keywords: ["holiday corporate gifting", "Christmas gifting campaign", "employee holiday gifts"],
      },
    },
    {
      slug: "recurring-storage-fulfillment",
      label: "Anonymous Project Profile",
      title: "Recurring Storage and Fulfillment",
      summary: "A company needs products stored and sent out on a recurring schedule.",
      challenge: "Inventory needs to be stored securely, tracked, and shipped periodically without the company managing every shipment internally.",
      approach: "MorePower2You can support storage planning, inventory staging, recurring fulfillment, and mailing coordination based on the approved schedule.",
      outcome: "A smoother recurring program that keeps product distribution moving.",
      seo: {
        title: "Recurring Gift Storage & Fulfillment Example | MorePower2You",
        description: "Anonymous project profile for storage, warehousing, recurring gift fulfillment, and distribution support.",
        keywords: ["gift storage", "recurring fulfillment", "gift warehousing"],
      },
    },
    {
      slug: "branded-launch-kit",
      label: "Example Project Type",
      title: "Branded Event and Launch Kit",
      summary: "A marketing team needs a launch gift that can be shipped to customers, partners, or event attendees.",
      challenge: "The kit has to feel premium, arrive on time, and connect the product launch to a real-world experience.",
      approach: "MorePower2You could curate items, coordinate printed inserts and packaging, assemble kits, and support destination handling for the mailing list.",
      outcome: "A memorable launch touchpoint that supports brand recall and attendee engagement.",
      seo: {
        title: "Branded Launch Kit Example | MorePower2You",
        description: "Example branded event and product launch kit profile with packaging, inserts, fulfillment, and mailing support.",
        keywords: ["branded launch kit", "event gifting", "product launch gifts"],
      },
    },
  ],
  posts: [
    {
      slug: "corporate-gifting-strategy-at-scale",
      status: "published",
      date: "2026-04-01",
      title: "How to Plan a Corporate Gifting Campaign That Feels Personal at Scale",
      excerpt: "A practical framework for making high-volume corporate gifts feel thoughtful, organized, and brand-aligned.",
      seo: {
        title: "Corporate Gifting Strategy at Scale | MorePower2You",
        description: "Plan corporate gifting campaigns with audience tiers, product strategy, packaging, fulfillment, and timing.",
        keywords: ["corporate gifting strategy", "large-volume gifting", "client appreciation gifts"],
      },
      sections: [
        { title: "Start with the recipient reality", text: "A strong campaign begins with audience groups, recipient counts, destination needs, timing, and the reason for the gift. Those details shape everything else." },
        { title: "Use tiers without making gifts feel generic", text: "Corporate gifting can include tiers for executives, VIP customers, employees, and broad audiences while preserving a consistent brand experience." },
        { title: "Plan logistics early", text: "Packaging, storage, mailing lists, destination counts, and delivery windows should be part of the strategy before products are finalized." },
      ],
    },
    {
      slug: "vip-player-gifting-gaming-brands",
      status: "published",
      date: "2026-04-02",
      title: "VIP Player Gifting for Gaming Brands: Appreciation Beyond the Screen",
      excerpt: "How casino apps and gaming companies can use premium physical gifts for loyalty, milestones, and VIP customer care.",
      seo: {
        title: "VIP Player Gifting for Gaming Brands | MorePower2You",
        description: "VIP player gifting ideas for casino apps, RPGs, action/adventure games, strategy games, loyalty programs, and milestone drops.",
        keywords: ["VIP player gifting", "gaming gifting", "casino app loyalty gifts"],
      },
      sections: [
        { title: "Make the gift match the status", text: "VIP players and top-tier customers should receive gifts that feel deliberate, premium, and relevant to the milestone being celebrated." },
        { title: "Stay brand-safe", text: "Great gaming gifts do not need fake logos, copyrighted characters, or unsupported claims. Packaging, inserts, and product choices can still feel deeply aligned." },
        { title: "Connect gifting to loyalty moments", text: "Milestones, seasons, anniversaries, loyalty tiers, launches, and high-value appreciation moments all create natural gifting opportunities." },
      ],
    },
    {
      slug: "holiday-gifting-timeline",
      status: "published",
      date: "2026-04-03",
      title: "Holiday Gifting Timeline: When to Start and What to Decide First",
      excerpt: "A holiday gifting timeline for companies planning Christmas, seasonal, client, employee, or VIP gift programs.",
      seo: {
        title: "Holiday Gifting Timeline | MorePower2You",
        description: "Plan holiday gifting and Christmas gifting timelines for corporate clients, employees, VIP customers, packaging, and fulfillment.",
        keywords: ["holiday gifting timeline", "Christmas corporate gifts", "seasonal gifting"],
      },
      sections: [
        { title: "Start earlier than feels necessary", text: "Product availability, customization, packaging, mailing lists, and shipping windows all benefit from early decisions." },
        { title: "Confirm the audience first", text: "Decide whether the program serves clients, employees, VIPs, partners, or multiple recipient groups before selecting gifts." },
        { title: "Leave room for fulfillment", text: "Even beautiful gifts need time for assembly, storage, labeling, and distribution, especially when destinations are spread out." },
      ],
    },
    {
      slug: "premium-custom-branded-gift-boxes",
      status: "published",
      date: "2026-04-04",
      title: "What Makes a Custom Branded Gift Box Feel Premium?",
      excerpt: "A premium custom gift box depends on restraint, product fit, packaging quality, and a clear recipient experience.",
      seo: {
        title: "Premium Custom Branded Gift Boxes | MorePower2You",
        description: "Learn what makes custom branded gift boxes feel premium for corporate gifting, VIP gifting, events, and launch kits.",
        keywords: ["custom branded gift boxes", "premium gift boxes", "corporate gift boxes"],
      },
      sections: [
        { title: "Curation matters more than quantity", text: "A smaller set of well-chosen items often feels more premium than a crowded box of unrelated products." },
        { title: "Packaging should feel intentional", text: "Color, texture, inserts, spacing, and presentation all shape the first impression." },
        { title: "Branding should support the gift", text: "The strongest branded boxes feel aligned without turning every item into an advertisement." },
      ],
    },
    {
      slug: "gift-fulfillment-logistics-questions",
      status: "published",
      date: "2026-04-05",
      title: "Gift Fulfillment and Logistics Questions to Answer Before a Large Drop",
      excerpt: "The operational questions that keep a large gifting campaign from becoming chaotic.",
      seo: {
        title: "Gift Fulfillment & Logistics Questions | MorePower2You",
        description: "Key questions for gift fulfillment, warehousing, mass mailings, destination counts, customization, and high-volume gift drops.",
        keywords: ["gift fulfillment", "gift logistics", "mass mailing gifts"],
      },
      sections: [
        { title: "Where are gifts going?", text: "Destination count, domestic or international routing, and address readiness should be clarified early." },
        { title: "What needs to be stored?", text: "If products arrive before mailing dates, storage and inventory staging need to be planned." },
        { title: "Who owns the mailing list?", text: "Clean recipient data is essential for smooth fulfillment and accurate communication." },
      ],
    },
    {
      slug: "concierge-gifting-custom-projects",
      status: "draft",
      date: "2026-04-06",
      title: "When Concierge Gifting Is the Right Fit",
      excerpt: "Draft topic for custom projects that need sourcing, coordination, and white-glove problem solving.",
      seo: { title: "When Concierge Gifting Is the Right Fit", description: "Draft.", keywords: ["concierge gifting"] },
      sections: [{ title: "Draft note", text: "CMS draft starter for future editorial development." }],
    },
    {
      slug: "large-volume-gifting-checklist",
      status: "draft",
      date: "2026-04-07",
      title: "A Checklist for Large-Volume Gifting",
      excerpt: "Draft topic for planning recipient scale, fulfillment, and timing.",
      seo: { title: "Large-Volume Gifting Checklist", description: "Draft.", keywords: ["large-volume gifting"] },
      sections: [{ title: "Draft note", text: "CMS draft starter for future editorial development." }],
    },
    {
      slug: "employee-appreciation-gift-programs",
      status: "draft",
      date: "2026-04-08",
      title: "Employee Appreciation Gift Programs That Feel Human",
      excerpt: "Draft topic for employee recognition campaigns.",
      seo: { title: "Employee Appreciation Gift Programs", description: "Draft.", keywords: ["employee appreciation gifts"] },
      sections: [{ title: "Draft note", text: "CMS draft starter for future editorial development." }],
    },
    {
      slug: "event-gifting-for-remote-attendees",
      status: "draft",
      date: "2026-04-09",
      title: "Event Gifting for Remote and Hybrid Attendees",
      excerpt: "Draft topic for virtual events and mail-ready event kits.",
      seo: { title: "Event Gifting for Remote Attendees", description: "Draft.", keywords: ["event gifting"] },
      sections: [{ title: "Draft note", text: "CMS draft starter for future editorial development." }],
    },
    {
      slug: "client-appreciation-gifts-that-last",
      status: "draft",
      date: "2026-04-10",
      title: "Client Appreciation Gifts That Last Beyond the Moment",
      excerpt: "Draft topic for thoughtful client relationship gifting.",
      seo: { title: "Client Appreciation Gifts", description: "Draft.", keywords: ["client appreciation gifts"] },
      sections: [{ title: "Draft note", text: "CMS draft starter for future editorial development." }],
    },
  ],
  resources: [
    {
      slug: "corporate-gifting-planning-checklist",
      title: "Corporate Gifting Planning Checklist",
      summary: "A practical planning page for audience, scale, customization, packaging, timing, and fulfillment decisions.",
      seo: {
        title: "Corporate Gifting Planning Checklist | MorePower2You",
        description: "Use this corporate gifting checklist to plan recipient scale, occasion, customization, packaging, fulfillment, and timeline.",
        keywords: ["corporate gifting checklist", "gift planning checklist", "custom gifting"],
      },
      sections: [
        { title: "Audience", text: "Define recipient groups, tiers, count, relationship type, and any personalization needs." },
        { title: "Occasion", text: "Clarify whether this is holiday gifting, client appreciation, VIP recognition, employee appreciation, an event, a launch, or a milestone." },
        { title: "Operations", text: "List destination count, mailing list readiness, storage needs, international considerations, and deadline." },
      ],
    },
    {
      slug: "holiday-gift-campaign-timeline",
      title: "Holiday Gift Campaign Timeline",
      summary: "A planning resource for Christmas, holiday, seasonal, client, employee, and VIP gifting programs.",
      seo: {
        title: "Holiday Gift Campaign Timeline | MorePower2You",
        description: "Plan holiday and Christmas corporate gifting campaigns with timing for curation, customization, packaging, and fulfillment.",
        keywords: ["holiday gift timeline", "Christmas gifting", "seasonal corporate gifts"],
      },
      sections: [
        { title: "Early planning", text: "Confirm audience, recipient counts, gift tiers, destinations, and overall creative direction." },
        { title: "Mid-project decisions", text: "Finalize products, packaging, inserts, customization, storage, and mailing details." },
        { title: "Final fulfillment", text: "Prepare recipient data, assemble gifts, stage shipments, and confirm delivery support." },
      ],
    },
    {
      slug: "vip-client-gifting-strategy-guide",
      title: "VIP Client Gifting Strategy Guide",
      summary: "A guide for high-value client, VIP customer, and VIP player appreciation programs.",
      seo: {
        title: "VIP Client Gifting Strategy Guide | MorePower2You",
        description: "Plan VIP client and VIP player gifting strategies for loyalty, milestones, seasonal campaigns, and high-value appreciation.",
        keywords: ["VIP client gifting", "VIP player gifting", "loyalty gifting"],
      },
      sections: [
        { title: "Define VIP meaning", text: "Clarify whether VIP is based on revenue, player status, relationship depth, milestone, or strategic importance." },
        { title: "Match gift to moment", text: "A milestone gift should feel different from a holiday gift, retention gift, or event gift." },
        { title: "Protect the experience", text: "Use tasteful packaging, accurate data, and clear fulfillment planning to preserve the premium feel." },
      ],
    },
  ],
  legal: [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      eyebrow: "Privacy",
      intro: "This starter privacy policy is provided for launch preparation and should be reviewed by legal counsel before production use.",
      seo: { title: "Privacy Policy | MorePower2You", description: "Privacy policy for MorePower2You.", keywords: ["privacy policy"] },
      blocks: [
        { title: "Information collected", text: "The project inquiry form collects contact and project details submitted voluntarily by the visitor." },
        { title: "How information is used", text: "Submitted information is used to review project requests, follow up with next steps, respond to inquiries, and manage internal lead status." },
        { title: "Third-party services", text: "The site is prepared for Sanity CMS, Resend email delivery, Cloudflare Turnstile spam protection, and Vercel hosting." },
      ],
    },
    {
      slug: "terms-and-conditions",
      title: "Terms & Conditions",
      eyebrow: "Terms",
      intro: "These starter terms are informational and should be reviewed by legal counsel before production use.",
      seo: { title: "Terms & Conditions | MorePower2You", description: "Terms and conditions for MorePower2You.", keywords: ["terms and conditions"] },
      blocks: [
        { title: "Custom project scope", text: "All gifting and concierge projects are custom scoped. Any proposal, timeline, product availability, fulfillment plan, or quote should be confirmed in writing." },
        { title: "No ecommerce checkout", text: "This website does not sell products through public checkout. It collects project inquiries for custom review." },
        { title: "Content accuracy", text: "MorePower2You aims to keep website content accurate, but service availability, product options, and timelines may change based on scope and supplier conditions." },
      ],
    },
  ],
};

const he: SiteContent = {
  ...en,
  locale: "he",
  direction: "rtl",
  settings: {
    siteName: "MorePower2You",
    tagline: "הכוח של מתנה מדויקת, עבור תוכניות ארגוניות מודרניות.",
    contactNote: "פניות לפרויקטים מטופלות דרך טופס מאובטח.",
    serviceArea: "תמיכה בפרויקטי מתנות, קונסיירז', אחסון, לוגיסטיקה ודיוור בארץ ובעולם.",
    legacyPrivateAddressNote:
      "עמוד הקשר הישן בוורדפרס הציג כתובת בפיניקס. אין לפרסם כתובת פיזית ללא אישור.",
  },
  nav: [
    { label: "שירותים", href: "/he/services" },
    { label: "גיימינג ו-VIP", href: "/he/gaming-vip-player-gifting" },
    { label: "תהליך", href: "/he/process" },
    { label: "גלריה", href: "/he/gallery" },
    { label: "מאמרים", href: "/he/insights" },
    { label: "יצירת קשר", href: "/he/contact" },
  ],
  footer: {
    description:
      "MorePower2You מתכננת, מאתרת, ממותגת, אורזת, מאחסנת, ממלאת ושולחת פרויקטי מתנות וקונסיירז' לחברות שרוצות שכל פרט יטופל ברמה גבוהה.",
    columns: [
      {
        title: "החברה",
        links: [
          { label: "אודות", href: "/he/about" },
          { label: "למי זה מתאים", href: "/he/who-we-serve" },
          { label: "המלצות", href: "/he/testimonials" },
          { label: "שאלות נפוצות", href: "/he/faqs" },
        ],
      },
      {
        title: "שירותים",
        links: [
          { label: "מתנות ארגוניות", href: "/he/corporate-gifting" },
          { label: "קופסאות ממותגות", href: "/he/custom-gift-boxes" },
          { label: "שירותי קונסיירז'", href: "/he/concierge-services" },
          { label: "אחסון ושילוח", href: "/he/fulfillment-warehousing-distribution" },
        ],
      },
      {
        title: "תכנון",
        links: [
          { label: "פרופילי פרויקטים", href: "/he/case-studies" },
          { label: "משאבים", href: "/he/resources/corporate-gifting-planning-checklist" },
          { label: "מדיניות פרטיות", href: "/he/privacy-policy" },
          { label: "תנאים", href: "/he/terms-and-conditions" },
        ],
      },
    ],
  },
  home: {
    ...en.home,
    seo: {
      title: "מתנות ארגוניות, מתנות VIP ולוגיסטיקה | MorePower2You",
      description:
        "שירות פרימיום למתנות ארגוניות, קופסאות ממותגות, קונסיירז', אחסון, מילוי, שילוח ומתנות VIP לחברות במגוון היקפים.",
      keywords: ["מתנות ארגוניות", "קופסאות מתנה ממותגות", "מתנות VIP", "מתנות לגיימינג"],
    },
    hero: {
      eyebrow: "מתנות, קונסיירז' ולוגיסטיקה מקצה לקצה",
      title: "מתנות ארגוניות מותאמות, מהרעיון ועד הדלת.",
      text:
        "MorePower2You יוצרת תוכניות מתנות פרימיום, קופסאות ממותגות, מתנות VIP, קמפיינים עונתיים ופרויקטי קונסיירז' מורכבים, כולל איתור מוצרים, אריזה, אחסון, מילוי, שילוח וליווי.",
      proof: ["פרויקטים נבחרים מעל 5,000 מתנות", "תמיכה בארץ ובעולם", "מאכילים ומתוקים ועד אלקטרוניקה ועוד"],
      primaryCta: { label: "התחילו פרויקט מתנות מותאם", href: "/he/contact" },
      secondaryCta: { label: "איך זה עובד", href: "/he/process" },
    },
    proof: [
      { title: "מקצה לקצה", text: "רעיון, איתור מוצרים, התאמה אישית, אריזה, אחסון, מילוי, שילוח וליווי הפרויקט." },
      { title: "גמישות בהיקף", text: "מתאים לקמפיינים גדולים, וגם לפרויקטים קטנים ומדויקים כאשר ההיקף מתאים." },
      { title: "תחושת פרימיום", text: "שותף אלגנטי לצוותי שיווק, HR, תפעול, הנהלה, אירועים ותוכניות לקוחות VIP." },
    ],
    whatWeDo: {
      eyebrow: "מה MorePower2You עושה",
      title: "מתנות מיוחדות ושירותי קונסיירז' במקום אחד.",
      text:
        "העבודה מתחילה במטרה של המתנה ומסתיימת בתוכנית מוכנה שאנשים שמחים לקבל. MorePower2You יכולה לגבש קונספט, לאתר מוצרים, לתאם אריזה ממותגת, לנהל אחסון, להרכיב משלוחים ולתמוך בדיוור ליעדים בארץ ובעולם.",
      items: [
        { title: "קמפיינים ארגוניים", text: "מתנות ללקוחות, עובדים, השקות, אירועים ועונות חגים." },
        { title: "מתנות VIP ונאמנות", text: "מתנות ללקוחות מובילים, שחקני VIP, אבני דרך ותוכניות שימור." },
        { title: "קופסאות ממותגות", text: "אריזה, אינסרטים, תמהיל מוצרים, התאמה אישית וחוויית פתיחה." },
        { title: "מילוי ודיוור המוני", text: "אחסון, הרכבת ערכות, ניהול יעדים ותמיכה בשילוח." },
      ],
    },
    process: [
      { title: "אפיון", text: "מגדירים קהל, אירוע, היקף, יעדים, לוחות זמנים וצרכי מיתוג." },
      { title: "אוצרות", text: "מפתחים אפשרויות מוצר ואריזה שמתאימות למותג ולרגע." },
      { title: "התאמה", text: "מתאמים פריטים ממותגים, אינסרטים, אריזות ופרטים אישיים." },
      { title: "אריזה", text: "מרכיבים קופסאות, ערכות ויחידות מוכנות לדיוור." },
      { title: "אחסון ומילוי", text: "תמיכה באחסון, מלאי, דיוור המוני ומשלוחים חוזרים." },
      { title: "שילוח", text: "הכנת פרויקטים למשלוח בארץ או בעולם עם טיפול מסודר ביעדים." },
      { title: "ליווי", text: "תיאום קונסיירז' קשוב שמחזיק את הפרויקט בתנועה." },
    ],
    occasions: [
      "מתנות לחגים",
      "מתנות כריסמס",
      "מתנות יום הולדת",
      "מתנות פסחא ועונות חגים",
      "הוקרת לקוחות",
      "הוקרת שחקני VIP ולקוחות",
      "הוקרת עובדים",
      "מתנות לאירועים",
      "מתנות להשקות",
      "מתנות לאבני דרך",
      "מתנות לתוכניות נאמנות",
    ],
    finalCta: {
      title: "הביאו את הרעיון. אנחנו נעזור להפוך אותו לתוכנית.",
      text:
        "שתפו סוג פרויקט, קהל, היקף, יעדים ולוח זמנים. MorePower2You תבחן את הפרטים ותחזור עם הצעדים הבאים.",
      items: [
        { title: "קריאה ראשית", text: "התחילו פרויקט מתנות מותאם" },
        { title: "קריאה משנית", text: "ראו שירותים" },
      ],
    },
  },
  pages: [
    {
      ...en.pages[0],
      title: "אודות MorePower2You",
      eyebrow: "יחס בוטיק עם יכולת ארגונית",
      intro:
        "MorePower2You היא שותפה למתנות מיוחדות, קונסיירז' ולוגיסטיקה עבור חברות שרוצות חוויית מתנה מלוטשת בלי לנהל כל פרט לבד.",
      primaryCta: { label: "התחילו פרויקט", href: "/he/contact" },
      secondaryCta: { label: "ראו שירותים", href: "/he/services" },
      seo: { title: "אודות MorePower2You | קונסיירז' מתנות ארגוניות", description: "אודות שירותי מתנות, קופסאות ממותגות, אחסון ושילוח של MorePower2You.", keywords: ["אודות MorePower2You", "מתנות ארגוניות"] },
      blocks: [
        {
          title: "שותף מודרני לפרויקטים שדורשים טעם ותיאום.",
          text:
            "המסר המקורי של MorePower2You נשמר: מתנות מיוחדות ושירותי קונסיירז' יחד, כדי להפוך פרויקט למקצה לקצה. האתר החדש מתמקד במתנות ארגוניות, קופסאות ממותגות, לקוחות VIP, אחסון, מילוי ודיוור.",
          items: [
            { title: "מהיקף קטן ועד גדול", text: "תמיכה בפרויקטים בגדלים שונים, עם דגש על קמפיינים ארגוניים גדולים." },
            { title: "התאמה אישית", text: "מתנות יכולות לכלול מוצרים ממזון ועד אלקטרוניקה ועוד." },
            { title: "שפה לאומית ובינלאומית", text: "האתר משתמש בשפת אזורי שירות ואינו מציג כתובת פיזית ציבורית." },
          ],
        },
      ],
    },
    {
      ...en.pages[1],
      title: "שירותים",
      eyebrow: "אסטרטגיית מתנות, אריזה, קונסיירז' ולוגיסטיקה",
      intro: "MorePower2You מחברת בין הצד הקריאייטיבי והתפעולי של מתנות, מרעיון ראשוני ועד תוכנית מוכנה.",
      primaryCta: { label: "התחילו פרויקט מתנות מותאם", href: "/he/contact" },
      secondaryCta: { label: "ראו את התהליך", href: "/he/process" },
      seo: { title: "שירותי מתנות ארגוניות | קופסאות ממותגות ושילוח", description: "שירותי MorePower2You למתנות ארגוניות, קופסאות ממותגות, קונסיירז', אחסון, מילוי ודיוור.", keywords: ["שירותי מתנות ארגוניות", "קופסאות ממותגות"] },
      blocks: [{ title: "ארבע דרכים להקל על הפרויקט.", text: "אפשר להשתמש בכל שירות בנפרד או לחבר אותם לפרויקט מנוהל במלואו. הדגש הוא מתנות ארגוניות בהיקפים גדולים, לצד פרויקטים קטנים ומדויקים כאשר זה מתאים." }],
    },
    {
      ...en.pages[2],
      title: "למי זה מתאים",
      eyebrow: "לחברות שרוצות שמתנה תרגיש מדויקת",
      intro: "כרגע מתפרסם עמוד ייעודי לגיימינג ומתנות VIP, וה-CMS מוכן לעמודי תעשייה נוספים בעתיד.",
      primaryCta: { label: "התחילו פרויקט", href: "/he/contact" },
      secondaryCta: { label: "גיימינג ומתנות VIP", href: "/he/gaming-vip-player-gifting" },
      seo: { title: "מתנות ארגוניות לגיימינג, טק, פיננסים ועוד", description: "MorePower2You תומכת במתנות לחברות גיימינג, טכנולוגיה, נדלן, פיננסים, אירוח, בריאות ואירועים.", keywords: ["מתנות לפי תעשייה", "מתנות לגיימינג"] },
      blocks: [{ title: "שותף גמיש לצוותים רבים.", text: "בין אם הקהל הוא שחקני VIP, לקוחות מכירות, עובדים באזורים שונים, לקוחות הנהלה או משתתפי אירועים, הפרויקט נבנה סביב הקהל, האירוע והמורכבות." }],
    },
    {
      ...en.pages[3],
      title: "תהליך",
      eyebrow: "איך זה עובד",
      intro: "פרויקט מתנות טוב צריך גם טעם וגם ביצוע. MorePower2You שומרת על דרך ברורה מאפיון ועד שילוח.",
      primaryCta: { label: "התחילו פרויקט מתנות מותאם", href: "/he/contact" },
      secondaryCta: { label: "ראו שירותים", href: "/he/services" },
      seo: { title: "איך עובד פרויקט מתנות ארגוניות | MorePower2You", description: "תהליך הכולל אפיון, אוצרות, התאמה, אריזה, אחסון, מילוי, שילוח וליווי.", keywords: ["תהליך מתנות ארגוניות"] },
      blocks: [{ title: "תהליך ברור לעבודה מותאמת.", text: "כל פרויקט מתוכנן ומתומחר לפי היקף. התהליך מסודר מספיק לתוכניות גדולות וגמיש מספיק לפתרון בעיות בסגנון קונסיירז'." }],
    },
    {
      ...en.pages[4],
      title: "גלריה",
      eyebrow: "כיוון חזותי והקשר של מתנות",
      intro: "הגלריה שומרת את הקשר קופסאות המתנה מהאתר הנוכחי ומכוונת לשפה חזותית נקייה ופרימיום יותר.",
      seo: { title: "גלריית מתנות | MorePower2You", description: "גלריית הקשר למתנות, קופסאות ממותגות, אריזה ולוגיסטיקה.", keywords: ["גלריית מתנות", "קופסאות מתנה"] },
      blocks: [{ title: "התמונות הן פלייסהולדר עד יצירת תמונות פרימיום.", text: "חבילת הפרומפטים מתעדת את הכיוון: רקעים ניטרליים חמים, אריזות יוקרה, ללא לוגואים מזויפים וללא מראה סלסלות זול." }],
    },
    {
      ...en.pages[5],
      title: "פרופילי פרויקטים",
      eyebrow: "פרופילים אנונימיים וסוגי פרויקטים לדוגמה",
      intro: "הפרופילים מסומנים בבירור כתרחישי תכנון ולא כטענות ללקוחות בשם.",
      seo: { title: "פרופילי מתנות ארגוניות | MorePower2You", description: "פרופילים לדוגמה למתנות VIP, חגים, אחסון, מילוי וערכות השקה.", keywords: ["פרופילי מתנות", "דוגמאות מתנות VIP"] },
      blocks: [{ title: "השתמשו בפרופילים כדי לפתוח שיחה חכמה יותר.", text: "כל פרופיל מציג אתגר, גישה ותוצאה בלי להמציא שמות לקוחות או נתונים לא מבוססים." }],
    },
    {
      ...en.pages[6],
      title: "המלצות",
      eyebrow: "מה לקוחות העריכו באתר הקיים",
      intro: "משמעות ההמלצות הנוכחיות נשמרה ושוכתבה בצורה מקצועית, ברורה ואמינה.",
      seo: { title: "המלצות לקוחות | MorePower2You", description: "המלצות על אחסון, מילוי, רעיונות למתנות ותיאום פרויקטים.", keywords: ["המלצות MorePower2You"] },
    },
    {
      ...en.pages[7],
      title: "שאלות נפוצות",
      eyebrow: "תשובות לתכנון",
      intro: "תשובות לחברות שמתכננות מתנות ארגוניות, קופסאות ממותגות, מתנות VIP, אחסון ודיוור.",
      seo: { title: "שאלות נפוצות על מתנות ארגוניות | MorePower2You", description: "שאלות ותשובות על מתנות ארגוניות, קופסאות ממותגות, אחסון ושילוח.", keywords: ["שאלות נפוצות מתנות"] },
    },
    {
      ...en.pages[8],
      title: "פניית פרויקט",
      eyebrow: "התחילו פרויקט מתנות מותאם",
      intro: "ספרו ל-MorePower2You מה אתם מתכננים. הטופס שואל על היקף, לוחות זמנים, יעדים וצרכי התאמה, ולא על תקציב ציבורי.",
      seo: { title: "התחילו פרויקט מתנות מותאם | MorePower2You", description: "יצירת קשר לפרויקטי מתנות ארגוניות, VIP, קופסאות ממותגות, אחסון ושילוח.", keywords: ["פניית פרויקט מתנות"] },
      blocks: [{ title: "מה קורה עכשיו", text: "בקשת הפרויקט התקבלה. נבחן את הפרטים ונחזור עם הצעדים הבאים.", items: [{ title: "אין חנות אונליין", text: "כל פרויקט נבחן ומתומחר לפי צרכים." }, { title: "אין CTA טלפוני", text: "הטופס הוא ערוץ הקליטה המרכזי." }, { title: "אין העלאת קבצים", text: "קבצים יתואמו בהמשך אם צריך." }] }],
    },
    {
      ...en.pages[9],
      title: "הודעת נתונים וטפסים",
      eyebrow: "גילוי פשוט על נתונים",
      intro: "האתר משתמש בטופס פנייה לפרויקט, מערכת CMS, משלוח אימייל והגנת ספאם. האתר אינו כולל סקריפטים נפרדים לאנליטיקה.",
      seo: { title: "הודעת נתונים וטפסים | MorePower2You", description: "הודעת נתונים וטפסים עבור אתר MorePower2You.", keywords: ["הודעת נתונים", "טופס פנייה"] },
      blocks: [{ title: "נתוני טופס ושירותים", text: "טופס הפנייה אוסף את פרטי הקשר והפרויקט שהמבקר שולח. האתר משתמש גם ב-Sanity CMS, Resend למשלוח אימיילים, Cloudflare Turnstile להגנת ספאם ו-Vercel לאחסון." }],
    },
  ],
  services: en.services.map((service) => ({
    ...service,
    title:
      service.slug === "corporate-gifting"
        ? "קמפיינים של מתנות ארגוניות"
        : service.slug === "custom-gift-boxes"
          ? "קופסאות מתנה ממותגות"
          : service.slug === "concierge-services"
            ? "שירותי קונסיירז'"
            : service.slug === "fulfillment-warehousing-distribution"
              ? "מילוי, אחסון והפצה"
              : "גיימינג ומתנות לשחקני VIP",
    eyebrow:
      service.slug === "gaming-vip-player-gifting" ? "עמוד תעשייה ייעודי" : "שירות מרכזי",
    summary:
      service.slug === "gaming-vip-player-gifting"
        ? "תוכניות מתנות פרימיום לחברות גיימינג, אפליקציות קזינו, שחקני VIP, לקוחות מובילים ותוכניות נאמנות."
        : "שירות מותאם לחברות שרוצות מתנות ברמה גבוהה, עם תיאום, אריזה, אחסון ושילוח לפי היקף.",
    intro:
      service.slug === "gaming-vip-player-gifting"
        ? "מותגי גיימינג מחזיקים קהלים מעורבים במיוחד. MorePower2You עוזרת להפוך נאמנות, אבני דרך ועונות למתנות מוחשיות שמרגישות פרימיום ובטוחות למותג."
        : "MorePower2You עוזרת לתכנן ולבצע פרויקט מתנות מדויק, מלוטש ומאורגן תפעולית.",
    primaryCta: { label: "התחילו פרויקט", href: "/he/contact" },
    secondaryCta: { label: "ראו את התהליך", href: "/he/process" },
    seo: {
      title: `${service.title} | MorePower2You`,
      description: service.seo.description,
      keywords: service.seo.keywords,
    },
    blocks: [
      {
        title:
          service.slug === "gaming-vip-player-gifting"
            ? "מתנות לשחקני VIP, לקוחות מובילים וקהילות נאמנות."
            : "אסטרטגיה, מוצרים, אריזה וביצוע במקום אחד.",
        text:
          service.slug === "gaming-vip-player-gifting"
            ? "תוכניות יכולות לתמוך באפליקציות קזינו, RPG, משחקי פעולה והרפתקה, משחקי אסטרטגיה, שחקני VIP, תוכניות נאמנות, אבני דרך, דרופים עונתיים וקמפיינים להוקרה."
            : "הפרויקט מתוכנן סביב קהל, אירוע, היקף, צרכי מיתוג, אחסון, יעד ולוח זמנים.",
        items: [
          { title: "התאמה לקהל", text: "לקוחות, עובדים, מנהלים, שחקני VIP, משתתפי אירועים או חשבונות חשובים." },
          { title: "התאמה להיקף", text: "מתאים מפרויקטים קטנים ועד קמפיינים גדולים, כולל פרויקטים נבחרים מעל 5,000 מתנות." },
          { title: "התאמה למותג", text: "מוצרים, אריזה, אינסרטים ומסר שמרגישים חלק מהמותג." },
        ],
      },
    ],
  })),
  industries: [
    { title: "חברות גיימינג ואפליקציות קזינו", text: "מתנות לשחקני VIP, אבני דרך, נאמנות, דרופים עונתיים והוקרת לקוחות מובילים." },
    { title: "חברות טכנולוגיה", text: "מתנות ללקוחות, עובדים, השקות, אונבורדינג ואירועים." },
    { title: "חברות נדלן", text: "מתנות סגירה, הוקרת מפנים, קמפיינים ליזמים ומתנות VIP." },
    { title: "חברות פיננסים", text: "הוקרת לקוחות פרימיום, מתנות הנהלה, אבני דרך ותהליכי מתנות מסודרים." },
    { title: "אירוח ומלונאות", text: "מתנות לאורחים, ערכות VIP, אירועים ותוכניות עונתיות." },
    { title: "ארגוני בריאות", text: "הוקרת עובדים, שותפים, תורמים, קופסאות בריאות ואירועים." },
    { title: "חברות אירועים", text: "ערכות השקה, מתנות למשתתפים, קופסאות ספונסרים ודיוור לאחר אירוע." },
    { title: "שיווק, HR ותפעול", text: "שותף פרקטי לצוותים שרוצים שהמתנות יטופלו בטעם ובסדר." },
  ],
  testimonials: [
    { name: "Dani L.", context: "אחסון ומילוי חוזר", quote: "היינו צריכים לאחסן מוצרים ולשלוח אותם מדי חודש. MorePower2You הפכה את התהליך לפשוט, עם אחסון בטוח ומילוי אמין בכל פעם שנדרש." },
    { name: "Tyler M.", context: "תיאום פרויקט מורכב", quote: "MorePower2You ניהלה פרויקט תוכנה מפורט משלב התיאום ועד אישור השלמה. הסבלנות, הדיוק וההבנה של הצרכים שלנו גרמו לפרויקט לרוץ חלק, ואנחנו ממשיכים לעבוד איתם." },
    { name: "Brandi E.", context: "מתנות ללקוחות", quote: "המתנות ללקוחות שלנו היו נהדרות. הם הביאו רעיונות חכמים, עזרו לנו ליצור בדיוק את מה שרצינו, הציגו הכול בצורה מקצועית ושלחו בזמן." },
    { name: "Charlene R.", context: "רעיונות לקהל מגוון", quote: "היינו צריכים רעיונות לקבוצת לקוחות גדולה ומגוונת. MorePower2You הביאה אפשרויות יצירתיות ומחושבות, והצוות שלנו ראה את ההשקעה בכל המלצה." },
  ],
  faqs: [
    { question: "אילו פרויקטי מתנות אפשר לבצע?", answer: "קמפיינים ארגוניים, קופסאות ממותגות, מתנות VIP, הוקרת עובדים, מתנות עונתיות, ערכות אירוע, השקות, אבני דרך, אחסון, מילוי, הפצה, דיוור ופרויקטי קונסיירז'." },
    { question: "האם אפשר לטפל בהיקפים גדולים?", answer: "כן. האתר מדגיש מתנות ארגוניות בהיקף גדול, וניתן לציין שפרויקטים נבחרים כללו מעל 5,000 מתנות. גם פרויקטים קטנים יותר אפשריים כאשר הם מתאימים." },
    { question: "האם יש מחירים קבועים?", answer: "לא. כל פרויקט מתומחר לפי מספר מקבלים, תמהיל מוצרים, התאמה אישית, אריזה, אחסון, שילוח, מספר יעדים ולוח זמנים." },
    { question: "האם ניתן למתג או להתאים מתנות?", answer: "כן. קופסאות, אינסרטים, אריזה ומוצרים נבחרים יכולים להיות ממותגים או מותאמים לפי היקף וזמינות." },
    { question: "האם יש שילוח בארץ ובעולם?", answer: "ניתן לתכנן פרויקטים ודיוור ליעדים בארץ ובעולם, בהתאם למוצרים, רשימת יעדים ולוחות זמנים." },
    { question: "האם הטופס שואל על תקציב?", answer: "לא. הטופס שואל על היקף הפרויקט כדי להתמקד בקהל, לוח זמנים, התאמה ולוגיסטיקה." },
    { question: "האם אפשר לאחסן מוצרים ולשלוח בהמשך?", answer: "כן. אחסון ותכנון מלאי יכולים להיות חלק מהפרויקט, כולל מילוי חוזר או מדורג." },
    { question: "האם יש התמחות בגיימינג ושחקני VIP?", answer: "כן. קיים עמוד ייעודי לאפליקציות קזינו, RPG, פעולה והרפתקה, אסטרטגיה, שחקני VIP, נאמנות ואבני דרך." },
    { question: "האם יש חנות אונליין?", answer: "לא. האתר מיועד לפניות לפרויקטים מותאמים, לא לרכישה ציבורית." },
    { question: "האם מוצגים טלפון או כתובת?", answer: "לא. האתר משתמש בשפת אזורי שירות ובטופס פנייה כערוץ מרכזי." },
  ],
  gallery: en.gallery.map((item) => ({
    ...item,
    title:
      item.title === "Custom box presentation"
        ? "הצגת קופסה מותאמת"
        : item.title === "Seasonal gifting"
          ? "מתנות עונתיות"
          : item.title === "Unboxing experience"
            ? "חוויית פתיחה"
            : item.title === "Branded gift context"
              ? "הקשר של מתנה ממותגת"
              : item.title === "Mass mailing support"
                ? "תמיכה בדיוור המוני"
                : "אוצרות קונסיירז'",
    text: "תמונה מתוך הקשר האתר הקיים, עד להחלפה בתמונות פרימיום חדשות לפי חבילת הפרומפטים.",
  })),
  caseStudies: en.caseStudies.map((item) => ({
    ...item,
    label: item.label === "Anonymous Project Profile" ? "פרופיל אנונימי" : "סוג פרויקט לדוגמה",
    title:
      item.slug === "vip-player-milestone-drop"
        ? "דרופ אבן דרך לשחקני VIP"
        : item.slug === "holiday-corporate-gifting-program"
          ? "קמפיין מתנות לחגים"
          : item.slug === "recurring-storage-fulfillment"
            ? "אחסון ומילוי חוזר"
            : "ערכת השקה ואירוע ממותגת",
    summary: "תרחיש תכנון אנונימי שמציג צורך, גישה ותוצאה אפשרית בלי לטעון ללקוח בשם.",
    challenge: "הצוות צריך מתנה שמרגישה מדויקת ומאורגנת בלי לנהל את כל הפרטים לבד.",
    approach: "MorePower2You יכולה לסייע באוצרות מוצרים, אריזה, אינסרטים, אחסון, מילוי ושילוח לפי הצורך.",
    outcome: "חוויית מתנה מלוטשת שתומכת בהוקרה, נאמנות וזכירות.",
  })),
  posts: en.posts.map((post) => ({
    ...post,
    title:
      post.slug === "corporate-gifting-strategy-at-scale"
        ? "איך לתכנן קמפיין מתנות ארגוניות שמרגיש אישי גם בהיקף גדול"
        : post.slug === "vip-player-gifting-gaming-brands"
          ? "מתנות לשחקני VIP במותגי גיימינג: הוקרה מעבר למסך"
          : post.slug === "holiday-gifting-timeline"
            ? "ציר זמן למתנות חגים: מתי להתחיל ומה להחליט קודם"
            : post.slug === "premium-custom-branded-gift-boxes"
              ? "מה גורם לקופסת מתנה ממותגת להרגיש פרימיום?"
              : post.slug === "gift-fulfillment-logistics-questions"
                ? "שאלות לוגיסטיקה לפני דרופ מתנות גדול"
                : post.title,
    excerpt: post.status === "published" ? "מאמר מקצועי וקצר לתכנון פרויקט מתנות מדויק ואמין." : "טיוטת CMS לפיתוח עתידי.",
    seo: { ...post.seo, title: post.title, description: post.excerpt },
    sections:
      post.status === "published"
        ? [
            { title: "להתחיל מהקהל", text: "ההחלטות החשובות ביותר הן מי מקבל, כמה מקבלים, לאן שולחים ומה הרגע שהמתנה אמורה לחזק." },
            { title: "לחבר קריאייטיב ותפעול", text: "מוצר יפה לא מספיק בלי אריזה, נתוני יעדים, אחסון, לוח זמנים ומילוי מסודר." },
            { title: "להשאיר מקום להתאמה", text: "פרויקטים טובים מאפשרים מיתוג, שכבות VIP והבדלים בין קבוצות בלי לאבד עקביות." },
          ]
        : [{ title: "הערת טיוטה", text: "טיוטת CMS לפיתוח עתידי." }],
  })),
  resources: en.resources.map((resource) => ({
    ...resource,
    title:
      resource.slug === "corporate-gifting-planning-checklist"
        ? "צ'קליסט לתכנון מתנות ארגוניות"
        : resource.slug === "holiday-gift-campaign-timeline"
          ? "ציר זמן לקמפיין מתנות חגים"
          : "מדריך אסטרטגיית מתנות ללקוחות VIP",
    summary: "עמוד משאב פתוח לתכנון פרויקט מתנות. בעתיד ניתן להמיר אותו ל-PDF.",
    sections: [
      { title: "קהל", text: "הגדירו קבוצות מקבלים, היקף, שכבות, קשר למותג וצרכי התאמה אישית." },
      { title: "אירוע", text: "האם זו מתנת חג, הוקרת לקוחות, VIP, עובדים, אירוע, השקה או אבן דרך." },
      { title: "תפעול", text: "רכזו יעדים, רשימות, אחסון, התאמה, אריזה ולוח זמנים." },
    ],
  })),
  legal: [
    {
      ...en.legal[0],
      title: "מדיניות פרטיות",
      eyebrow: "פרטיות",
      intro: "מדיניות פרטיות ראשונית זו מיועדת להכנה להשקה ויש לבחון אותה משפטית לפני פרסום.",
      seo: { title: "מדיניות פרטיות | MorePower2You", description: "מדיניות פרטיות עבור MorePower2You.", keywords: ["מדיניות פרטיות"] },
      blocks: [
        { title: "מידע שנאסף", text: "טופס הפנייה אוסף פרטי קשר ופרויקט שהמבקר מוסר מרצונו." },
        { title: "שימוש במידע", text: "המידע משמש לבדיקת בקשות, חזרה עם צעדים הבאים וניהול סטטוס פנימי." },
        { title: "שירותים חיצוניים", text: "האתר מוכן ל-Sanity, Resend, Cloudflare Turnstile ו-Vercel." },
      ],
    },
    {
      ...en.legal[1],
      title: "תנאים והגבלות",
      eyebrow: "תנאים",
      intro: "תנאים ראשוניים אלה מיועדים למידע בלבד ויש לבחון אותם משפטית לפני פרסום.",
      seo: { title: "תנאים והגבלות | MorePower2You", description: "תנאים והגבלות עבור MorePower2You.", keywords: ["תנאים"] },
      blocks: [
        { title: "היקף פרויקט מותאם", text: "כל פרויקט מתנות וקונסיירז' מוגדר לפי היקף. הצעה, לוח זמנים, זמינות מוצר או תמחור יאושרו בכתב." },
        { title: "אין חנות אונליין", text: "האתר אינו מוכר מוצרים ברכישה ציבורית אלא אוסף פניות לפרויקטים מותאמים." },
        { title: "דיוק תוכן", text: "השירותים, המוצרים ולוחות הזמנים עשויים להשתנות לפי היקף וזמינות ספקים." },
      ],
    },
  ],
};

export const content: Record<Locale, SiteContent> = { en, he };

export const locales: Locale[] = ["en", "he"];
