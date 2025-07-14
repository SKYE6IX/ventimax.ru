import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "../logo/Logo";
import TelephoneIcon from "../icons/TelephoneIcon";
import MailIcon from "../icons/MailIcon";
import LocationIcon from "../icons/LocationIcon";
import "./footer.scss";

const footerNav = [
  { key: "products", href: "/products" },
  { key: "aboutUs", href: "/about" },
  { key: "faq", href: "/#faq" },
  { key: "getInTouch", href: "/#contactBlock" },
];
const contactUs = [
  {
    key: "phone",
    icon: TelephoneIcon,
    value: "+86-536-3521951",
    prefix: "tel:",
  },
  { key: "email", icon: MailIcon, value: "sdhywk@126.com", prefix: "mailto:" },
  {
    key: "location",
    icon: LocationIcon,
    value: "Economic Development zone, Qingzhou, China",
    prefix: "",
  },
];

function Footer() {
  const t = useTranslations("Footer");
  const now = Date.now();
  const date = new Date(now);
  return (
    <footer className="footer">
      <section className="footer__inner-wrapper">
        <div className="footer__left">
          <Logo />
          <h6
            className="footer__company-intro"
            data-testid="footer-company-intro"
          >
            {t("companyIntro")}
          </h6>
        </div>
        <div className="footer__right">
          <div className="footer__link-wrapper">
            <h5 className="footer__link-title" data-testid="footer-link-title">
              {t("links.title")}
            </h5>
            <ul className="footer__link-list">
              {footerNav.map((nav) => (
                <li
                  key={nav.key}
                  className="footer__link"
                  data-testid="footer-link-item"
                >
                  <Link href={nav.href} data-testid="footer-link">
                    {t(`links.${nav.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__contact-wrapper">
            <h5
              className="footer__contact-title"
              data-testid="footer-contact-title"
            >
              {t("contact.title")}
            </h5>
            <div className="footer__contact-list">
              {contactUs.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div className="footer__contact-item" key={contact.key}>
                    <div className="footer__contact-icon-container">
                      <Icon />
                    </div>
                    <div className="footer__contact-link-wrapper">
                      <span className="footer__contact-link-title">
                        {t(`contact.${contact.key}`)}:
                      </span>
                      <Link
                        href={contact.prefix + contact.value}
                        className="footer__contact-link"
                        data-testid="footer-contact-link"
                      >
                        {contact.value}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="footer__divider"></div>
      <span
        className="footer__right-reserve"
        data-testid="footer-right-reserve"
      >
        @{date.getFullYear()} Ventimax. {t("rightReserve")}
      </span>
    </footer>
  );
}

export default Footer;
