import React from "react";
import { useTranslations } from "next-intl";
import "./contact-us-block.scss";
import Form from "../form/Form";

function ContactUsBlock() {
  const t = useTranslations("Pages.home.contactBlock");
  return (
    <section className="contact-us" id="contactBlock">
      <div className="contact-us__inner-wrapper">
        <h3 className="contact-us__title">{t("title")}</h3>
        <div className="contact-us__form">
          <Form />
        </div>
      </div>
    </section>
  );
}

export default ContactUsBlock;
