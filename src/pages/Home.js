// Home.js
import React, { useState } from "react";
import "./Home.css";

function Home({ onStart }) {
  const [name, setName] = useState("");

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>СИМДЕК — тренажер управлінських рішень</h2>

        <p>
          Платформа моделює реальні оперативні ситуації, де керівник обирає
          варіант дій та одразу бачить наслідки своїх рішень.
        </p>

        <p>
          Дані використовуються лише для організації навчання. Не
          передаються третім особам.
        </p>

        <div className="home-input-row">
          <input
            placeholder="Ваше ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              if (!name.trim()) return alert("Введіть ім’я!");
              localStorage.setItem("username", name);
              onStart();
            }}
          >
            Почати
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
