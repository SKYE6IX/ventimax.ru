"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BuggerIcon from "../icons/BuggerIcon";
import CloseIcon from "../icons/CloseIcon";
import Navigation from "../navigation/Navigation";
import "./mobile-menu.scss";

gsap.registerPlugin(useGSAP);

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.set(menuRef.current, { y: -20 });
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
      });
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.25,
      });
    }
  }, [isOpen]);
  return (
    <div className="mobile-menu" aria-haspopup="true">
      <button className="mobile-menu__button" onClick={toggleMenu}>
        {isOpen ? (
          <span data-testid="close-icon" className="mobile-menu__close-icon">
            <CloseIcon />
          </span>
        ) : (
          <span data-testid="bugger-icon" className="mobile-menu__open-icon">
            <BuggerIcon />
          </span>
        )}
      </button>
      <div
        data-testid="mobile-menu__nav"
        className={["mobile-menu__nav", isOpen ? "open" : ""].join(" ")}
        ref={menuRef}
      >
        <Navigation />
      </div>
    </div>
  );
}
export default MobileMenu;
