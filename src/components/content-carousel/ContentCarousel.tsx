"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "@/utils/gsapHorizonatalLoop";
import CircleLeftArrow from "../icons/CircleLeftArrow";
import CircleRightArrow from "../icons/CircleRightArrow";
import CtaButton from "../cta-button/CtaButton";
import { products } from "@/products-data/products";
import "./content-carousel.scss";

gsap.registerPlugin(useGSAP);

function ContentCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);
  const activeElementRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const t = useTranslations("Products");
  const heroProducts = products.filter((product) =>
    product.tags.includes("hero")
  );

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".content-carousel__image", {
        scale: (i) => (i === 0 ? 1 : 0.7),
      });
      const slides = gsap.utils.toArray(".content-carousel__carousel-slide");
      loopRef.current = horizontalLoop(slides, {
        paused: true,
        center: true,
        draggable: true,
        onChange: (element: HTMLDivElement, index: number) => {
          setActiveIdx(index);
          if (activeElementRef.current) {
            gsap.fromTo(
              ".active .content-carousel__image",
              { scale: 1 },
              { scale: 0.7, duration: 0.3, ease: "power1.inOut" }
            );
            activeElementRef.current.classList.remove("active");
          }
          element.classList.add("active");
          activeElementRef.current = element;
          gsap
            .timeline({ defaults: { ease: "power1.inOut" } })
            .fromTo(
              ".active .content-carousel__image",
              { scale: 0.7 },
              { scale: 1, duration: 0.3, ease: "power1.inOut" },
              0.4
            )
            .progress(initialAnimation ? 1 : 0);
        },
      });
      loopRef.current.toIndex(0, { duration: 0 });
      setInitialAnimation(false);
    },
    { scope: carouselRef }
  );

  const nextSlide = contextSafe(() => {
    loopRef.current?.next({ duration: 0.3, ease: "power1.inOut" });
  });
  const previousSlide = contextSafe(() => {
    loopRef.current?.previous({ duration: 0.3, ease: "power1.inOut" });
  });

  return (
    <div className="content-carousel" ref={carouselRef}>
      <div className="content-carousel__slider-controllers">
        <div className="content-carousel_buttons">
          <button
            className="content-carousel_button"
            onClick={previousSlide}
            data-testid="carousel-button-left"
          >
            <CircleLeftArrow />
          </button>
          <button
            className="content-carousel_button"
            onClick={nextSlide}
            data-testid="carousel-button-right"
          >
            <CircleRightArrow />
          </button>
        </div>
      </div>
      <div
        className="content-carousel__carousel"
        aria-label="horizontal carousel of images"
      >
        {heroProducts.map((product) => (
          <div className="content-carousel__carousel-slide" key={product.id}>
            <Image
              src={product.image[0]}
              alt={product.name}
              fill={true}
              className="content-carousel__image"
              priority
              data-testid="carousel-image"
            />
          </div>
        ))}
      </div>
      <div className="content-carousel__carousel-details-wrapper">
        {heroProducts.map((product, idx) => (
          <div
            key={product.id}
            className={[
              "content-carousel__slider-details",
              activeIdx === idx ? "active" : "",
            ].join(" ")}
          >
            <h2
              className="content-carousel__slider-title"
              data-testid="carousel-details-title"
            >
              {product.name}
            </h2>
            <p
              className="content-carousel__slider-highlight"
              data-testid="carousel-details-highlight"
            >
              {t(`${product.id}.highlight`)}
            </p>
            <CtaButton />
          </div>
        ))}
        <div className="content-carousel__carousel-progress-wrapper">
          {heroProducts.map((product, idx) => (
            <div
              key={product.id}
              className={[
                "content-carousel__carousel-progress",
                activeIdx === idx ? "active" : "",
              ].join(" ")}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ContentCarousel;
