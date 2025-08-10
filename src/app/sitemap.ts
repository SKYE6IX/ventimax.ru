import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: "https://ventimax.ru/en",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://ventimax.ru/ru",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://ventimax.ru/zh",
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1,
      },
      {
         url: "https://ventimax.ru/en/about",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: "https://ventimax.ru/ru/about",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: "https://ventimax.ru/zh/about",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: "https://ventimax.ru/en/products",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: "https://ventimax.ru/ru/products",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: "https://ventimax.ru/zh/products",
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
   ];
}
