
import React from "react";
import "./Header.css";
import logo from "./assets/logo192.png";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="header-text-block">
          <div className="header-title">ДОНЕЦЬКИЙ ДЕРЖАВНИЙ УНІВЕРСИТЕТ ВНУТРІШНІХ СПРАВ</div>
          <div className="header-subtitle">Тренажер управлінських рішень «SIMDEC»</div>
        </div>
      </div>
    </header>
  );
}
