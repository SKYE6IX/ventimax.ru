import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
   getTranslations,
   setRequestLocale,
   getMessages,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { WebPage, WithContext } from "schema-dts";
import RocketChat from "@/components/rocket-chat/RocketChat";
import { routing } from "@/i18n/routing";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Modal from "@/components/modal/Modal";
import ModalToggleProvider from "@/context/ModalToggleProvider";
import convertStringToArray from "@/utils/convertToStringArray";
import "../../global-style/globals.scss";

const roboto = Roboto({
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   subsets: ["latin"],
   variable: "--font-roboto",
});

export async function generateMetadata({
   params,
}: {
   params: { locale: string };
}): Promise<Metadata> {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: "SEO" });
   return {
      title: `${t("metaData.title")}`,
      description: t("metaData.description"),
      keywords: convertStringToArray(t("metaData.keywords")),
      metadataBase: new URL("https://ventimax.ru/ru"),
      alternates: {
         canonical: "https://ventimax.ru/ru",
         languages: {
            en: "https://ventimax.ru/en",
            zh: "https://ventimax.ru/zh",
         },
      },
      robots: {
         index: true,
         follow: true,
         nocache: false,
         googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
         },
      },
      verification: {
         yandex: "ccd26c026b83880e",
         google: "WqBwl_Fzxiw8EqkOKgbmByoqTwGDOBc_8tfVic2ltkU",
      },
      category: `${t("metaData.categories")}`,
   };
}

export function generateStaticParams() {
   return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ locale: string }>;
}>) {
   const isProduction = process.env.NODE_ENV === "production";
   const { locale } = await params;
   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }
   setRequestLocale(locale);
   const message = await getMessages({ locale: locale });
   const jsonLd: WithContext<WebPage> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: message.SEO.jsonLd.name,
      description: message.SEO.jsonLd.description,
      url: "https://ventimax.ru/ru",
      keywords: message.SEO.jsonLd.keywords,
      inLanguage: locale,
      isPartOf: {
         "@type": "WebSite",
         name: "Shandong Hengyuan Lufeng Agriculture and Animal Husbandry Technology Co., Ltd.",
         url: "https://ventimax.ru/ru",
      },
      mainEntity: {
         "@type": "Organization",
         name: "Shandong Hengyuan Lufeng Agriculture and Animal Husbandry Technology Co., Ltd.",
         description: message.SEO.jsonLd.mainEntity.description,
         url: "https://ventimax.ru/ru",
         contactPoint: {
            "@type": "ContactPoint",
            telephone: "+86-536-3521951",
            contactType: message.SEO.jsonLd.contactType,
            areaServed: "Global",
            availableLanguage: ["English", "Russian", "Chinese"],
         },
      },
      breadcrumb: {
         "@type": "BreadcrumbList",
         itemListElement: [
            {
               "@type": "ListItem",
               position: 1,
               name: message.SEO.jsonLd.breadcrumb.itemOne.name,
               item: "https://ventimax.ru/ru",
            },
            {
               "@type": "ListItem",
               position: 2,
               name: message.SEO.jsonLd.breadcrumb.itemTwo.name,
               item: "https://ventimax.ru/ru/products",
            },
            {
               "@type": "ListItem",
               position: 3,
               name: message.SEO.jsonLd.breadcrumb.itemThree.name,
               item: "https://ventimax.ru/ru/about",
            },
         ],
      },
   };

   return (
      <html lang={locale} className={roboto.variable}>
         <body>
            <RocketChat />
            <NextIntlClientProvider>
               <ModalToggleProvider>
                  <Header />
                  <Modal />
                  {children}
                  <Footer />
               </ModalToggleProvider>
            </NextIntlClientProvider>
            {isProduction && (
               <Script
                  id="yandex-metrica"
                  strategy="lazyOnload"
                  dangerouslySetInnerHTML={{
                     __html: `
         (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103642400', 'ym');
         ym(103642400, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", 
         accurateTrackBounce:true, trackLinks:true});
            `,
                  }}
               />
            )}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
               }}
            />
         </body>
      </html>
   );
}
