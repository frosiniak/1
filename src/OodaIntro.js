// src/OodaIntro.js
import React from "react";

export default function OodaIntro({ onStart }) {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <div
        style={{
          background: "#fff",
          padding: 22,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Модель OODA</h1>

        {/* Блок 1: вступ */}
        <p>
          <i>Тут буде коротке пояснення суті моделі OODA.</i>
        </p>

        {/* Головна діаграма */}
        <div
          style={{
            margin: "20px 0",
            height: 240,
            background: "#f3f4f6",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          <p>Тут буде ГОЛОВНЕ зображення циклу OODA</p>
        </div>

        <h3>Observe</h3>
        <p><i>Тут буде текстовий опис.</i></p>
        <div style={placeholderImage}>Зображення Observe</div>

        <h3>Orient</h3>
        <p><i>Тут буде текстовий опис.</i></p>
        <div style={placeholderImage}>Зображення Orient</div>

        <h3>Decide</h3>
        <p><i>Тут буде текстовий опис.</i></p>
        <div style={placeholderImage}>Зображення Decide</div>

        <h3>Act</h3>
        <p><i>Тут буде текстовий опис.</i></p>
        <div style={placeholderImage}>Зображення Act</div>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={onStart}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Почати тренажер OODA
          </button>
        </div>
      </div>
    </div>
  );
}

const placeholderImage = {
  width: "100%",
  height: 180,
  background: "#e5e7eb",
  borderRadius: 12,
  margin: "10px 0 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
  fontSize: 14,
};
