import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import RocketChat from "@/components/rocket-chat/RocketChat";
import { routing } from "@/i18n/routing";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Modal from "@/components/modal/Modal";
import ModalToggleProvider from "@/context/ModalToggleProvider";
import "../../global-style/globals.scss";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

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
      </body>
    </html>
  );
}
