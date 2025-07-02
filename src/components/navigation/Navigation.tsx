import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./navigation.scss";

function Navigation() {
  const t = useTranslations("Navigation");
  const menu = [
    { key: "home", href: "/home" },
    { key: "about", href: "/about" },
    { key: "usage", href: "#usage" },
    { key: "products", href: "/products" },
    { key: "faq", href: "#faq" },
  ];

  return (
    <nav className="nav">
      <ul className="nav__block-item">
        {menu.map((m) => (
          <li key={m.key} className="nav__item">
            <Link href={m.href} className="nav__link">
              {t(m.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
