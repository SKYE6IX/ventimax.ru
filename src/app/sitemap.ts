import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ventimax.ru/",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://ventimax.ru/en",
          ru: "https://ventimax.ru/ru",
          zh: "https://ventimax.ru/zh",
        },
      },
    },
    {
      url: "https://ventimax.ru/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://ventimax.ru/en/about",
          ru: "https://ventimax.ru/ru/about",
          zh: "https://ventimax.ru/zh/about",
        },
      },
    },
    {
      url: "https://ventimax.ru/products",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://ventimax.ru/en/products",
          ru: "https://ventimax.ru/ru/products",
          zh: "https://ventimax.ru/zh/products",
        },
      },
    },
  ];
}
