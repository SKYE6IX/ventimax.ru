import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import Script from "next/script";
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
    title: "Ventimax",
    description: t("metaData.description"),
    keywords: convertStringToArray(t("metaData.keywords")),
    metadataBase: new URL("https://ventimax.ru"),
    alternates: {
      canonical: "/",
      languages: {
        en: "https://ventimax.ru/en",
        ru: "https://ventimax.ru/ru",
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
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
    },
    category: "Livestocks Equipments",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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
        <Script
          id="yandex-metrica"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
       m[i].l=1*new Date();
       for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
       k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
       (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
       ym(103392832, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
       });
            `,
          }}
        />
      </body>
    </html>
  );
}
