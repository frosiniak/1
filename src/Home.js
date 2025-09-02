import React, { useState } from "react";
import Trainer from "./Trainer";

export default function Home() {
  const [model, setModel] = useState(null);

  if (model) {
    return <Trainer model={model} onExit={() => setModel(null)} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Тренажер для керівників</h1>
      <p>Оберіть модель для тренування:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button onClick={() => setModel("pdca")}>PDCA</button>
        <button onClick={() => setModel("ooda")}>OODA</button>
        <button onClick={() => setModel("sdca")}>SDCA</button>
      </div>
    </div>
  );
}
