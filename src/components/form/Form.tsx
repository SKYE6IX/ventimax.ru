"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FilledArrowIcon from "../icons/FilledArrowIcon";
import TelephoneIcon from "../icons/TelephoneIcon";
import MailIcon from "../icons/MailIcon";
import LocationIcon from "../icons/LocationIcon";
import WhatAppsIcon from "../icons/WhatAppsIcon";
import FacebookIcon from "../icons/FacebookIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import "./form.scss";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  measage: string;
}
const defaultFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  measage: "",
};

function Form() {
  const t = useTranslations("Form");
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  return (
    <div className="form-container">
      <h5 className="form-container__title" data-testid="form-title">
        {t("title")}
      </h5>
      <div className="form-container__inner-wrapper">
        <form action="" className="form-container__form">
          <div className="form-container__form-input-wrapper">
            <label
              className="form-container__form-label"
              data-testid="form-label"
            >
              {t("inputs.name.label")}
              <input
                className="form-container__form-input"
                placeholder={t("inputs.name.placeholder")}
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                data-testid="form-input"
              />
            </label>

            <label
              className="form-container__form-label"
              data-testid="form-label"
            >
              {t("inputs.email.label")}
              <input
                className="form-container__form-input"
                placeholder={t("inputs.email.placeholder")}
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                data-testid="form-input"
              />
            </label>

            <label
              className="form-container__form-label"
              data-testid="form-label"
            >
              {t("inputs.number.label")}
              <input
                className="form-container__form-input"
                placeholder={t("inputs.number.label")}
                type="tel"
                name="phone"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={formState.phone}
                onChange={handleChange}
                data-testid="form-input"
              />
            </label>

            <label
              className="form-container__form-label"
              data-testid="form-label"
            >
              {t("inputs.subject.label")}
              <input
                className="form-container__form-input"
                placeholder={t("inputs.subject.label")}
                name="subject"
                type="text"
                value={formState.subject}
                onChange={handleChange}
                data-testid="form-input"
              />
            </label>
          </div>
          <label
            className="form-container__form-label textarea"
            data-testid="form-label"
          >
            {t("inputs.message.label")}
            <textarea
              className="form-container__form-text-area"
              autoCorrect="on"
              placeholder={t("inputs.message.placeholder")}
              name="message"
              required
              wrap="soft"
              value={formState.measage}
              onChange={handleChange}
              data-testid="form-input"
            ></textarea>
          </label>
          <button
            type="submit"
            className="form-container__form-button"
            data-testid="form-button"
          >
            {t("sendButton")}
            <span className="form-container__form-button-icon">
              <FilledArrowIcon />
            </span>
          </button>
        </form>

        <div className="form-container__social-wrapper">
          <div className="form-container__quick-link-wrapper">
            <div className="form-container__quick-link">
              <div className="form-container__quick-link-icon">
                <TelephoneIcon />
              </div>
              <div className="form-container__quick-link-info">
                <span className="form-container__quick-link-title">
                  {t("quickLink.phone")}:
                </span>
                <Link
                  href="#"
                  className="form-container__quick-link-text"
                  data-testid="form-quick-link-number"
                >
                  +86-536-3521951
                </Link>
              </div>
            </div>

            <div className="form-container__quick-link">
              <div className="form-container__quick-link-icon">
                <MailIcon />
              </div>
              <div className="form-container__quick-link-info">
                <span className="form-container__quick-link-title">
                  {t("quickLink.email")}:
                </span>
                <Link
                  href="#"
                  className="form-container__quick-link-text"
                  data-testid="form-quick-link-email"
                >
                  sdhywk@126.com
                </Link>
              </div>
            </div>

            <div className="form-container__quick-link">
              <div className="form-container__quick-link-icon">
                <LocationIcon />
              </div>
              <div className="form-container__quick-link-info">
                <span className="form-container__quick-link-title">
                  {t("quickLink.location")}:
                </span>
                <span
                  className="form-container__quick-link-text"
                  data-testid="form-quick-link-location"
                >
                  Economic Development zone, Qingzhou, China
                </span>
              </div>
            </div>
          </div>

          <div className="form-container__social-link-wrapper">
            <Link
              href="#"
              className="form-container__social-link"
              data-testid="form-social-link"
            >
              <WhatAppsIcon />
            </Link>
            <Link
              href="#"
              className="form-container__social-link"
              data-testid="form-social-link"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              className="form-container__social-link"
              data-testid="form-social-link"
            >
              <YoutubeIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form;
