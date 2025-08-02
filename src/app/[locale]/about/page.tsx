import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Metrics from "@/components/metrics/Metrics";
import "./page.scss";

const certificatesData = [
  {
    title: "Certificates of Conformity",
    image: "/certificates/conforminty.png",
  },
  {
    title: "BS Reliable trust Testing",
    image: "/certificates/trust.png",
  },
  {
    title: "Quality Management",
    image: "/certificates/quality-management.png",
  },
  {
    title: "Foreign Trade Operator",
    image: "/certificates/trade-operator.png",
  },
];

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
          <h3 className="about-us-page__certificates-heading">
            {t("certificates")}
          </h3>
          <div
            className="about-us-page__certificates-list"
            data-testid="about-us-page-certificate-heading"
          >
            {certificatesData.map((cert) => (
              <div key={cert.title} className="about-us-page__certificates">
                <div className="about-us-page__certificates-image-container">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    data-testid="about-us-page-certificate-image"
                  />
                </div>
                <h3
                  className="about-us-page__certificates-title"
                  data-testid="about-us-page-certificate-title"
                >
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
