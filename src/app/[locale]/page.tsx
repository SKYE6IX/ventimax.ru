"use client";
import HeroBlock from "@/components/hero-block/HeroBlock";
import IntroBlock from "@/components/intro-block/IntroBlock";
import FeaturedProducts from "@/components/featured-products-block/FeaturedProducts";
import AboutUs from "@/components/about-us-block/AboutUs";
import UsageBlock from "@/components/usage-block/UsageBlock";
import ContactUsBlock from "@/components/contact-us-block/ContactUsBlock";
import FAQ from "@/components/faqBlock/FAQ";
import Certificates from "@/components/certificates/Certificates";
import Metrics from "@/components/metrics/Metrics";
import ExhibitionBlock from "@/components/exhibition-block/ExhibitionBlock";
import "./page.scss";

export default function Home() {
  return (
    <div className="home-page">
      <HeroBlock />
      <IntroBlock />
      <section className="home-page__metrics">
        <Metrics />
      </section>
      <FeaturedProducts />
      <AboutUs />
      <ExhibitionBlock />
      <section className="home-page__certificates">
        <Certificates />
      </section>
      <UsageBlock />
      <ContactUsBlock />
      <FAQ />
    </div>
  );
}
