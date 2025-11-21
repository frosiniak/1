// src/Header.js
import React from "react";
import "./App.css";
import logo from "./assets/logo192.png";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-inner">
        <img src={logo} alt="Логотип" className="header-logo" />
        <div className="header-title">
          <div>ДОНЕЦЬКИЙ ДЕРЖАВНИЙ</div>
          <div>УНІВЕРСИТЕТ ВНУТРІШНІХ СПРАВ</div>
        </div>
      </div>
    </header>
  );
}
