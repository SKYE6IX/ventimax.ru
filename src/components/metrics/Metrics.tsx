import React from "react";
import { useTranslations } from "next-intl";
import "./metrics.scss";

function Metrics() {
  const t = useTranslations("Pages.aboutUs");
  return (
    <section className="metrics-wrapper">
      <h3 className="metrics-wrapper__heading">{t("metrics.title")}</h3>
      <div className="metrics-wrapper__list">
        <div className="metrics" data-testid="metrics">
          <h5 className="metrics__text-bold">
            18<span>+</span>
          </h5>
          <span className="metrics__text-small">{t("metrics.yoe")}</span>
        </div>
        <div className="metrics" data-testid="metrics">
          <h5 className="metrics__text-bold">
            200<span>+</span>
          </h5>
          <span className="metrics__text-small">
            {t("metrics.productType")}
          </span>
        </div>
        <div className="metrics" data-testid="metrics">
          <h5 className="metrics__text-bold">2010</h5>
          <span className="metrics__text-small">
            {t("metrics.established")}
          </span>
        </div>
        <div className="metrics" data-testid="metrics">
          <h5 className="metrics__text-bold">365</h5>
          <span className="metrics__text-small">
            {t("metrics.provideServiceFor")}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
