"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import "./faq.scss";

interface DropdownState {
  [key: string]: { isOpen: boolean };
}

function FAQ() {
  const t = useTranslations("Pages.home.faqBlock");
  const [dropDown, setDropdown] = useState<DropdownState>({
    faqOne: { isOpen: true },
    faqTwo: { isOpen: false },
    faqThree: { isOpen: false },
    faqFour: { isOpen: false },
  });
  const toggleDropdown = (key: string) => {
    setDropdown((prevState) => ({
      ...prevState,
      [key]: {
        isOpen: !prevState[key].isOpen,
      },
    }));
  };
  return (
    <section className="faq-block">
      <h3 className="faq-block__title" data-testid="faq-block-title">
        {t("title")}
      </h3>
      <h4 className="faq-block__sub-title" data-testid="faq-block-sub-title">
        {t("subTitle")}
      </h4>
      <div className="faq-block__list-wrapper">
        {Object.entries(dropDown).map(([key, state]) => (
          <div className="faq-block__item-wrapper" key={key}>
            <div className="faq-block__item-header">
              <h5
                className="faq-block__item-title"
                data-testid="faq-block-dropdown-title"
              >
                {t(`${key}.question`)}
              </h5>
              <button
                className={[
                  "faq-block__item-button",
                  state.isOpen ? "open" : "close",
                ].join(" ")}
                onClick={() => toggleDropdown(key)}
                data-testid="faq-block-dropdown-button"
                aria-expanded={state.isOpen}
              >
                <ArrowDownIcon />
              </button>
            </div>

            <div
              className={[
                "faq-block__item-body",
                state.isOpen ? "open" : "close",
              ].join(" ")}
              aria-expanded={state.isOpen}
              aria-hidden={!state.isOpen}
              data-testid="faq-block-drop-down"
            >
              <p
                className={[
                  "faq-block__item-text",
                  state.isOpen ? "open" : "close",
                ].join(" ")}
                data-testid="faq-block-dropdown-text"
              >
                {t(`${key}.answer`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
