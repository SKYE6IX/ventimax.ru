import React from "react";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import CtaButton from "../cta-button/CtaButton";
import MobileMenu from "../mobile-menu/MobileMenu";
import "./header.scss";

function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="header__right">
        <Navigation />
        <CtaButton />
      </div>
      <MobileMenu />
    </header>
  );
}

export default Header;
