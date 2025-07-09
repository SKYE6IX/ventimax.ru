import HeroBlock from "@/components/hero-block/HeroBlock";
import IntroBlock from "@/components/intro-block/IntroBlock";
import FeaturedProducts from "@/components/featured-products-block/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <HeroBlock />
      <IntroBlock />
      <FeaturedProducts />
    </div>
  );
}
