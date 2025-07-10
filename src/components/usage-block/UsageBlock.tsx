import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "./usage-block.scss";

function UsageBlock() {
  const t = useTranslations("Pages.home.usageBlock");
  return (
    <section className="usage-block">
      <div className="usage-block__inner-wrapper">
        <h3 className="usage-block__title" data-testid="usage-block-title">
          {t("title")}
        </h3>
        <div className="usage-block__usage-list">
          <div className="usage-block__item">
            <div className="usage-block__item-left">
              <h4
                className="usage-block__item-title"
                data-testid="usage-item-title"
              >
                HY-Plastic Cooling Pad:
              </h4>
              <p
                className="usage-block__item-text"
                data-testid="usage-item-text"
              >
                {t("items.coolingPad")}
              </p>
            </div>
            <div className="usage-block__item-image-wrapper">
              <Image
                src="/usage-images/cooling-pad-usage.jpg"
                alt="Image of cooling pad in use"
                fill
                data-testid="usage-item-image"
              />
            </div>
          </div>
          <div className="usage-block__item middle">
            <div className="usage-block__item-left">
              <h4
                className="usage-block__item-title"
                data-testid="usage-item-title"
              >
                HY-Silos:
              </h4>
              <p
                className="usage-block__item-text"
                data-testid="usage-item-text"
              >
                {t("items.silos")}
              </p>
            </div>
            <div className="usage-block__item-image-wrapper">
              <Image
                src="/usage-images/silo-usage.jpg"
                alt="Image of silo in use"
                fill
                data-testid="usage-item-image"
              />
            </div>
          </div>
          <div className="usage-block__item">
            <div className="usage-block__item-left">
              <h4
                className="usage-block__item-title"
                data-testid="usage-item-title"
              >
                HY-FRP Cone Fan:
              </h4>
              <p
                className="usage-block__item-text"
                data-testid="usage-item-text"
              >
                {t("items.coneFan")}
              </p>
            </div>
            <div className="usage-block__item-image-wrapper">
              <Image
                src="/usage-images/cone-fan-usage.jpg"
                alt="Image of cone fan in use"
                fill
                data-testid="usage-item-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsageBlock;
