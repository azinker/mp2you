import type { Cta, Locale, SiteContent } from "@/content/site";
import { englishContent } from "@/content/site";
import { isRtl, withLocale } from "@/lib/i18n";
import { ui } from "@/content/ui";

type HomeOverlay = {
  tagline: string;
  contactNote: string;
  serviceArea: string;
  footerDescription: string;
  nav: Record<string, string>;
  footerColumns: string[];
  footerLinks: Record<string, string>;
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    proof: string[];
    primary: string;
    secondary: string;
  };
  proof: { title: string; text: string }[];
  whatWeDo: { eyebrow: string; title: string; text: string; items: { title: string; text: string }[] };
  process: { title: string; text: string }[];
  featured: { eyebrow: string; title: string; text: string; items: { title: string; text: string }[] }[];
  occasions: string[];
  finalCta: { title: string; text: string };
  seo: { title: string; description: string };
};

const overlays: Record<Exclude<Locale, "en" | "he">, HomeOverlay> = {
  es: {
    tagline: "El poder magnífico del gifting, reconstruido para programas corporativos modernos.",
    contactNote: "Las consultas de proyecto se gestionan a través del formulario seguro.",
    serviceArea: "Apoyo a proyectos de gifting, conserjería, fulfillment y envíos masivos nacionales e internacionales.",
    footerDescription:
      "MorePower2You planifica, abastece, personaliza, empaqueta, almacena, cumple y entrega proyectos de gifting y conserjería para empresas que necesitan que cada detalle se cuide.",
    nav: {
      "/services": "Servicios",
      "/gaming-vip-player-gifting": "Gaming y VIP",
      "/process": "Proceso",
      "/gallery": "Galería",
      "/insights": "Artículos",
      "/contact": "Contacto",
    },
    footerColumns: ["Empresa", "Servicios", "Planificación"],
    footerLinks: {
      "/about": "Nosotros",
      "/who-we-serve": "A quién servimos",
      "/testimonials": "Testimonios",
      "/faqs": "Preguntas",
      "/corporate-gifting": "Gifting corporativo",
      "/custom-gift-boxes": "Cajas personalizadas",
      "/concierge-services": "Conserjería",
      "/fulfillment-warehousing-distribution": "Fulfillment",
      "/case-studies": "Casos",
      "/resources/corporate-gifting-planning-checklist": "Recursos",
      "/privacy-policy": "Privacidad",
      "/terms-and-conditions": "Términos",
    },
    hero: {
      eyebrow: "Gifting, conserjería y fulfillment llave en mano",
      title: "Gifting corporativo a medida, de la idea a la puerta.",
      text: "MorePower2You diseña y entrega experiencias de gifting premium: cajas de marca, campañas de temporada y proyectos de conserjería con abastecimiento, empaque, almacén, fulfillment, entrega y soporte bajo un mismo techo.",
      proof: ["Proyectos selectos de más de 5.000 regalos", "Alcance nacional e internacional", "De alimentos a electrónica y todo lo intermedio"],
      primary: "Iniciar un proyecto de gifting",
      secondary: "Ver cómo funciona",
    },
    proof: [
      { title: "Llave en mano", text: "Concepto, abastecimiento, personalización, empaque, almacén, fulfillment, entrega y soporte." },
      { title: "Escala flexible", text: "Pensado para campañas de alto volumen y también para proyectos más acotados." },
      { title: "Encaje premium", text: "Un socio pulido para marketing, RR. HH., operaciones, equipos directivos, eventos y programas VIP." },
    ],
    whatWeDo: {
      eyebrow: "Qué hace MorePower2You",
      title: "Gifting especializado y conserjería bajo un mismo techo.",
      text: "El trabajo empieza con un objetivo de gifting y termina en un programa que la gente recibe con gusto. MorePower2You puede dar forma al concepto, abastecer, coordinar empaque de marca, gestionar almacén, armar envíos y apoyar destinos nacionales e internacionales.",
      items: [
        { title: "Campañas de gifting corporativo", text: "Agradecimiento a clientes, reconocimiento interno, kits de lanzamiento, regalos de evento y programas de temporada." },
        { title: "Gifting VIP y de fidelidad", text: "Regalos de alto cuidado para clientes top, jugadores VIP, hitos y retención." },
        { title: "Cajas de marca", text: "Empaque, inserts, mix de producto, personalización y presentación." },
        { title: "Fulfillment y envíos masivos", text: "Almacén, armado de kits, coordinación de destinos y soporte de envío." },
      ],
    },
    process: [
      { title: "Descubrir", text: "Aclarar audiencia, ocasión, escala, destinos, plazos y personalización." },
      { title: "Curar", text: "Desarrollar producto y empaque alineados con la marca y el momento." },
      { title: "Personalizar", text: "Coordinar piezas de marca, inserts, empaque y detalles de presentación." },
      { title: "Empacar", text: "Armar cajas, kits y unidades listas para envío con una experiencia pulida." },
      { title: "Almacenar y cumplir", text: "Apoyar almacén, staging, envíos masivos y envíos recurrentes." },
      { title: "Entregar", text: "Preparar el proyecto para entrega nacional o internacional." },
      { title: "Acompañar", text: "Mantener el proyecto en movimiento con coordinación de conserjería." },
    ],
    featured: [
      {
        eyebrow: "Gaming y gifting VIP",
        title: "Momentos de fidelidad que viajan más allá de la pantalla.",
        text: "Para apps de casino, RPGs, acción, estrategia y programas VIP, MorePower2You diseña gifting de primer nivel para hitos, drops de temporada y agradecimiento de alto valor.",
        items: [
          { title: "Jugadores VIP", text: "Regalos de hito, reconocimiento de estatus, retención y sorpresas." },
          { title: "Marcas de gaming", text: "Estrategias que se sienten coleccionables, premium y seguras para la marca." },
        ],
      },
      {
        eyebrow: "Cajas de regalo",
        title: "Un unboxing de marca sin la carga operativa.",
        text: "Desde snacks y wellness hasta electrónica, piezas impresas, apparel y conceptos a medida: cada caja se construye según audiencia, ocasión y presupuesto.",
        items: [
          { title: "Puntos de partida flexibles", text: "VIP, fiestas, welcome boxes, kits de evento, reconocimiento interno y proyectos de conserjería." },
          { title: "Sin precios públicos fijos", text: "Cada proyecto se cotiza por destinatarios, productos, personalización, empaque, logística y plazos." },
        ],
      },
      {
        eyebrow: "Fulfillment, almacén y distribución",
        title: "La capa logística silenciosa detrás de un regalo pulido.",
        text: "Almacén seguro, inventario preparado, envíos recurrentes, listas grandes de destinos, mailings masivos y distribución coordinada.",
        items: [
          { title: "Nacional e internacional", text: "La planificación puede contemplar destinos domésticos e internacionales." },
          { title: "Listo para alto volumen", text: "Proyectos selectos han superado 5.000 regalos; también hay espacio para alcances menores cuando encajan." },
        ],
      },
    ],
    occasions: [
      "Gifting de fiestas",
      "Gifting de Navidad",
      "Cumpleaños",
      "Pascua y temporada",
      "Agradecimiento a clientes",
      "Agradecimiento a jugadores y clientes VIP",
      "Reconocimiento interno",
      "Gifting de eventos",
      "Lanzamientos",
      "Hitos",
      "Programas de fidelidad",
    ],
    finalCta: {
      title: "Traiga la idea. Ayudamos a dar forma al programa.",
      text: "Comparta tipo de proyecto, audiencia, escala, destinos y plazos. MorePower2You revisará los detalles y propondrá el siguiente paso.",
    },
    seo: {
      title: "Gifting corporativo, VIP y fulfillment | MorePower2You",
      description: "Gifting corporativo llave en mano, cajas de marca, conserjería, almacén, fulfillment y programas VIP.",
    },
  },
  fr: {
    tagline: "La puissance magnifique du cadeau, repensée pour les programmes d’entreprise modernes.",
    contactNote: "Les demandes de projet passent par le formulaire sécurisé.",
    serviceArea: "Accompagnement de projets de gifting, conciergerie, fulfillment et envois de masse nationaux et internationaux.",
    footerDescription:
      "MorePower2You conçoit, source, personnalise, emballe, stocke, expédie et livre des projets de gifting et de conciergerie pour les entreprises qui veulent que chaque détail soit soigné.",
    nav: {
      "/services": "Services",
      "/gaming-vip-player-gifting": "Gaming & VIP",
      "/process": "Processus",
      "/gallery": "Galerie",
      "/insights": "Articles",
      "/contact": "Contact",
    },
    footerColumns: ["Entreprise", "Services", "Préparation"],
    footerLinks: {
      "/about": "À propos",
      "/who-we-serve": "À qui s’adresse",
      "/testimonials": "Témoignages",
      "/faqs": "FAQ",
      "/corporate-gifting": "Cadeaux d’entreprise",
      "/custom-gift-boxes": "Coffrets personnalisés",
      "/concierge-services": "Conciergerie",
      "/fulfillment-warehousing-distribution": "Fulfillment",
      "/case-studies": "Études de cas",
      "/resources/corporate-gifting-planning-checklist": "Ressources",
      "/privacy-policy": "Confidentialité",
      "/terms-and-conditions": "Conditions",
    },
    hero: {
      eyebrow: "Gifting, conciergerie et fulfillment clé en main",
      title: "Cadeaux d’entreprise sur mesure, de l’idée jusqu’à la porte.",
      text: "MorePower2You conçoit et livre des expériences de gifting premium : coffrets de marque, campagnes saisonnières et projets de conciergerie, avec sourcing, emballage, entrepôt, fulfillment, livraison et suivi sous un même toit.",
      proof: ["Certains projets dépassent 5 000 cadeaux", "Portée nationale et internationale", "Des produits alimentaires à l’électronique"],
      primary: "Démarrer un projet de gifting",
      secondary: "Voir comment ça marche",
    },
    proof: [
      { title: "Clé en main", text: "Concept, sourcing, personnalisation, emballage, stockage, fulfillment, livraison et suivi." },
      { title: "Échelle souple", text: "Conçu pour les campagnes à fort volume, tout en pouvant accompagner des projets plus ciblés." },
      { title: "Écrin premium", text: "Un partenaire soigné pour le marketing, les RH, les opérations, les équipes dirigeantes, les événements et les programmes VIP." },
    ],
    whatWeDo: {
      eyebrow: "Ce que fait MorePower2You",
      title: "Gifting spécialisé et conciergerie sous un même toit.",
      text: "Le travail commence par un objectif de cadeau et se termine par un programme que l’on est heureux de recevoir. MorePower2You peut façonner le concept, sourcer, coordonner l’emballage de marque, gérer le stock, assembler les envois et accompagner les destinations nationales et internationales.",
      items: [
        { title: "Campagnes de cadeaux d’entreprise", text: "Remerciement clients, reconnaissance interne, kits de lancement, cadeaux d’événement et programmes saisonniers." },
        { title: "Gifting VIP et fidélité", text: "Cadeaux soignés pour clients premium, joueurs VIP, étapes clés et rétention." },
        { title: "Coffrets de marque", text: "Emballage, inserts, mix produit, personnalisation et présentation." },
        { title: "Fulfillment et envois de masse", text: "Entrepôt, assemblage de kits, coordination des destinations et suivi d’expédition." },
      ],
    },
    process: [
      { title: "Découvrir", text: "Clarifier audience, occasion, volume, destinations, délais et personnalisation." },
      { title: "Curater", text: "Proposer produit et emballage alignés sur la marque et le moment." },
      { title: "Personnaliser", text: "Coordonner pièces de marque, inserts, emballage et détails de présentation." },
      { title: "Emballer", text: "Assembler coffrets, kits et unités prêtes à l’envoi avec une expérience soignée." },
      { title: "Stocker et expédier", text: "Soutenir l’entrepôt, le staging, les envois de masse et les envois récurrents." },
      { title: "Livrer", text: "Préparer le projet pour une livraison nationale ou internationale." },
      { title: "Accompagner", text: "Faire avancer le projet avec une coordination de conciergerie." },
    ],
    featured: [
      {
        eyebrow: "Gaming et gifting VIP",
        title: "Des moments de fidélité qui voyagent au-delà de l’écran.",
        text: "Pour les apps casino, RPG, action, stratégie et programmes VIP, MorePower2You conçoit un gifting haut de gamme pour les étapes, drops saisonniers et remerciements à forte valeur.",
        items: [
          { title: "Joueurs VIP", text: "Cadeaux d’étape, reconnaissance de statut, rétention et surprises." },
          { title: "Marques gaming", text: "Des stratégies collectibles, premium et sûres pour la marque." },
        ],
      },
      {
        eyebrow: "Coffrets cadeaux",
        title: "Un unboxing de marque sans la charge opérationnelle.",
        text: "Des snacks et du wellness à l’électronique, aux pièces imprimées, à l’apparel et aux concepts sur mesure : chaque coffret se construit autour de l’audience, de l’occasion et du budget.",
        items: [
          { title: "Points de départ souples", text: "VIP, fêtes, welcome boxes, kits d’événement, reconnaissance interne et projets de conciergerie." },
          { title: "Pas de tarif public fixe", text: "Chaque projet est chiffré selon destinataires, produits, personnalisation, emballage, logistique et délais." },
        ],
      },
      {
        eyebrow: "Fulfillment, entrepôt et distribution",
        title: "La couche logistique discrète derrière un cadeau soigné.",
        text: "Stockage sécurisé, inventaire préparé, envois récurrents, grandes listes de destinations, mailings de masse et distribution coordonnée.",
        items: [
          { title: "National et international", text: "La planification peut intégrer des destinations domestiques et internationales." },
          { title: "Prêt pour le haut volume", text: "Certains projets ont dépassé 5 000 cadeaux ; des périmètres plus petits restent possibles quand l’ensemble convient." },
        ],
      },
    ],
    occasions: [
      "Cadeaux de fêtes",
      "Noël",
      "Anniversaire",
      "Pâques et saison",
      "Remerciement clients",
      "Remerciement joueurs et clients VIP",
      "Reconnaissance interne",
      "Cadeaux d’événement",
      "Lancements",
      "Étapes clés",
      "Programmes de fidélité",
    ],
    finalCta: {
      title: "Apportez l’idée. Nous aiderons à façonner le programme.",
      text: "Partagez le type de projet, l’audience, l’échelle, les destinations et le calendrier. MorePower2You examinera les détails et proposera la suite.",
    },
    seo: {
      title: "Cadeaux d’entreprise, VIP et fulfillment | MorePower2You",
      description: "Gifting d’entreprise clé en main, coffrets de marque, conciergerie, entrepôt, fulfillment et programmes VIP.",
    },
  },
  de: {
    tagline: "Die großartige Kraft des Schenkens, neu gedacht für moderne Unternehmensprogramme.",
    contactNote: "Projektanfragen laufen über das sichere Formular.",
    serviceArea: "Unterstützung für nationale und internationale Gifting-, Concierge-, Fulfillment- und Massenversandprojekte.",
    footerDescription:
      "MorePower2You plant, beschafft, individualisiert, verpackt, lagert, erfüllt und liefert Gifting- und Concierge-Projekte für Unternehmen, die jedes Detail gepflegt haben wollen.",
    nav: {
      "/services": "Leistungen",
      "/gaming-vip-player-gifting": "Gaming & VIP",
      "/process": "Prozess",
      "/gallery": "Galerie",
      "/insights": "Impulse",
      "/contact": "Kontakt",
    },
    footerColumns: ["Unternehmen", "Leistungen", "Planung"],
    footerLinks: {
      "/about": "Über uns",
      "/who-we-serve": "Für wen",
      "/testimonials": "Stimmen",
      "/faqs": "FAQ",
      "/corporate-gifting": "Corporate Gifting",
      "/custom-gift-boxes": "Individuelle Boxen",
      "/concierge-services": "Concierge",
      "/fulfillment-warehousing-distribution": "Fulfillment",
      "/case-studies": "Fallstudien",
      "/resources/corporate-gifting-planning-checklist": "Ressourcen",
      "/privacy-policy": "Datenschutz",
      "/terms-and-conditions": "Bedingungen",
    },
    hero: {
      eyebrow: "Schlüsselfertiges Gifting, Concierge und Fulfillment",
      title: "Individuelles Corporate Gifting von der Idee bis zur Tür.",
      text: "MorePower2You gestaltet und liefert Premium-Gifting: Markenboxen, Saisonkampagnen und Concierge-Projekte mit Beschaffung, Verpackung, Lager, Fulfillment, Versand und Betreuung aus einer Hand.",
      proof: ["Ausgewählte Projekte mit über 5.000 Geschenken", "Nationale und internationale Reichweite", "Von Lebensmitteln bis Elektronik"],
      primary: "Gifting-Projekt starten",
      secondary: "So funktioniert es",
    },
    proof: [
      { title: "Schlüsselfertig", text: "Konzept, Beschaffung, Individualisierung, Verpackung, Lager, Fulfillment, Versand und Betreuung." },
      { title: "Flexible Skalierung", text: "Für volumenstarke Kampagnen gebaut, bei passendem Scope auch für kleinere Projekte." },
      { title: "Premium-Passung", text: "Ein gepflegter Partner für Marketing, HR, Operations, Führungsteams, Events und VIP-Programme." },
    ],
    whatWeDo: {
      eyebrow: "Was MorePower2You tut",
      title: "Spezialisiertes Gifting und Concierge unter einem Dach.",
      text: "Die Arbeit beginnt mit einem Gifting-Ziel und endet mit einem Programm, das man gern empfängt. MorePower2You kann Konzept, Beschaffung, Markenverpackung, Lager, Konfektion und Versand ins In- und Ausland begleiten.",
      items: [
        { title: "Corporate-Gifting-Kampagnen", text: "Kundenwertschätzung, interne Anerkennung, Launch-Kits, Eventgeschenke und Saisonprogramme." },
        { title: "VIP- und Loyalty-Gifting", text: "Hochwertige Geschenke für Top-Kunden, VIP-Spieler, Meilensteine und Bindung." },
        { title: "Markenboxen", text: "Verpackung, Inserts, Produktmix, Personalisierung und Präsentation." },
        { title: "Fulfillment und Massenversand", text: "Lager, Kit-Aufbau, Zielkoordination und Versandbegleitung." },
      ],
    },
    process: [
      { title: "Verstehen", text: "Zielgruppe, Anlass, Umfang, Ziele, Timing und Individualisierung klären." },
      { title: "Kuratieren", text: "Produkt und Verpackung auf Marke und Moment ausrichten." },
      { title: "Individualisieren", text: "Markenstücke, Inserts, Verpackung und Präsentation koordinieren." },
      { title: "Verpacken", text: "Boxen, Kits und versandfertige Einheiten mit gepflegter Empfangserfahrung aufbauen." },
      { title: "Lagern und erfüllen", text: "Lager, Staging, Massenversand und wiederkehrende Sendungen unterstützen." },
      { title: "Zustellen", text: "Das Projekt für nationalen oder internationalen Versand vorbereiten." },
      { title: "Begleiten", text: "Das Projekt mit Concierge-Koordination in Bewegung halten." },
    ],
    featured: [
      {
        eyebrow: "Gaming- und VIP-Gifting",
        title: "Loyalitätsmomente, die über den Bildschirm hinausreisen.",
        text: "Für Casino-Apps, RPGs, Action, Strategie und VIP-Programme gestaltet MorePower2You erstklassiges Gifting für Meilensteine, Seasonal Drops und hochwertige Wertschätzung.",
        items: [
          { title: "VIP-Spieler", text: "Meilenstein-Geschenke, Status, Bindung und Überraschung." },
          { title: "Gaming-Marken", text: "Strategien, die collectible, premium und markensicher wirken." },
        ],
      },
      {
        eyebrow: "Geschenkboxen",
        title: "Ein Marken-Unboxing ohne den operativen Aufwand.",
        text: "Von Snacks und Wellness bis Elektronik, Print, Apparel und komplett eigenen Konzepten: Jede Box entsteht um Zielgruppe, Anlass und Budget.",
        items: [
          { title: "Flexible Einstiege", text: "VIP, Feiertage, Welcome Boxes, Event-Kits, interne Anerkennung und Concierge-Projekte." },
          { title: "Keine festen öffentlichen Preise", text: "Jedes Projekt wird nach Empfängern, Produkten, Individualisierung, Verpackung, Logistik und Zeitplan kalkuliert." },
        ],
      },
      {
        eyebrow: "Fulfillment, Lager und Distribution",
        title: "Die stille Logistikschicht hinter einem gepflegten Geschenk.",
        text: "Sicheres Lager, vorbereitetes Inventar, wiederkehrende Sendungen, große Ziellisten, Massenmailings und koordinierte Distribution.",
        items: [
          { title: "National und international", text: "Die Planung kann inländische und internationale Ziele berücksichtigen." },
          { title: "Hochvolumenfähig", text: "Ausgewählte Projekte lagen über 5.000 Geschenken; kleinere Scopes sind willkommen, wenn sie passen." },
        ],
      },
    ],
    occasions: [
      "Feiertagsgifting",
      "Weihnachten",
      "Geburtstag",
      "Ostern und Saison",
      "Kundenwertschätzung",
      "VIP-Spieler- und Kundenwertschätzung",
      "Interne Anerkennung",
      "Event-Gifting",
      "Produktlaunches",
      "Meilensteine",
      "Loyalty-Programme",
    ],
    finalCta: {
      title: "Bringen Sie die Idee. Wir helfen, das Programm zu formen.",
      text: "Teilen Sie Projekttyp, Zielgruppe, Umfang, Ziele und Zeitplan. MorePower2You prüft die Details und schlägt den nächsten Schritt vor.",
    },
    seo: {
      title: "Corporate Gifting, VIP und Fulfillment | MorePower2You",
      description: "Schlüsselfertiges Corporate Gifting, Markenboxen, Concierge, Lager, Fulfillment und VIP-Programme.",
    },
  },
  pt: {
    tagline: "O poder magnífico do gifting, reconstruído para programas corporativos modernos.",
    contactNote: "Os pedidos de projeto passam pelo formulário seguro.",
    serviceArea: "Apoio a projetos de gifting, concierge, fulfillment e envios em massa nacionais e internacionais.",
    footerDescription:
      "A MorePower2You planeia, abastece, personaliza, embala, armazena, cumpre e entrega projetos de gifting e concierge para empresas que querem cada detalhe cuidado.",
    nav: {
      "/services": "Serviços",
      "/gaming-vip-player-gifting": "Gaming e VIP",
      "/process": "Processo",
      "/gallery": "Galeria",
      "/insights": "Artigos",
      "/contact": "Contacto",
    },
    footerColumns: ["Empresa", "Serviços", "Planeamento"],
    footerLinks: {
      "/about": "Sobre",
      "/who-we-serve": "A quem servimos",
      "/testimonials": "Testemunhos",
      "/faqs": "Perguntas",
      "/corporate-gifting": "Gifting corporativo",
      "/custom-gift-boxes": "Caixas personalizadas",
      "/concierge-services": "Concierge",
      "/fulfillment-warehousing-distribution": "Fulfillment",
      "/case-studies": "Casos",
      "/resources/corporate-gifting-planning-checklist": "Recursos",
      "/privacy-policy": "Privacidade",
      "/terms-and-conditions": "Termos",
    },
    hero: {
      eyebrow: "Gifting, concierge e fulfillment chave na mão",
      title: "Gifting corporativo à medida, da ideia à porta.",
      text: "A MorePower2You desenha e entrega experiências de gifting premium: caixas de marca, campanhas sazonais e projetos de concierge, com sourcing, embalagem, armazém, fulfillment, entrega e apoio sob o mesmo teto.",
      proof: ["Projetos selecionados com mais de 5.000 presentes", "Alcance nacional e internacional", "De alimentos a eletrónica"],
      primary: "Começar um projeto de gifting",
      secondary: "Ver como funciona",
    },
    proof: [
      { title: "Chave na mão", text: "Conceito, sourcing, personalização, embalagem, armazém, fulfillment, entrega e apoio." },
      { title: "Escala flexível", text: "Feito para campanhas de alto volume e também para projetos mais definidos." },
      { title: "Encaixe premium", text: "Um parceiro cuidado para marketing, RH, operações, equipas de liderança, eventos e programas VIP." },
    ],
    whatWeDo: {
      eyebrow: "O que a MorePower2You faz",
      title: "Gifting especializado e concierge sob o mesmo teto.",
      text: "O trabalho começa com um objetivo de gifting e termina num programa que as pessoas gostam de receber. A MorePower2You pode moldar o conceito, abastecer, coordenar embalagem de marca, gerir armazém, montar envios e apoiar destinos nacionais e internacionais.",
      items: [
        { title: "Campanhas de gifting corporativo", text: "Agradecimento a clientes, reconhecimento interno, kits de lançamento, presentes de evento e programas sazonais." },
        { title: "Gifting VIP e de fidelização", text: "Presentes de alto cuidado para clientes top, jogadores VIP, marcos e retenção." },
        { title: "Caixas de marca", text: "Embalagem, inserts, mix de produto, personalização e apresentação." },
        { title: "Fulfillment e envios em massa", text: "Armazém, montagem de kits, coordenação de destinos e apoio de envio." },
      ],
    },
    process: [
      { title: "Descobrir", text: "Clarificar audiência, ocasião, escala, destinos, prazos e personalização." },
      { title: "Curar", text: "Desenvolver produto e embalagem alinhados com a marca e o momento." },
      { title: "Personalizar", text: "Coordenar peças de marca, inserts, embalagem e detalhes de apresentação." },
      { title: "Embalar", text: "Montar caixas, kits e unidades prontas a enviar com uma experiência cuidada." },
      { title: "Armazenar e cumprir", text: "Apoiar armazém, staging, envios em massa e envios recorrentes." },
      { title: "Entregar", text: "Preparar o projeto para entrega nacional ou internacional." },
      { title: "Acompanhar", text: "Manter o projeto a avançar com coordenação de concierge." },
    ],
    featured: [
      {
        eyebrow: "Gaming e gifting VIP",
        title: "Momentos de fidelidade que viajam para além do ecrã.",
        text: "Para apps de casino, RPGs, ação, estratégia e programas VIP, a MorePower2You desenha gifting de primeiro nível para marcos, drops sazonais e agradecimento de alto valor.",
        items: [
          { title: "Jogadores VIP", text: "Presentes de marco, reconhecimento de estatuto, retenção e surpresas." },
          { title: "Marcas de gaming", text: "Estratégias colecionáveis, premium e seguras para a marca." },
        ],
      },
      {
        eyebrow: "Caixas de presente",
        title: "Um unboxing de marca sem a carga operacional.",
        text: "De snacks e wellness a eletrónica, peças impressas, apparel e conceitos à medida: cada caixa nasce da audiência, ocasião e orçamento.",
        items: [
          { title: "Pontos de partida flexíveis", text: "VIP, festas, welcome boxes, kits de evento, reconhecimento interno e projetos de concierge." },
          { title: "Sem preços públicos fixos", text: "Cada projeto é orçamentado por destinatários, produtos, personalização, embalagem, logística e prazos." },
        ],
      },
      {
        eyebrow: "Fulfillment, armazém e distribuição",
        title: "A camada logística silenciosa por trás de um presente cuidado.",
        text: "Armazém seguro, inventário preparado, envios recorrentes, listas grandes de destinos, mailings em massa e distribuição coordenada.",
        items: [
          { title: "Nacional e internacional", text: "O planeamento pode incluir destinos domésticos e internacionais." },
          { title: "Pronto para alto volume", text: "Projetos selecionados ultrapassaram 5.000 presentes; scopes menores também cabem quando o encaixe é certo." },
        ],
      },
    ],
    occasions: [
      "Gifting de festas",
      "Natal",
      "Aniversário",
      "Páscoa e época",
      "Agradecimento a clientes",
      "Agradecimento a jogadores e clientes VIP",
      "Reconhecimento interno",
      "Gifting de eventos",
      "Lançamentos",
      "Marcos",
      "Programas de fidelização",
    ],
    finalCta: {
      title: "Traga a ideia. Ajudamos a dar forma ao programa.",
      text: "Partilhe tipo de projeto, audiência, escala, destinos e prazos. A MorePower2You revê os detalhes e propõe o passo seguinte.",
    },
    seo: {
      title: "Gifting corporativo, VIP e fulfillment | MorePower2You",
      description: "Gifting corporativo chave na mão, caixas de marca, concierge, armazém, fulfillment e programas VIP.",
    },
  },
  zh: {
    tagline: "把馈赠的力量，重新做成适合现代企业项目的方式。",
    contactNote: "项目咨询通过安全表单处理。",
    serviceArea: "支持国内与国际的礼赠、礼宾、履约与大宗寄送项目。",
    footerDescription: "MorePower2You 为企业规划、采购、定制、包装、仓储、履约并送达礼赠与礼宾项目，让每个细节都被照顾到。",
    nav: {
      "/services": "服务",
      "/gaming-vip-player-gifting": "游戏与 VIP",
      "/process": "流程",
      "/gallery": "图库",
      "/insights": "洞察",
      "/contact": "联系",
    },
    footerColumns: ["公司", "服务", "规划"],
    footerLinks: {
      "/about": "关于我们",
      "/who-we-serve": "服务对象",
      "/testimonials": "客户评价",
      "/faqs": "常见问题",
      "/corporate-gifting": "企业礼赠",
      "/custom-gift-boxes": "定制礼盒",
      "/concierge-services": "礼宾服务",
      "/fulfillment-warehousing-distribution": "履约仓储",
      "/case-studies": "案例",
      "/resources/corporate-gifting-planning-checklist": "资源",
      "/privacy-policy": "隐私",
      "/terms-and-conditions": "条款",
    },
    hero: {
      eyebrow: "一站式礼赠、礼宾与履约",
      title: "定制企业礼赠，从想法送到门口。",
      text: "MorePower2You 设计并交付高端礼赠体验：品牌礼盒、季节活动与全程礼宾项目，采购、包装、仓储、履约、配送与支持都在同一屋檐下。",
      proof: ["部分项目超过 5,000 份礼品", "覆盖国内与国际", "从食品到电子产品"],
      primary: "开始礼赠项目",
      secondary: "了解如何运作",
    },
    proof: [
      { title: "一站式", text: "概念、采购、定制、包装、仓储、履约、配送与项目支持。" },
      { title: "灵活规模", text: "适合高体量活动，也能承接范围明确的较小项目。" },
      { title: "高端契合", text: "为市场、人力资源、运营、高管、活动与 VIP 客户项目提供细致合作。" },
    ],
    whatWeDo: {
      eyebrow: "MorePower2You 做什么",
      title: "专业礼赠与礼宾，都在同一屋檐下。",
      text: "工作从礼赠目标开始，到人们乐于接收的完整方案结束。MorePower2You 可以塑造概念、采购产品、协调品牌包装、管理仓储、组装发货，并支持国内与国际目的地。",
      items: [
        { title: "企业礼赠活动", text: "客户答谢、员工认可、发布礼盒、活动礼品与季节项目。" },
        { title: "VIP 与忠诚礼赠", text: "为高价值客户、VIP 玩家、里程碑与留存准备高触感礼品。" },
        { title: "品牌礼盒", text: "包装、内页、产品组合、个性化与呈现。" },
        { title: "履约与大宗寄送", text: "仓储、套装组装、目的地协调与发货支持。" },
      ],
    },
    process: [
      { title: "发现", text: "明确受众、场合、规模、目的地、时间与定制需求。" },
      { title: "策划", text: "围绕品牌与此刻，形成产品与包装方案。" },
      { title: "定制", text: "协调品牌物料、印刷内页、包装与呈现细节。" },
      { title: "包装", text: "组装礼盒、套装与可寄送单元，保证接收体验。" },
      { title: "仓储与履约", text: "支持仓储、备货、大宗寄送与循环发货。" },
      { title: "送达", text: "为国内或国际配送做好目的地安排。" },
      { title: "支持", text: "以礼宾式协调推动项目直至完成。" },
    ],
    featured: [
      {
        eyebrow: "游戏与 VIP 玩家礼赠",
        title: "忠诚时刻，走出屏幕。",
        text: "面向赌场应用、RPG、动作、策略与 VIP 客户项目，MorePower2You 为里程碑、季节投放与高价值答谢设计顶级礼赠。",
        items: [
          { title: "VIP 玩家", text: "里程碑礼品、身份认可、留存活动与惊喜投放。" },
          { title: "游戏品牌", text: "既有收藏感与品质，又对品牌安全的礼赠策略。" },
        ],
      },
      {
        eyebrow: "定制礼盒",
        title: "有品牌感的开箱，却不必自己扛运营。",
        text: "从零食与健康到电子、印刷、服饰与完全定制概念：每个盒子都按受众、场合与预算来做。",
        items: [
          { title: "灵活起点", text: "VIP 答谢、节日、迎新盒、活动套装、员工认可与礼宾项目。" },
          { title: "没有固定公开价", text: "按人数、产品、定制、包装、物流与时间单独报价。" },
        ],
      },
      {
        eyebrow: "履约、仓储与配送",
        title: "精致礼物背后安静的物流层。",
        text: "安全仓储、备货、循环发货、大量目的地、大宗邮寄与协调配送。",
        items: [
          { title: "国内与国际", text: "规划可同时考虑国内与国际目的地。" },
          { title: "可承接高体量", text: "部分项目已超过 5,000 份；范围合适时也欢迎较小项目。" },
        ],
      },
    ],
    occasions: ["节日礼赠", "圣诞", "生日", "复活节与季节", "客户答谢", "VIP 玩家与客户答谢", "员工认可", "活动礼赠", "产品发布", "里程碑", "忠诚计划"],
    finalCta: {
      title: "带上想法。我们帮你把方案做出来。",
      text: "告诉我们项目类型、受众、规模、目的地与时间。MorePower2You 会审阅细节并回复下一步。",
    },
    seo: {
      title: "企业礼赠、VIP 礼赠与履约 | MorePower2You",
      description: "一站式企业礼赠、品牌礼盒、礼宾采购、仓储、履约与 VIP 计划。",
    },
  },
  ar: {
    tagline: "قوة الإهداء الرائعة، معاد بناؤها لبرامج الشركات الحديثة.",
    contactNote: "تُدار استفسارات المشاريع عبر النموذج الآمن.",
    serviceArea: "دعم مشاريع الإهداء والكونسيرج والتنفيذ والإرسال الجماعي محلياً ودولياً.",
    footerDescription:
      "تخطط MorePower2You وتوفر وتخصص وتعبّئ وتخزّن وتنفّذ وتوصل مشاريع الإهداء والكونسيرج للشركات التي تريد العناية بكل تفصيل.",
    nav: {
      "/services": "الخدمات",
      "/gaming-vip-player-gifting": "الألعاب وVIP",
      "/process": "العملية",
      "/gallery": "المعرض",
      "/insights": "مقالات",
      "/contact": "تواصل",
    },
    footerColumns: ["الشركة", "الخدمات", "التخطيط"],
    footerLinks: {
      "/about": "من نحن",
      "/who-we-serve": "من نخدم",
      "/testimonials": "آراء العملاء",
      "/faqs": "أسئلة",
      "/corporate-gifting": "هدايا الشركات",
      "/custom-gift-boxes": "صناديق مخصصة",
      "/concierge-services": "كونسيرج",
      "/fulfillment-warehousing-distribution": "التنفيذ",
      "/case-studies": "دراسات الحالة",
      "/resources/corporate-gifting-planning-checklist": "موارد",
      "/privacy-policy": "الخصوصية",
      "/terms-and-conditions": "الشروط",
    },
    hero: {
      eyebrow: "إهداء وكونسيرج وتنفيذ متكامل",
      title: "هدايا شركات مخصصة من الفكرة إلى الباب.",
      text: "تصمم MorePower2You وتقدّم تجارب إهداء فاخرة: صناديق بعلامة تجارية وحملات موسمية ومشاريع كونسيرج، مع التوريد والتعبئة والتخزين والتنفيذ والتوصيل والدعم تحت سقف واحد.",
      proof: ["مشاريع مختارة تتجاوز 5,000 هدية", "وصول محلي ودولي", "من المأكولات إلى الإلكترونيات"],
      primary: "ابدأ مشروع إهداء",
      secondary: "كيف يعمل الأمر",
    },
    proof: [
      { title: "متكامل", text: "المفهوم والتوريد والتخصيص والتعبئة والتخزين والتنفيذ والتوصيل والدعم." },
      { title: "حجم مرن", text: "مصمم للحملات عالية الحجم مع إمكانية دعم مشاريع أصغر محددة النطاق." },
      { title: "ملاءمة فاخرة", text: "شريك أنيق للتسويق والموارد البشرية والعمليات والفرق التنفيذية والفعاليات وبرامج VIP." },
    ],
    whatWeDo: {
      eyebrow: "ماذا تفعل MorePower2You",
      title: "إهداء متخصص وكونسيرج تحت سقف واحد.",
      text: "يبدأ العمل بهدف إهداء وينتهي ببرنامج يسعد الناس باستلامه. يمكن لـ MorePower2You تشكيل المفهوم وتوفير المنتجات وتنسيق التغليف ذي العلامة وإدارة التخزين وتجميع الشحنات ودعم الوجهات المحلية والدولية.",
      items: [
        { title: "حملات هدايا الشركات", text: "تقدير العملاء وتكريم الموظفين وحقائب الإطلاق وهدايا الفعاليات والبرامج الموسمية." },
        { title: "إهداء VIP والولاء", text: "هدايا عالية العناية لكبار العملاء ولاعبي VIP والمحطات وبرامج الاستبقاء." },
        { title: "صناديق بعلامة تجارية", text: "التغليف والإدخالات ومزيج المنتجات والتخصيص والعرض." },
        { title: "التنفيذ والإرسال الجماعي", text: "التخزين وتجميع الحقائب وتنسيق الوجهات ودعم الشحن." },
      ],
    },
    process: [
      { title: "اكتشاف", text: "توضيح الجمهور والمناسبة والحجم والوجهات والتوقيت واحتياجات التخصيص." },
      { title: "اختيار", text: "تطوير المنتج والتغليف بما يتوافق مع العلامة واللحظة." },
      { title: "تخصيص", text: "تنسيق القطع ذات العلامة والإدخالات المطبوعة والتغليف وتفاصيل العرض." },
      { title: "تعبئة", text: "تجميع الصناديق والحقائب والوحدات الجاهزة للشحن بتجربة استلام أنيقة." },
      { title: "تخزين وتنفيذ", text: "دعم التخزين والتجهيز والإرسال الجماعي والشحنات المتكررة." },
      { title: "توصيل", text: "تجهيز المشروع للتسليم المحلي أو الدولي." },
      { title: "دعم", text: "إبقاء المشروع متحركاً بتنسيق كونسيرج من البداية إلى النهاية." },
    ],
    featured: [
      {
        eyebrow: "الألعاب وإهداء لاعبي VIP",
        title: "لحظات ولاء تسافر خارج الشاشة.",
        text: "لتطبيقات الكازينو وألعاب الأدوار والحركة والاستراتيجية وبرامج VIP، تصمم MorePower2You إهداءً رفيعاً للمحطات والإصدارات الموسمية وتقدير العملاء عالي القيمة.",
        items: [
          { title: "لاعبو VIP", text: "هدايا المحطات وتقدير المكانة والاستبقاء والمفاجآت." },
          { title: "علامات الألعاب", text: "استراتيجيات تبدو قابلة للجمع وفاخرة وآمنة للعلامة." },
        ],
      },
      {
        eyebrow: "صناديق الهدايا",
        title: "تجربة فتح صندوق بعلامة تجارية دون العبء التشغيلي.",
        text: "من الوجبات الخفيفة والعافية إلى الإلكترونيات والمطبوعات والملابس والمفاهيم المخصصة بالكامل: يُبنى كل صندوق حول الجمهور والمناسبة والميزانية.",
        items: [
          { title: "بدايات مرنة", text: "تقدير VIP والأعياد وصناديق الترحيب وحقائب الفعاليات وتكريم الموظفين ومشاريع الكونسيرج." },
          { title: "بدون أسعار عامة ثابتة", text: "يُسعَّر كل مشروع حسب عدد المستلمين والمنتجات والتخصيص والتغليف واللوجستيات والجدول." },
        ],
      },
      {
        eyebrow: "التنفيذ والتخزين والتوزيع",
        title: "طبقة لوجستية هادئة خلف هدية أنيقة.",
        text: "تخزين آمن ومخزون مجهّز وشحنات متكررة وقوائم وجهات كبيرة وإرسال جماعي وتوزيع منسّق.",
        items: [
          { title: "محلي ودولي", text: "يمكن أن يراعي التخطيط الوجهات المحلية والدولية." },
          { title: "جاهز للحجم الكبير", text: "تجاوزت مشاريع مختارة 5,000 هدية، والنطاقات الأصغر مرحّب بها عندما يكون التوافق مناسباً." },
        ],
      },
    ],
    occasions: [
      "هدايا الأعياد",
      "عيد الميلاد",
      "أعياد الميلاد",
      "الفصح والمواسم",
      "تقدير العملاء",
      "تقدير لاعبي وعملاء VIP",
      "تقدير الموظفين",
      "هدايا الفعاليات",
      "إطلاق المنتجات",
      "المحطات",
      "برامج الولاء",
    ],
    finalCta: {
      title: "أحضر الفكرة. نساعد في تشكيل البرنامج.",
      text: "شارك نوع المشروع والجمهور والحجم والوجهات والجدول. ستراجع MorePower2You التفاصيل وتقترح الخطوة التالية.",
    },
    seo: {
      title: "هدايا الشركات وVIP والتنفيذ | MorePower2You",
      description: "إهداء شركات متكامل وصناديق بعلامة وكونسيرج وتخزين وتنفيذ وبرامج VIP.",
    },
  },
};

function prefixCta(locale: Locale, cta?: Cta): Cta | undefined {
  if (!cta) return cta;
  return { ...cta, href: withLocale(locale, cta.href) };
}

function prefixHrefs(site: SiteContent, locale: Locale): SiteContent {
  return {
    ...site,
    locale,
    direction: isRtl(locale) ? "rtl" : "ltr",
    nav: site.nav.map((item) => ({ ...item, href: withLocale(locale, item.href) })),
    footer: {
      ...site.footer,
      columns: site.footer.columns.map((column) => ({
        ...column,
        links: column.links.map((link) => ({ ...link, href: withLocale(locale, link.href) })),
      })),
    },
    home: {
      ...site.home,
      hero: {
        ...site.home.hero,
        primaryCta: prefixCta(locale, site.home.hero.primaryCta)!,
        secondaryCta: prefixCta(locale, site.home.hero.secondaryCta)!,
      },
    },
    pages: site.pages.map((page) => ({
      ...page,
      primaryCta: prefixCta(locale, page.primaryCta),
      secondaryCta: prefixCta(locale, page.secondaryCta),
    })),
    services: site.services.map((service) => ({
      ...service,
      primaryCta: prefixCta(locale, service.primaryCta),
      secondaryCta: prefixCta(locale, service.secondaryCta),
    })),
    legal: site.legal.map((page) => ({
      ...page,
      primaryCta: prefixCta(locale, page.primaryCta),
      secondaryCta: prefixCta(locale, page.secondaryCta),
    })),
  };
}

export function buildLocalizedSite(locale: Exclude<Locale, "en" | "he">): SiteContent {
  const overlay = overlays[locale];
  const base = prefixHrefs(structuredClone(englishContent), locale);
  const labels = ui[locale];

  return {
    ...base,
    settings: {
      ...base.settings,
      tagline: overlay.tagline,
      contactNote: overlay.contactNote,
      serviceArea: overlay.serviceArea,
    },
    nav: base.nav.map((item) => {
      const original = item.href.replace(new RegExp(`^/${locale}`), "") || "/";
      return { ...item, label: overlay.nav[original] || item.label };
    }),
    footer: {
      description: overlay.footerDescription,
      columns: base.footer.columns.map((column, index) => ({
        title: overlay.footerColumns[index] || column.title,
        links: column.links.map((link) => {
          const original = link.href.replace(new RegExp(`^/${locale}`), "") || "/";
          return { ...link, label: overlay.footerLinks[original] || link.label };
        }),
      })),
    },
    home: {
      ...base.home,
      seo: {
        ...base.home.seo,
        title: overlay.seo.title,
        description: overlay.seo.description,
      },
      hero: {
        ...base.home.hero,
        eyebrow: overlay.hero.eyebrow,
        title: overlay.hero.title,
        text: overlay.hero.text,
        proof: overlay.hero.proof,
        primaryCta: { ...base.home.hero.primaryCta, label: overlay.hero.primary },
        secondaryCta: { ...base.home.hero.secondaryCta, label: overlay.hero.secondary },
      },
      proof: overlay.proof,
      whatWeDo: {
        ...base.home.whatWeDo,
        eyebrow: overlay.whatWeDo.eyebrow,
        title: overlay.whatWeDo.title,
        text: overlay.whatWeDo.text,
        items: overlay.whatWeDo.items,
      },
      process: overlay.process,
      featured: overlay.featured,
      occasions: overlay.occasions,
      finalCta: {
        ...base.home.finalCta,
        title: overlay.finalCta.title,
        text: overlay.finalCta.text,
        items: [
          { title: "Primary CTA", text: overlay.hero.primary },
          { title: "Secondary CTA", text: labels.exploreServices },
        ],
      },
    },
    pages: base.pages.map((page) => ({
      ...page,
      primaryCta: page.primaryCta ? { ...page.primaryCta, label: labels.startProject } : page.primaryCta,
      secondaryCta: page.secondaryCta ? { ...page.secondaryCta, label: labels.exploreServices } : page.secondaryCta,
    })),
    services: base.services.map((service) => ({
      ...service,
      primaryCta: service.primaryCta ? { ...service.primaryCta, label: overlay.hero.primary } : service.primaryCta,
    })),
  };
}
