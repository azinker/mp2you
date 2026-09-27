export type GalleryStudio = {
  id: string;
  label: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type GalleryProject = {
  id: string;
  studioId: string;
  studio: string;
  title: string;
  summary: string;
  featured?: boolean;
  photos: GalleryPhoto[];
};

function photos(folder: string, count: number, alt: string): GalleryPhoto[] {
  return Array.from({ length: count }, (_, index) => ({
    src: `/gallery-projects/${folder}/${String(index + 1).padStart(2, "0")}.jpg`,
    alt: count === 1 ? alt : `${alt} — view ${index + 1}`,
  }));
}

export const galleryStudios: GalleryStudio[] = [
  { id: "best-fiends", label: "Best Fiends" },
  { id: "bingo-blitz", label: "Bingo Blitz" },
  { id: "hof", label: "House of Fun" },
  { id: "jackpota", label: "Jackpota" },
  { id: "papaya", label: "Papaya" },
  { id: "slotomania", label: "Slotomania" },
  { id: "solitaire", label: "Solitaire" },
  { id: "vip-premium", label: "VIP Premium" },
  { id: "wooga", label: "Wooga" },
];

export const galleryProjects: GalleryProject[] = [
  {
    id: "best-fiends-medal",
    studioId: "best-fiends",
    studio: "Best Fiends",
    title: "Medal of Honor",
    summary: "A velvet presentation case and custom medal produced as a player-recognition piece.",
    featured: true,
    photos: photos("best-fiends", 3, "Best Fiends Medal of Honor gift"),
  },
  {
    id: "bingo-blitz-waffle",
    studioId: "bingo-blitz",
    studio: "Bingo Blitz",
    title: "Canada Day waffle kit",
    summary: "A foam-fitted box with a waffle maker, tools, and branded seasonal insert.",
    featured: true,
    photos: photos("bingo-blitz", 7, "Bingo Blitz Canada Day waffle kit"),
  },
  {
    id: "hof-fridge",
    studioId: "hof",
    studio: "House of Fun",
    title: "Birthday mini fridge",
    summary: "A handled birthday carton built around a compact fridge for VIP players.",
    photos: photos("hof/fridge", 3, "House of Fun birthday mini fridge gift"),
  },
  {
    id: "hof-icecream",
    studioId: "hof",
    studio: "House of Fun",
    title: "Ice cream maker set",
    summary: "A green VIP box with a compact ice cream maker, scoop, and insert cards.",
    photos: photos("hof/icecream", 3, "House of Fun ice cream maker gift"),
  },
  {
    id: "hof-massage",
    studioId: "hof",
    studio: "House of Fun",
    title: "Recovery massage kit",
    summary: "A wellness gift built around a massage gun for high-value player appreciation.",
    photos: photos("hof/massage", 2, "House of Fun recovery massage gift"),
  },
  {
    id: "hof-phonograph",
    studioId: "hof",
    studio: "House of Fun",
    title: "Holiday phonograph",
    summary: "A seasonal VIP carton for a compact phonograph gift.",
    photos: photos("hof/phonograph", 2, "House of Fun holiday phonograph gift"),
  },
  {
    id: "jackpota-box",
    studioId: "jackpota",
    studio: "Jackpota",
    title: "Signature black box",
    summary: "A matte two-door presentation box with a foil Jackpota mark.",
    photos: photos("jackpota", 1, "Jackpota matte black presentation box"),
  },
  {
    id: "papaya-christmas",
    studioId: "papaya",
    studio: "Papaya",
    title: "Christmas kit",
    summary: "A holiday box with foam-fitted accessories and a branded ornament.",
    photos: photos("papaya/christmas", 2, "Papaya Christmas gift box"),
  },
  {
    id: "papaya-thanksgiving",
    studioId: "papaya",
    studio: "Papaya",
    title: "Thanksgiving pumpkin mug",
    summary: "A branded pumpkin mug produced for Papaya’s Thanksgiving player program.",
    photos: [{ src: "/gallery-projects/papaya/thanksgiving/02.jpg", alt: "Papaya Thanksgiving Bubble Cash pumpkin mug" }],
  },
  {
    id: "slotomania-blender",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Blender gift",
    summary: "A kitchen appliance kit packed for a Slotomania campaign.",
    photos: [
      { src: "/gallery-projects/slotomania/blender/02.jpg", alt: "Slotomania blender gift packed in a custom box" },
      { src: "/gallery-projects/slotomania/blender/03.jpg", alt: "Slotomania Shake and Spin gift box" },
    ],
  },
  {
    id: "slotomania-cooler",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Cooler program",
    summary: "A branded cooler gift prepared for high-value recipients.",
    photos: photos("slotomania/cooler", 3, "Slotomania cooler gift"),
  },
  {
    id: "slotomania-diffuser",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Diffuser and air purifier",
    summary: "A home-wellness pair packed as one coordinated gift.",
    photos: photos("slotomania/diffuser", 3, "Slotomania diffuser and air purifier gift"),
  },
  {
    id: "slotomania-headphones",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Headphones and coffee warmer",
    summary: "A two-piece lifestyle set in custom presentation.",
    photos: photos("slotomania/headphones", 6, "Slotomania headphones and coffee warmer gift"),
  },
  {
    id: "slotomania-kettle",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Kettle gift",
    summary: "A compact kettle packed as a finished recipient-ready kit.",
    photos: photos("slotomania/kettle", 4, "Slotomania kettle gift"),
  },
  {
    id: "slotomania-lcd",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "LCD birthday box",
    summary: "A glitter birthday carton designed as a premium unboxing moment.",
    featured: true,
    photos: photos("slotomania/lcd", 3, "Slotomania Happy Birthday gift box"),
  },
  {
    id: "slotomania-birthday-fridge",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Birthday mini fridges",
    summary: "A birthday carton series for compact fridge gifts.",
    photos: [{ src: "/gallery-projects/slotomania/birthday-fridge/07.jpg", alt: "Slotomania Happy BDAY gift box" }],
  },
  {
    id: "slotomania-basket",
    studioId: "slotomania",
    studio: "Slotomania",
    title: "Host basket",
    summary: "A woven basket with towel, warmer, and packed accessories.",
    photos: [
      { src: "/gallery-projects/slotomania/basket/01.jpg", alt: "Slotomania host gift basket packed with towel and accessories" },
      { src: "/gallery-projects/slotomania/basket/02.jpg", alt: "Slotomania host gift basket contents" },
    ],
  },
  {
    id: "solitaire-lamp",
    studioId: "solitaire",
    studio: "Solitaire",
    title: "Christmas lamp",
    summary: "A seasonal lamp gift produced for Solitaire’s holiday program.",
    photos: photos("solitaire/lamp", 6, "Solitaire Christmas lamp gift"),
  },
  {
    id: "solitaire-compost",
    studioId: "solitaire",
    studio: "Solitaire",
    title: "Christmas gift box",
    summary: "A designed Solitaire Grand Harvest holiday box from the compost program.",
    photos: [{ src: "/gallery-projects/solitaire/compost/02.jpg", alt: "Solitaire Grand Harvest Christmas gift box" }],
  },
  {
    id: "solitaire-july4",
    studioId: "solitaire",
    studio: "Solitaire",
    title: "Fourth of July kit",
    summary: "A purple branded box with cap and drinkware for a July 4 program.",
    featured: true,
    photos: photos("solitaire/july4", 2, "Solitaire Fourth of July gift"),
  },
  {
    id: "vip-picnic",
    studioId: "vip-premium",
    studio: "VIP Premium",
    title: "Picnic hamper",
    summary: "A wicker picnic set with plates, cutlery, and fitted lining.",
    photos: photos("vip-premium/picnic", 3, "VIP Premium picnic hamper"),
  },
  {
    id: "vip-fridge",
    studioId: "vip-premium",
    studio: "VIP Premium",
    title: "Mini fridge series",
    summary: "A multi-unit fridge program packed for VIP recipients.",
    photos: photos("vip-premium/fridge", 10, "VIP Premium mini fridge gift"),
  },
  {
    id: "vip-july4",
    studioId: "vip-premium",
    studio: "VIP Premium",
    title: "July 4 program",
    summary: "A seasonal VIP kit produced for a Fourth of July drop.",
    photos: photos("vip-premium/july4", 2, "VIP Premium July 4 gift"),
  },
  {
    id: "vip-phonograph",
    studioId: "vip-premium",
    studio: "VIP Premium",
    title: "Phonograph gift",
    summary: "A compact phonograph packed as a finished VIP unboxing.",
    photos: photos("vip-premium/phonograph", 13, "VIP Premium phonograph gift"),
  },
  {
    id: "wooga-blanket",
    studioId: "wooga",
    studio: "Wooga",
    title: "Orchid Society holiday box",
    summary: "A foil-stamped holiday box with blanket, ornament, and socks.",
    featured: true,
    photos: photos("wooga/blanket", 1, "Wooga Orchid Society holiday gift box"),
  },
  {
    id: "wooga-chocolate",
    studioId: "wooga",
    studio: "Wooga",
    title: "Chocolate and collectible",
    summary: "A boxed chocolate program with a custom figurine.",
    photos: photos("wooga/chocolate", 5, "Wooga chocolate and collectible gift"),
  },
  {
    id: "wooga-picnic",
    studioId: "wooga",
    studio: "Wooga",
    title: "Picnic set",
    summary: "A foam-fitted picnic roll and ceramic pieces in a presentation box.",
    photos: photos("wooga/picnic", 7, "Wooga picnic gift"),
  },
];

export const featuredGalleryProjects = galleryProjects.filter((project) => project.featured);

export function galleryStats() {
  return {
    studios: galleryStudios.length,
    programs: galleryProjects.length,
    photos: galleryProjects.reduce((total, project) => total + project.photos.length, 0),
  };
}
