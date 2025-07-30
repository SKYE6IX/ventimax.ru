"use client";
import React, { use, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CtaButton from "@/components/cta-button/CtaButton";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import { products } from "@/products-data/products";
import { horizontalLoop } from "@/utils/gsapHorizonatalLoop";
import "./page.scss";

gsap.registerPlugin(useGSAP);

function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const t = useTranslations("Pages.productDetails");
  const des = useTranslations("Products");
  const { productId } = use(params);
  const product = products.find((product) => product.id === productId);
  const [currentImage, setCurrentImage] = useState(product?.images[0]);
  const [currentTypeIdx, setCurrentTypeIdx] = useState(0);
  const [activeSliderIdx, setActiveSliderIdx] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChangeImage = (newImageUrl: string) => {
    setCurrentImage(newImageUrl);
  };

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(
        ".product-details-page__image-container"
      );
      if (product && product.images.length > 1) {
        gsap.matchMedia().add("(max-width: 767px)", () => {
          horizontalLoop(slides, {
            paused: true,
            center: true,
            draggable: true,
            paddingRight: "10px",
            onChange: (element: HTMLDivElement, index: number) => {
              setActiveSliderIdx(index);
            },
          });
        });
      }
    },
    { scope: sliderContainerRef }
  );

  return (
    <div className="product-details-page">
      <div className="product-details-page__header">
        <div className="product-details-page__images-wrapper">
          <div
            className="product-details-page__image-list-wrapper"
            ref={sliderContainerRef}
          >
            {product?.images.map((image) => (
              <div
                key={image}
                className="product-details-page__image-container"
                onClick={() => handleChangeImage(image)}
              >
                <Image
                  src={image}
                  alt="An image of a product"
                  fill
                  data-testid="product-details-image"
                />
              </div>
            ))}
          </div>
          <div
            className={[
              "product-details-page__slider-indicator-wrapper",
              product && product.images.length > 1 ? "show" : "",
            ].join(" ")}
          >
            {product?.images.map((_, idx) => (
              <div
                key={idx}
                className={[
                  "product-details-page__slider-indicator",
                  activeSliderIdx === idx ? "active" : "",
                ].join(" ")}
              ></div>
            ))}
          </div>
          <div className="product-details-page__current-image-container">
            <Image
              src={currentImage || ""}
              alt="An image of a product"
              fill
              data-testid="product-details-image-current"
            />
          </div>
        </div>
        <div className="product-details-page__header-right">
          <h3
            className="product-details-page__product-title"
            data-testid="product-details-title"
          >
            {product?.name}
          </h3>
          {/* <h5 className="product-details-page__product-price">
            {t("priceFrom")} $5000.00
          </h5> */}
          <div className="product-details-page__button-container">
            <CtaButton />
          </div>
        </div>
      </div>

      <div className="product-details-page__body">
        <h3
          className="product-details-page__body-title"
          data-testid="product-details-body-title"
        >
          {t("aboutProduct.title")}
        </h3>
        <div className="product-details-page__details-wrapper">
          <h5
            className="product-details-page__details-title"
            data-testid="product-detail-title"
          >
            {t("aboutProduct.details")}
          </h5>
          <p
            className="product-details-page__details"
            data-testid="product-details-description"
          >
            {des(`${product?.id}.description`)}
          </p>
        </div>
        {product && product.specifications.length > 0 && (
          <div className="product-details-page__specifications-wrapper">
            <h3
              className="product-details-page__specifications-title"
              data-testid="product-specification-title"
            >
              {t("aboutProduct.specifications")}
            </h3>
            {product.specifications[currentTypeIdx].type && (
              <label className="product-details-page__specifications-type">
                {t("aboutProduct.type")}:
                <select
                  className="product-details-page__specifications-select"
                  value={currentTypeIdx}
                  onChange={(e) => setCurrentTypeIdx(Number(e.target.value))}
                >
                  {product?.specifications.map((specification, idx) => (
                    <option key={specification.type} value={idx}>
                      {specification.type}
                    </option>
                  ))}
                </select>
                <span className="product-details-page__specifications-type-icon">
                  <ArrowDownIcon />
                </span>
              </label>
            )}
            <ul className="product-details-page__specifications-list">
              {product?.specifications[currentTypeIdx].list.map((item) => (
                <li
                  key={item.key}
                  className="product-details-page__specifications-item"
                  data-testid="product-details-specification-item"
                >
                  {item.key}: <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
