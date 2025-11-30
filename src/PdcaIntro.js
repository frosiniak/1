// =========================
//  PdcaIntro.js
//  Інтро-сторінка PDCA
//  Стиль і структура як у OodaIntro.js
// =========================

import React from "react";
import "./PdcaIntro.css";

import pdcaImage from "./assets/pdca/pdca.png";     // ← ілюстрація PDCA (ти додаси файл)
import demingImage from "./assets/pdca/deming.png"; // ← фото Демінга (ти додаси файл)

export default function PdcaIntro({ onStart, onBack }) {
  return (
    <div className="pdca-page">
      <div className="pdca-card">

        {/* Верхня панель */}
        <div className="pdca-top-bar">
          <button className="pdca-back-btn" onClick={onBack}>← Назад</button>

          <button
            className="pdca-start-top"
            onClick={onStart}
          >
            Перейти до тренажеру
          </button>
        </div>

        <h1 className="pdca-title">Цикл Plan — Do — Check — Act (PDCA)</h1>

        {/* Вступ */}
        <p className="pdca-text">
          Цикл <b>PDCA</b> — це модель безперервного управлінського вдосконалення,
          запропонована американським науковцем Вільямом Едвардсом Демінгом. Він
          використовується для оптимізації процесів, підвищення якості рішень та
          системного усунення помилок у роботі організацій.
        </p>

        <p className="pdca-text">
          Для керівників органів МВС модель PDCA є інструментом, що дозволяє
          послідовно планувати дії, виконувати їх у контрольованому режимі,
          оцінювати результати та впроваджувати корекції — створюючи замкнений цикл
          постійного вдосконалення.
        </p>

        {/* 4 етапи */}
        <p className="pdca-text"><b>Plan (Планування):</b> формулювання цілей, визначення проблеми, збір
          вихідних даних, розроблення концепції дій та критеріїв успіху.</p>

        <p className="pdca-text"><b>Do (Виконання):</b> реалізація обраного плану на практиці в контрольованому режимі.</p>

        <p className="pdca-text"><b>Check (Перевірка):</b> оцінка результатів, визначення відхилень,
          аналіз причин та факторів, що вплинули на виконання.</p>

        <p className="pdca-text"><b>Act (Корекція):</b> ухвалення рішень щодо виправлення недоліків або масштабування успішних практик.</p>

        {/* Ілюстрація PDCA */}
        <img src={pdcaImage} alt="PDCA Cycle Diagram" className="pdca-image-full" />

        <p className="pdca-text">
          Основна ідея PDCA полягає в тому, що ефективне управління — це не разове
          рішення, а постійний процес навчання та корекції. PDCA робить ставку на
          якість, послідовність, доказовість та передбачуваність — те, що критично
          важливо для стабільної роботи будь-якого підрозділу.
        </p>

        <h2 className="pdca-subtitle">Приклад застосування PDCA в роботі поліції</h2>

        <p className="pdca-text">
          Уявімо ситуацію: керівник підрозділу отримує інформацію про системні
          затримки екіпажів під час виїздів на термінові виклики. PDCA дозволяє:
        </p>

        <ul className="pdca-text pdca-list">
          <li><b>Plan:</b> визначити вузькі місця (маршрути, комунікація, розподіл екіпажів);</li>
          <li><b>Do:</b> запустити пілотні зміни в одному районі;</li>
          <li><b>Check:</b> оцінити час реагування за 1–2 тижні;</li>
          <li><b>Act:</b> масштабувати або коригувати новий алгоритм.</li>
        </ul>

        {/* Блок із цитатою Демінга */}
        <div className="pdca-quote-block">
          <div className="pdca-quote-img-wrap">
            <img src={demingImage} alt="Deming" className="pdca-image-side" />
          </div>

          <p className="pdca-text pdca-quote-text">
            Наступна цитата добре передає філософію PDCA:
            <br /><br />
            <i>«Без даних ти лише людина з думкою. Дані — це основа покращення».</i>
 <br /><br />Вільям Едвардс Демінг
          </p>
        </div>

        {/* Нижня кнопка */}
        <div className="pdca-actions">
          <button className="pdca-start-btn" onClick={onStart}>
            Перейти до тренажеру PDCA
          </button>
        </div>

      </div>
    </div>
  );
}
