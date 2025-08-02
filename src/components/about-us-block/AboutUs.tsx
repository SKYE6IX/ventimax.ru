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
      <div className="about-us-block__heading">
        <h3
          className="about-us-block___title"
          data-testid="about-us-block-title"
        >
          {t("title")}
        </h3>
        <div
          className="about-us-block__media-container"
          data-testid="about-us-block-background-image"
        >
          <video
            controls={false}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            data-testid="about-us-video-player"
            aria-label="Video player"
            className="about-us-block__video"
          >
            <source
              src="https://res.cloudinary.com/eleven-11/video/upload/v1754138914/ventimax-asset/1267_qn9bq0.mov"
              type="video/mp4"
            />
          </video>
          <div className="about-us-block__yoe">
            <h5
              className="about-us-block__yoe-title"
              data-testid="about-us-block-yoe"
            >
              18
              <span>+</span>
            </h5>
            <h6 className="about-us-block__yoe-text">{t("yoe")}</h6>
          </div>
        </div>
      </div>
      <div className="about-us-block___body">
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
