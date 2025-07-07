import React from "react";
import CtaButton from "../cta-button/CtaButton";
import { useTranslations } from "next-intl";
import "./intro-block.scss";

function IntroBlock() {
  const t = useTranslations("Pages.home.introBlock");
  return (
    <section className="intro-block">
      <div className="intro-block__content-wrapper">
        <div className="intro-block__content-introduction">
          <h1 className="intro-block__title">{t("title")}</h1>
          <h2 className="intro-block__sub-title">{t("subTitle")}</h2>
          <CtaButton />
        </div>
        <div className="intro-block__content-media">
          <video
            width="729"
            height="436"
            controls={false}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            data-testid="video-player"
          >
            <source src="/products-intro/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

export default IntroBlock;
