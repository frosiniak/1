// =========================
//  Trainer.js — ОНОВЛЕНО
//  Підтримка Intro OODA
//  Підтримка кнопки «Назад»
//  ДОДАНО: зображення для кожного кроку OODA
// =========================

import React, { useMemo, useState } from "react";

// Сценарії
import pdca from "./scenarios/pdca.json";
import ooda from "./scenarios/ooda.json";
import sdca from "./scenarios/sdca.json";

// Intro OODA
import OodaIntro from "./OodaIntro";

// --- ДОДАНО: зображення для етапів OODA ---
import img1 from "./assets/ooda/1.png";
import img2 from "./assets/ooda/2.png";
import img3 from "./assets/ooda/3.png";
import img4 from "./assets/ooda/4.png";

// Google Apps Script
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwnC5MgaVFRLzSm97axk3417-__RSyM2J-L57wEn73lfyMKFy44QcY9AUM-nHGc5EA/exec";

// --- ДОДАНО: відповідність зображень до кроків ---
const stepImages = {
  Observe: img1,
  Orient: img2,
  Decide: img3,
  Act: img4,
};

export default function Trainer() {
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [model, setModel] = useState(null);
  const [showOodaIntro, setShowOodaIntro] = useState(false);

  const scenarios = useMemo(() => {
    const map = { PDCA: pdca, OODA: ooda, SDCA: sdca };
    return model ? map[model] || [] : [];
  }, [model]);

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [attemptsForStep, setAttemptsForStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const hasScenarios = Array.isArray(scenarios) && scenarios.length > 0;
  const scenario = hasScenarios ? scenarios[currentScenarioIndex] : null;
  const step =
    scenario && Array.isArray(scenario.steps)
      ? scenario.steps[stepIndex]
      : null;

  const totalQuestions = useMemo(() => {
    if (!hasScenarios) return 0;
    return scenarios.reduce(
      (sum, s) => sum + (Array.isArray(s.steps) ? s.steps.length : 0),
      0
    );
  }, [scenarios, hasScenarios]);

  // ------------------------------
  //      ВИБІР ВІДПОВІДІ
  // ------------------------------
  const handleChoice = (option) => {
    if (stepCompleted) return;
    setFeedback(option.feedback || "");

    if (option.result === "success") {
      if (attemptsForStep === 0) setCorrectCount((c) => c + 1);
      setStepCompleted(true);
    } else {
      setAttemptsForStep((a) => a + 1);
    }
  };

  const goNextStep = () => {
    setFeedback("");
    setAttemptsForStep(0);
    setStepCompleted(false);

    if (!scenario) return;

    if (stepIndex < scenario.steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex((i) => i + 1);
      setStepIndex(0);
    }
  };

  const nextScenario = () => {
    setFeedback("");
    setAttemptsForStep(0);
    setStepCompleted(false);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex((i) => i + 1);
      setStepIndex(0);
    }
  };

  const resetProgress = () => {
    setCurrentScenarioIndex(0);
    setStepIndex(0);
    setFeedback("");
    setAttemptsForStep(0);
    setCorrectCount(0);
    setStepCompleted(false);
  };

  // ------------------------------
  //      ВИБІР МОДЕЛІ
  // ------------------------------
  const chooseModel = (m) => {
    setModel(m);
    resetProgress();

    if (m === "OODA") setShowOodaIntro(true);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("model", m);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  // ------------------------------
  //      ВІДПРАВКА РЕЗУЛЬТАТІВ
  // ------------------------------
  const sendResults = async () => {
    if (isSending) return;
    setIsSending(true);

    const percent = totalQuestions
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

    const payload = {
      name: userName || "Анонім",
      date: new Date().toLocaleString(),
      result: `${correctCount}/${totalQuestions}`,
      percent,
      model: model || "",
    };

    try {
      const formData = new FormData();
      for (const key in payload) formData.append(key, payload[key]);

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      console.log("Apps Script:", await res.text());
      alert(`Результати надіслані: ${correctCount}/${totalQuestions} (${percent}%).`);

      resetProgress();
      setModel(null);
      setNameSubmitted(false);

      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("model");
        window.history.replaceState({}, "", url.toString());
      } catch {}
    } catch (err) {
      console.error(err);
      alert("Помилка надсилання результатів.");
    } finally {
      setIsSending(false);
    }
  };

  // ------------------------------
  //           UI
  // ------------------------------

  // 1. Введення імені
  if (!nameSubmitted) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
        <div style={cardStyle}>
          <h1>Вітаємо на навчальному сайті!</h1>
          <p>
            Це <b>тренажер для керівників</b>, орієнтований на керівників НПУ та МВС.
          </p>

          <p>👉 Введіть ім’я або позивний:</p>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Введіть ваше ім'я"
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => {
                if (!userName.trim()) return alert("Введіть ім’я!");
                setNameSubmitted(true);
              }}
              style={primaryBtn}
            >
              Почати
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Вибір моделі
  if (!model) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
        <div style={cardStyle}>
          <h2>Тренажер керівника</h2>
          <p>
            Вітаємо, <b>{userName}</b>. Оберіть модель:
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => chooseModel("PDCA")} style={primaryBtn}>
              Почати PDCA
            </button>
            <button onClick={() => chooseModel("OODA")} style={primaryBtn}>
              Почати OODA
            </button>
            <button onClick={() => chooseModel("SDCA")} style={primaryBtn}>
              Почати SDCA
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Вступна сторінка OODA
  if (model === "OODA" && showOodaIntro) {
    return (
      <OodaIntro
        onStart={() => {
          setShowOodaIntro(false);
        }}
        onBack={() => {
          setShowOodaIntro(false);
          setModel(null);
        }}
      />
    );
  }

  // 4. Основний тренажер
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <div style={cardStyle}>
        <h2>{scenario?.title}</h2>
        <p>{scenario?.scenario}</p>

        {step ? (
          <>
            <h3>
              {step.stage}: {step.question}
            </h3>

            {/* --- ДОДАНО: ЗОБРАЖЕННЯ ЕТАПУ OODA --- */}
            {stepImages[step.stage] && (
              <img
                src={stepImages[step.stage]}
                alt="Ілюстрація етапу"
                style={{
                  width: "100%",
                  maxWidth: "750px",
                  margin: "15px auto",
                  display: "block",
                  borderRadius: "10px",
                }}
              />
            )}

            {/* Варіанти відповіді */}
            <div style={{ display: "grid", gap: 8 }}>
              {step.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt)}
                  style={primaryBtn}
                  disabled={stepCompleted}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div style={stepCompleted ? correctBox : wrongBox}>
                {feedback}
              </div>
            )}

            {stepCompleted && (
              <div style={{ marginTop: 12 }}>
                {stepIndex < scenario.steps.length - 1 ? (
                  <button onClick={goNextStep} style={successBtn}>
                    Далі
                  </button>
                ) : currentScenarioIndex < scenarios.length - 1 ? (
                  <button onClick={nextScenario} style={successBtn}>
                    Наступний сценарій
                  </button>
                ) : (
                  <button
                    onClick={sendResults}
                    style={secondaryBtn}
                    disabled={isSending}
                  >
                    {isSending ? "Надсилаю..." : "Завершити і відправити"}
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={infoBox}>Немає кроків.</div>
        )}
      </div>
    </div>
  );
}

/* ====== СТИЛІ ====== */

const primaryBtn = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
};

const successBtn = { ...primaryBtn, width: "auto", background: "#16a34a" };
const secondaryBtn = { ...primaryBtn, width: "auto", background: "#2563eb" };

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 18,
};

const correctBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 10,
  background: "#d1fae5",
  color: "#065f46",
};

const wrongBox = {
  marginTop: 12,
  padding: 12,
  borderRadius: 10,
  background: "#fee2e2",
  color: "#991b1b",
};

const infoBox = {
  padding: 16,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  background: "#f9fafb",
};
