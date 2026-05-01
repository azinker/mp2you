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
  "locale": "he",
  "direction": "rtl",
  "settings": {
    "siteName": "MorePower2You",
    "tagline": "הכוח של מתנה מדויקת, מותאם לתוכניות ארגוניות מודרניות.",
    "contactNote": "פניות לפרויקטים מתקבלות דרך הטופס המאובטח.",
    "serviceArea": "תמיכה בפרויקטי מתנות, קונסיירז', פולפילמנט, אחסון ושילוח בארץ ובעולם.",
    "legacyPrivateAddressNote": "עמוד הקשר הישן בוורדפרס הציג כתובת בפיניקס. אין לפרסם כתובת פיזית ללא אישור."
  },
  "nav": [
    {
      "label": "שירותים",
      "href": "/he/services"
    },
    {
      "label": "גיימינג ו-VIP",
      "href": "/he/gaming-vip-player-gifting"
    },
    {
      "label": "תהליך",
      "href": "/he/process"
    },
    {
      "label": "גלריה",
      "href": "/he/gallery"
    },
    {
      "label": "תובנות",
      "href": "/he/insights"
    },
    {
      "label": "צור קשר",
      "href": "/he/contact"
    }
  ],
  "footer": {
    "description": "MorePower2You מתכננת, רוכשת, מתאימה אישית, אורזת, מאחסנת, מבצעת ומספקת פרויקטים של מתנות ושירותי קונסיירז' לחברות הזקוקות לטיפול קפדני בכל פרט ופרט.",
    "columns": [
      {
        "title": "חברה",
        "links": [
          {
            "label": "אודות",
            "href": "/he/about"
          },
          {
            "label": "למי אנחנו מתאימים",
            "href": "/he/who-we-serve"
          },
          {
            "label": "המלצות",
            "href": "/he/testimonials"
          },
          {
            "label": "שאלות נפוצות",
            "href": "/he/faqs"
          }
        ]
      },
      {
        "title": "שירותים",
        "links": [
          {
            "label": "מתנות ארגוניות",
            "href": "/he/corporate-gifting"
          },
          {
            "label": "קופסאות מתנה בהתאמה אישית",
            "href": "/he/custom-gift-boxes"
          },
          {
            "label": "שירותי קונסיירז'",
            "href": "/he/concierge-services"
          },
          {
            "label": "פולפילמנט",
            "href": "/he/fulfillment-warehousing-distribution"
          }
        ]
      },
      {
        "title": "תכנון",
        "links": [
          {
            "label": "מקרי בוחן",
            "href": "/he/case-studies"
          },
          {
            "label": "משאבים",
            "href": "/he/resources/corporate-gifting-planning-checklist"
          },
          {
            "label": "מדיניות פרטיות",
            "href": "/he/privacy-policy"
          },
          {
            "label": "תנאים",
            "href": "/he/terms-and-conditions"
          }
        ]
      }
    ]
  },
  "home": {
    "seo": {
      "title": "מתנות ארגוניות, מתנות VIP ולוגיסטיקה | MorePower2You",
      "description": "מתנות ארגוניות יוקרתיות מוכנות לשימוש, קופסאות מתנה ממותגות בהתאמה אישית, שירותי קונסיירז', אחסון, מילוי הזמנות ותוכניות מתנות VIP לחברות בכל הגדלים.",
      "keywords": [
        "מתנות ארגוניות",
        "קופסאות מתנה בהתאמה אישית",
        "מתנות VIP",
        "מתנות לשחקני גיימינג",
        "הפקת מתנות"
      ]
    },
    "hero": {
      "eyebrow": "מתנות, קונסיירז' ופולפילמנט מקצה לקצה",
      "title": "מתנות ארגוניות בהתאמה אישית, מהרעיון ועד פתח הדלת.",
      "text": "MorePower2You יוצרת תוכניות מתנות יוקרתיות, קופסאות מתנה ממותגות, משלוחי VIP, קמפיינים עונתיים ופרויקטי קונסיירז' מורכבים הכוללים רכש, אריזה, אחסון, פולפילמנט, שילוח ותמיכה תחת קורת גג אחת.",
      "proof": [
        "פרויקטים נבחרים של יותר מ-5,000 מתנות",
        "פריסה ארצית ובינלאומית",
        "ממזון ועד אלקטרוניקה, וכל מה שביניהם"
      ],
      "primaryCta": {
        "label": "התחילו פרויקט מתנות מותאם",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "ראו איך זה עובד",
        "href": "/he/process"
      }
    },
    "proof": [
      {
        "title": "פתרון מקיף",
        "text": "קונספט, רכש, התאמה אישית, אריזה, אחסון, פולפילמנט, שילוח ותמיכה בפרויקט."
      },
      {
        "title": "גמישות בקנה מידה",
        "text": "מיועד לקמפיינים בהיקפים גדולים, תוך שמירה על יכולת לתמוך בפרויקטים קטנים יותר שהיקפם מוגדר בקפידה."
      },
      {
        "title": "התאמה יוקרתית",
        "text": "שותף מקצועי ומובחר לתחומי השיווק, משאבי אנוש, תפעול, צוותי הנהלה, אירועים ותוכניות ללקוחות VIP."
      }
    ],
    "whatWeDo": {
      "eyebrow": "מה עושה MorePower2You",
      "title": "שירותי מתנות מיוחדות ושירותי קונסיירז' תחת קורת גג אחת.",
      "text": "העבודה מתחילה במטרה בתחום המתנות ומסתיימת בתוכנית מוגמרת שאנשים שמחים לקבל. MorePower2You יכולה לעצב את הקונספט, לאתר את המוצרים הנכונים, לתאם אריזות ממותגות, לנהל את האחסון, להרכיב משלוחים ולתמוך בפרטי המשלוח ליעדים מקומיים ובינלאומיים.",
      "items": [
        {
          "title": "קמפיינים למתנות ארגוניות",
          "text": "הוקרת לקוחות, הוקרת עובדים, ערכות השקה, מתנות לאירועים ותוכניות עונתיות."
        },
        {
          "title": "מתנות VIP ומתנות נאמנות",
          "text": "מתנות יוקרתיות ללקוחות מובחרים, שחקנים VIP, אירועים חשובים ותוכניות שימור לקוחות."
        },
        {
          "title": "קופסאות ממותגות בהתאמה אישית",
          "text": "אריזה, עלונים, מגוון מוצרים, התאמה אישית ומצגת ממותגת."
        },
        {
          "title": "פולפילמנט ודיוור המוני",
          "text": "אחסון, הרכבת ערכות, תיאום יעד ותמיכה במשלוחים."
        }
      ]
    },
    "process": [
      {
        "title": "גלה",
        "text": "יש להבהיר את קהל היעד, האירוע, היקף הנמענים, היעדים, העיתוי וצרכי ההתאמה האישית."
      },
      {
        "title": "לערוך",
        "text": "יש לפתח אפשרויות מוצר ואריזה מתחשבות, המתאימות למותג ולרגע."
      },
      {
        "title": "התאמה אישית",
        "text": "יש לתאם בין פריטי המותג, העלונים המודפסים, האריזה, ההתאמה האישית ופרטי ההצגה."
      },
      {
        "title": "חבילה",
        "text": "הרכבת קופסאות מתנה, ערכות ויחידות מוכנות למשלוח תוך יצירת חוויה מהוקצעת עבור הנמען."
      },
      {
        "title": "אחסון ולוגיסטיקה",
        "text": "תמיכה באחסון, הכנת מלאי, דיוור המוני וצרכי משלוח חוזרים."
      },
      {
        "title": "מסור",
        "text": "הכנת פרויקטים למשלוח ארצי או בינלאומי עם טיפול מסודר ביעד."
      },
      {
        "title": "תמיכה",
        "text": "הקפידו על התקדמות הפרויקט באמצעות תיאום קונסיירז' זמין ומגיב מתחילתו ועד סופו."
      }
    ],
    "featured": [
      {
        "eyebrow": "גיימינג ומתנות לשחקני VIP",
        "title": "רגעי נאמנות שחורגים מגבולות המסך.",
        "text": "עבור אפליקציות קזינו, משחקי תפקידים (RPG), משחקי פעולה/הרפתקאות, משחקי אסטרטגיה ותוכניות לקוחות VIP, MorePower2You יכולה לסייע בעיצוב מתנות ברמה הגבוהה ביותר לציוני דרך של שחקנים, מבצעים עונתיים, הכרת תודה על נאמנות והוקרת לקוחות בעלי ערך גבוה.",
        "items": [
          {
            "title": "שחקנים VIP",
            "text": "מתנות לציון אבני דרך, הכרה במעמד, קמפיינים לשימור לקוחות, ומשלוחים מפתיעים ומשמחים."
          },
          {
            "title": "מותגי גיימינג",
            "text": "אסטרטגיות מתנות המעניקות תחושה של פריטי אספנות, יוקרה ובטיחות למותג, ללא שימוש בתווים מוגנים או בלוגואים מזויפים."
          }
        ]
      },
      {
        "eyebrow": "קופסאות מתנה בהתאמה אישית",
        "title": "חווית פתיחת אריזה ממותגת ללא העול התפעולי.",
        "text": "מממתקים יוקרתיים ומוצרי בריאות ועד מוצרי אלקטרוניקה, פריטי דפוס, ביגוד, מוצרי שולחן עבודה וקונספטים מותאמים אישית לחלוטין, כל אריזה יכולה להיות מותאמת לקהל היעד, לאירוע ולהיקף התקציב.",
        "items": [
          {
            "title": "נקודות התחלה גמישות",
            "text": "הוקרת VIP, מתנות לחגים, ערכות קבלת פנים, ערכות לאירועים, הוקרת עובדים ופרויקטים מותאמים אישית של שירותי קונסיירז'."
          },
          {
            "title": "אין מחירים קבועים לציבור",
            "text": "הצעת המחיר לכל פרויקט נקבעת על פי מספר הנמענים, המוצרים, ההתאמה האישית, האריזה, הלוגיסטיקה ולוח הזמנים."
          }
        ]
      },
      {
        "eyebrow": "פולפילמנט, אחסון והפצה",
        "title": "השכבה הלוגיסטית השקטה שמאחורי מתנה מהוקצעת.",
        "text": "MorePower2You יכולה לתמוך באחסון מאובטח, מלאי מדורג, משלוחים חוזרים, רשימות יעדים נרחבות, דיוור המוני והפצה מתואמת עבור פרויקטים הזקוקים ליותר מרעיון למתנה.",
        "items": [
          {
            "title": "ארצי ובינלאומי",
            "text": "תכנון הפרויקט יכול להתחשב בצרכים של יעדים מקומיים ובינלאומיים."
          },
          {
            "title": "מוכן להיקפים גדולים",
            "text": "פרויקטים נבחרים כללו מעל 5,000 מתנות, אך אנו מקבלים בברכה גם פרויקטים בהיקף קטן יותר, כאשר הם מתאימים לנו."
          }
        ]
      }
    ],
    "occasions": [
      "מתנות לחגים",
      "מתנות לחג המולד",
      "מתנות ליום הולדת",
      "חג הפסחא ומתנות עונתיות",
      "הוקרת לקוחות",
      "הוקרת שחקנים ולקוחות VIP",
      "הוקרת עובדים",
      "מתנות לאירועים",
      "מתנות לרגל השקת מוצר",
      "מתנות לציון אירועים חשובים",
      "מתנות במסגרת תוכנית נאמנות"
    ],
    "finalCta": {
      "title": "תביאו את הרעיון. אנחנו נעזור לעצב את התוכנית.",
      "text": "ציינו את סוג הפרויקט, קהל היעד, היקף הפרויקט, דרישות היעד ולוח הזמנים. MorePower2You יבדוק את הפרטים וימשיך עם השלבים הבאים.",
      "items": [
        {
          "title": "קריאה לפעולה עיקרית",
          "text": "התחילו פרויקט מתנות מותאמות אישית"
        },
        {
          "title": "קריאה לפעולה משנית",
          "text": "גלו את השירותים"
        }
      ]
    }
  },
  "pages": [
    {
      "slug": "about",
      "title": "אודות MorePower2You",
      "eyebrow": "יחס אישי, תיאום ברמה ארגונית",
      "intro": "MorePower2You הוא שותף המתמחה במתנות, שירותי קונסיירז' ולוגיסטיקה, המיועד לחברות המעוניינות בחוויה מהוקצעת עבור מקבלי המתנות, מבלי לנהל את כל הפרטים בעצמן.",
      "primaryCta": {
        "label": "התחילו פרויקט",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "גלו את השירותים",
        "href": "/he/services"
      },
      "seo": {
        "title": "אודות MorePower2You | קונסיירז' למתנות ארגוניות",
        "description": "גלו כיצד MorePower2You תומכת במתנות ארגוניות, אריזות מתנה מותאמות אישית, פרויקטי קונסיירז', אחסון ולוגיסטיקה עבור תוכניות לאומיות ובינלאומיות.",
        "keywords": [
          "אודות MorePower2You",
          "קונסיירז' למתנות",
          "שותף למתנות ארגוניות"
        ]
      },
      "blocks": [
        {
          "title": "שותף מודרני לפרויקטים הדורשים טיפול ותיאום.",
          "text": "המסר המקורי של MorePower2You היה פשוט: לשלב מתנות מיוחדות ושירותי קונסיירז' כדי להפוך רעיון לפתרון מקצה לקצה. האתר החדש ממשיך את הרעיון הזה עם דגש מעודן יותר על מתנות ארגוניות, קופסאות מתנה ממותגות, תוכניות ללקוחות VIP, אחסון, פולפילמנט ותמיכה בדיוור המוני.",
          "items": [
            {
              "title": "מכמויות קטנות ועד כמויות גדולות",
              "text": "הצוות יכול לתמוך בפרויקטים בכל סדר גודל, עם דגש חזק על קמפיינים ארגוניים גדולים."
            },
            {
              "title": "מותאם אישית מטבעו",
              "text": "רעיונות למתנות יכולים לכלול מוצרים הנעים ממזון ועד מוצרי אלקטרוניקה וכל מה שביניהם."
            },
            {
              "title": "שפה בתחום השירותים",
              "text": "החברה תומכת בפעילות ארצית ובינלאומית מבלי לפרסם כתובת פיזית פומבית."
            }
          ]
        }
      ]
    },
    {
      "slug": "services",
      "title": "שירותים",
      "eyebrow": "אסטרטגיית מתנות, אריזה, שירותי קונסיירז' ולוגיסטיקה",
      "intro": "MorePower2You מאחדת בין הצד היצירתי לצד התפעולי של מתנות, ומסייעת לחברות להתקדם מרעיון גולמי לתוכנית מוגמרת.",
      "primaryCta": {
        "label": "התחילו פרויקט מתנות מותאמות אישית",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "ראו את התהליך",
        "href": "/he/process"
      },
      "seo": {
        "title": "שירותי מתנות ארגוניות | אריזות מתנה בהתאמה אישית ולוגיסטיקה",
        "description": "גלו את שירותי MorePower2You: קמפיינים למתנות ארגוניות, אריזות מתנה ממותגות בהתאמה אישית, שירותי קונסיירז', אחסון, מילוי הזמנות, הפצה ודיוור המוני.",
        "keywords": [
          "שירותי מתנות ארגוניות",
          "קופסאות מתנה ממותגות בהתאמה אישית",
          "הפקת מתנות"
        ]
      },
      "blocks": [
        {
          "title": "ארבע דרכים להקל על הפרויקט.",
          "text": "ניתן להשתמש בשירותים בנפרד או לשלבם לפרויקט מנוהל במלואו. הדגש העיקרי הוא על מתנות ארגוניות בקנה מידה גדול, אך ניתן לתמוך גם בפרויקטים מותאמים אישית קטנים יותר כאשר היקף הפרויקט ולוח הזמנים מתאימים."
        }
      ]
    },
    {
      "slug": "who-we-serve",
      "title": "למי אנחנו מתאימים",
      "eyebrow": "לצוותים שרוצים שמתנות ירגישו מחושבות ומדויקות",
      "intro": "האתר מפרסם כעת דף ייעודי בנושא מתנות לשחקנים בתחום הגיימינג ו-VIP, תוך שמירה על מבנה התוכן מוכן לדפים עתידיים בתחום.",
      "primaryCta": {
        "label": "התחילו פרויקט",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "גיימינג ומתנות לשחקני VIP",
        "href": "/he/gaming-vip-player-gifting"
      },
      "seo": {
        "title": "מתנות ארגוניות לתחום הגיימינג, הטכנולוגיה, הפיננסים ועוד",
        "description": "MorePower2You תומכת בתוכניות מתנות עבור מותגי גיימינג, חברות טכנולוגיה, חברות נדל\"ן, צוותי פיננסים, קבוצות מלונאות, ארגוני בריאות, אירועים, צוותי משאבי אנוש וצוותי שיווק.",
        "keywords": [
          "מתנות לעסקים",
          "מתנות בתחום הגיימינג",
          "מתנות הוקרה ללקוחות"
        ]
      },
      "blocks": [
        {
          "title": "שותף גמיש למתנות עבור צוותים רבים.",
          "text": "בין אם קהל היעד הוא קהילת שחקנים VIP, רשימת לקוחות פוטנציאליים, עובדים באזורים שונים, לקוחות בכירים או משתתפי אירועים, ניתן להתאים את הפרויקט לקהל, לאירוע, לטון המותג ולמורכבות התפעולית."
        }
      ]
    },
    {
      "slug": "process",
      "title": "תהליך",
      "eyebrow": "איך זה עובד",
      "intro": "פרויקט מתנות מתחשב דורש גם טעם טוב וגם ביצוע מדויק. MorePower2You מלווה אתכם לאורך כל הדרך, מהאפיון ועד המסירה.",
      "primaryCta": {
        "label": "התחילו פרויקט מתנות מותאמות אישית",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "גלו את השירותים",
        "href": "/he/services"
      },
      "seo": {
        "title": "כיצד מתנהלים פרויקטים של מתנות ארגוניות | MorePower2You",
        "description": "ראו את תהליך MorePower2You לאפיון, אצירת מוצרים, התאמה אישית, אריזה, אחסון, פולפילמנט, משלוח ותמיכה בפרויקטים.",
        "keywords": [
          "תהליך מתנות ארגוניות",
          "תהליך מילוי הזמנות מתנות",
          "פרויקט מתנות מותאמות אישית"
        ]
      },
      "blocks": [
        {
          "title": "תהליך עבודה ברור עבור עבודות מותאמות אישית.",
          "text": "כל התחייבות מתומחרת ומתוכננת בהתאם להיקף העבודה. התהליך מובנה מספיק עבור תוכניות גדולות, אך גמיש מספיק לפתרון בעיות בסגנון קונסיירז'."
        }
      ]
    },
    {
      "slug": "gallery",
      "title": "גלריה",
      "eyebrow": "הנחיות ויזואליות והקשר של מתנות",
      "intro": "הגלריה משמרת את הקשר של קופסת המתנות מהאתר הנוכחי, תוך שהיא מכוונת את המותג החדש לכיוון של תמונות עריכה נקיות יותר ויוקרתיות יותר.",
      "seo": {
        "title": "גלריית מתנות | MorePower2You",
        "description": "עיינו בגלריית MorePower2You כדי להתרשם ממגוון קופסאות מתנה בהתאמה אישית, מתנות מיוחדות, תוכניות ארגוניות, אריזות ורעיונות למתנות מוכנות למשלוח.",
        "keywords": [
          "גלריית קופסאות מתנה",
          "דוגמאות למתנות ארגוניות",
          "מתנות בהתאמה אישית"
        ]
      },
      "blocks": [
        {
          "title": "תמונות הגלריה הן תמונות זמניות עד שייוצרו תמונות הפקה באיכות גבוהה.",
          "text": "חבילת התמונות המצורפת מתעדת את הכיוון הרצוי להחלפה: רקעים ניטרליים וחמימים, אריזות יוקרתיות, ללא לוגואים מזויפים, ללא מותגים מוגנים וללא עיצוב סלי מתנה באיכות נמוכה."
        }
      ]
    },
    {
      "slug": "case-studies",
      "title": "מקרי בוחן",
      "eyebrow": "פרופילים אנונימיים של פרויקטים וסוגי פרויקטים לדוגמה",
      "intro": "מדובר בפרופילים תכנוניים המוגדרים בבירור, ולא בטענות של לקוחות ספציפיים. הם מציגים את סוגי הצרכים ש-MorePower2You בנויה לתמוך בהם.",
      "seo": {
        "title": "מקרי בוחן של מתנות ארגוניות | דוגמאות לסוגי פרויקטים",
        "description": "עיינו בפרופילים אנונימיים של פרויקטים לדוגמה בתחום מתנות לשחקני VIP, מתנות ארגוניות לחגים, תוכניות פולפילמנט וערכות השקה ממותגות.",
        "keywords": [
          "מקרי בוחן בתחום מתנות ארגוניות",
          "דוגמאות למתנות VIP",
          "דוגמאות לפולפילמנט מתנות"
        ]
      },
      "blocks": [
        {
          "title": "השתמש בפרופילים אלה כדי לפתוח בשיחה חכמה יותר.",
          "text": "כל פרופיל מדגיש אתגר נפוץ בתחום המתנות, גישה אפשרית וניסוח של תוצאות, מבלי להמציא שמות לקוחות, פרסים או נתונים סטטיסטיים לא מבוססים."
        }
      ]
    },
    {
      "slug": "testimonials",
      "title": "המלצות",
      "eyebrow": "מה הלקוחות העריכו באתר הנוכחי",
      "intro": "משמעותן של העדויות הקיימות נשמרה, והן נכתבו מחדש באופן מקצועי כדי להקנות להן בהירות, חמימות ואמינות.",
      "seo": {
        "title": "המלצות לקוחות | MorePower2You",
        "description": "קרא את העדויות שנכתבו מחדש תוך שמירה על משמעותן של הביקורות הקיימות על MorePower2You בנושאי אחסון, פולפילמנט, רעיונות למתנות ותיאום פרויקטים.",
        "keywords": [
          "המלצות על MorePower2You",
          "ביקורות על מתנות ארגוניות",
          "המלצה על שירותי מילוי הזמנות מתנות"
        ]
      },
      "blocks": []
    },
    {
      "slug": "faqs",
      "title": "שאלות נפוצות",
      "eyebrow": "תשובות לתכנון",
      "intro": "תשובות ברורות לחברות המתכננות מתנות ארגוניות, אריזות מותאמות אישית, תוכניות VIP, שירותי לוגיסטיקה, אחסון ופרויקטים של דיוור המוני.",
      "seo": {
        "title": "שאלות נפוצות בנושא מתנות ארגוניות | MorePower2You",
        "description": "תשובות לשאלות נפוצות בנושא מתנות מותאמות אישית לחברות, מתנות VIP, אריזות מתנה ממותגות, שירותי לוגיסטיקה, אחסון, לוחות זמנים ומשלוחים בינלאומיים.",
        "keywords": [
          "שאלות נפוצות בנושא מתנות ארגוניות",
          "שאלות נפוצות בנושא שירותי מתנות",
          "שאלות נפוצות על קופסאות מתנה בהתאמה אישית"
        ]
      },
      "blocks": []
    },
    {
      "slug": "contact",
      "title": "בקשת פרויקט",
      "eyebrow": "התחילו פרויקט מתנות מותאמות אישית",
      "intro": "ספר ל-MorePower2You מה אתה מתכנן. הטופס מבקש לציין את היקף הפרויקט, לוח הזמנים, היעדים וצרכי ההתאמה האישית, במקום שדה תקציב ציבורי.",
      "seo": {
        "title": "התחילו פרויקט מתנות מותאמות אישית | MorePower2You",
        "description": "צרו קשר עם MorePower2You לקבלת שירותי מתנות ארגוניות, מתנות לשחקנים VIP, אריזות מתנה ממותגות, שירותי לוגיסטיקה, אחסון, הפצה ותמיכה בפרויקטים של שירותי קונסיירז'.",
        "keywords": [
          "פנייה בנוגע לפרויקט מתנות מותאמות אישית",
          "מתנות ארגוניות יצירת קשר",
          "הצעת מחיר למתנות VIP"
        ]
      },
      "blocks": [
        {
          "title": "מה קורה בהמשך",
          "text": "בקשתכם לפרויקט מתנות התקבלה. נבדוק את הפרטים ונעדכן אתכם לגבי השלבים הבאים.",
          "items": [
            {
              "title": "ללא תהליך תשלום במסחר אלקטרוני",
              "text": "כל פרויקט נבחן ומצוטט בהתאם לצרכים."
            },
            {
              "title": "אין קריאה לפעולה (CTA) בטלפון ציבורי",
              "text": "הטופס הוא ערוץ הקליטה העיקרי לפרטי הפרויקט."
            },
            {
              "title": "אין צורך להעלות קבצים",
              "text": "ניתן לתאם את הקבצים המצורפים בהמשך, במידת הצורך."
            }
          ]
        }
      ]
    },
    {
      "slug": "data-cookies-notice",
      "title": "הודעה בנושא נתונים וטפסים",
      "eyebrow": "גילוי נתונים פשוט",
      "intro": "אתר זה משתמש בטופס בקשת הצעת מחיר, תוכן הנתמך על ידי CMS, משלוח דוא\"ל והגנה מפני דואר זבל. הוא אינו כולל סקריפטים נפרדים למדידה.",
      "seo": {
        "title": "הודעה בנושא נתונים וטפסים | MorePower2You",
        "description": "הודעה בנושא נתונים וטפסים לאתר MorePower2You.",
        "keywords": [
          "הודעת נתונים",
          "טופס הודעה",
          "MorePower2You"
        ]
      },
      "blocks": [
        {
          "title": "נתוני טפסים ושירותים",
          "text": "טופס הפנייה לפרויקט אוסף את פרטי הקשר ופרטי הפרויקט שהמבקר שולח. האתר משתמש גם ב-Sanity CMS, בשירות Resend למשלוח דוא\"ל, בהגנת דואר זבל Cloudflare Turnstile ובשירותי אחסון Vercel."
        }
      ]
    }
  ],
  "services": [
    {
      "order": 1,
      "slug": "corporate-gifting",
      "title": "קמפיינים למתנות ארגוניות",
      "eyebrow": "שירות עיקרי",
      "summary": "תוכניות מתנות ארגוניות בקנה מידה גדול ובסגנון בוטיק עבור לקוחות, עובדים, מנהלים וקהל אירועים.",
      "intro": "MorePower2You מסייעת לחברות לתכנן ולבצע קמפיינים של מתנות ארגוניות המעניקים תחושה אישית, מהוקצעת ומאורגנת מבחינה תפעולית.",
      "primaryCta": {
        "label": "התחילו פרויקט מתנות ארגוניות",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "ראו קופסאות מתנה בהתאמה אישית",
        "href": "/he/custom-gift-boxes"
      },
      "seo": {
        "title": "קמפיינים למתנות ארגוניות | MorePower2You",
        "description": "קמפיינים למתנות ארגוניות יוקרתיות להוקרת לקוחות, הוקרת עובדים, לקוחות VIP, חגים, אירועים, השקות ומתנות לציון אבני דרך.",
        "keywords": [
          "קמפיינים למתנות ארגוניות",
          "מתנות הוקרה ללקוחות",
          "מתנות הוקרה לעובדים"
        ]
      },
      "blocks": [
        {
          "title": "אסטרטגיה, מוצרים, אריזה וביצוע במקום אחד.",
          "text": "הקמפיינים יכולים לתמוך במתנות לחגים, מתנות לחג המולד, ימי הולדת, חג הפסחא ואירועים עונתיים, הוקרת לקוחות, הוקרת לקוחות VIP, הוקרת עובדים, השקות מוצרים, מתנות לציון אבני דרך ותוכניות נאמנות.",
          "items": [
            {
              "title": "התאמת קהל היעד",
              "text": "יש לבנות קונספטים למתנות סביב מנהלים, לקוחות, עובדים, אנשי VIP, משתתפי אירועים או לקוחות בעלי ערך גבוה."
            },
            {
              "title": "התאמת היקף",
              "text": "תמיכה בפרויקטים קטנים באמצעות קמפיינים בהיקפים גדולים, כולל פרויקטים נבחרים הכוללים מעל 5,000 מתנות."
            },
            {
              "title": "התאמה למותג",
              "text": "יש לתאם בין המוצרים, האריזה, התוספות והמסרים, כך שהמתנה תתאים לאופי החברה שלכם."
            }
          ]
        }
      ],
      "occasions": [
        "מתנות לחגים",
        "הוקרת לקוחות",
        "הוקרת עובדים",
        "מתנות לרגל השקת מוצר",
        "מתנות לציון אירועים חשובים"
      ]
    },
    {
      "order": 2,
      "slug": "custom-gift-boxes",
      "title": "קופסאות מתנה ממותגות בהתאמה אישית",
      "eyebrow": "אריזה והצגה ברמה גבוהה",
      "summary": "קופסאות מתנה הניתנות להתאמה אישית וערכות ממותגות המכילות מוצרים הנעים ממזון ועד מוצרי אלקטרוניקה.",
      "intro": "קופסת מתנה צריכה לשדר תחושה של בחירה קפדנית, ולא של הרכבה אקראית. MorePower2You יכולה לסייע בעיצוב תמהיל המוצרים, האריזה הממותגת, התוספות המודפסות וחווית המקבל.",
      "primaryCta": {
        "label": "הרכיבו קופסת מתנה בהתאמה אישית",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "צפו בגלריה",
        "href": "/he/gallery"
      },
      "seo": {
        "title": "קופסאות מתנה ממותגות בהתאמה אישית | MorePower2You",
        "description": "יצירת אריזות מתנה מותאמות אישית ומובחרות עבור לקוחות עסקיים, לקוחות VIP, עובדים, אירועים, חגים, השקות ותוכניות נאמנות.",
        "keywords": [
          "קופסאות מתנה בהתאמה אישית",
          "קופסאות מתנה ממותגות",
          "אריזות מתנה עסקיות"
        ]
      },
      "blocks": [
        {
          "title": "נקודות התחלה גמישות, ביצוע מותאם אישית מלא.",
          "text": "מגוון המוצרים עשוי לכלול פינוקים יוקרתיים, מוצרי בריאות, פריטי לייף סטייל, חומרים מודפסים, ביגוד, אביזרי טכנולוגיה, מוצרי אלקטרוניקה ומוצרים אחרים בהתאם להיקף ולזמינות.",
          "items": [
            {
              "title": "הוקרת לקוחות VIP",
              "text": "מתנות יוקרתיות ליחסים עם מנהלים ולרגעים מיוחדים עם לקוחות חשובים."
            },
            {
              "title": "מתנות לעונות השנה ולחגים",
              "text": "תוכניות מתנות לחג המולד, חגים, חג הפסחא, ימי הולדת וסוף השנה."
            },
            {
              "title": "קופסאות קבלת פנים ממותגות",
              "text": "ערכות קליטה וקבלת פנים לעובדים, לקוחות, שותפים או חברים."
            },
            {
              "title": "ערכות לאירועים והשקות",
              "text": "מתנות מוכנות למשלוח בדואר להשקות מוצרים, כנסים, פעילויות שיווק ואירועים מרחוק."
            }
          ]
        }
      ],
      "occasions": [
        "הוקרת VIP",
        "מתנות עונתיות",
        "ערכות קבלת פנים",
        "ערכות לאירועים",
        "הוקרת עובדים"
      ]
    },
    {
      "order": 3,
      "slug": "concierge-services",
      "title": "שירותי קונסיירז'",
      "eyebrow": "תמיכה בפרויקטים מותאמים אישית",
      "summary": "תמיכת קונסיירז' ברמה גבוהה למתנות מיוחדות ולפרויקטים מותאמים שאינם מתאימים לקטלוג סטנדרטי.",
      "intro": "ישנם פרויקטים הזקוקים לשותף שידע לחבר את כל הקצוות, לאתר פריטים יוצאי דופן, לתאם את הפרטים ולהמשיך להניע את העבודה. זה המקום שבו נכנס לתמונה שירות הקונסיירז'.",
      "primaryCta": {
        "label": "תכנון פרויקט קונסיירז'",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "ראו את התהליך",
        "href": "/he/process"
      },
      "seo": {
        "title": "שירותי קונסיירז' ומתנות בהתאמה אישית | MorePower2You",
        "description": "שירותי קונסיירז' ברמה גבוהה למתנות מיוחדות, איתור ספקים מותאם, פרויקטי VIP, אריזות ממותגות, תיאום לוגיסטי ותוכניות מקצה לקצה.",
        "keywords": [
          "קונסיירז' ומתנות",
          "קונסיירז' למתנות בהתאמה אישית",
          "מתנות יוקרתיות"
        ]
      },
      "blocks": [
        {
          "title": "לפרויקט שדורש יותר מרשימת מוצרים.",
          "text": "שירותי הקונסיירז' יכולים לתת מענה לבקשות מיוחדות, לצרכים מותאמים אישית של הנמענים, לאיתור מקורות אספקה, להנחיות אריזה, לתיאום יעד ולתקשורת שוטפת בנוגע לפרויקטים.",
          "items": [
            {
              "title": "פרטי VIP",
              "text": "תמיכה אישית ומותאמת אישית ללקוחות מובילים, שחקנים VIP, מנהלים בכירים ומקבלי מתנות מיוחדים."
            },
            {
              "title": "תיאום מורכב",
              "text": "שותף יחיד שיסייע בארגון כל המרכיבים הנדרשים בתחומי הרכש, ההצגה והביצוע."
            },
            {
              "title": "בהתאמה אישית לפי הצעת מחיר",
              "text": "היקף, לוח זמנים, זמינות מוצרים ולוגיסטיקה מגדירים את התוכנית הסופית."
            }
          ]
        }
      ],
      "occasions": [
        "מתנות VIP",
        "בקשות מיוחדות",
        "מתנות למנהלים",
        "אירועים מיוחדים",
        "פרויקטים מורכבים"
      ]
    },
    {
      "order": 4,
      "slug": "fulfillment-warehousing-distribution",
      "title": "פולפילמנט, אחסון והפצה",
      "eyebrow": "תמיכה באחסון ומשלוחים",
      "summary": "שירותי פולפילמנט, אחסון, הרכבת מתנות, דיוור המוני ותמיכה בהפצה לפרויקטים בארץ ובעולם.",
      "intro": "תוכניות מתנות מצליחות כאשר הלוגיסטיקה מקבלת אותה רמת תשומת לב כמו המתנה עצמה. MorePower2You יכולה לתמוך באחסון, ניהול מלאי מדורג, פולפילמנט ודיוור המוני.",
      "primaryCta": {
        "label": "קבלו תמיכה בפולפילמנט",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "צפו במקרי בוחן",
        "href": "/he/case-studies"
      },
      "seo": {
        "title": "הזמנות מתנות, אחסון והפצה | MorePower2You",
        "description": "פולפילמנט, אחסון, הרכבת מתנות, דיוור המוני, הפצה ותמיכה לוגיסטית בארץ ובעולם לפרויקטים של מתנות ארגוניות.",
        "keywords": [
          "הפקת מתנות",
          "אחסון מתנות",
          "דיוור המוני",
          "הפצת מתנות"
        ]
      },
      "blocks": [
        {
          "title": "השכבה התפעולית שמאחורי מתנות בהתאמה אישית.",
          "text": "הפרויקטים עשויים לכלול אחסון מוצרים, תכנון המותאם לתנאי אקלים במידת הצורך, הכנת מלאי, הרכבת ערכות, משלוחים חוזרים, תיאום יעד ותמיכה בדיוור.",
          "items": [
            {
              "title": "אחסון",
              "text": "תמיכה במוצרים שיש לאחסן ולשלוח לאורך זמן."
            },
            {
              "title": "דיוור המוני",
              "text": "הפקת מתנות ותכנים ליעדים מקומיים ובינלאומיים."
            },
            {
              "title": "תוכניות חוזרות",
              "text": "תמיכה במשלוחים חודשיים, עונתיים, לציון אירועים חשובים, נאמנות או קמפיינים."
            }
          ]
        }
      ],
      "occasions": [
        "תוכניות בהיקף נרחב",
        "משלוחים חוזרים",
        "דיוור המוני",
        "פרויקטים בינלאומיים",
        "תמיכה באחסון"
      ]
    },
    {
      "order": 5,
      "slug": "gaming-vip-player-gifting",
      "title": "גיימינג ומתנות לשחקני VIP",
      "eyebrow": "דף ייעודי לתעשייה",
      "summary": "תוכניות מתנות יוקרתיות לחברות גיימינג, אפליקציות קזינו, שחקני VIP, לקוחות מובחרים, תוכניות נאמנות ומבצעי ציון דרך.",
      "intro": "למותגי גיימינג יש קהל מעורב במיוחד. MorePower2You עוזרת להפוך נאמנות, אבני דרך, עונות וסטטוס VIP לרגעי מתנה מוחשיים, המרגישים יוקרתיים ובטוחים למותג.",
      "primaryCta": {
        "label": "תכננו מתנה לשחקני VIP",
        "href": "/he/contact"
      },
      "secondaryCta": {
        "label": "גלו מתנות ארגוניות",
        "href": "/he/corporate-gifting"
      },
      "seo": {
        "title": "גיימינג ומתנות לשחקני VIP | MorePower2You",
        "description": "מתנות מותאמות אישית לשחקני VIP עבור אפליקציות קזינו, משחקי תפקידים, משחקי פעולה/הרפתקאות, משחקי אסטרטגיה, תוכניות נאמנות, מתנות לציון אבני דרך, מבצעים עונתיים והוקרת לקוחות בעלי ערך גבוה.",
        "keywords": [
          "מתנות בתחום הגיימינג",
          "מתנות לשחקנים VIP",
          "מתנות לאפליקציית קזינו",
          "מתנות בתוכנית נאמנות"
        ]
      },
      "blocks": [
        {
          "title": "מתנות לשחקנים VIP, לקוחות מובחרים וקהילות נאמנות.",
          "text": "התוכניות יכולות לתמוך במותגי אפליקציות קזינו, משחקי תפקידים (RPG), משחקי פעולה/הרפתקאות, משחקי אסטרטגיה, פלחי שחקנים VIP, לקוחות בעלי ערך גבוה, תוכניות נאמנות, מתנות לציון אבני דרך, מבצעים עונתיים וקמפיינים להבעת הערכה.",
          "items": [
            {
              "title": "ציוני דרך",
              "text": "ציינו ימי נישואין של שחקנים, רמות הוצאות, אבני דרך בדירוג, רגעי טורנירים או הישגי נאמנות."
            },
            {
              "title": "קמפיינים עונתיים",
              "text": "צרו מתנות לחגים, ימי הולדת, השקות או מתנות לזמן מוגבל, שירגישו כמו פריטי אספנות ומותאמות אישית."
            },
            {
              "title": "יצירתיות התואמת את המותג",
              "text": "יש להשתמש באריזה כללית יוקרתית ובהנחיות מותאמות אישית, ללא לוגואים מזויפים של לקוחות, דמויות המוגנות בזכויות יוצרים או טענות ללא ביסוס."
            }
          ]
        },
        {
          "title": "מיועד לצוותי שיווק, נאמנות, VIP ותפעול.",
          "text": "MorePower2You יכולה לתאם את גיבוש הקונספט, בחירת המוצרים, אריזה ממותגת, אחסון, פולפילמנט, טיפול ביעד ותמיכה שוטפת, כך שצוותים פנימיים לא יצטרכו להרכיב את התוכנית מספקים מפוזרים."
        }
      ],
      "occasions": [
        "מתנות לשחקנים VIP",
        "מתנות לאפליקציית קזינו",
        "מתנות לציון אירועים חשובים",
        "מתנות נאמנות",
        "מבצעים עונתיים"
      ]
    }
  ],
  "industries": [
    {
      "title": "חברות גיימינג ואפליקציות קזינו",
      "text": "מתנות ללקוחות VIP, הכרה בהישגים, תוכניות נאמנות, מבצעים עונתיים והוקרת לקוחות בעלי ערך גבוה."
    },
    {
      "title": "חברות טכנולוגיה",
      "text": "מתנות להצלחת לקוחות, הוקרת עובדים, ערכות השקה, ארגזי קליטה ומתנות לאירועים."
    },
    {
      "title": "חברות נדל\"ן",
      "text": "מתנות לסיום עסקה, מתנות הוקרה על הפניות, קמפיינים למפתחים ומתנות לקידום קשרי לקוחות VIP."
    },
    {
      "title": "חברות פיננסיות",
      "text": "הוקרת לקוחות יוקרתית, מתנות למנהלים, הכרה באבני דרך ותהליכי עבודה תואמי תקנות בתחום המתנות."
    },
    {
      "title": "קבוצות מלונאות",
      "text": "הוקרת אורחים, מתנות קבלת פנים ל-VIP, מתנות לאירועים, תוכניות עונתיות וחוויות ממותגות."
    },
    {
      "title": "ארגוני בריאות",
      "text": "הוקרת עובדים, הוקרת תורמים או שותפים, מארזי מתנות המכוונים לרווחה ותוכניות אירועים."
    },
    {
      "title": "חברות אירועים",
      "text": "ערכות השקה, מתנות למשתתפים, ערכות ספונסרים, דיוור לאירועים וירטואליים והוקרת תודה לאחר האירוע."
    },
    {
      "title": "צוותי שיווק, משאבי אנוש ותפעול",
      "text": "שותף מעשי לצוותים הזקוקים לטיפול במתנות בטעם טוב ובאופן מסודר."
    }
  ],
  "futureIndustries": [
    "מתנות בתחום הנדל\"ן",
    "מתנות ללקוחות בתחום הטכנולוגיה",
    "מתנות ללקוחות בתחום הפיננסי",
    "מתנות לאירוח",
    "מתנות הוקרה בתחום הבריאות",
    "מתנות לאירועים"
  ],
  "testimonials": [
    {
      "name": "Dani L.",
      "context": "אחסון ולוגיסטיקה חוזרת",
      "quote": "היינו זקוקים לאחסון ולמשלוח המוצרים שלנו על פי לוח זמנים חודשי. MorePower2You הפכה את התהליך לקל, עם אחסון מאובטח ולוגיסטיקה אמינה בכל פעם שהיינו זקוקים להכנת משלוחים."
    },
    {
      "name": "Tyler M.",
      "context": "תיאום פרויקטים מורכבים",
      "quote": "MorePower2You ניהלה פרויקט הטמעת תוכנה מפורט, משלב התזמון ועד אישור ההשלמה. הסבלנות, הדיוק וההבנה של הצוות לצרכים שלנו אפשרו לפרויקט להתנהל בצורה חלקה, ואנחנו ממשיכים לעבוד איתם על פרויקטים נוספים."
    },
    {
      "name": "Brandi E.",
      "context": "מתנות ללקוחות",
      "quote": "המתנות ללקוחותינו היו מדהימות. הם הציעו הצעות מתחשבות, סייעו לנו ליצור בדיוק את מה שרצינו, הציגו את הכל באופן מקצועי ושלחו את המתנות בזמן. המשוב שקיבלנו היה חיובי לחלוטין."
    },
    {
      "name": "Charlene R.",
      "context": "מתנות יצירתיות לקהל מגוון",
      "quote": "היינו זקוקים לרעיונות למתנות עבור קבוצת לקוחות גדולה ומגוונת. MorePower2You הציעה אפשרויות יצירתיות ומחושבות, וצוותנו יכול היה לראות כמה תשומת לב הושקעה בהמלצות."
    }
  ],
  "faqs": [
    {
      "question": "אילו סוגי פרויקטים בתחום המתנות MorePower2You יכולה לתמוך בהם?",
      "answer": "קמפיינים למתנות ארגוניות, אריזות מתנה ממותגות בהתאמה אישית, מתנות ללקוחות VIP ולשחקנים, הוקרת עובדים, מתנות עונתיות, ערכות לאירועים, מתנות להשקת מוצרים, תוכניות לציון אבני דרך, פולפילמנט, אחסון, הפצה, דיוור המוני ופרויקטים מותאמים אישית של שירותי קונסיירז'."
    },
    {
      "question": "האם אתם מסוגלים לטפל בהיקפי מתנות גדולים?",
      "answer": "כן. המיתוג החדש מדגיש מתנות ארגוניות בקנה מידה גדול, והאתר רשאי לציין בכנות כי פרויקטים נבחרים כללו למעלה מ-5,000 מתנות. ניתן לתמוך גם בפרויקטים קטנים יותר כאשר היקף העבודה מתאים."
    },
    {
      "question": "האם אתם מפרסמים מחירים קבועים לחבילות?",
      "answer": "לא. הצעת המחיר לפרויקטים נקבעת על סמך מספר הנמענים, תמהיל המוצרים, התאמה אישית, אריזה, אחסון, צרכי הלוגיסטיקה, מספר היעדים ולוח הזמנים."
    },
    {
      "question": "האם ניתן למתג או להתאים אישית את המתנות?",
      "answer": "כן. ניתן להתאים אישית או למתג קופסאות מתנה, תוספות, אריזות ומוצרים נבחרים בהתאם ללוח הזמנים, לכמויות ולזמינות המוצרים."
    },
    {
      "question": "האם אתם תומכים במשלוחים לאומיים ובינלאומיים?",
      "answer": "MorePower2You יכולה לתמוך בתכנון פרויקטים ובמשלוחים המוניים ברמה הלאומית והבינלאומית. הפרטים תלויים ברשימת היעדים, במוצרים, בלוח הזמנים ובדרישות המשלוח."
    },
    {
      "question": "האם אתם מבקשים לציין תקציב בטופס הפנייה?",
      "answer": "לא. הטופס מבקש לציין את היקף הפרויקט, ולכן השיחה הראשונית יכולה להתמקד בקהל היעד, בלוח הזמנים, בהתאמה אישית ובלוגיסטיקה."
    },
    {
      "question": "האם ניתן לאחסן מוצרים ולשלוח אותם לאורך זמן?",
      "answer": "כן. שירותי אחסון ותמיכה במלאי יכולים להיכלל בהיקף הפרויקט, כולל פולפילמנט חוזר או מדורג לפי הצורך."
    },
    {
      "question": "האם אתם תומכים במשחקי מחשב ובמתנות לשחקני VIP?",
      "answer": "כן. בתחום הגיימינג ומתנות לשחקני VIP יש דף ייעודי לאפליקציות קזינו, משחקי תפקידים (RPG), משחקי פעולה/הרפתקאות, משחקי אסטרטגיה, פלחי שחקני VIP, תוכניות נאמנות, מתנות לציון אבני דרך ומבצעים עונתיים."
    },
    {
      "question": "האם אתם מציעים שירות תשלום מקוון?",
      "answer": "לא. האתר נועד ליצירת לידים ולפניות בנוגע לפרויקטים מותאמים אישית, ולא לתהליכי תשלום מקוונים לציבור הרחב."
    },
    {
      "question": "האם אתם מציגים מספר טלפון ציבורי או כתובת פיזית?",
      "answer": "לא. האתר החדש משתמש בשפה המתאימה לתחום השירותים וטופס בקשת הצעת מחיר לפרויקט כקריאה לפעולה (CTA) העיקרית."
    }
  ],
  "gallery": [
    {
      "title": "אריזת מתנה בהתאמה אישית",
      "text": "הקשר של קופסת מתנה מהאתר הנוכחי, שעוצב מחדש לגלריה עיתונאית יוקרתית יותר.",
      "image": "/legacy-images/Wooden-box.jpg",
      "alt": "אריזת מתנה מותאמת אישית בקופסת עץ"
    },
    {
      "title": "מתנות עונתיות",
      "text": "ניתן להתאים את מתנות החג והאירועים לקהלי יעד של חברות, VIP, עובדים ולקוחות.",
      "image": "/legacy-images/Birthday-Presents-box.jpg",
      "alt": "קופסאות מתנה למתנות עונתיות ומתנות יום הולדת"
    },
    {
      "title": "חווית פתיחת האריזה",
      "text": "אריזה מותאמת אישית יכולה להפוך מתנה פשוטה לרגע בלתי נשכח עבור המקבל.",
      "image": "/legacy-images/Explosion-box-1.jpg",
      "alt": "קונספט יצירתי לפתיחת אריזת מתנה"
    },
    {
      "title": "הקשר של מתנות ממותגות",
      "text": "האתר הנוכחי מציג תמונות של אריזות מתנה ומצגות, שיש להחליפן בתמונות יוקרתיות שנוצרו במיוחד.",
      "image": "/legacy-images/website-picture-3.png",
      "alt": "הפניה לאריזת המתנות מהאתר הנוכחי"
    },
    {
      "title": "תמיכה בדיוור המוני",
      "text": "שירותי הלוגיסטיקה והדיוור יכולים לעמוד מאחורי קמפיין מתנות מלוטש.",
      "image": "/legacy-images/zoom-scaled.jpg",
      "alt": "הפניה למילוי הזמנות מתנות ודיוור"
    },
    {
      "title": "אצירת מתנות בקונסיירז'",
      "text": "פרויקט מותאם אישית יכול לשלב מוצרים, אריזות, תוספות ולוגיסטיקה לחוויה אחת.",
      "image": "/legacy-images/website-picture-2-1.png",
      "alt": "סידור מוצרי מתנות בקונסיירז'"
    },
    {
      "title": "הנחיות לתמונות פרימיום שנוצרו על ידי בינה מלאכותית",
      "text": "גיליון קונספט של מודל תמונות ChatGPT שנוצר כדי להנחות את המערכת הוויזואלית החדשה והיוקרתית לצד תמונות המקור מהאתר הציבורי הישן.",
      "image": "/generated-assets/image-contact-sheet-gifting.png",
      "alt": "גיליון הנחיות לתמונות של מתנות ארגוניות יוקרתיות"
    }
  ],
  "caseStudies": [
    {
      "slug": "vip-player-milestone-drop",
      "label": "דוגמה לסוג פרויקט",
      "title": "מתנת אבן דרך לשחקני VIP",
      "summary": "מותג גיימינג רוצה מתנה פיזית יוקרתית לשחקנים מובילים שהגיעו לאבן דרך בתוכנית הנאמנות.",
      "challenge": "הצוות הפנימי זקוק למתנה שתהיה מיוחדת, ללא שימוש בתווים מוגנים, לוגואים מזויפים או גישה של סלסלת מתנות גנרית.",
      "approach": "MorePower2You יכולה לאצור מוצרי לייף סטייל יוקרתיים, לעצב אריזה נקייה שמותאמת למותג, להוסיף כרטיס לציון אבן הדרך, לארגן מלאי ולתאם משלוח ליעדים מאושרים.",
      "outcome": "רגע של הערכה מוחשית התומך בנאמנות, בהכרה ב-VIP ובשירות לקוחות ברמה גבוהה.",
      "seo": {
        "title": "דוגמה למתנת ציון דרך לשחקני VIP | MorePower2You",
        "description": "דוגמה אנונימית לסוג פרויקט של מתנות לציון אבני דרך לשחקני VIP בתחום הגיימינג והכרת תודה על נאמנות.",
        "keywords": [
          "מתנות לציון אבני דרך לשחקנים VIP",
          "מתנות נאמנות בתחום הגיימינג",
          "אפליקציית קזינו מתנות VIP"
        ]
      }
    },
    {
      "slug": "holiday-corporate-gifting-program",
      "label": "דוגמה לסוג פרויקט",
      "title": "תוכנית מתנות לחגים לחברות",
      "summary": "חברה זקוקה למתנות לחגים עבור לקוחות, עובדים ושותפים ביעדים רבים.",
      "challenge": "קהל היעד הוא רחב ומגוון, והחברה זקוקה למתנות שיעבירו מסר של התחשבות, תוך שמירה על ארגון תפעולי.",
      "approach": "MorePower2You יכולה ליצור רמות נמענים, לאתר אפשרויות מתנה גמישות, לתאם אריזה ממותגת, להכין פולפילמנט ולתמוך בצרכי דיוור בארץ ובעולם.",
      "outcome": "תוכנית מתנות לחגים מהוקצעת עם פחות נטל תיאום פנימי.",
      "seo": {
        "title": "דוגמה למתנות ארגוניות לחגים | MorePower2You",
        "description": "דוגמה אנונימית למתנות ארגוניות לחגים עבור לקוחות, עובדים, שותפים, שירותי לוגיסטיקה ותמיכה בדיוור המוני.",
        "keywords": [
          "מתנות ארגוניות לחגים",
          "קמפיין מתנות לחג המולד",
          "מתנות לחגים לעובדים"
        ]
      }
    },
    {
      "slug": "recurring-storage-fulfillment",
      "label": "פרופיל פרויקט אנונימי",
      "title": "אחסון ולוגיסטיקה חוזרים",
      "summary": "חברה זקוקה לאחסון מוצרים ולשליחתם על פי לוח זמנים קבוע.",
      "challenge": "יש לאחסן את המלאי בצורה מאובטחת, לעקוב אחריו ולשלוח אותו מעת לעת, מבלי שהחברה תצטרך לנהל כל משלוח באופן פנימי.",
      "approach": "MorePower2You יכולה לתמוך בתכנון אחסון, הכנת מלאי, פולפילמנט חוזר ותיאום דיוור לפי לוח הזמנים המאושר.",
      "outcome": "תוכנית חוזרת חלקה יותר, השומרת על זרימת הפצת המוצרים.",
      "seo": {
        "title": "דוגמה לאחסון והפקת מתנות חוזרות | MorePower2You",
        "description": "פרופיל פרויקט אנונימי עבור אחסון, מחסנים, פולפילמנט מתנות חוזרות ותמיכה בהפצה.",
        "keywords": [
          "אחסון מתנות",
          "פולפילמנט חוזר",
          "אחסון מתנות"
        ]
      }
    },
    {
      "slug": "branded-launch-kit",
      "label": "דוגמה לסוג פרויקט",
      "title": "ערכת מיתוג לאירועים והשקות",
      "summary": "צוות שיווק זקוק למתנת השקה שניתן לשלוח ללקוחות, לשותפים או למשתתפי האירוע.",
      "challenge": "הערכה צריכה לשדר יוקרה, להגיע בזמן ולקשר בין השקת המוצר לחוויה בעולם האמיתי.",
      "approach": "MorePower2You יכולה לאצור פריטים, לתאם תוספות מודפסות ואריזות, להרכיב ערכות ולתמוך בטיפול ברשימת היעדים.",
      "outcome": "נקודת מגע בלתי נשכחת להשקה, התומכת בזכירת המותג ובמעורבות המשתתפים.",
      "seo": {
        "title": "דוגמה לערכת השקה ממותגת | MorePower2You",
        "description": "דוגמה לפרופיל ערכת אירוע ממותגת והשקת מוצר הכוללת אריזה, תוספות, שירותי לוגיסטיקה ותמיכה בדיוור.",
        "keywords": [
          "ערכת השקה ממותגת",
          "מתנות לאירועים",
          "מתנות להשקת מוצר"
        ]
      }
    }
  ],
  "posts": [
    {
      "slug": "corporate-gifting-strategy-at-scale",
      "status": "published",
      "date": "2026-04-01",
      "title": "כיצד לתכנן קמפיין מתנות ארגוניות שירגיש אישי גם בקנה מידה גדול",
      "excerpt": "מסגרת מעשית להפיכת מתנות ארגוניות בהיקפים גדולים למתנות מתחשבות, מאורגנות ותואמות למותג.",
      "seo": {
        "title": "אסטרטגיית מתנות ארגוניות בקנה מידה גדול | MorePower2You",
        "description": "תכנון קמפיינים למתנות ארגוניות הכוללים פילוח קהלים, אסטרטגיית מוצרים, אריזה, פולפילמנט ולוחות זמנים.",
        "keywords": [
          "אסטרטגיית מתנות ארגוניות",
          "מתנות בכמויות גדולות",
          "מתנות הוקרה ללקוחות"
        ]
      },
      "sections": [
        {
          "title": "התחילו במציאות של הנמען",
          "text": "קמפיין מוצלח מתחיל בקביעת קהלי היעד, מספר הנמענים, צרכי היעד, העיתוי והסיבה למתנה. פרטים אלה מעצבים את כל השאר."
        },
        {
          "title": "השתמשו בדרגות מבלי שהמתנות ייראו גנריות",
          "text": "מתנות ארגוניות יכולות לכלול רמות שונות עבור מנהלים, לקוחות VIP, עובדים וקהל רחב, תוך שמירה על חווית מותג עקבית."
        },
        {
          "title": "תכננו את הלוגיסטיקה מבעוד מועד",
          "text": "אריזה, אחסון, רשימות דיוור, ספירת יעדים וחלונות משלוח צריכים להיות חלק מהאסטרטגיה לפני סיום פיתוח המוצרים."
        }
      ]
    },
    {
      "slug": "vip-player-gifting-gaming-brands",
      "status": "published",
      "date": "2026-04-02",
      "title": "מתנות לשחקני VIP עבור מותגי גיימינג: הערכה מעבר למסך",
      "excerpt": "כיצד אפליקציות קזינו וחברות גיימינג יכולות להשתמש במתנות פיזיות יוקרתיות לצורך טיפוח נאמנות, ציון אבני דרך וטיפול בלקוחות VIP.",
      "seo": {
        "title": "מתנות ל-VIP עבור מותגי גיימינג | MorePower2You",
        "description": "רעיונות למתנות לשחקנים VIP עבור אפליקציות קזינו, משחקי תפקידים, משחקי פעולה/הרפתקאות, משחקי אסטרטגיה, תוכניות נאמנות ופרסומים לציון אבני דרך.",
        "keywords": [
          "מתנות לשחקנים VIP",
          "מתנות בתחום הגיימינג",
          "מתנות נאמנות לאפליקציית קזינו"
        ]
      },
      "sections": [
        {
          "title": "התאימו את המתנה למעמד",
          "text": "שחקנים מובילים ולקוחות מהשורה הראשונה צריכים לקבל מתנות שנותנות תחושה של מחשבה, יוקרה ורלוונטיות לאירוע המיוחד."
        },
        {
          "title": "יש לשמור על תדמית המותג",
          "text": "מתנות גיימינג מעולות אינן זקוקות ללוגואים מזויפים, לדמויות המוגנות בזכויות יוצרים או לטענות חסרות בסיס. האריזה, התוספות והבחירות במוצרים עדיין יכולות לשדר התאמה עמוקה."
        },
        {
          "title": "קשרו בין מתנות לרגעי נאמנות",
          "text": "אבני דרך, עונות, ימי נישואין, דרגות נאמנות, השקות ורגעי הוקרה בעלי ערך גבוה – כולם יוצרים הזדמנויות טבעיות למתנות."
        }
      ]
    },
    {
      "slug": "holiday-gifting-timeline",
      "status": "published",
      "date": "2026-04-03",
      "title": "לוח זמנים למתנות לחגים: מתי להתחיל ומה להחליט קודם",
      "excerpt": "לוח זמנים למתנות לחגים עבור חברות המתכננות תוכניות מתנות לחג המולד, מתנות עונתיות, מתנות ללקוחות, לעובדים או לאורחים חשובים.",
      "seo": {
        "title": "לוח זמנים למתנות לחגים | MorePower2You",
        "description": "תכנון לוחות זמנים למתנות לחגים ולמתנות לחג המולד עבור לקוחות עסקיים, עובדים, לקוחות VIP, אריזה ולוגיסטיקה.",
        "keywords": [
          "לוח זמנים למתנות לחגים",
          "מתנות חג המולד לעסקים",
          "מתנות עונתיות"
        ]
      },
      "sections": [
        {
          "title": "התחילו מוקדם יותר ממה שנראה הכרחי",
          "text": "זמינות המוצר, התאמה אישית, אריזה, רשימות תפוצה וחלונות משלוח – כולם מרוויחים מהחלטות מוקדמות."
        },
        {
          "title": "יש לאשר תחילה את קהל היעד",
          "text": "החליטו האם התוכנית מיועדת ללקוחות, לעובדים, לאורחים חשובים, לשותפים או לקבוצות נמענים מרובות לפני בחירת המתנות."
        },
        {
          "title": "השאירו מקום לפולפילמנט",
          "text": "גם מתנות יפות זקוקות לזמן להרכבה, אחסון, תיוג והפצה, במיוחד כאשר היעדים פזורים."
        }
      ]
    },
    {
      "slug": "premium-custom-branded-gift-boxes",
      "status": "published",
      "date": "2026-04-04",
      "title": "מה הופך קופסת מתנה ממותגת בהתאמה אישית למרגישה יוקרתית?",
      "excerpt": "קופסת מתנה מותאמת אישית ברמה גבוהה תלויה באיפוק, בהתאמת המוצר, באיכות האריזה ובחוויה ברורה של מקבל המתנה.",
      "seo": {
        "title": "קופסאות מתנה ממותגות בהתאמה אישית ברמה גבוהה | MorePower2You",
        "description": "גלו מה הופך את קופסאות המתנה המותאמות אישית למותג למובחנות עבור מתנות ארגוניות, מתנות VIP, אירועים וערכות השקה.",
        "keywords": [
          "קופסאות מתנה ממותגות בהתאמה אישית",
          "קופסאות מתנה יוקרתיות",
          "אריזות מתנה עסקיות"
        ]
      },
      "sections": [
        {
          "title": "הבחירה הקפדנית חשובה יותר מהכמות",
          "text": "סט מצומצם של פריטים שנבחרו בקפידה מרגיש לעתים קרובות יוקרתי יותר מאשר קופסה עמוסה במוצרים שאינם קשורים זה לזה."
        },
        {
          "title": "האריזה צריכה לשדר תחושה של מחשבה מכוונת",
          "text": "צבע, מרקם, תוספות, ריווח והצגה – כל אלה מעצבים את הרושם הראשוני."
        },
        {
          "title": "המיתוג צריך לתמוך במתנה",
          "text": "הקופסאות הממותגות החזקות ביותר משדרות אחידות מבלי להפוך כל פריט לפרסומת."
        }
      ]
    },
    {
      "slug": "gift-fulfillment-logistics-questions",
      "status": "published",
      "date": "2026-04-05",
      "title": "שאלות בנושא לוגיסטיקה וטיפול בהזמנות מתנות שיש לענות עליהן לפני משלוח גדול",
      "excerpt": "השאלות התפעוליות שמונעות מקמפיין מתנות גדול להפוך לכאוטי.",
      "seo": {
        "title": "שאלות בנושא לוגיסטיקה וטיפול בהזמנות מתנות | MorePower2You",
        "description": "שאלות מרכזיות בנושאי מילוי הזמנות מתנות, אחסון, דיוור המוני, ספירת יעדים, התאמה אישית ומשלוחי מתנות בהיקפים גדולים.",
        "keywords": [
          "הפקת מתנות",
          "לוגיסטיקת מתנות",
          "משלוח מתנות בהיקף נרחב"
        ]
      },
      "sections": [
        {
          "title": "לאן הולכות המתנות?",
          "text": "יש להבהיר מראש את מספר היעדים, מסלולי הטיסה המקומיים או הבינלאומיים, ומוכנות הכתובות."
        },
        {
          "title": "מה צריך לאחסן?",
          "text": "אם המוצרים מגיעים לפני מועדי המשלוח, יש לתכנן את האחסון והכנת המלאי."
        },
        {
          "title": "למי שייכת רשימת התפוצה?",
          "text": "נתוני נמענים מדויקים חיוניים לביצוע חלק ותקשורת מדויקת."
        }
      ]
    },
    {
      "slug": "concierge-gifting-custom-projects",
      "status": "draft",
      "date": "2026-04-06",
      "title": "מתי שירותי קונסיירז' ומתנות הם הבחירה הנכונה",
      "excerpt": "נושא טיוטה לפרויקטים מותאמים אישית הדורשים איתור ספקים, תיאום ופתרון בעיות ברמה הגבוהה ביותר.",
      "seo": {
        "title": "מתי שירותי קונסיירז' ומתנות הם הבחירה הנכונה",
        "description": "טיוטה.",
        "keywords": [
          "קונסיירז' ומתנות"
        ]
      },
      "sections": [
        {
          "title": "הערה לטיוטה",
          "text": "טיוטת CMS ראשונית לפיתוח עריכה עתידי."
        }
      ]
    },
    {
      "slug": "large-volume-gifting-checklist",
      "status": "draft",
      "date": "2026-04-07",
      "title": "רשימת בדיקה למתנות בכמויות גדולות",
      "excerpt": "נושא טיוטה לתכנון היקף הנמענים, פולפילמנט ותזמון.",
      "seo": {
        "title": "רשימת בדיקה למתנות בכמויות גדולות",
        "description": "טיוטה.",
        "keywords": [
          "מתנות בכמויות גדולות"
        ]
      },
      "sections": [
        {
          "title": "הערה לטיוטה",
          "text": "טיוטת CMS ראשונית לפיתוח עריכה עתידי."
        }
      ]
    },
    {
      "slug": "employee-appreciation-gift-programs",
      "status": "draft",
      "date": "2026-04-08",
      "title": "תוכניות מתנות הוקרה לעובדים עם מגע אנושי",
      "excerpt": "טיוטת נושא לקמפיינים להוקרת עובדים.",
      "seo": {
        "title": "תוכניות מתנות הוקרה לעובדים",
        "description": "טיוטה.",
        "keywords": [
          "מתנות הוקרה לעובדים"
        ]
      },
      "sections": [
        {
          "title": "הערה לטיוטה",
          "text": "טיוטת CMS ראשונית לפיתוח עריכה עתידי."
        }
      ]
    },
    {
      "slug": "event-gifting-for-remote-attendees",
      "status": "draft",
      "date": "2026-04-09",
      "title": "מתנות לאירועים עבור משתתפים מרחוק והיברידיים",
      "excerpt": "נושא טיוטה לאירועים וירטואליים וערכות אירועים מוכנות למשלוח בדואר.",
      "seo": {
        "title": "מתנות לאירועים עבור משתתפים מרחוק",
        "description": "טיוטה.",
        "keywords": [
          "מתנות לאירועים"
        ]
      },
      "sections": [
        {
          "title": "הערה לטיוטה",
          "text": "טיוטת CMS ראשונית לפיתוח עריכה עתידי."
        }
      ]
    },
    {
      "slug": "client-appreciation-gifts-that-last",
      "status": "draft",
      "date": "2026-04-10",
      "title": "מתנות הוקרה ללקוחות שנשארות מעבר לרגע",
      "excerpt": "נושא טיוטה למתנות מתחשבות ליחסי לקוחות.",
      "seo": {
        "title": "מתנות הוקרה ללקוחות",
        "description": "טיוטה.",
        "keywords": [
          "מתנות הוקרה ללקוחות"
        ]
      },
      "sections": [
        {
          "title": "הערה לטיוטה",
          "text": "טיוטת CMS ראשונית לפיתוח עריכה עתידי."
        }
      ]
    }
  ],
  "resources": [
    {
      "slug": "corporate-gifting-planning-checklist",
      "title": "רשימת בדיקה לתכנון מתנות ארגוניות",
      "summary": "דף תכנון מעשי לקבלת החלטות בנוגע לקהל היעד, היקף, התאמה אישית, אריזה, תזמון ולוגיסטיקה.",
      "seo": {
        "title": "רשימת בדיקה לתכנון מתנות ארגוניות | MorePower2You",
        "description": "השתמשו ברשימת הבדיקה הזו למתנות ארגוניות כדי לתכנן את היקף הנמענים, האירוע, ההתאמה האישית, האריזה, הלוגיסטיקה ולוח הזמנים.",
        "keywords": [
          "רשימת בדיקה למתנות ארגוניות",
          "רשימת בדיקה לתכנון מתנות",
          "מתנות בהתאמה אישית"
        ]
      },
      "sections": [
        {
          "title": "קהל יעד",
          "text": "יש להגדיר את קבוצות הנמענים, הדרגות, הכמות, סוג הקשר וכל צורך בהתאמה אישית."
        },
        {
          "title": "אירוע",
          "text": "יש להבהיר האם מדובר במתנות לחגים, הוקרת לקוחות, הוקרת VIP, הוקרת עובדים, אירוע, השקה או ציון דרך."
        },
        {
          "title": "תפעול",
          "text": "יש לציין את מספר היעדים, מוכנות רשימת התפוצה, צרכי האחסון, שיקולים בינלאומיים ומועד אחרון."
        }
      ]
    },
    {
      "slug": "holiday-gift-campaign-timeline",
      "title": "לוח זמנים לקמפיין מתנות לחגים",
      "summary": "משאב לתכנון תוכניות מתנות לחג המולד, חגים, עונות, לקוחות, עובדים ו-VIP.",
      "seo": {
        "title": "לוח זמנים לקמפיין מתנות לחגים | MorePower2You",
        "description": "תכננו קמפיינים למתנות ארגוניות לחגים ולחג המולד, תוך התייחסות ללוחות הזמנים של בחירת המוצרים, התאמה אישית, אריזה ולוגיסטיקה.",
        "keywords": [
          "לוח זמנים למתנות לחגים",
          "מתנות לחג המולד",
          "מתנות ארגוניות עונתיות"
        ]
      },
      "sections": [
        {
          "title": "תכנון מוקדם",
          "text": "יש לאשר את קהל היעד, מספר הנמענים, רמות המתנות, יעדי המשלוח והכיוון הקריאייטיבי הכללי."
        },
        {
          "title": "החלטות במהלך הפרויקט",
          "text": "יש לפרט את פרטי המוצרים, האריזה, התוספות, ההתאמה האישית, האחסון והמשלוח."
        },
        {
          "title": "פולפילמנט סופי",
          "text": "הכנת נתוני הנמענים, הרכבת המתנות, תיאום המשלוחים ואישור תמיכת המשלוחים."
        }
      ]
    },
    {
      "slug": "vip-client-gifting-strategy-guide",
      "title": "מדריך לאסטרטגיית מתנות ללקוחות VIP",
      "summary": "מדריך לתוכניות הוקרה ללקוחות בעלי ערך גבוה, לקוחות VIP ולקוחות VIP.",
      "seo": {
        "title": "מדריך לאסטרטגיית מתנות ללקוחות VIP | MorePower2You",
        "description": "תכננו אסטרטגיות מתנות ללקוחות VIP ולשחקנים VIP לצורך טיפוח נאמנות, ציון אבני דרך, קמפיינים עונתיים והבעת הערכה על ערכם הגבוה.",
        "keywords": [
          "מתנות ללקוחות VIP",
          "מתנות לשחקנים VIP",
          "מתנות נאמנות"
        ]
      },
      "sections": [
        {
          "title": "הגדר את משמעות המונח VIP",
          "text": "יש להבהיר האם ה-VIP מבוסס על הכנסות, מעמד השחקן, עומק הקשר, אבן דרך או חשיבות אסטרטגית."
        },
        {
          "title": "התאימו את המתנה לרגע",
          "text": "מתנה לציון אירוע חשוב צריכה להיות שונה ממתנת חג, מתנת שימור לקוחות או מתנת אירוע."
        },
        {
          "title": "שמרו על חוויית המשתמש",
          "text": "יש להשתמש בניסוח מעודן, בנתונים מדויקים ובתכנון פולפילמנט ברור כדי לשמר את התחושה היוקרתית."
        }
      ]
    }
  ],
  "legal": [
    {
      "slug": "privacy-policy",
      "title": "מדיניות פרטיות",
      "eyebrow": "פרטיות",
      "intro": "מדיניות פרטיות ראשונית זו מסופקת לצורך הכנות לקראת ההשקה, ויש לעיין בה עם יועץ משפטי לפני השימוש בפועל.",
      "seo": {
        "title": "מדיניות פרטיות | MorePower2You",
        "description": "מדיניות פרטיות עבור MorePower2You.",
        "keywords": [
          "מדיניות פרטיות"
        ]
      },
      "blocks": [
        {
          "title": "מידע שנאסף",
          "text": "טופס הפנייה לפרויקט אוסף פרטי קשר ופרטי הפרויקט שהוזנו מרצון על ידי המבקר."
        },
        {
          "title": "כיצד נעשה שימוש במידע",
          "text": "המידע שנמסר משמש לבחינת בקשות לפרויקטים, מעקב אחר השלבים הבאים, מענה לפניות וניהול סטטוס הלידים הפנימיים."
        },
        {
          "title": "שירותי צד שלישי",
          "text": "האתר מותאם ל-Sanity CMS, משלוח דוא\"ל Resend, הגנת ספאם Cloudflare Turnstile, ואחסון Vercel."
        }
      ]
    },
    {
      "slug": "terms-and-conditions",
      "title": "תנאי שימוש",
      "eyebrow": "תנאים",
      "intro": "תנאים ראשוניים אלה נועדו למטרות מידע בלבד ויש לעיין בהם עם יועץ משפטי לפני השימוש בפועל.",
      "seo": {
        "title": "תנאי שימוש | MorePower2You",
        "description": "תנאי השימוש של MorePower2You.",
        "keywords": [
          "תנאים והגבלות"
        ]
      },
      "blocks": [
        {
          "title": "היקף הפרויקט המותאם אישית",
          "text": "כל הפרויקטים בתחום המתנות והקונסיירז' מותאמים אישית. כל הצעה, לוח זמנים, זמינות מוצרים, תוכנית פולפילמנט או הצעת מחיר יש לאשר בכתב."
        },
        {
          "title": "ללא תהליך תשלום במסחר אלקטרוני",
          "text": "אתר זה אינו מוכר מוצרים באמצעות מערכת תשלום ציבורית. הוא אוסף פניות לפרויקטים לבחינה אישית."
        },
        {
          "title": "דיוק התוכן",
          "text": "MorePower2You שואפת לשמור על דיוק תוכן האתר, אך זמינות השירותים, אפשרויות המוצרים ולוחות הזמנים עשויים להשתנות בהתאם להיקף הפרויקט ולתנאי הספקים."
        }
      ]
    }
  ]
};

export const content: Record<Locale, SiteContent> = { en, he };

export const locales: Locale[] = ["en", "he"];
