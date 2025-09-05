import React, { useMemo, useState } from "react";

// Імпортуємо дані сценаріїв по кожній моделі
import pdca from "./scenarios/pdca.json";
import ooda from "./scenarios/ooda.json";
import sdca from "./scenarios/sdca.json";

export default function Trainer() {
  // --- СТАНИ ---
  const [userName, setUserName] = useState(""); // Ім'я користувача
  const [nameConfirmed, setNameConfirmed] = useState(false); // чи підтвердив ім'я

  const urlModel = useMemo(() => {
    const param = new URLSearchParams(window.location.search).get("model");
    const upper = param ? param.toUpperCase() : null;
    return upper && ["PDCA", "OODA", "SDCA"].includes(upper) ? upper : null;
  }, []);

  const [started, setStarted] = useState(Boolean(urlModel));
  const [model, setModel] = useState(urlModel || "PDCA");

  const scenarios = useMemo(() => {
    const map = { PDCA: pdca, OODA: ooda, SDCA: sdca };
    return map[model] || [];
  }, [model]);

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  // --- Лічильники ---
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptsForStep, setAttemptsForStep] = useState(0);

  const hasScenarios = Array.isArray(scenarios) && scenarios.length > 0;
  const scenario = hasScenarios ? scenarios[currentScenarioIndex] : null;
  const step =
    scenario && Array.isArray(scenario.steps) ? scenario.steps[stepIndex] : null;

  // --- Логіка вибору ---
  const handleChoice = (option) => {
    setFeedback(option.feedback || "");

    if (option.result === "success" && scenario) {
      if (attemptsForStep === 0) {
        setCorrectCount((c) => c + 1);
      }
      setTimeout(() => {
        if (stepIndex < scenario.steps.length - 1) {
          setStepIndex((i) => i + 1);
          setAttemptsForStep(0);
          setFeedback("");
        }
      }, 1500);
    } else {
      setAttemptsForStep((a) => a + 1);
    }
  };

  const nextScenario = () => {
    if (hasScenarios && currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex((i) => i + 1);
      setStepIndex(0);
      setAttemptsForStep(0);
      setFeedback("");
    } else {
      finishTraining();
    }
  };

  const resetProgress = () => {
    setCurrentScenarioIndex(0);
    setStepIndex(0);
    setFeedback("");
    setCorrectCount(0);
    setAttemptsForStep(0);
  };

  const chooseModelAndStart = (m) => {
    setModel(m);
    resetProgress();
    setStarted(true);
    const url = new URL(window.location.href);
    url.searchParams.set("model", m);
    window.history.replaceState({}, "", url.toString());
  };

  // --- Завершення ---
  const finishTraining = () => {
    const totalQuestions = scenarios.reduce((sum, s) => sum + s.steps.length, 0);
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const resultText = `${correctCount}/${totalQuestions}`;

    // Відправка у Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbyqenQ_QhEZZJeaILU5enBJRdm_EnzJmNT1fFsOfgcWfcjE6klRD6CHBR6Q2jsPiDE/exec",
      {
        method: "POST",
        body: JSON.stringify({
          name: userName,
          date: new Date().toLocaleString(),
          result: resultText,
          percent: percentage,
          model: model,
        }),
      }
    );

    // Повертаємо на головну
    resetProgress();
    setStarted(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("model");
    window.history.replaceState({}, "", url.toString());
    alert(
      `Тренінг завершено!\nВаш результат: ${resultText} (${percentage}%)`
    );
  };

  // --- 1. Якщо ім’я ще не підтверджене ---
  if (!nameConfirmed) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "100px auto",
          padding: 20,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Введіть своє ім’я</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Ваше ім’я"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            marginTop: 12,
            marginBottom: 12,
            fontSize: 16,
          }}
        />
        <button
          onClick={() => userName.trim() && setNameConfirmed(true)}
          style={primaryBtn}
        >
          Підтвердити
        </button>
      </div>
    );
  }

  // --- 2. Екран привітання ---
  if (!started) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          padding: 20,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0, textAlign: "center" }}>Тренажер керівника</h1>
        <p style={{ textAlign: "center", marginTop: 8 }}>
          Тренажер допомагає практикувати моделі ухвалення рішень.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {[
            {
              code: "PDCA",
              title: "PDCA",
              desc: "Plan – Do – Check – Act. Цикл безперервного вдосконалення.",
            },
            {
              code: "OODA",
              title: "OODA",
              desc: "Observe – Orient – Decide – Act. Швидкі рішення в мінливих умовах.",
            },
            {
              code: "SDCA",
              title: "SDCA",
              desc: "Standardize – Do – Check – Act. Підтримка стандартів і контроль.",
            },
          ].map((m) => (
            <div
              key={m.code}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <button
                onClick={() => chooseModelAndStart(m.code)}
                style={primaryBtn}
              >
                Почати {m.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- 3. Екран тренажера ---
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      {/* Панель навігації */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => {
              setStarted(false);
              const url = new URL(window.location.href);
              url.searchParams.delete("model");
              window.history.replaceState({}, "", url.toString());
            }}
            style={linkBtn}
          >
            ⟵ На головну
          </button>
          <span style={{ opacity: 0.6 }}>|</span>
          {["PDCA", "OODA", "SDCA"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setModel(m);
                resetProgress();
                const url = new URL(window.location.href);
                url.searchParams.set("model", m);
                window.history.replaceState({}, "", url.toString());
              }}
              style={{
                ...chipBtn,
                ...(model === m ? chipActive : null),
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <div style={{ fontWeight: 600, opacity: 0.8 }}>Модель: {model}</div>
      </div>

      {/* Контент */}
      {scenario && step ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h2>{scenario.title}</h2>
          <p>{scenario.scenario}</p>
          <h3>
            {step.stage}: {step.question}
          </h3>
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            {step.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(option)}
                style={primaryBtn}
              >
                {option.text}
              </button>
            ))}
          </div>
          {feedback && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 10,
                background: feedback.includes("Правильно")
                  ? "#d1fae5"
                  : "#fee2e2",
                color: feedback.includes("Правильно") ? "#065f46" : "#991b1b",
              }}
            >
              {feedback}
            </div>
          )}
          {stepIndex === scenario.steps.length - 1 && (
            <div style={{ marginTop: 16 }}>
              <button onClick={nextScenario} style={successBtn}>
                Далі
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Дані для моделі не знайдені.</p>
      )}
    </div>
  );
}

/* --- стилі кнопок --- */
const primaryBtn = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
};

const successBtn = {
  ...primaryBtn,
  width: "auto",
  background: "#16a34a",
};

const linkBtn = {
  padding: "8px 10px",
  border: "none",
  background: "transparent",
  color: "#2563eb",
  cursor: "pointer",
  fontSize: 14,
  textDecoration: "underline",
};

const chipBtn = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  fontSize: 14,
};

const chipActive = {
  background: "#e0ecff",
  borderColor: "#bfdbfe",
};
