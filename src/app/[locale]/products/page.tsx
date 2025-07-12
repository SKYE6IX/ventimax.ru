"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import ProductCard from "@/components/product-card/ProductCard";
import { products, Category } from "@/products-data/products";
import "./page.scss";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

interface Navigation {
  key: string;
  category: Category;
  imageSrc: string;
}
const navigations: Navigation[] = [
  {
    key: "negativeFan",
    category: "neagtive-pressure-fan",
    imageSrc: "/product-nav-images/negative-pressure-fan.webp",
  },
  {
    key: "coolingPad",
    category: "cooling-pad",
    imageSrc: "/product-nav-images/cooling-pad.webp",
  },
  {
    key: "heatingEquipment",
    category: "heating-equipment",
    imageSrc: "/product-nav-images/heating-equipments.webp",
  },
  {
    key: "farmingEquipment",
    category: "farming-equipment",
    imageSrc: "/product-nav-images/farming-equipment.webp",
  },
  {
    key: "fecalCleaning",
    category: "fecal-cleaning-equipment",
    imageSrc: "/product-nav-images/fecal-cleaning-equipment.webp",
  },
  {
    key: "otherFans",
    category: "other-fans",
    imageSrc: "/product-nav-images/other-fans.webp",
  },
];

function Products() {
  const t = useTranslations("Pages.products");
  const [currentCategory, setCurrentCategory] = useState(
    "neagtive-pressure-fan"
  );

  const containerNav = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLUListElement | null>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(max-width: 767px)", () => {
      Draggable.create(targetRef.current, {
        type: "x",
        bounds: containerNav.current,
        edgeResistance: 1,
        inertia: true,
      });
    });
  });

  const handleChangeCategory = (newCategory: Category) => {
    setCurrentCategory(newCategory);
  };
  return (
    <div className="products-list-page">
      <nav className="products-list-page__nav" ref={containerNav}>
        <ul className="products-list-page__nav-list" ref={targetRef}>
          {navigations.map((nav) => (
            <li
              key={nav.key}
              className={[
                "products-list-page__nav-item",
                nav.category === currentCategory ? "active" : "",
              ].join(" ")}
              onClick={() => handleChangeCategory(nav.category)}
              data-testid="products-list-page-navigation-item"
            >
              <div className="products-list-page__nav-item-image-container">
                <Image
                  src={nav.imageSrc}
                  alt="Image serving as an icon"
                  fill
                  data-testid="products-list-page-navigation-item-image-icon"
                />
              </div>
              <span
                className="products-list-page__nav-item-text"
                data-testid="products-list-page-navigation-item-text"
              >
                {t(`navigation.${nav.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <section className="products-list-page__products-list">
        {products.map((product) => (
          <div
            key={product.id}
            className={[
              "products-list-page__product-wrapper",
              product.category === currentCategory ? "show" : "",
            ].join(" ")}
          >
            <ProductCard
              id={product.id}
              imageSrc={product.images[0]}
              title={product.name}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Products;
