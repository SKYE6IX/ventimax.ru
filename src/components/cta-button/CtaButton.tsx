import React from "react";
import { useTranslations } from "next-intl";
import "./cta-button.scss";

function CtaButton() {
  const t = useTranslations("CTA");
  return (
    <button className="button-cta" data-testid="cta-button">
      {t("text")}
    </button>
  );
}

export default CtaButton;
