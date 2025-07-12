// This file contains the data for hero products displayed on the homepage.

export type Category =
  | "neagtive-pressure-fan"
  | "cooling-pad"
  | "farming-equipment"
  | "heating-equipment"
  | "fecal-cleaning-equipment"
  | "other-fans";

export const products = [
  {
    id: "hy-push-pull-exhaust-fans",
    name: "HY-PUSH-PULL EXHAUST FANS",
    heroImage: "/product-images/hy-push-pull-exhaust-fans/hero.webp",
    images: ["/product-images/hy-push-pull-exhaust-fans/image-1.webp"],
    tags: ["featured", "hero"],
    category: "neagtive-pressure-fan",
  },
  {
    id: "hy-heavy-hammer-exhaust-fan",
    name: "HY-HEAVY HAMMER EXHAUST FAN",
    heroImage: "",
    images: [
      "/product-images/hy-heavy-hammer-exhaust-fan/image-1.webp",
      "/product-images/hy-heavy-hammer-exhaust-fan/image-2.webp",
    ],
    tags: [],
    category: "neagtive-pressure-fan",
  },
  {
    id: "hy-cooling-pad",
    name: "HY COOLING PAD",
    heroImage: "/product-images/hy-cooling-pad/hero.png",
    images: ["/product-images/hy-cooling-pad/image-1.webp"],
    tags: ["featured", "hero"],
    category: "cooling-pad",
  },
  {
    id: "hy-plastic-cooling-pad",
    name: "HY-PLASTIC COOLING PAD",
    heroImage: "",
    images: ["/product-images/hy-plastic-cooling-pad/image-1.webp"],
    tags: [],
    category: "cooling-pad",
  },
  {
    id: "hy-silos",
    name: "HY SILOS",
    heroImage: "/product-images/hy-silos/hero.webp",
    images: ["/product-images/hy-silos/image-1.webp"],
    tags: ["featured", "hero"],
    category: "farming-equipment",
  },
  {
    id: "hy-poultry-light-filter",
    name: "HY-POULTRY LIGHT FILTER",
    heroImage: "",
    images: ["/product-images/hy-poultry-light-filter/image-1.webp"],
    tags: [],
    category: "farming-equipment",
  },

  {
    id: "hy-electric-heaters",
    name: "HY-ELECTRIC HEATERS",
    heroImage: "/product-images/hy-electric-heaters/hero.webp",
    images: ["/product-images/hy-electric-heaters/image-1.webp"],
    tags: [],
    category: "heating-equipment",
  },
  {
    id: "hy-series-coal-burning-heater",
    name: "HY-SERIES COAL-BURNING HEATER",
    heroImage: "",
    images: ["/product-images/hy-series-coal-burning-heater/image-1.webp"],
    tags: [],
    category: "heating-equipment",
  },

  {
    id: "hy-dry-and-wet-seprator",
    name: "HY-DRY AND WET SEPARATOR",
    heroImage: "/product-images/hy-dry-and-wet-seprator/hero.webp",
    images: ["/product-images/hy-dry-and-wet-seprator/image-1.webp"],
    tags: ["featured", "hero"],
    category: "fecal-cleaning-equipment",
  },
  {
    id: "hy-fecal-pumping-pump",
    name: "HY-FECAL PUMPING PUMP",
    heroImage: "",
    images: ["/product-images/hy-fecal-pumping-pump/image-1.webp"],
    tags: [],
    category: "fecal-cleaning-equipment",
  },

  {
    id: "hy-roof-ventilation-fan",
    name: "HY-ROOF VENTILATION FAN",
    heroImage: "/product-images/hy-roof-ventilation-fan/hero.webp",
    images: ["/product-images/hy-roof-ventilation-fan/image-1.webp"],
    tags: ["featured", "hero"],
    category: "other-fans",
  },
  {
    id: "hy-air-circulation-fan",
    name: "HY-AIR CIRCULATION FAN",
    heroImage: "",
    images: [
      "/product-images/hy-air-circulation-fan/image-1.webp",
      "/product-images/hy-air-circulation-fan/image-2.webp",
    ],
    tags: [],
    category: "other-fans",
  },
];
