import React from "react";
import { useTranslations } from "next-intl";
import "./metrics.scss";

function Metrics() {
  const t = useTranslations("Pages.aboutUs");
  return (
    <section className="metrics-wrapper">
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
        <span className="metrics__text-small">{t("metrics.productType")}</span>
      </div>
      <div className="metrics" data-testid="metrics">
        <h5 className="metrics__text-bold">2010</h5>
        <span className="metrics__text-small">{t("metrics.established")}</span>
      </div>
      <div className="metrics" data-testid="metrics">
        <h5 className="metrics__text-bold">365</h5>
        <span className="metrics__text-small">
          {t("metrics.provideServiceFor")}
        </span>
      </div>
    </section>
  );
}

export default Metrics;
