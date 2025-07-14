"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import "./navigation.scss";

type NavigationProps = {
  closeMenu?: () => void;
};

function Navigation({ closeMenu }: NavigationProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const menu = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "usage", href: "/#usage" },
    { key: "products", href: "/products" },
    { key: "faq", href: "/#faq" },
  ];

  return (
    <nav className="nav">
      <ul className="nav__block-item">
        {menu.map((m) => (
          <li
            key={m.key}
            className={["nav__item", pathname === m.href ? "active" : ""].join(
              " "
            )}
            onClick={closeMenu}
          >
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
