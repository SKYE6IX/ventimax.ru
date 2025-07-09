import React from "react";
import { useTranslations } from "next-intl";
import CheckIcon from "../icons/CheckIcon";
import "./about-us.scss";

function AboutUs() {
  const t = useTranslations("Pages.home.aboutUsBlock");
  const itemsNum = ["one", "two", "three", "four", "five", "six"];
  return (
    <section className="about-us">
      <div
        className="about-us__image-container"
        data-testid="about-us-block-background-image"
      >
        <div className="about-us__yoe">
          <h5 className="about-us__yoe-title" data-testid="about-us-block-yoe">
            13
            <span>+</span>
          </h5>
          <h6 className="about-us__yoe-text">{t("yoe")}</h6>
        </div>
      </div>
      <div className="about-us___right-side">
        <h3 className="about-us___title" data-testid="about-us-block-title">
          {t("title")}
        </h3>
        <h4
          className="about-us___sub-title"
          data-testid="about-us-block-sub-title"
        >
          {t("subTitle")}
        </h4>
        <p className="about-us___text" data-testid="about-us-block-text">
          {t("text")}
        </p>
        <ul className="about-us___product-list">
          {itemsNum.map((item) => (
            <li key={item} className="about-us___product">
              <span className="about-us___product-icon">
                <CheckIcon />
              </span>
              <span className="about-us___product-text">
                {t(`weInto.${item}`)}
              </span>
            </li>
          ))}
        </ul>
        <button className="about-us___button" data-testid="about-us-button">
          {t("buttonText")}
        </button>
      </div>
    </section>
  );
}

export default AboutUs;
