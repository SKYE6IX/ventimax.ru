import React from "react";
import Image from "next/image";
import "./logo.scss";

function Logo() {
  return (
    <div className="logo">
      <Image
        src="/logo.png"
        width={93}
        height={55}
        alt="company logo"
        className="logo__icon"
        priority
      />
      <h3 className="logo__title">Ventimax</h3>
    </div>
  );
}

export default Logo;
