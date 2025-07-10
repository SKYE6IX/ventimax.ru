import HeroBlock from "@/components/hero-block/HeroBlock";
import IntroBlock from "@/components/intro-block/IntroBlock";
import FeaturedProducts from "@/components/featured-products-block/FeaturedProducts";
import AboutUs from "@/components/about-us-block/AboutUs";
import UsageBlock from "@/components/usage-block/UsageBlock";
import ContactUsBlock from "@/components/contact-us-block/ContactUsBlock";

export default function Home() {
  return (
    <div>
      <HeroBlock />
      <IntroBlock />
      <FeaturedProducts />
      <AboutUs />
      <UsageBlock />
      <ContactUsBlock />
    </div>
  );
}
