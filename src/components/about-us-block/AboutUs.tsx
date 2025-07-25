"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import CheckIcon from "../icons/CheckIcon";
import "./about-us.scss";

function AboutUs() {
  const t = useTranslations("Pages.home.aboutUsBlock");
  const itemsNum = ["one", "two", "three", "four", "five", "six"];
  const router = useRouter();

  return (
    <section className="about-us-block">
      <div
        className="about-us-block__image-container"
        data-testid="about-us-block-background-image"
      >
        <div className="about-us-block__yoe">
          <h5
            className="about-us-block__yoe-title"
            data-testid="about-us-block-yoe"
          >
            13
            <span>+</span>
          </h5>
          <h6 className="about-us-block__yoe-text">{t("yoe")}</h6>
        </div>
      </div>
      <div className="about-us-block___right-side">
        <h3
          className="about-us-block___title"
          data-testid="about-us-block-title"
        >
          {t("title")}
        </h3>
        <h4
          className="about-us-block___sub-title"
          data-testid="about-us-block-sub-title"
        >
          {t("subTitle")}
        </h4>
        <p className="about-us-block___text" data-testid="about-us-block-text">
          {t("text")}
        </p>
        <ul className="about-us-block___product-list">
          {itemsNum.map((item) => (
            <li key={item} className="about-us-block___product">
              <span className="about-us-block___product-icon">
                <CheckIcon />
              </span>
              <span className="about-us-block___product-text">
                {t(`weInto.${item}`)}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="about-us-block___button"
          data-testid="about-us-block-button"
          onClick={() => router.push("/about")}
        >
          {t("buttonText")}
        </button>
      </div>
    </section>
  );
}

export default AboutUs;
