import React, { useMemo, useState } from "react";

import pdca from "./scenarios/pdca.json";
import ooda from "./scenarios/ooda.json";
import sdca from "./scenarios/sdca.json";

import OodaIntro from "./OodaIntro";
import PdcaIntro from "./PdcaIntro";
import SdcaIntro from "./SdcaIntro";

import img1 from "./assets/ooda/1.png";
import img2 from "./assets/ooda/2.png";
import img3 from "./assets/ooda/3.png";
import img4 from "./assets/ooda/4.png";

import "./Trainer.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwnC5MgaVFRLzSm97axk3417-__RSyM2J-L57wEn73lfyMKFy44QcY9AUM-nHGc5EA/exec";

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
  // intro page toggles
  const [showOodaIntro, setShowOodaIntro] = useState(false);
  const [showPdcaIntro, setShowPdcaIntro] = useState(false);
  const [showSdcaIntro, setShowSdcaIntro] = useState(false);
  // kept for compatibility though no longer used to show "under construction"
  const [underConstruction, setUnderConstruction] = useState(false);

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

  const hasScenarios = scenarios?.length > 0;
  const scenario = hasScenarios ? scenarios[currentScenarioIndex] : null;
  const step = scenario?.steps?.[stepIndex] || null;

  const totalQuestions = useMemo(() => {
    if (!hasScenarios) return 0;
    return scenarios.reduce(
      (sum, s) => sum + (Array.isArray(s.steps) ? s.steps.length : 0),
      0
    );
  }, [scenarios, hasScenarios]);

  // ------------------ Логіка відповідей ------------------

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

  const chooseModel = (m) => {
    // For PDCA and SDCA — open their intro pages (instead of a stub)
    if (m === "PDCA") {
      setModel(m);
      resetProgress();
      setShowPdcaIntro(true);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("model", m);
        window.history.replaceState({}, "", url.toString());
      } catch {}
      return;
    }

    if (m === "SDCA") {
      setModel(m);
      resetProgress();
      setShowSdcaIntro(true);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("model", m);
        window.history.replaceState({}, "", url.toString());
      } catch {}
      return;
    }

    // OODA behavior unchanged
    setModel(m);
    resetProgress();

    if (m === "OODA") setShowOodaIntro(true);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("model", m);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

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
      model,
    };

    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([k, v]) => formData.append(k, v));

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      console.log(await res.text());
      alert(
        `Результати надіслані: ${correctCount}/${totalQuestions} (${percent}%).`
      );

      resetProgress();
      setModel(null);
      setNameSubmitted(false);

      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("model");
        window.history.replaceState({}, "", url.toString());
      } catch {}
    } catch {
      alert("Помилка надсилання результатів.");
    } finally {
      setIsSending(false);
    }
  };

  // ------------------ Екран введення імені ------------------

  if (!nameSubmitted) {
    return (
      <div className="trainer-intro-wrapper">
        <div className="trainer-intro-card">
          <h1 className="trainer-intro-title">
            Тренажер управлінських рішень SIMDEC
          </h1>

          <p className="trainer-intro-text">
            <b>
              Раді вітати Вас у SIMDEC — тренажері управлінських рішень,
              створеному фахівцями Донецького державного університету
              внутрішніх справ.
            </b>
          </p>

          <p className="trainer-intro-text">
            Ця платформа допомагає керівникам Національної поліції України та
            підрозділів МВС відпрацьовувати управлінські дії в умовах,
            змодельованих максимально наближених до реальних. У SIMDEC Ви
            обираєте варіант дій у ситуації та одразу отримуєте оцінку
            наслідків — без ризику для особового складу чи оперативної
            обстановки.
          </p>

          <p className="trainer-intro-text">
            Тренажер поєднує сучасні моделі ухвалення рішень, інтерактивні
            сценарії та автоматизовану аналітику, підтримуючи розвиток
            управлінських компетентностей.
          </p>

          <p className="trainer-intro-text trainer-intro-emphasis">
            Щоб розпочати тренування, введіть своє ім’я або позивний та оберіть
            модель ухвалення рішень.
          </p>

          <p className="trainer-intro-confidential">
            Ваші дані використовуються виключно організаторами навчання і не
            передаються третім особам.
          </p>

          <div className="trainer-intro-form">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ваше ім’я або позивний"
              className="trainer-intro-input"
            />

            <button
              type="button"
              className="trainer-start-btn"
              onClick={() => {
                if (!userName.trim()) {
                  alert("Введіть ім’я або позивний!");
                  return;
                }
                setNameSubmitted(true);
              }}
            >
              Розпочати тренування
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------
  // INTRO PAGES FOR PDCA / SDCA / OODA
  // ------------------

  if (model === "PDCA" && showPdcaIntro) {
    return (
      <PdcaIntro
        onStart={() => setShowPdcaIntro(false)}
        onBack={() => {
          setShowPdcaIntro(false);
          setModel(null);
        }}
      />
    );
  }

  if (model === "SDCA" && showSdcaIntro) {
    return (
      <SdcaIntro
        onStart={() => setShowSdcaIntro(false)}
        onBack={() => {
          setShowSdcaIntro(false);
          setModel(null);
        }}
      />
    );
  }

  // OODA intro unchanged
  if (model === "OODA" && showOodaIntro) {
    return (
      <OodaIntro
        onStart={() => setShowOodaIntro(false)}
        onBack={() => {
          setShowOodaIntro(false);
          setModel(null);
        }}
      />
    );
  }

  // ------------------ Вибір моделі ------------------

  if (!model) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
        <div style={cardStyle}>
          <button
            type="button"
            style={{
              ...secondaryBtn,
              width: "auto",
              marginBottom: 16,
              background: "#1e3a8a",
            }}
            onClick={() => {
              setNameSubmitted(false);
              setModel(null);
            }}
          >
            Назад
          </button>

          <h2 style={{ textAlign: "center", marginBottom: 16 }}>
            Онлайн-тренажер «СИМДЕК»
          </h2>

          <p style={{ marginBottom: 6 }}>
            Раді вітати вас, <b>{userName}</b>, на онлайн-тренажері «СИМДЕК»
            Донецького державного університету внутрішніх справ.
          </p>
          <p style={{ marginBottom: 6 }}>
            Для проходження навчання оберіть цикл прийняття управлінських
            рішень, за яким будете проводити тренування.
          </p>
          <p style={{ marginBottom: 16, opacity: 0.9 }}>
            Після вибору моделі система послідовно запропонує вам ситуації,
            запитання та зворотний зв’язок.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 12,
            }}
          >
            {/* PDCA */}
            <div style={colBox}>
              <h3 style={colTitle}>PDCA</h3>
              <p style={colText}>
                Цикл безперервного вдосконалення: Плануй, Виконуй, Перевіряй,
                Дій. Використовується для покращення процесів.
              </p>
              <button onClick={() => chooseModel("PDCA")} style={primaryBtn}>
                PDCA
              </button>
            </div>

            {/* OODA */}
            <div style={colBox}>
              <h3 style={colTitle}>OODA</h3>
              <p style={colText}>
                Модель швидкого реагування: Спостерігай, Орієнтуйся, Приймай
                рішення, Дій. Ефективна в умовах протиборства.
              </p>
              <button onClick={() => chooseModel("OODA")} style={primaryBtn}>
                OODA
              </button>
            </div>

            {/* SDCA */}
            <div style={colBox}>
              <h3 style={colTitle}>SDCA</h3>
              <p style={colText}>
                Цикл стабілізації процесів: Стандартизуй, Виконуй, Перевіряй,
                Коригуй. Підтримує сталість і якість дій.
              </p>
              <button onClick={() => chooseModel("SDCA")} style={primaryBtn}>
                SDCA
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // ОСНОВНИЙ ТРЕНАЖЕР
  // -----------------------------------
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

            {stepImages[step.stage] && (
              <img
                src={stepImages[step.stage]}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "750px",
                  margin: "15px auto",
                  display: "block",
                  borderRadius: "10px",
                }}
              />
            )}

            <div style={{ display: "grid", gap: 8 }}>
              {step.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt)}
                  disabled={stepCompleted}
                  style={primaryBtn}
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

// --------------------------------------
// СТИЛІ
// --------------------------------------

const primaryBtn = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  background: "#1e40af",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
};

const successBtn = { ...primaryBtn, width: "auto", background: "#16a34a" };
const secondaryBtn = { ...primaryBtn, width: "auto" };

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 18,
};

const colBox = {
  background: "#f9fafb",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const colTitle = {
  textAlign: "center",
  marginBottom: 8,
  fontSize: 16,
  fontWeight: 700,
};

const colText = {
  fontSize: 14,
  lineHeight: 1.45,
  marginBottom: 12,
  textAlign: "justify",
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
