"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import emailjs from "@emailjs/browser";
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
  message: string;
}
const defaultFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function Form() {
  const t = useTranslations("Form");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    if (formRef.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
          formRef.current,
          {
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
          }
        )
        .then(
          () => {
            setIsSuccess(true);
            setIsSending(false);
            setShowResponse(true);
            setFormState(defaultFormState);
            setTimeout(() => {
              setShowResponse(false);
            }, 1500);
            console.log("SUCCESS!");
          },
          (error) => {
            setIsSuccess(false);
            setShowResponse(true);
            setIsSending(false);
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <div className="form-container">
      <div
        className={[
          "form-container__feed-back-overlay",
          showResponse ? "show" : "hide",
        ].join(" ")}
      >
        <div className="form-container__feed-back">
          <p className="form-container__feed-back-text">
            {isSuccess ? t(`response.success`) : t(`response.failed`)}
          </p>
          <button
            className="form-container__feed-back-button"
            onClick={() => setShowResponse(false)}
          >
            {t("closeModal")}
          </button>
        </div>
      </div>
      <h5 className="form-container__title" data-testid="form-title">
        {t("title")}
      </h5>
      <div className="form-container__inner-wrapper">
        <form
          className="form-container__form"
          ref={formRef}
          onSubmit={sendEmail}
        >
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
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
              value={formState.message}
              onChange={handleChange}
              data-testid="form-input"
            ></textarea>
          </label>
          <button
            type="submit"
            className="form-container__form-button"
            data-testid="form-button"
            disabled={isSending}
          >
            {t("sendButton")}
            <span
              className={[
                "form-container__form-button-icon",
                isSending ? "hide" : "show",
              ].join(" ")}
            >
              <FilledArrowIcon />
            </span>
            <div
              className={["loader", isSending ? "show" : "hide"].join(" ")}
            ></div>
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
                  href="tel:+86-536-3521951"
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
                  href="mailto:sdhywk@126.com"
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
              href="https://wa.me/8616653608178"
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
