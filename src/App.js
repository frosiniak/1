// src/App.js
import React from "react";
import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Trainer from "./Trainer";

function App() {
  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <div className="app-main-inner">
          {/* Блок про СИМДЕК на головній сторінці */}
          <section className="hero-card">
            <h2 className="hero-title">
              СИМДЕК — тренажер управлінських рішень
            </h2>
            <p className="hero-text">
              СИМДЕК — тренажер управлінських рішень для керівного складу
              Національної поліції України та структурних підрозділів МВС.
            </p>
            <p className="hero-text">
              Платформа моделює реальні оперативні ситуації, у яких керівник
              обирає варіант дій та одразу отримує оцінку їх наслідків.
            </p>
            <p className="hero-text">
              Тренажер поєднує сучасні моделі ухвалення рішень, інтерактивні
              сценарії та автоматизовану аналітику результатів.
            </p>
            <p className="hero-text">
              СИМДЕК забезпечує безпечні умови для відпрацювання управлінських
              дій без ризику для особового складу чи оперативної обстановки.
            </p>
            <p className="hero-hint">
              Щоб розпочати тренування, введіть своє ім’я або позивний нижче та
              оберіть модель ухвалення рішень.
            </p>
          </section>

          {/* Власне тренажер (ім’я, вибір моделі, сценарії) */}
          <Trainer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
