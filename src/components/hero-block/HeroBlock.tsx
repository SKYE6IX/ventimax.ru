import React from "react";
import { useTranslations } from "next-intl";
import ContentCarousel from "../content-carousel/ContentCarousel";
import "./hero-block.scss";

function HeroBlock() {
  const t = useTranslations("Pages.home.heroBlock");
  return (
    <div className="hero-block">
      <div className="hero-block__text-content">
        <h1 className="hero-block__title">
          {t.rich("title", {
            span: (chucks) => (
              <span data-testid="highlighted-text">{chucks}</span>
            ),
          })}
        </h1>
      </div>
      <ContentCarousel />
    </div>
  );
}
export default HeroBlock;
