import React, { useState } from "react";
import pdcaData from "./scenarios/pdca.json";
import oodaData from "./scenarios/ooda.json";
import sdcaData from "./scenarios/sdca.json";

export default function Trainer() {
  const [model, setModel] = useState(null); // обрана модель
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Вибір моделі і завантаження сценарію
  let scenario;
  if (model === "PDCA") scenario = pdcaData[0];
  else if (model === "OODA") scenario = oodaData[0];
  else if (model === "SDCA") scenario = sdcaData[0];

  const handleChoice = (option) => {
    setFeedback(option.feedback);

    if (option.result === "success" && stepIndex < scenario.steps.length - 1) {
      setTimeout(() => {
        setStepIndex(stepIndex + 1);
        setFeedback("");
      }, 2000);
    }
  };

  // Повернення на головну
  const handleBack = () => {
    setModel(null);
    setStepIndex(0);
    setFeedback("");
  };

  // Якщо модель не вибрана — показуємо кнопки вибору
  if (!model) {
    return (
      <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1>Тренажер для керівників</h1>
        <p>Оберіть модель для тренування:</p>
        <button onClick={() => setModel("PDCA")} style={{ margin: "5px", padding: "10px 20px" }}>PDCA</button>
        <button onClick={() => setModel("OODA")} style={{ margin: "5px", padding: "10px 20px" }}>OODA</button>
        <button onClick={() => setModel("SDCA")} style={{ margin: "5px", padding: "10px 20px" }}>SDCA</button>
      </div>
    );
  }

  const step = scenario.steps[stepIndex];

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h1>{scenario.title} ({scenario.model})</h1>
      <p>{scenario.scenario}</p>

      <h2>{step.stage}: {step.question}</h2>

      {step.options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleChoice(option)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {option.text}
        </button>
      ))}

      {feedback && (
        <div style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          background: feedback.includes("Правильно") || feedback.includes("Добре") || feedback.includes("Так") || feedback.includes("Вірно") ? "#d1fae5" : "#fee2e2",
          color: feedback.includes("Правильно") || feedback.includes("Добре") || feedback.includes("Так") || feedback.includes("Вірно") ? "#065f46" : "#991b1b"
        }}>
          {feedback}
        </div>
      )}

      <button onClick={handleBack} style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "8px" }}>На головну</button>
    </div>
  );
}
