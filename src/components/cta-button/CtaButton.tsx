"use client";
import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { ModalToggleContext } from "@/context/ModalToggleProvider";
import "./cta-button.scss";

function CtaButton() {
  const t = useTranslations("CTA");
  const { toggleModal } = useContext(ModalToggleContext);
  return (
    <button
      className="button-cta"
      data-testid="cta-button"
      onClick={toggleModal}
    >
      {t("text")}
    </button>
  );
}

export default CtaButton;
