import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
    <div className="about-us">
      <div className="about-us__image-container">
        <Image
          src="/company-image.jpg"
          alt="An image of the company"
          fill
          className="about-us__image"
          data-testid="about-us-image"
        />
      </div>
      <div className="about-us__inner-wrapper">
        <section className="about-us__details-wrapper">
          <h3 className="about-us__title" data-testid="about-us-title">
            {t("title")}
          </h3>
          <h5 className="about-us__sub-title" data-testid="about-us-sub-title">
            {t("subTitle")}
          </h5>
          <p className="about-us__text" data-testid="about-us-text">
            {t("text")}
          </p>
        </section>
        <section className="about-us__metrics-wrapper">
          <div className="about-us__metrics" data-testid="about-us-metrics">
            <h5 className="about-us__metrics-text-bold">
              13<span>+</span>
            </h5>
            <span className="about-us__metrics-text-small">
              {t("metrics.yoe")}
            </span>
          </div>
          <div className="about-us__metrics" data-testid="about-us-metrics">
            <h5 className="about-us__metrics-text-bold">
              200<span>+</span>
            </h5>
            <span className="about-us__metrics-text-small">
              {t("metrics.productType")}
            </span>
          </div>
          <div className="about-us__metrics" data-testid="about-us-metrics">
            <h5 className="about-us__metrics-text-bold">2010</h5>
            <span className="about-us__metrics-text-small">
              {t("metrics.established")}
            </span>
          </div>
          <div className="about-us__metrics" data-testid="about-us-metrics">
            <h5 className="about-us__metrics-text-bold">365</h5>
            <span className="about-us__metrics-text-small">
              {t("metrics.provideServiceFor")}
            </span>
          </div>
        </section>
        <section className="about-us__certificates-wrapper">
          <h3 className="about-us__certificates-heading">
            {t("certificates")}
          </h3>
          <div
            className="about-us__certificates-list"
            data-testid="about-us-certificate-heading"
          >
            {certificatesData.map((cert) => (
              <div key={cert.title} className="about-us__certificates">
                <div className="about-us__certificates-image-container">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    data-testid="about-us-certificate-image"
                  />
                </div>
                <h3
                  className="about-us__certificates-title"
                  data-testid="about-us-certificate-title"
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
