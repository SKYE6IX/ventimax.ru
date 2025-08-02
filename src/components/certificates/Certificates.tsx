import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "./certificates.scss";

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

function Certificates() {
  const t = useTranslations("Pages.aboutUs");
  return (
    <section className="certificates-wrapper">
      <h3 className="certificates__heading">{t("certificates")}</h3>
      <div className="certificates__list">
        {certificatesData.map((cert) => (
          <div key={cert.title} className="certificates">
            <div className="certificates__image-container">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                data-testid="certificate-image"
              />
            </div>
            <h3 className="certificates__title" data-testid="certificate-title">
              {cert.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
