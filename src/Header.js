// src/Header.js
import React from "react";
import "./Header.css";
import logo from "./assets/logo192.png";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-logo-wrap">
          <img
            src={logo}
            alt="Логотип Донецького державного університету внутрішніх справ"
            className="header-logo"
          />
        </div>

        <div className="header-text">
          <div className="header-line">ДОНЕЦЬКИЙ ДЕРЖАВНИЙ</div>
          <div className="header-line">УНІВЕРСИТЕТ ВНУТРІШНІХ СПРАВ</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
