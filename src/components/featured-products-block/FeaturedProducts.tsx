import React from "react";
import { useTranslations } from "next-intl";
import ProductCard from "../product-card/ProductCard";
import { products } from "@/products-data/products";
import "./feature-products.scss";

function FeaturedProducts() {
  const t = useTranslations("Pages.home.featuredProductBlock");
  const featuredProducts = products.filter((p) => p.tags.includes("featured"));
  return (
    <section className="featured-products">
      <h3
        className="featured-products__title"
        data-testid="featured-block-title"
      >
        {t("title")}
      </h3>
      <div className="featured-products__product-list">
        {featuredProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.name}
            imageSrc={p.images[0]}
          />
        ))}
      </div>
      <button
        className="featured-products__button"
        data-testid="featured-block-button"
      >
        {t("buttonText")}
      </button>
    </section>
  );
}
export default FeaturedProducts;
