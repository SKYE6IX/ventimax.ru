import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import "./logo.scss";

function Logo() {
  return (
    <div className="logo">
      <Link href="/" className="logo__link">
        <Image
          src="/logo.png"
          width={93}
          height={55}
          alt="company logo"
          className="logo__icon"
          priority
        />
        <h3 className="logo__title">Ventimax</h3>
      </Link>
    </div>
  );
}

export default Logo;
