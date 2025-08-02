import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Metrics from "@/components/metrics/Metrics";
import Certificates from "@/components/certificates/Certificates";
import "./page.scss";

function AboutUs() {
  const t = useTranslations("Pages.aboutUs");
  return (
    <div className="about-us-page">
      <div className="about-us-page__image-container">
        <Image
          src="/company-image.jpg"
          alt="An image of the company"
          fill
          className="about-us-page__image"
          data-testid="about-us-page-image"
        />
      </div>
      <div className="about-us-page__inner-wrapper">
        <section className="about-us-page__details-wrapper">
          <h3
            className="about-us-page__title"
            data-testid="about-us-page-title"
          >
            {t("title")}
          </h3>
          <h5
            className="about-us-page__sub-title"
            data-testid="about-us-page-sub-title"
          >
            {t("subTitle")}
          </h5>
          <p className="about-us-page__text" data-testid="about-us-page-text">
            {t("text")}
          </p>
        </section>
        <Metrics />
        <section className="about-us-page__certificates-wrapper">
          <Certificates />
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
